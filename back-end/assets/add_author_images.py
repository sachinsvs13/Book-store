#!/usr/bin/env python3
"""
Fetch real author photos from Wikipedia and write them into authors.json.

- Reads  : authors.json            (same folder as this script)
- Writes : authors_with_images.json (original file is NOT modified)
- Report : image_report.txt         (which authors got a photo, which kept the placeholder)

Uses only the Python standard library (no pip install needed). Python 3.8+.
"""
import json
import time
import urllib.error
import urllib.parse
import urllib.request

INPUT_FILE = "authors.json"
OUTPUT_FILE = "authors_with_images.json"
REPORT_FILE = "image_report.txt"

API = "https://en.wikipedia.org/api/rest_v1/page/summary/{}"
# Wikimedia asks API clients to send a descriptive User-Agent.
HEADERS = {"User-Agent": "AuthorImageFetcher/1.0 (personal dataset project)"}
SUFFIXES = ["", " (author)", " (novelist)", " (writer)", " (historian)"]


def fetch_summary(title):
    url = API.format(urllib.parse.quote(title.replace(" ", "_"), safe=""))
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise
    except urllib.error.URLError:
        return None


def find_image(name):
    """Return (image_url, wikipedia_title, description) or (None, None, None)."""
    # Co-authored entries: try each person, first one with a photo wins.
    people = [p.strip() for p in name.split(" and ")]
    for person in people:
        for suffix in SUFFIXES:
            data = fetch_summary(person + suffix)
            time.sleep(0.15)  # be polite to the API
            if not data or data.get("type") == "disambiguation":
                continue
            thumb = data.get("thumbnail", {}).get("source")
            if thumb:
                return thumb, data.get("title"), data.get("description", "")
    return None, None, None


def main():
    with open(INPUT_FILE, encoding="utf-8") as f:
        authors = json.load(f)

    report = []
    found = 0
    for i, author in enumerate(authors, 1):
        name = author["name"]
        url, title, desc = find_image(name)
        if url:
            author["image"] = url
            found += 1
            line = f"OK       {name}  ->  {title} ({desc})"
        else:
            line = f"NO PHOTO {name}  (placeholder kept)"
        print(f"[{i}/{len(authors)}] {line}")
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