from django.urls import path

from .views import TicTacToeView, StatsView


urlpatterns = [
	path('ai/', TicTacToeView.as_view()),
	path('stats/', StatsView.as_view())
]