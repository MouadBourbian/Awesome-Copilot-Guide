"""
This module provides functionality to fetch and parse an 'llms.txt' file
from a remote URL and convert it into a JSON index.
"""

import re
import json
import urllib.request
from urllib.error import URLError, HTTPError

def fetch_and_parse_llms_txt(url, output_file):
    """
    Fetches the llms.txt content from the given URL, parses the markdown links,
    and saves the structured data to a JSON file.

    Args:
        url (str): The URL of the llms.txt file.
        output_file (str): The path where the JSON output will be saved.
    """
    records = []
    current_section = "General"

    # Matches: - [Name](URL): Description
    pattern = r'- \[(.*?)\]\((.*?)\): (.*)'

    print(f"Fetching content from: {url}")

    try:
        # 1. Fetch the content from the web
        with urllib.request.urlopen(url) as response:
            content = response.read().decode('utf-8')
            lines = content.splitlines()

            for line in lines:
                line = line.strip()
                if not line:
                    continue

                # Detect Section (e.g., ## Agents)
                if line.startswith('## '):
                    current_section = line.replace('## ', '').strip()
                    continue

                # Extract Item Details
                match = re.search(pattern, line)
                if match:
                    name = match.group(1).strip()
                    full_url = match.group(2).strip()
                    description = match.group(3).strip()

                    # 2. Convert Raw URL to GitHub Viewer URL
                    github_url = full_url.replace(
                        "https://raw.githubusercontent.com/github/awesome-copilot/main/",
                        "https://github.com/github/awesome-copilot/tree/main/"
                    )

                    # Clean ID
                    safe_name = re.sub(r'[^a-zA-Z0-9]', '-', name.lower())
                    safe_name = re.sub(r'-+', '-', safe_name).strip('-')
                    object_id = f"{current_section.lower().split()[0]}-{safe_name}"

                    type_singular = (
                        current_section[:-1]
                        if current_section.endswith('s')
                        else current_section
                    )

                    # Create Record
                    record = {
                        "objectID": object_id,
                        "name": name,
                        "type": type_singular,
                        "description": description,
                        "url": github_url
                    }
                    records.append(record)

        # 3. Save to File
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(records, f, indent=2)

        print(f"Success! Processed {len(records)} items.")
        print(f"Saved to: {output_file}")

    except HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
    except URLError as e:
        print(f"URL Error: {e.reason}")
    except (OSError, IOError) as e:
        print(f"File system error: {e}")

if __name__ == "__main__":
    URL = 'https://github.github.io/awesome-copilot/llms.txt'
    OUTPUT_FILE = 'awesome-copilot.json'

    fetch_and_parse_llms_txt(URL, OUTPUT_FILE)
