# @Author  : yuanzi
# @Time    : 2024/8/11 10:32
# Website: https://www.yzgsa.com
# Copyright (c) <yuanzigsa@gmail.com>

from dvadmin.cmdb.models import *
from dvadmin.utils.serializers import CustomModelSerializer


class CrudDemoModelSerializer(CustomModelSerializer):
    """
    序列化器
    """
# 这里是进行了序列化模型及所有的字段
    class Meta:
        model = CrudDemoModel
        fields = "__all__"


# 这里是创建/更新时的列化器
class CrudDemoModelCreateUpdateSerializer(CustomModelSerializer):
    """
    创建/更新时的列化器
    """

    class Meta:
        model = CrudDemoModel
        fields = '__all__'


class NodeModelSerializer(CustomModelSerializer):
    """
    序列化器
    """
# 这里是进行了序列化模型及所有的字段
    class Meta:
        model = NodeModel
        fields = "__all__"


# 这里是创建/更新时的列化器
class NodeModelCreateUpdateSerializer(CustomModelSerializer):
    """
    创建/更新时的列化器
    """

    class Meta:
        model = NodeModel
        fields = '__all__'