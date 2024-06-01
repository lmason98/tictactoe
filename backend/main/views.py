from django.contrib.auth.models import User
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

		# Determine if player has won or tie
		terminal_board, win = terminal(board)

		if terminal_board:
			# Save completed game
			Game.objects.create(player=self.request.user, win=win == 'X', tie=win is None)
			resp = {'winner': win, 'gameOver': True, 'board': board}
		else:
			ai_move = optimal_move(board)
			board = result(board, ai_move)

			# Determine if AI has won or tie
			terminal_board, win = terminal(board)

			if terminal_board:
				Game.objects.create(player=self.request.user, win=win == 'X', tie=win is None)
				resp = {'winner': win, 'gameOver': True, 'board': board}
			else:
				resp = {'board': board}

		return Response(resp)


class StatsView(APIView):
	"""
	Handles past game stats, returns specific player statistics or overall high score stats
	"""

	def get(self, request):

		data = []
		for player in User.objects.all():
			games = Game.objects.filter(player=player)

			data.append({
				'player': player.username,
				'gamesPlayed': games.count(),
				'gamesWon': games.filter(win=True).count(),
				'gamesLost': games.filter(win=False, tie=False).count(),
				'gamesTied': games.filter(tie=True).count(),
				'winPercent': round((games.filter(win=True).count() / games.count()) * 100) if games.count() > 0 else 0
			})

		games = Game.objects.all()
		data.append({
			'player': 'AI',
			'gamesPlayed': games.count(),
			'gamesWon': games.filter(win=False, tie=False).count(),
			'gamesLost': games.filter(win=True).count(),
			'gamesTied': games.filter(tie=True).count(),
			'winPercent': round((games.filter(win=False, tie=False).count() / games.count()) * 100) if games.count() > 0 else 0
		})

		data.sort(key=lambda v: (v['gamesWon'], v['gamesPlayed']), reverse=True)

		return Response({'objects': data})
