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
        'total_pending_paid',
        views.get_post_total_pending_paid,
        name="get total pending paid"
    ),
    re_path(
        r'^discord/(?P<discord_id>[0-9]+)/roles$',
        views.get_discord_user_roles,
        name="get discord user roles"
    )
]
