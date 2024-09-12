import * as api from './api';
import {
    dict,
    UserPageQuery,
    AddReq,
    DelReq,
    EditReq,
    compute,
    CreateCrudOptionsProps,
    CreateCrudOptionsRet
} from '@fast-crud/fast-crud';
import {request} from '/src/utils/service';
import {dictionary} from '/src/utils/dictionary';
import {successMessage} from '/src/utils/message';
import {auth} from '/src/utils/authFunction';
import {SystemConfigStore} from "/src/stores/systemConfig";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import { Md5 } from 'ts-md5';
import {commonCrudConfig} from "/src/utils/commonCrud";
export const createCrudOptions = function ({crudExpose}: CreateCrudOptionsProps): CreateCrudOptionsRet {
    const pageRequest = async (query: UserPageQuery) => {
        return await api.GetList(query);
    };
    const editRequest = async ({form, row}: EditReq) => {
        form.id = row.id;
        return await api.UpdateObj(form);
    };
    const delRequest = async ({row}: DelReq) => {
        return await api.DelObj(row.id);
    };
    const addRequest = async ({form}: AddReq) => {
        return await api.AddObj(form);
    };

    const exportRequest = async (query: UserPageQuery) => {
        return await api.exportData(query)
    }

    const resetToDefaultPasswordRequest = async (row:EditReq)=>{
        await api.resetToDefaultPassword(row.id)
        successMessage("重置密码成功")
    }

    const systemConfigStore = SystemConfigStore()
    const {systemConfig} = storeToRefs(systemConfigStore)
    const getSystemConfig = computed(() => {
        // console.log(systemConfig.value)
        return systemConfig.value
    })



    return {
        crudOptions: {
            table: {
                remove: {
                    confirmMessage: '是否删除该设备？',
                },
            },
            request: {
                pageRequest,
                addRequest,
                editRequest,
                delRequest,
            },
            form: {
                initialForm: {
                    password: computed(() => {
                        return systemConfig.value['base.default_password']
                    }),
                }
            },
            actionbar: {
                buttons: {
                    add: {
                        show: auth('user:Create')
                    },
                    export: {
                        text: "导出",//按钮文字
                        title: "导出",//鼠标停留显示的信息
                        show: auth('user:Export'),
                        click() {
                            return exportRequest(crudExpose!.getSearchFormData())
                        }
                    }
                }
            },
            rowHandle: {
                //固定右侧
                fixed: 'right',
                width: 215,
                buttons: {
                    view: {
                        show: false,
                    },
                    edit: {
                        iconRight: 'Edit',
                        type: 'text',
                        show: auth('user:Update'),
                    },
                    remove: {
                        iconRight: 'Delete',
                        type: 'text',
                        show: auth('user:Delete'),
                    },
                    custom: {
                        text: '远程连接',
                        iconRight: 'Position',
                        type: 'text',
                        show: auth('user:ResetPassword'),
                        tooltip: {
                            placement: 'top',
                            content: '远程连接',
                        },
                        //@ts-ignore
                        click: (ctx: any) => {
                            const {row} = ctx;
                            resetToDefaultPasswordRequest(row)
                        },
                    },
                },
            },
            columns: {
                _index: {
                    title: '序号',
                    form: {show: false},
                    column: {
                        // show: false,
                        type: 'index',
                        align: 'center',
                        width: '70px',
                        columnSetDisabled: true, //禁止在列设置中选择
                    },
                },
                device_name: {
                // username: {
                    title: '设备名称',
                    search: {
                        show: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 150, //最小列宽
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '设备名称必填项',
                            },
                        ],
                        component: {
                            placeholder: '请输入设备名称',
                        },
                    },
                },
                // password: {
                //     title: '密码',
                //     type: 'password',
                //     column: {
                //         show: false,
                //     },
                //     editForm: {
                //         show: false,
                //     },
                //     form: {
                //         rules: [
                //             // 表单校验规则
                //             {
                //                 required: true,
                //                 message: '密码必填项',
                //             },
                //         ],
                //         component: {
                //
                //             span: 12,
                //             showPassword: true,
                //             placeholder: '请输入密码',
                //         },
                //     },
                //     valueResolve({form}) {
                //         if (form.password) {
                //             form.password = Md5.hashStr(form.password)
                //         }
                //     }
                // },
                cpu: {
                    title: 'CPU',
                    search: {
                        show: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 100, //最小列宽
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: 'CPU',
                            },
                        ],
                        component: {
                            span: 12,
                            placeholder: '请输入姓名',
                        },
                    },
                },
                mem: {
                    title: '内存',
                    search: {
                        disabled: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 150, //最小列宽
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: {
                            filterable: true,
                            placeholder: '请选择',
                            props: {
                                checkStrictly:true,
                                props: {
                                    value: 'id',
                                    label: 'name',
                                },
                            },
                        },
                    },
                },
                ip_address: {
                    title: 'IP地址',
                    search: {
                        disabled: true,
                    },
                    type: 'input',
                    column: {
                        minWidth: 100, //最小列宽
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: {
                            multiple: true,
                            filterable: true,
                            placeholder: '请选择角色',
                        },
                    },
                },
                node: {
                    title: '所属节点',
                    search: {
                        disabled: true,
                    },
                    type: 'dict-tree',
                    dict: dict({
                        isTree: true,
                        url: '/api/cmdb/node/',
                        value: 'id',
                        label: 'name'
                    }),
                    column: {
                        minWidth: 150, //最小列宽
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: {
                            filterable: true,
                            placeholder: '请选择',
                            props: {
                                checkStrictly:true,
                                props: {
                                    value: 'id',
                                    label: 'name',
                                },
                            },
                        },
                    },
                },
                // ...commonCrudConfig({
                //     dept_belong_id: {
                //         form: true,
                //         table: true
                //     }
                // })
            },
        },
    };
};
