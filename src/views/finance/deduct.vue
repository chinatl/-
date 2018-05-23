<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="120px">
	<el-form-item label="uid：">
		<el-input v-model="form.nickName"  placeholder="请输入uid"></el-input>
	</el-form-item>
 	<el-form-item label="币种：">
		<el-select v-model="form.vName" style='width:440px' placeholder="请输入币种">
				<el-option
				  v-for="item in options"
				  :key="item.id"
				  :label="item.shortName"
				  :value="item.id">
				</el-option>
		</el-select>
	 </el-form-item>
	
	<el-form-item label="数量：">
		<el-input v-model="form.number"  placeholder="请输入数量" type='number'></el-input>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="onSubmit">确定</el-button>
		<el-button>取消</el-button>
	</el-form-item>
</el-form>
</div>
</template>

<script>
    import Get from '@/api/get.js'
    import Post from '@/api/post.js'
    export default {
        data() {
            return {
                form: {
                    number: ''
                },
                options: []
            }
        },
        created() {
            Get({
                url: 'currencyManagement/findAll',
                data: {
                    pageSize:500
                },
                success: res => {
                    this.options = res.data;
                }
            })
        },
        methods: {
            onSubmit() {
                for (var k in this.form) {
                    if (!this.form) {
                        this.$message({
                            message: '数据不完整！',
                            type: 'error',
                            duration: 2000
                        })
                        return
                    }
                }
                Get({
                    url: 'log/findIdByuid',
                    data: {
                        uid: this.form.nickName,
                    },
                    success: res => {
                        if (res.code !== 0) {
                            this.$message({
                                message: res.data,
                                type: 'error',
                                duration: 3000
                            })
                            return
                        }
                        var userId = res.data;
                        Post({
                            url: 'virtualWallet/updatevTotal',
                            data: {
                                vTotal: this.form.number,
                                virtualId: this.form.vName,
                                userId: userId,
                            },
                            success: res => {
                                if (res.code !== 0) {
                                    this.$message({
                                        message: res.data,
                                        type: 'error',
                                        duration: 2000
                                    })
                                    return
                                }
                                this.form.vName = '';
                                this.form.nickName = '';
                                this.form.number = '';
                                this.$notify({
                                    title: '成功',
                                    message: '充值成功！',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        })
                    }
                })
            }
        }
    }

</script>

<style scoped>
    .layout {
        width: 600px;
    }

</style>
