from synology_api import filestation, downloadstation
from pathlib import Path

fl = filestation.FileStation(
    '95.129.176.129', '5000', 'web', "Tick4952")

print(fl.get_info())

file_path = Path('./air.pdf')

fl.upload_file('/Portal', file_path)
