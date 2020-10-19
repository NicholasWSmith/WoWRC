"""WoWRC URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import index
from rest_auth.views import LoginView
from auth_users.views import *
from allauth.account.views import confirm_email

urlpatterns = [
    path('', index, name="index"),
    path('accounts/', include('allauth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/logout/', LogoutViewEx.as_view(), name='rest_logout'),
    path('rest-auth/login/', LoginView.as_view(), name='rest_login'),
    re_path(r'^rest-auth/registration/account-confirm-email/(?P<key>.+)/$',
            confirm_email, name='account_confirm_email'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls)
]
