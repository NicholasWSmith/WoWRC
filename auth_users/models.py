from django.db import models
import uuid


class UserDiscord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=25, unique=True)
    discord_id = models.CharField(max_length=25, unique=True)

    faction = models.CharField(max_length=25, blank=False)
    region = models.CharField(max_length=25, blank=False)

    def __str__(self):
        return "User with id : " + str(self.user_id) + " has discord id : " + str(self.discord_id) + "" \
               " in region : " + str(self.region) + " on faction : " + str(self.faction) + '.'
