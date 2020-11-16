from django.urls import include, path, re_path
from . import views

urlpatterns = [
    path(
        'get_prices',
        views.get_huokan_prices,
        name="get huokan prices"
    ),
    path(
        'discord',
        views.get_discord_url,
        name="get_discord_url"
    ),
    path(
        'test',
        views.test_mongo,
        name="get_discord_url"
    )
]
