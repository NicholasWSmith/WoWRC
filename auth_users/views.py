from django.shortcuts import render

# Create your views here.
from rest_framework import authentication
from rest_auth.views import LogoutView


class LogoutViewEx(LogoutView):
    authentication_classes = (authentication.TokenAuthentication,)
