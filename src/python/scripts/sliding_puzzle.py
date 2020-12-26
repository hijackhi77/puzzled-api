import sys
import copy
from collections import deque
import heapq
from lib.utils import *


class State:
	def __init__(self, puzzle, parent):
		self.puzzle = copy.deepcopy(puzzle)
		self.parent = parent # reference
		self.cost = parent.cost+1 if parent else 0
		self.size = len(puzzle)

	def get_while_tile(self):
		for i in range(self.size):
			for j in range(self.size):
				if self.puzzle[i][j] == 0:
					return (i, j)
		return None

	def get_successors(self):
		successors = []
		row, col = self.get_while_tile()
		if row > 0:
			successors.append(State(swap(self.puzzle, (row-1, col), (row, col)), self))
		if row < self.size - 1:
			successors.append(State(swap(self.puzzle, (row+1, col), (row, col)), self))
		if col > 0:
			successors.append(State(swap(self.puzzle, (row, col-1), (row, col)), self))
		if col < self.size - 1:
			successors.append(State(swap(self.puzzle, (row, col+1), (row, col)), self))
		return successors

	def is_goal_state(self):
		id = 1
		for i in range(self.size):
			for j in range(self.size):
				if i == self.size - 1 and j == self.size - 1: 
					if self.puzzle[i][j] != 0:
						return False
				else:
					if self.puzzle[i][j] != id:
						return False
				id += 1
		return True

	# Reference: https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
	def is_solvable(self):
		flat_puzzle = flatten(self.puzzle)
		inv_count = 0
		for i in range(len(flat_puzzle)):
			for j in range(i+1, len(flat_puzzle)):
				if flat_puzzle[i] and flat_puzzle[j] and flat_puzzle[i] > flat_puzzle[j]:
					inv_count += 1
		if self.size%2 == 1:
			return inv_count%2 == 0
		else:
			x_row, _ = self.get_while_tile()
			x_row_r = self.size - x_row
			return x_row_r%2 + inv_count%2 == 1

	def __str__(self):
		result = ""
		for line in self.puzzle:
			result += str(line)+"\n"
		return result


def swap(puzzle, pos1, pos2):
	puzzle_copy = copy.deepcopy(puzzle)
	temp = puzzle_copy[pos1[0]][pos1[1]]
	puzzle_copy[pos1[0]][pos1[1]] = puzzle_copy[pos2[0]][pos2[1]]
	puzzle_copy[pos2[0]][pos2[1]] = temp
	return puzzle_copy


def bfs(initial_state):
	frontier = deque()
	frontier.append(initial_state)
	expanded = set()
	expanded.add(str(initial_state.puzzle))
	expanded_states = []

	num_generated = 0
	i = 0
	while frontier and i < 10:
		curr_state = frontier.popleft()

		if curr_state.is_goal_state(): return [curr_state, expanded_states, num_generated]

		successors = curr_state.get_successors()
		expanded_states.append(curr_state.puzzle)
		for successor in successors:
			if str(successor.puzzle) not in expanded:
				num_generated += 1
				frontier.append(successor)
				expanded.add(str(successor.puzzle))
	return None


def dfs(initial_state):
	frontier = list()
	frontier.append(initial_state)
	expanded = set()
	expanded.add(str(initial_state))
	expanded_states = []

	num_generated = 0
	while frontier:
		curr_state = frontier.pop()

		if curr_state.is_goal_state(): return [curr_state, expanded_states, num_generated]

		successors = curr_state.get_successors()
		expanded_states.append(curr_state.puzzle)
		for successor in successors:
			if str(successor) not in expanded:
				num_generated += 1
				frontier.append(successor)
				expanded.add(str(successor))
	return None


def get_cost(state):
	return state.cost


def get_heuristic(state):
	num_misplaced = 0
	id = 1
	for i in range(state.size):
		for j in range(state.size):
			if i == state.size - 1 and j == state.size - 1: 
				if state.puzzle[i][j] != 0:
					num_misplaced += 1
			else:
				if state.puzzle[i][j] != id:
					num_misplaced += 1
			id += 1
	return num_misplaced


def get_f(state):
	return get_heuristic(state) + get_cost(state)


def a_star(initial_state):
	num_generated = 0
	frontier = []
	heapq.heappush(frontier, (get_f(initial_state), num_generated, initial_state))
	expanded = set()
	expanded.add(str(initial_state))
	expanded_states = []
	
	while frontier:
		curr_state = heapq.heappop(frontier)[2]

		if curr_state.is_goal_state(): return [curr_state, expanded_states, num_generated]

		successors = curr_state.get_successors()
		expanded_states.append(curr_state.puzzle)
		for successor in successors:
			if str(successor) not in expanded:
				num_generated += 1
				heapq.heappush(frontier, (get_f(successor), num_generated, successor))
				expanded.add(str(successor))
	return None


def main(argv):
	# python3 sliding_puzzle.py 
	# 	-m <search method>
	# 	-p <puzzle>
	# 	-s <puzzle size>

	search_method = ""
	initial_puzzle = ""
	puzzle_size = 0
	i = 1
	while i < len(argv):
		if argv[i] == "-m":
			i += 1
			search_method = argv[i]
		elif argv[i] == "-p":
			i += 1
			puzzle_str = argv[i]
		elif argv[i] == "-s":
			i += 1
			puzzle_size = int(argv[i])
		else:
			res_obj = {}
			res_obj['able_to_solve'] = False
			res_obj['error'] = "Invalid parameters"
			print_to_node(res_obj)
		i += 1

	initial_puzzle = decode_puzzle(puzzle_str, puzzle_size)
	if search_method not in ("bfs", "dfs", "astar") or not initial_puzzle:
		res_obj = {}
		res_obj['able_to_solve'] = False
		res_obj['error'] = "Invalid parameters"
		print_to_node(res_obj)
	#################################################################

	initial_state = State(initial_puzzle, None)
	if not initial_state.is_solvable():
		res_obj = {}
		res_obj['able_to_solve'] = False
		print_to_node(res_obj)

	result = None	
	if search_method == "bfs":
		result = bfs(initial_state)
	elif search_method == "dfs":
		result = dfs(initial_state)
	elif search_method == "astar":
		result = a_star(initial_state)
		
	if result:
		res_obj = {}
		res_obj['able_to_solve'] = True
		[goal_state, expanded_states, num_generated] = result
		res_obj['num_steps'] = 0
		res_obj['steps'] = []
		while goal_state.parent:
			res_obj['num_steps'] += 1
			res_obj['steps'].append(goal_state.puzzle)
			goal_state = goal_state.parent
		res_obj['num_expanded'] = len(expanded_states)
		res_obj['expanded'] = expanded_states
		res_obj['num_generated'] = num_generated
		print_to_node(res_obj)
	else:
		res_obj = {}
		res_obj['able_to_solve'] = False
		print_to_node(res_obj)

	
#####################################################################
if __name__ == '__main__':
	main(sys.argv)