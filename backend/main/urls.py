from django.urls import path

from .views import TicTacToeAIView


urlpatterns = [
	path('ai/', TicTacToeAIView.as_view(), name='ai'),
]