#!/usr/bin/env python3
"""
Fetch real author photos from Wikipedia and write them into authors.json.

- Reads  : authors.json             (same folder as this script)
- Writes : authors_with_images.json (original file is NOT modified)
- Report : image_report.txt         (which authors got a photo / kept placeholder)
- Cache  : image_cache.json         (progress is saved after every author, so if
                                     the script stops you can just run it again
                                     and it resumes where it left off)

Uses only the Python standard library. Python 3.8+.
"""
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request

INPUT_FILE = "authors.json"
OUTPUT_FILE = "authors_with_images.json"
REPORT_FILE = "image_report.txt"
CACHE_FILE = "image_cache.json"

# Wikimedia asks for a descriptive User-Agent with contact info. Put your email here.
CONTACT = "your-email@example.com"
HEADERS = {"User-Agent": f"AuthorImageFetcher/1.1 ({CONTACT})"}

API = "https://en.wikipedia.org/api/rest_v1/page/summary/{}"
SUFFIXES = ["", " (author)", " (novelist)", " (writer)", " (historian)"]
DELAY = 1.0          # seconds between requests (slower = fewer 429 errors)
MAX_RETRIES = 6


def fetch_summary(title):
    url = API.format(urllib.parse.quote(title.replace(" ", "_"), safe=""))
    req = urllib.request.Request(url, headers=HEADERS)
    for attempt in range(MAX_RETRIES):
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return json.load(resp)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            if e.code in (429, 503):
                # Rate limited: wait as long as the server asks, else back off.
                wait = e.headers.get("Retry-After")
                wait = int(wait) if wait and wait.isdigit() else 5 * (2 ** attempt)
                wait = min(wait, 120)
                print(f"    rate limited, waiting {wait}s (retry {attempt + 1}/{MAX_RETRIES})...")
                time.sleep(wait)
                continue
            print(f"    HTTP {e.code} for '{title}', skipping")
            return None
        except (urllib.error.URLError, TimeoutError):
            time.sleep(3)
    return None


def find_image(name):
    """Return (image_url, wikipedia_title, description) or (None, None, None)."""
    people = [p.strip() for p in name.split(" and ")]  # co-authored entries
    for person in people:
        for suffix in SUFFIXES:
            data = fetch_summary(person + suffix)
            time.sleep(DELAY)
            if not data or data.get("type") == "disambiguation":
                continue
            thumb = data.get("thumbnail", {}).get("source")
            if thumb:
                return thumb, data.get("title"), data.get("description", "")
    return None, None, None


def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


def main():
    with open(INPUT_FILE, encoding="utf-8") as f:
        authors = json.load(f)

    cache = load_cache()
    report = []
    found = 0
    for i, author in enumerate(authors, 1):
        name = author["name"]
        if name in cache:
            res = cache[name]
            note = " [cached]"
        else:
            url, title, desc = find_image(name)
            res = {"url": url, "title": title, "desc": desc}
            cache[name] = res
            save_cache(cache)
            note = ""

        if res["url"]:
            author["image"] = res["url"]
            found += 1
            line = f"OK       {name}  ->  {res['title']} ({res['desc']})"
        else:
            line = f"NO PHOTO {name}  (placeholder kept)"
        print(f"[{i}/{len(authors)}] {line}{note}")
        report.append(line)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(authors, f, indent=2, ensure_ascii=False)
    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(report))

    print(f"\nDone. {found}/{len(authors)} authors got a Wikipedia photo.")
    print(f"Saved: {OUTPUT_FILE} and {REPORT_FILE}")
    print("Tip: skim image_report.txt - the text in brackets is Wikipedia's "
          "description of the page matched, so you can spot wrong matches.")


if __name__ == "__main__":
    main()