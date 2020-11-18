import pymongo
from env.constants import *

class mongoDb:

    def __init__(self):
        username = settings.MONGO_USERNAME
        password = settings.MONGO_PASSWORD
        db_url = settings.DB_URL
        db_name = ''
        # "mongodb+srv://childish:<password>@cluster0.kkdqi.mongodb.net/<dbname>?retryWrites=true&w=majority"
        connect_url = 'mongodb+srv://{0}:{1}@{2}/{3}?retryWrites=true&w=majority'.format(
            username,
            password,
            db_url,
            db_name
        )

        client = pymongo.MongoClient(connect_url)
        self.client = client

    def get_client(self):
        return self.client
