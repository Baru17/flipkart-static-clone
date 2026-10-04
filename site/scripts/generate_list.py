import os
import re

script_dir = os.path.dirname(os.path.abspath(__file__))
site_dir = os.path.dirname(script_dir)
data_js_path = os.path.join(site_dir, 'js', 'data.js')
output_file = os.path.join(site_dir, 'images_to_download.txt')

with open(data_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'makeProduct\((\d+),\s*"([^"]+)"'
matches = re.findall(pattern, content)

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("Please download an image for each of the following products.\n")
    f.write("Save them in the 'site/assets/images/products/' folder with the exact filename provided.\n\n")
    
    for product_id, product_name in matches:
        f.write(f"Product: {product_name}\n")
        f.write(f"Filename: p{product_id}.jpg\n")
        f.write("-" * 50 + "\n")

print(f"Generated {output_file} with {len(matches)} items.")
