import { CrudOptions, AddReq, DelReq, EditReq, dict, CrudExpose, UserPageQuery, CreateCrudOptionsRet} from '@fast-crud/fast-crud';
import _ from 'lodash-es';
import * as api from './api';
import { request } from '/@/utils/service';
import {auth} from "/@/utils/authFunction";

//此处为crudOptions配置
export default function ({ crudExpose}: { crudExpose: CrudExpose}): CreateCrudOptionsRet {
	const pageRequest = async (query: any) => {
		return await api.GetList(query);
	};
	const editRequest = async ({ form, row }: EditReq) => {
		if (row.id) {
			form.id = row.id;
		}
		return await api.UpdateObj(form);
	};
	const delRequest = async ({ row }: DelReq) => {
		return await api.DelObj(row.id);
	};
	const addRequest = async ({ form }: AddReq) => {
		return await api.AddObj(form);
	};

    const exportRequest = async (query: UserPageQuery) => {
		return await api.exportData(query)
	};

	return {
		crudOptions: {
			request: {
				pageRequest,
				addRequest,
				editRequest,
				delRequest,
			},
			actionbar: {
				buttons: {
						export:{
                            // 注释编号:django-vue3-admin-crud210716:注意这个auth里面的值，最好是使用index.vue文件里面的name值并加上请求动作的单词
                            show: auth('CrudDemoModelViewSet:Export'),
							text:"导出",//按钮文字
							title:"导出",//鼠标停留显示的信息
                            click(){
                                return exportRequest(crudExpose.getSearchFormData())
								// return exportRequest(crudExpose!.getSearchFormData())    // 注意这个crudExpose!.getSearchFormData()，一些低版本的环境是需要添加!的
                            }
                        },
                        add: {
                            show: auth('CrudDemoModelViewSet:Create'),
                        },
				}
			},
            rowHandle: {
                //固定右侧
                fixed: 'right',
                width: 200,
                buttons: {
                    view: {
                        type: 'text',
						order: 1,
                        show: auth('CrudDemoModelViewSet:Retrieve')
                    },
                    edit: {
                        type: 'text',
						order: 2,
						show: auth('CrudDemoModelViewSet:Update')
                    },
					copy: {
                        type: 'text',
						order: 3,
						show: auth('CrudDemoModelViewSet:Copy')
                    },
                    remove: {
                        type: 'text',
						order: 4,
						show: auth('CrudDemoModelViewSet:Delete')
                    },
                },
            },
			columns: {
				goods: {
					title: '设备名称',
					type: 'input',
					search: { show: true},
					column: {
						minWidth: 120,
						sortable: 'custom',
					},
					form: {
						helper: {
							render() {
								return <div style={"color:blue"}>商品是必需要填写的</div>;
								}
							},
						rules: [{ required: true, message: '商品名称必填' }],
						component: {
							placeholder: '请输入商品名称',
						},
					},
				},
                inventory: {
					title: '设备数量',
					type: 'number',
					search: { show: false },
					column: {
						minWidth: 120,
						sortable: 'custom',
					},
					form: {
						rules: [{ required: true, message: '库存量必填' }],
						component: {
							placeholder: '请输入库存量',
						},
					},
				},

                goods_price: {
					title: '操作系统',
					type: 'text',
					search: { show: false },
					column: {
						minWidth: 120,
						sortable: 'custom',
					},
					form: {
						rules: [{ required: true, message: '商品定价必填' }],
						component: {
							placeholder: '请输入商品定价',
						},
					},
				},
                purchase_goods_date: {
                    title: '所属机房',
					type: 'date',
					search: { show: false },
                    form: {
                    // rules: [{ required: true, message: '进货时间必填' }],
                      component: {
                            //显示格式化
                            format: "YYYY-MM-DD",
                            //输入值格式
                            valueFormat: "YYYY-MM-DD",
                            placeholder: '请输入进货时间',
                      }
                    },
                    column: {
                      align: "center",
                      width: 120,
                      component: { name: "fs-date-format", format: "YYYY-MM-DD" }
                    }
                  },
					jigui: {
                    title: '所属机柜',
					type: 'date',
					search: { show: false },
                    form: {
                    // rules: [{ required: true, message: '进货时间必填' }],
                      component: {
                            //显示格式化
                            format: "YYYY-MM-DD",
                            //输入值格式
                            valueFormat: "YYYY-MM-DD",
                            placeholder: '请输入进货时间',
                      }
                    },
                    column: {
                      align: "center",
                      width: 120,
                      component: { name: "fs-date-format", format: "YYYY-MM-DD" }
                    }
                  },

			},
		},
	};
}