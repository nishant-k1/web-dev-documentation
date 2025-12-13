#!/usr/bin/env python3
"""Renumber ECMAScript folders to match mind map structure"""
import os
import re
from pathlib import Path

base_dir = Path(__file__).parent
os.chdir(base_dir)

# Renumbering map: old_number -> new_number (working backwards)
renumbering = {
    26: 33, 25: 32, 24: 31,  # SPECIALIZED and REFERENCE
    29: 30,  # ADVANCED FEATURES (Proxy)
    23: 29, 22: 28, 21: 27,  # ADVANCED FEATURES
    20: 26, 19: 25,  # PARADIGMS
    32: 24, 31: 23, 28: 22, 27: 21,  # ADVANCED LANGUAGE FEATURES
    18: 20, 17: 19, 16: 18,  # ADVANCED LANGUAGE FEATURES
    15: 17, 14: 16, 13: 15,  # FUNCTIONS & EXECUTION
    12: 14, 11: 13, 10: 12, 9: 11, 8: 10,  # OPERATIONS
    33: 9, 30: 8,  # DATA & TYPES
}

# Phase 1: Rename to temporary names (TEMP_ prefix)
print("Phase 1: Renaming to temporary names...")
temp_renames = {}
for old_num in sorted(renumbering.keys(), reverse=True):
    if old_num in renumbering:
        new_num = renumbering[old_num]
        # Find folder with this number
        for item in Path('.').iterdir():
            if item.is_dir():
                match = re.match(r'^(\d+)\.\s(.+)$', item.name)
                if match and int(match.group(1)) == old_num:
                    old_name = item.name
                    temp_name = f"TEMP_{new_num:02d}. {match.group(2)}"
                    print(f"  {old_name} -> {temp_name}")
                    item.rename(Path('.') / temp_name)
                    temp_renames[new_num] = (temp_name, match.group(2))
                    break

print("\nPhase 2: Renaming to final names...")
# Phase 2: Rename from temporary to final names
for new_num in sorted(temp_renames.keys()):
    temp_name, rest = temp_renames[new_num]
    final_name = f"{new_num:02d}. {rest}"
    print(f"  {temp_name} -> {final_name}")
    (Path('.') / temp_name).rename(Path('.') / final_name)

print("\n✅ Folder renumbering complete!")
