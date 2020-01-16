import sys
import math
import copy
from collections import deque
import heapq
from lib.utils import printToNode


def read_puzzle(puzzle_str):
	# TODO: implement parsing for non 3*3 puzzles
	puzzle = []
	size = int(math.sqrt(len(puzzle_str)))
	if size**2 == len(puzzle_str):
		index = 0
		for i in range(size):
			row = []
			for j in range(size):
				row.append(int(puzzle_str[index]))
				index += 1
			puzzle.append(row)
		return State(puzzle, None)
	else:
		return None


class State:
	def __init__(self, puzzle, parent):
		self.puzzle = copy.deepcopy(puzzle)
		self.parent = parent # reference
		self.cost = parent.cost+1 if parent else 0
		self.height = len(puzzle)
		self.width = len(puzzle[0])

	def get_while_tile(self):
		for i in range(self.height):
			for j in range(self.width):
				if self.puzzle[i][j] == 0:
					return (i, j)
		return None

	def get_successors(self):
		successors = []
		row, col = self.get_while_tile()
		if row > 0:
			successors.append(State(swap(self.puzzle, (row-1, col), (row, col)), self))
		if row < self.height - 1:
			successors.append(State(swap(self.puzzle, (row+1, col), (row, col)), self))
		if col > 0:
			successors.append(State(swap(self.puzzle, (row, col-1), (row, col)), self))
		if col < self.width - 1:
			successors.append(State(swap(self.puzzle, (row, col+1), (row, col)), self))
		return successors

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


def is_goal(state):
	id = 1
	for i in range(state.height):
		for j in range(state.width):
			if i == state.height - 1 and j == state.width - 1: 
				if state.puzzle[i][j] != 0:
					return False
			else:
				if state.puzzle[i][j] != id:
					return False
			id += 1
	return True


def bfs(initial_state):
	frontier = deque()
	frontier.append(initial_state)
	expanded = set()
	expanded.add(str(initial_state.puzzle))
	expanded_states = []
	expanded_states.append(initial_state.puzzle)

	num_generated = 0
	i = 0
	while frontier and i < 10:
		curr_state = frontier.popleft()

		if is_goal(curr_state): return [curr_state, expanded_states, num_generated]

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
	expanded_states.append(initial_state.puzzle)

	num_generated = 0
	while frontier:
		curr_state = frontier.pop()

		if is_goal(curr_state): return [curr_state, expanded_states, num_generated]

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
	for i in range(state.height):
		for j in range(state.width):
			if i == state.height - 1 and j == state.width - 1: 
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
	expanded_states.append(initial_state.puzzle)
	
	while frontier:
		curr_state = heapq.heappop(frontier)[2]

		if is_goal(curr_state): return [curr_state, expanded_states, num_generated]

		successors = curr_state.get_successors()
		expanded_states.append(curr_state.puzzle)
		for successor in successors:
			if str(successor) not in expanded:
				num_generated += 1
				heapq.heappush(frontier, (get_f(successor), num_generated, successor))
				expanded.add(str(successor))
	return None


def main(argv):
	# usage = "usage: python3 sliding_puzzle.py -s <search method> -p <puzzle>"
	if len(argv) != 5: 
		res_obj = {}
		res_obj['able_to_solve'] = False
		res_obj['error'] = "Invalid parameters"
		printToNode(res_obj)
	
	search_method = ""
	initial_puzzle = ""
	i = 1
	while i < len(argv):
		if argv[i] == "-s":
			i += 1
			search_method = argv[i]
		elif argv[i] == "-p":
			i += 1
			initial_puzzle = argv[i]
		else:
			res_obj = {}
			res_obj['able_to_solve'] = False
			res_obj['error'] = "Invalid parameters"
			printToNode(res_obj)
		i += 1

	if search_method not in ("bfs", "dfs", "astar") \
	or not initial_puzzle:
		res_obj = {}
		res_obj['able_to_solve'] = False
		res_obj['error'] = "Invalid parameters"
		printToNode(res_obj)
	#################################################################
	
	initial_state = read_puzzle(initial_puzzle)
	result = None
	if initial_state:	
		if search_method == "bfs":
			result = bfs(initial_state)
		elif search_method == "dfs":
			result = dfs(initial_state)
		elif search_method == "astar":
			result = a_star(initial_state)
	else:
		res_obj = {}
		res_obj['able_to_solve'] = False
		res_obj['error'] = "Invalid input puzzle"
		printToNode(res_obj)
		
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
		printToNode(res_obj)
	else:
		res_obj = {}
		res_obj['able_to_solve'] = False
		printToNode(res_obj)

	
#####################################################################
if __name__ == '__main__':
	main(sys.argv)