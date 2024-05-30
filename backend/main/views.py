from rest_framework.response import Response
from rest_framework.views import APIView

from main.models import Game
from main.utils import terminal, result, optimal_move


class TicTacToeView(APIView):
	"""
	Handles tic tac toe game logic, saves completed games, and saves in progress games
	"""

	def post(self, request):
		"""
		Using post here to get the board data and return a new board with the AI's move
		"""

		board = self.request.data.get('board')

		terminal_board, ply_winner = terminal(board)

		if terminal_board:
			# Save completed game
			Game.objects.create(player=self.request.user, over=True, win=bool(ply_winner), tie=ply_winner is None)
			resp = {'winner': ply_winner, 'gameOver': True, 'board': board}
		else:
			ai_move = optimal_move(board)
			board = result(board, ai_move)
			terminal_board, ply_winner = terminal(board)

			# Check for AI win
			if terminal_board:
				resp = {'winner': ply_winner, 'gameOver': True, 'board': board}
			else:
				resp = {'board': board}

		return Response(resp)


class StatsView(APIView):
	"""
	Handles past game stats, returns specific player statistics or overall high score stats
	"""

	def get(self, request):
		pass
