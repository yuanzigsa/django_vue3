from django.db import models
from dvadmin.utils.models import CoreModel


class NodeModel(CoreModel):
    name = models.CharField(max_length=255, verbose_name="节点名称")
    bandwitch = models.CharField(null=True, max_length=255, verbose_name="带宽")
    status = models.BooleanField(default=True, verbose_name="状态")
    address = models.TextField(null=True, verbose_name="机房地址")

    class Meta:
        db_table = "cmdb_node"
        verbose_name = '节点表'
        verbose_name_plural = verbose_name
        ordering = ('-create_datetime',)

    def __str__(self):
        return self.name


class CrudDemoModel(CoreModel):
    device_name = models.CharField(max_length=255, verbose_name="设备名称")
    cpu = models.CharField(max_length=255, verbose_name="CPU")
    mem = models.CharField(max_length=255, verbose_name="内存")
    ip_address = models.CharField(max_length=255, verbose_name="IP地址")
    node = models.ForeignKey(NodeModel, on_delete=models.CASCADE, verbose_name="所属节点")

    class Meta:
        db_table = "cmdb_device"
        verbose_name = '设备表'
        verbose_name_plural = verbose_name
        ordering = ('-create_datetime',)

    def save(self, *args, **kwargs):
        # 检查节点是否存在，如果不存在，则创建新的节点
        if isinstance(self.node, str):  # 检查是否为字符串（新节点的名称）
            node_name = self.node
            node, created = NodeModel.objects.get_or_create(name=node_name)
            self.node = node
        super().save(*args, **kwargs)
