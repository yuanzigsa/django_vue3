# @Author  : yuanzi
# @Time    : 2024/8/11 10:20
# Website: https://www.yzgsa.com
# Copyright (c) <yuanzigsa@gmail.com>

from rest_framework.routers import SimpleRouter
from dvadmin.cmdb.views import *

router = SimpleRouter()
router.register("device", DeviceModelViewSet)
router.register("node", NodeModelViewSet)

urlpatterns = [
]
urlpatterns += router.urls