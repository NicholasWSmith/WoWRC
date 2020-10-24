from django.urls import include, path, re_path
from . import views

urlpatterns = [
    path(
        'get_prices',
        views.get_huokan_prices,
        name="get huokan prices"
    )
]
