import logging

from django.core.management.base import BaseCommand
from dvadmin.demo.models import *

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    """
    项目初始化命令: python manage.py init
    """
    def handle(self, *args, **options):
        book = Book.objects.filter(pk=1).first()
