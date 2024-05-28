from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenViewBase

from auth.serializers import TokenObtainLifetimeSerializer


class UserRegisterView(APIView):

	def post(self, request, *args, **kwargs):

		try:
			User.objects.get(username=request.data['username'])
			resp = {'status': 'error', 'message': 'A user already exists with this username.'}
		except User.DoesNotExist:
			user = User.objects.create(username=request.data['username'])
			user.set_password(request.data['password'])
			user.save()
			resp = {'status': 'success', 'message': 'Successfully created new user.'}

		return Response(resp)


class TokenObtainView(TokenViewBase):
	serializer_class = TokenObtainLifetimeSerializer


class TokenCheckPairView(APIView):
	"""
	Checks the auth tokens of a user
	"""

	@staticmethod
	def get(request, *args, **kwargs):
		authenticator = JWTAuthentication()

		authed = authenticator.authenticate(request)

		if authed:
			resp = Response({'status': 'success'})
		else:
			resp = Response({'status': 'error'})

		return resp
