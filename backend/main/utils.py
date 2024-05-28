from copy import deepcopy

X = 'X'
O = 'O'
EMPTY = None


def player(board):
	"""
	Returns player who has the next turn on a board.

	X Gets first move
	Count Xs and Os, if counts are equal, X turn, otherwise O turn
	"""
	x_count, o_count = 0, 0

	for row in board:
		for cell in row:
			x_count += 1 if cell == X else 0
			o_count += 1 if cell == O else 0

	if x_count == o_count:
		ply = X
	else:
		ply = O

	return ply


def actions(board):
	"""
	Returns set of all possible actions (i, j) available on the board.

	Loop through board, and add empty cells to an action set, can return empty set if no actions exist (terminal board)
	"""
	action_set = set()

	for i in range(len(board)):
		for j in range(len(board[i])):
			if board[i][j] is EMPTY:
				action_set.add((i, j))

	return action_set


def result(board, action):
	"""
	Returns the board that results from making move (i, j) on the board.
	"""
	new_board = deepcopy(board)
	ply = player(board)
	i, j = action

	if new_board[i][j] != EMPTY:
		raise ValueError("This is not a valid action for the given board.")
	else:
		new_board[i][j] = ply

	return new_board


def winner(board):
	"""
	Returns the winner of the game, if there is one.
	"""
	positive_diagonal = []
	negative_diagonal = []
	n = len(board)  # range loop helper

	# Build diagonals
	for i in range(n):
		positive_diagonal.append((i, n - 1 - i))
		negative_diagonal.append((i, i))

	# For each player check cols/rows and diagonals
	for ply in (X, O):

		# Check columns for a winner
		for i in range(n):
			is_win = True
			for j in range(n):
				if board[i][j] != ply:
					is_win = False

			if is_win:
				return ply

		# Check rows for a winner
		for i in range(n):
			is_win = True
			for j in range(n):
				if board[j][i] != ply:
					is_win = False

			if is_win:
				return ply

		# Check negative diagonal for a winner
		is_win = True
		for diagonal in negative_diagonal:
			i, j = diagonal
			if board[i][j] != ply:
				is_win = False

		if is_win:
			return ply

		# Check positive diagonal for winner
		is_win = True
		for diagonal in positive_diagonal:
			i, j = diagonal
			if board[i][j] != ply:
				is_win = False

		if is_win:
			return ply


def terminal(board):
	"""
	Returns True if game is over, False otherwise.

	Game is over if there is a winner or there are no more possible actions
	"""
	ply_winner = winner(board)

	return ply_winner is not None or len(actions(board)) == 0, ply_winner


def utility(board):
	"""
	Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
	"""
	status = 0
	ply_winner = winner(board)

	if ply_winner == X:
		status = 1
	elif ply_winner == O:
		status = -1

	return status


def minimax(board, is_max, depth):

	if terminal(board)[0]:
		return utility(board), depth

	if is_max:
		value = float('-inf')
		for action in actions(board):
			new_board = result(board, action)
			new_value, _ = minimax(new_board, False, depth + 1)
			value = max(value, new_value)

		return value, depth
	else:
		value = float('inf')
		for action in actions(board):
			new_board = result(board, action)
			new_value, _ = minimax(new_board, True, depth + 1)
			value = min(value, new_value)

		return value, depth


def optimal_move(board):
	if terminal(board)[0]:
		return

	optimal_action, value = None, float('inf')
	for action in actions(board):
		new_board = result(board, action)
		new_value, _ = minimax(new_board, True, 0)

		if new_value < value:
			value = new_value
			optimal_action = action

	return optimal_action
