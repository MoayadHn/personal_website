from pathlib import Path
import json
root=Path(__file__).parent/'site'
names=('projects','lab','posts')
items={k:json.loads((root/'data'/f'{k}.json').read_text(encoding='utf-8')) for k in names}
(root/'assets'/'catalog.js').write_text('window.SITE_CATALOG = '+json.dumps(items,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
print('Updated project, lab, and blog catalog for local and online viewing.')
