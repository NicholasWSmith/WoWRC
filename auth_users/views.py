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
from django.conf import settings
from .busi_logic import *
from .serializers import *
from bson.objectid import ObjectId

HUOKAN_SHEET_URL = 'https://docs.google.com/spreadsheets/d/155thp4_gWSQN8A8T-kqdxpBkLeueWPUXd3IUG62iMwQ'

REQUEST_URL = "https://docs.google.com/spreadsheets/d/{key}/gviz/tq?tqx=out:{output}&sheet={sheet_name}&range={range}"

HUOKAN_KEY = "155thp4_gWSQN8A8T-kqdxpBkLeueWPUXd3IUG62iMwQ"

try:
    from env.constants import *

    DISC_CLIENT_ID = os.environ.get('DISC_CLIENT_ID', DISC_C_ID)
    DISC_SECRET_ID = os.environ.get('DISC_SECRET_ID', DISC_SECRET)
except Exception as e:
    DISC_CLIENT_ID = os.environ.get('DISC_CLIENT_ID')
    DISC_SECRET_ID = os.environ.get('DISC_SECRET_ID')


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
    # https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`

    discord_url = ('https://discord.com/api/oauth2/authorize?client_id={}'
                   '&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcreate'
                   '&response_type=token'
                   '&scope=identify%20guilds').format(DISC_CLIENT_ID)

    return Response(discord_url, status=status.HTTP_200_OK)


import json
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@api_view(('GET',))
@renderer_classes((JSONRenderer,))
@permission_classes((AllowAny,))
def get_discord_user_roles(request, discord_id):
    horde_db = settings.CLIENT['us-horde']
    ally_db = settings.CLIENT['us-alliance']

    player = horde_db.players.find({'discordid': int(discord_id)})
    player_data = {}

    if player.count() > 0:
        player_data = player[0]
    else:
        player = ally_db.players.find({'discordid': int(discord_id)})

    if player.count() > 0:
        player_data = player[0]

    if player.count() == 0:
        return Response("Unable to find user", status=status.HTTP_404_NOT_FOUND)

    return Response(player_data['DiscordRole'], status=status.HTTP_200_OK)


def to_object_id(id):
    return ObjectId(id)


@api_view(('GET', 'POST',))
@renderer_classes((JSONRenderer,))
@permission_classes((AllowAny,))
def get_post_total_pending_paid(request):
    paid_runs_db = settings.CLIENT['PaidRuns']

    if request.method == "GET":
        runs = paid_runs_db.MythicPlus.find()

        total_paid = calculate_paid_total(runs)

        return Response(total_paid, status=status.HTTP_200_OK)

    elif request.method == "POST":
        paid_ids = request.data.get('id_list')

        obj_ids = map(to_object_id, paid_ids)

        runs = paid_runs_db.find({'_id': {'$in': obj_ids}})

        total_paid = calculate_paid_total(runs)

        return Response(total_paid, status=status.HTTP_200_OK)