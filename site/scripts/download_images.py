import os
import re
import urllib.request
import urllib.error
from duckduckgo_search import DDGS
import json

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
site_dir = os.path.dirname(script_dir)
data_js_path = os.path.join(site_dir, 'js', 'data.js')
images_dir = os.path.join(site_dir, 'assets', 'images', 'products')

# Create images directory if it doesn't exist
os.makedirs(images_dir, exist_ok=True)

# Read data.js
with open(data_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'makeProduct\((\d+),\s*"([^"]+)"'
matches = re.findall(pattern, content)

print(f"Found {len(matches)} products.")

def download_image(query, product_id):
    try:
        with DDGS() as ddgs:
            results = list(ddgs.images(query, max_results=1))
            if results:
                image_url = results[0]['image']
                filename = f"p{product_id}.jpg"
                filepath = os.path.join(images_dir, filename)
                
                req = urllib.request.Request(
                    image_url, 
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                
                try:
                    with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
                        out_file.write(response.read())
                    print(f"[{product_id}] Downloaded image for: {query}")
                    return True
                except Exception as e:
                    print(f"[{product_id}] Failed to download {image_url}: {e}")
                    return False
            else:
                print(f"[{product_id}] No image results found for: {query}")
                return False
    except Exception as e:
        print(f"[{product_id}] Search failed for: {query}. Error: {e}")
        return False

downloaded_ids = []
for product_id, product_name in matches:
    search_query = product_name
    success = download_image(search_query, product_id)
    if success:
        downloaded_ids.append(product_id)

print(f"Successfully downloaded {len(downloaded_ids)} images.")

replacement = """    images: [{ url: `assets/images/products/p${id}.jpg` }],"""
new_content = content.replace('images: [{ url: placeholderImg(label, bg, fg) }],', replacement)

with open(data_js_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated data.js with new image paths.")
