from django.contrib.auth.models import User
from django.db import models


class CreatedUpdatedMixin(models.Model):
	"""
	Mixin model for created/updated datetimes
	"""
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		abstract = True


class Game(CreatedUpdatedMixin):
	"""
	Game model to save player wins, AI wins is count of games that are over that a player has not won
	"""
	player = models.ForeignKey(User, on_delete=models.CASCADE)
	win = models.BooleanField(default=False)
	tie = models.BooleanField(default=False)
