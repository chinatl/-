<template>
<div class="user-vip">
	<tl-table 
		:headData ='head_data'
		:formData ='form_data'
		:tableData ='table_data'
		:urlData ='url'
	></tl-table>
</div>
</template>

<script>
    import tlTable from '@/components/Table';
    export default {
        components: {
            tlTable
        },
        data() {
            return {
                head_data: [{
                    type: 'add'
                }],
                form_data: [{
                    label: 'vip等级',
                    prop: 'viplevel',
                    type: 'select',
                    default: 'vip0',
                    options: [{
                        id: 'vip0',
                        value: 'vip0'
                    }, {
                        id: 'vip1',
                        value: 'vip1'
                    }, {
                        id: 'vip2',
                        value: "vip2"
                    }, {
                        id: 'vip3',
                        value: "vip3"
                    }]
                }, {
                    label: '交易总消费金额',
                    prop: 'socre',
                }, {
                    label: '交易手续费折扣',
                    prop: 'tradingPoundageDiscount',
                }, {
                    label: '提现手续费折扣',
                    prop: 'reflectPoundageDiscount',
                }],
                table_data: [{
                    label: 'vip等级',
                    prop: 'viplevel'
                }, {
                    label: '用户余额',
                    prop: 'socre'
                }, {
                    label: '交易手续费折扣',
                    prop: 'tradingPoundageDiscount',
                }, {
                    label: '提现手续费折扣',
                    prop: 'reflectPoundageDiscount',
                }, {
                    label: '操作',
                    type: 'action',
                    width: 150
                }],
                url: {
                    search: {
                        url: 'vip/findallvipuser',
                        params: {

                        },
                    },
                    add: {
                        url: 'vip/addvipuser',
                        params: [{
                            name: 'viplevel',
                        }, {
                            name: 'socre',
                        }, {
                            name: 'tradingPoundageDiscount',
                        }, {
                            name: 'reflectPoundageDiscount',
                        }]
                    },
                    update: {
                        url: 'vip/updatevipuserbyid',
                        params: [{
                            name: 'id',
                        }, {
                            name: 'viplevel',
                        }, {
                            name: 'socre',
                        }, {
                            name: 'tradingPoundageDiscount',
                        }, {
                            name: 'reflectPoundageDiscount',
                        }]
                    },
                    update_status: {
                        url: 'vip/updateisStart',
                        params: [{
                            name: 'id',
                        }, {
                            name: 'viplevel',
                        }],
                        query: 'viplevel'
                    },
                    del: {
                        url: 'vip/deletevipuserbyid',
                        params: [{
                            name: 'id',
                        }]
                    },
                    find: {
                        url: 'vip/findAllById',
                        params: [{
                            name: 'viplevel',
                        }],
                        data: 'viplevel',
                        query: 'viplevel',
                    }
                }
            }
        }
    }

</script>

<style>
    .user-vip .el-form-item__content>.el-input:before {
        content: '单价（CNY）';
        position: absolute;
        top: 0;
        right: -110px
    }

</style>
