import json
import sys


def printToNode(res_obj):
    # Convert into JSON
	res_json = json.dumps(res_obj)
	print(res_json)
	sys.stdout.flush()
	sys.exit(0)