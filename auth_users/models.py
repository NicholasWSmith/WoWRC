from django.db import models
from custom_user.models import AbstractEmailUser
import uuid


class User(AbstractEmailUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    avatar_url = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'auth_users'

    def __str__(self):
        return self.email
