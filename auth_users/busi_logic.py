def calculate_paid_total(runs):
    data = {}

    #  Loop through all runs and grab the id's.
    #  Grab payments, and add them to the dict.
    for run in runs:
        keys = data.keys()
        ids = []
        ids.append(run['advertiserid'])
        ids.append(run['boostersid']['Tank']['boosterid'])
        ids.append(run['boostersid']['Healer']['boosterid'])
        ids.append(run['boostersid']['DPS'][0]['boosterid'])
        ids.append(run['boostersid']['DPS'][1]['boosterid'])

        booster_cut = float(run['details']['Booster Cut'])
        advertiser_cut = float(run['details']['Advertiser Cut'])
        kh_cut = float(run['details']['Keyholder Cut'])

        for index, b_id in enumerate(ids):
            if b_id in keys:
                if index == 0:
                    data[b_id] += advertiser_cut
                elif index in [1, 2, 3, 4]:
                    data[b_id] += booster_cut
            else:
                data[b_id] = 0.0
                if index == 0:
                    data[b_id] += advertiser_cut
                elif index in [1, 2, 3, 4]:
                    data[b_id] += booster_cut

        kh = run.get('Key Holder', None)

        if kh is not None:
            kh_id = kh['boosterid']
            data[kh_id] += kh_cut

    return data
