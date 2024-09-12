from django.shortcuts import render
from dvadmin.cmdb.models import *
from dvadmin.cmdb.serializers import *
from dvadmin.utils.viewset import CustomModelViewSet


class DeviceModelViewSet(CustomModelViewSet):
    """
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = CrudDemoModel.objects.all()
    serializer_class = CrudDemoModelSerializer
    create_serializer_class = CrudDemoModelCreateUpdateSerializer
    update_serializer_class = CrudDemoModelCreateUpdateSerializer


class NodeModelViewSet(CustomModelViewSet):
    queryset = NodeModel.objects.all()
    serializer_class = NodeModelSerializer
    create_serializer_class = NodeModelCreateUpdateSerializer
    update_serializer_class = NodeModelCreateUpdateSerializer

