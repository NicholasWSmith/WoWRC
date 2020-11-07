from django.shortcuts import render

# Create your views here.
from rest_framework import authentication, status
from rest_auth.views import LogoutView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
import urllib.request
import json
import csv
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer
import os

HUOKAN_SHEET_URL = 'https://docs.google.com/spreadsheets/d/155thp4_gWSQN8A8T-kqdxpBkLeueWPUXd3IUG62iMwQ'

REQUEST_URL = "https://docs.google.com/spreadsheets/d/{key}/gviz/tq?tqx=out:{output}&sheet={sheet_name}&range={range}"

HUOKAN_KEY = "155thp4_gWSQN8A8T-kqdxpBkLeueWPUXd3IUG62iMwQ"


class LogoutViewEx(LogoutView):
    authentication_classes = (authentication.TokenAuthentication,)


@api_view(('GET',))
@renderer_classes((JSONRenderer,))
@permission_classes((AllowAny,))
def get_huokan_prices(request):
    sheet = "Leveling"
    output = 'csv'

    gold_dict = {
        "vip": {
            "per_level": {
            },
            "bundles": {
            }
        },
        "scheduled": {
            "bundles": {

            }
        }

    }
    csv_matchup = {
        2: 'list_price',
        3: 'booster_cut',
        4: 'advertiser_perc',
        5: 'advertiser_cut',
        6: 'gbank_deposit'
    }

    total_rows = 14

    url = REQUEST_URL.format(key=HUOKAN_KEY, output=output, sheet_name=sheet, range='c10:i26')

    with urllib.request.urlopen(url) as f:
        csv_data = str(f.read())[:-1]

    csv_data = csv_data.replace('b', "")
    csv_data = csv_data.replace('"', "")
    csv_data = csv_data.replace('\\n', ",")
    csv_data_array = csv_data.split(',')

    # First 4 are per level, last 4 are bundles.
    for i in range(0, total_rows):
        current_data = csv_data_array[:7]
        csv_data_array = csv_data_array[7:]
        key = current_data[0].replace('\'', '')
        line = {}
        for item in csv_matchup:
            line[csv_matchup[item]] = current_data[item]
        if i <= 3:
            gold_dict['vip']['per_level'][key] = line
        elif 4 <= i <= 8:
            gold_dict['vip']['bundles'][key] = line
        else:
            gold_dict['scheduled']['bundles'][key] = line

    return Response(gold_dict, status=status.HTTP_200_OK)


@api_view(('GET',))
@renderer_classes((JSONRenderer,))
@permission_classes((AllowAny,))
def get_discord_url(request):
    DISC_CLIENT_ID = os.environ.get('DISC_CLIENT_ID', None)
    DISC_SECRET_ID = os.environ.get('DISC_SECRET_ID', None)
    # https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    discord_url = ('https://discord.com/api/oauth2/authorize?client_id={}'
                   '&redirect_uri=https%3A%2F%2Fwowrostercreator.herokuapp.com%2Fdiscord_redirect&response_type=code'
                   '&scope=identify%20guilds').format(DISC_CLIENT_ID)
    return Response(discord_url, status=status.HTTP_200_OK)
