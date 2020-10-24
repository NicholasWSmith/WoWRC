from django.shortcuts import render

# Create your views here.
from rest_framework import authentication
from rest_auth.views import LogoutView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
import urllib.request
import json
import csv

HUOKAN_SHEET_URL = 'https://docs.google.com/spreadsheets/d/155thp4_gWSQN8A8T-kqdxpBkLeueWPUXd3IUG62iMwQ'

REQUEST_URL = "https://docs.google.com/spreadsheets/d/{key}/gviz/tq?tqx=out:{output}&sheet={sheet_name}&range={range}"

HUOKAN_KEY = "155thp4_gWSQN8A8T-kqdxpBkLeueWPUXd3IUG62iMwQ"


class LogoutViewEx(LogoutView):
    authentication_classes = (authentication.TokenAuthentication,)


def get_huokan_prices(request):
    sheet = "Leveling"
    output = 'csv'

    gold_dict = {
        "per_level": {
        },
        "bundles": {
        }

    }
    csv_matchup = {
        1: 'range',
        2: 'list_price',
        3: 'booster_cut',
        4: 'advertiser_perc',
        5: 'advertiser_cut',
        6: 'gbank_deposit'
    }

    total_cols = len(csv_matchup)

    url = REQUEST_URL.format(key=HUOKAN_KEY, output=output, sheet_name=sheet, range='c9:i18')

    with urllib.request.urlopen(url) as f:
        csv_data = str(f.read())[:-1]

    return Response()
