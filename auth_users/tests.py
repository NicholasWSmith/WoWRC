from django.test import TestCase
import json
from .busi_logic import *

#  To test this, need to create some dictionaries with a known total to compare.

run1 = {
    'advertiserid': 111,
    'boostersid': {
        'Tank': {
            'boosterid': 112
        },
        'Healer': {
            'boosterid': 113
        },
        'DPS': [
            {
                'boosterid': 114
            },
            {
                'boosterid': 111
            },
        ]
    },
    'details': {
        'Booster Cut': 10,
        'Advertiser Cut': 20,
        'Keyholder Cut': 5
    },
    'Key Holder': {
        'boosterid': 111
    }
}

run2 = {
    'advertiserid': 123,
    'boostersid': {
        'Tank': {
            'boosterid': 112
        },
        'Healer': {
            'boosterid': 1115
        },
        'DPS': [
            {
                'boosterid': 1116
            },
            {
                'boosterid': 1117
            },
        ]
    },
    'details': {
        'Booster Cut': 10,
        'Advertiser Cut': 20,
        'Keyholder Cut': 5
    },
    'Key Holder': {
        'boosterid': 1117
    }
}

run3 = {
    'advertiserid': 123,
    'boostersid': {
        'Tank': {
            'boosterid': 12345
        },
        'Healer': {
            'boosterid': 123456
        },
        'DPS': [
            {
                'boosterid': 54321
            },
            {
                'boosterid': 4321
            },
        ]
    },
    'details': {
        'Booster Cut': 10,
        'Advertiser Cut': 20,
        'Keyholder Cut': 5
    },
    'Key Holder': {
        'boosterid': 12345
    }
}

runs = [run1, run2, run3]

total_values = {
    111: 35,
    112: 20,
    113: 10,
    114: 10,
    123: 40,
    1115: 10,
    1116: 10,
    1117: 15,
    12345: 15,
    123456: 10,
    54321: 10,
    4321: 10
}


# Create your tests here.
class TestPaidRuns(TestCase):
    def test_paid_logic(self):
        data = calculate_paid_total(runs)
        self.assertEqual(data, total_values)
