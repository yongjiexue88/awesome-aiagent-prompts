#!/usr/bin/env python3
"""
Extract all prompts from prompts.chat HTML file.
Parses the target.txt file and saves each prompt as a separate markdown file.
"""

import re
import os
import urllib.parse
from pathlib import Path

# Read the HTML file
with open('target.txt', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Create output directory
output_dir = Path('prompts')
output_dir.mkdir(exist_ok=True)

# Pattern to extract prompt cards with copyPrompt onclick
# copyPrompt(this, 'URL_ENCODED_PROMPT')
copy_pattern = re.compile(r"copyPrompt\(this,\s*'([^']+)'\)")

# Pattern to extract prompt titles
# class="prompt-title">TITLE</
title_pattern = re.compile(r'class="prompt-title">([^<]+)<')

# Find all titles
titles = title_pattern.findall(content)
print(f"Found {len(titles)} prompt titles")

# Find all encoded prompts from copyPrompt calls
prompts_encoded = copy_pattern.findall(content)
print(f"Found {len(prompts_encoded)} encoded prompts")

# Also try showYamlModal pattern to get title+prompt pairs
# showYamlModal(event, 'TITLE', 'ENCODED_PROMPT')
yaml_pattern = re.compile(r"showYamlModal\(event,\s*'([^']+)',\s*'([^']+)'\)")
yaml_matches = yaml_pattern.findall(content)
print(f"Found {len(yaml_matches)} YAML modal entries")

# Use YAML matches as primary source (has both title and prompt)
prompts_data = []
seen_titles = set()

for title_encoded, prompt_encoded in yaml_matches:
    try:
        title = urllib.parse.unquote(title_encoded).strip()
        prompt = urllib.parse.unquote(prompt_encoded).strip()
        
        # Clean up title for use as filename
        title_clean = title.replace('Act as ', '').replace('Act as a ', '').replace('Act as an ', '')
        
        if title not in seen_titles and len(prompt) > 10:
            seen_titles.add(title)
            prompts_data.append({
                'title': title,
                'title_clean': title_clean,
                'prompt': prompt
            })
    except Exception as e:
        print(f"Error decoding: {e}")
        continue

print(f"\nExtracted {len(prompts_data)} unique prompts")

# Also create a master JSON file
import json

# Save individual prompt files
for i, data in enumerate(prompts_data, 1):
    # Create safe filename
    safe_name = re.sub(r'[^\w\s-]', '', data['title_clean'])
    safe_name = re.sub(r'[-\s]+', '_', safe_name).strip('_')[:50]
    filename = f"{i:03d}_{safe_name}.md"
    
    filepath = output_dir / filename
    
    md_content = f"""# {data['title']}

## Prompt

{data['prompt']}
"""
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(md_content)

# Save master JSON with all prompts
master_data = {
    'total_prompts': len(prompts_data),
    'prompts': [{
        'id': i,
        'title': p['title'],
        'prompt': p['prompt']
    } for i, p in enumerate(prompts_data, 1)]
}

with open(output_dir / 'all_prompts.json', 'w', encoding='utf-8') as f:
    json.dump(master_data, f, indent=2, ensure_ascii=False)

# Save master markdown index
with open(output_dir / 'README.md', 'w', encoding='utf-8') as f:
    f.write(f"# Prompts Collection\n\n")
    f.write(f"**Total Prompts:** {len(prompts_data)}\n\n")
    f.write(f"## Index\n\n")
    for i, p in enumerate(prompts_data, 1):
        safe_name = re.sub(r'[^\w\s-]', '', p['title_clean'])
        safe_name = re.sub(r'[-\s]+', '_', safe_name).strip('_')[:50]
        f.write(f"{i}. [{p['title']}]({i:03d}_{safe_name}.md)\n")

print(f"\nSaved to {output_dir}/")
print(f"  - {len(prompts_data)} individual .md files")
print(f"  - all_prompts.json (master JSON)")
print(f"  - README.md (index)")
