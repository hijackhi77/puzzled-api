import json
import sys
import math


def print_to_node(res_obj):
    # Convert into JSON
	res_json = json.dumps(res_obj)
	print(res_json)
	sys.stdout.flush()
	sys.exit(0)


def decode_puzzle(encoded, size):
	result = []
	for i in range(1, len(encoded)-1):
		if encoded[i] == "[":
			j = i
			while encoded[j] != "]": j += 1
			row = encoded[i+1:j].split(',')
			row = [int(num_str) for num_str in row]
			if len(row) != size: return None
			result.append(row)
			i = j+1
	if len(result) != size: return None
	return result


def flatten(two_d_array):
	result = []
	for i in range(len(two_d_array)):
		result += two_d_array[i]
	return result