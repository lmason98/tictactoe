from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenRefreshView

from auth.views import TokenCheckPairView, TokenObtainView, UserRegisterView

urlpatterns = [
	path('register/', UserRegisterView.as_view()),
	path('token/obtain', TokenObtainView.as_view()),
	path('token/check', csrf_exempt(TokenCheckPairView.as_view())),
	path('token/refresh', TokenRefreshView.as_view()),
]
