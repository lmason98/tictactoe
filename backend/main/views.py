from rest_framework.response import Response
from rest_framework.views import APIView

from main.utils import minimax, terminal, result, optimal_move


class TicTacToeAIView(APIView):

	def get(self, request):

		print('tic tac toe AI get :', request.data)

		return Response({'status': 'success', 'message': 'Hello world'})

	def post(self, request):
		"""
		Using post here to get the board data and return a new board with the AI's move
		"""
		board = request.data.get('board')

		terminal_board, ply_winner = terminal(board)

		if terminal_board:
			resp = {'winner': ply_winner, 'gameOver': True, 'board': board}
		else:
			print('pre ai move')
			ai_move = optimal_move(board)
			print('post ai move')
			board = result(board, ai_move)
			terminal_board, ply_winner = terminal(board)

			# Check for AI win
			if terminal_board:
				resp = {'winner': ply_winner, 'gameOver': True, 'board': board}
			else:
				resp = {'board': board}

		return Response(resp)
