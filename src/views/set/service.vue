<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="120px">
	<el-form-item label="工作日：">
		<el-input v-model="form.workingDay"  placeholder="工作时间例如：9:00-18:00"></el-input>
	</el-form-item>
	<el-form-item label="节假日：">
		<el-input v-model="form.restDay"  placeholder="节假日时间例如：9:00-18:00"></el-input>
	</el-form-item>
	<el-form-item label="联系QQ：">
		<el-input v-model="form.qq"  placeholder="qq"></el-input>
	</el-form-item>
	<el-form-item label="联系电话：">
		<el-input v-model="form.phone"  placeholder="联系电话多用一个'|'分割"></el-input>
	</el-form-item>
	<el-form-item label="联系微博：">
		<el-input v-model="form.microBlog"  placeholder="联系微博"></el-input>
	</el-form-item>
 	<el-form-item label="联系QQ群：">
 	    <el-input v-model="form.qqGroup"  placeholder="qq群"></el-input>
	 </el-form-item>
	
	<el-form-item label="联系微信：">
		<el-input v-model="form.wechat"  placeholder="联系微信"></el-input>
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
                    workingDay: '',
                    restDay: '',
                    qq: '',
                    phone: '',
                    microBlog: '',
                    qqGroup: '',
                    wechat: '',
                },
                options: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Get({
                    url: 'work/selWork',
                    success: res => {
                        this.form = res.data
                    }
                })
            },
            onSubmit() {
                //                this.$store.state.loading.loading = true;
                for (var k in this.form) {
                    if (!this.form[k]) {
                        this.$message({
                            message: '数据不完整！',
                            type: 'error',
                            duration: 2000
                        })
                        return
                    }
                }
                Post({
                    url: 'work/updWork',
                    data: {
                        id: this.form.id,
                        workingDay: this.form.workingDay,
                        restDay: this.form.restDay,
                        qq: this.form.qq,
                        phone: this.form.phone,
                        microBlog: this.form.microBlog,
                        qqGroup: this.form.qqGroup,
                        wechat: this.form.wechat,
                    },
                    success: res => {
                        //                        this.$store.state.loading.loading = false;
                        if (res.code === 0) {
                            this.init()
                            this.$message({
                                title: '成功',
                                message: '创建成功！',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$message({
                                title: '成功',
                                message: '创建成功！',
                                type: 'success',
                                duration: 2000
                            })
                        }

                    },
                    fail: res => {
                        //                        this.$store.state.app.loading = false;
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
