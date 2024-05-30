from django.contrib import admin

from main.models import Game


class CreatedUpdatedAdminMixin:

	list_display = ('created', 'updated')


class GameAdmin(CreatedUpdatedAdminMixin, admin.ModelAdmin):

	list_display = CreatedUpdatedAdminMixin.list_display + ('id', 'player', 'win', 'tie', 'over')
	search_fields = ('player',)


admin.site.register(Game, GameAdmin)
