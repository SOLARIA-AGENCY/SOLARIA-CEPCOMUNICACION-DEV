import sys
import os

print("--- Python Environment Diagnostics ---")
print(f"Python Version: {sys.version}")
print(f"Python Executable: {sys.executable}")
print("\nsys.path directories:")
for path in sys.path:
    print(f"- {path}")

print("\n--- Checking for supermemory installation ---")
expected_path = os.path.expanduser('~/Library/Python/3.9/lib/python/site-packages')
print(f"Expected installation path: {expected_path}")
print(f"Does expected path exist? {os.path.isdir(expected_path)}")

if os.path.isdir(expected_path):
    print(f"Is 'supermemory' directory in expected path? {os.path.isdir(os.path.join(expected_path, 'supermemory'))}")

print("\n--- Diagnostics Complete ---")
