import sys
import json

obj = {}
obj['script'] = sys.argv[0]
for i in range(1, len(sys.argv)):
    obj['arg'+str(i)] = sys.argv[i]

# Convert into JSON
obj_json = json.dumps(obj)

print(obj_json)