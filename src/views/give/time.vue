<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="120px">
	<el-form-item label="放行时间：">
		<el-input v-model="form.timeSet"  placeholder="放行时间" type='number'></el-input><span>单位（天）</span>
	</el-form-item>	<!--timeSet 对应修改接口   A  -->
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
                    timeSet: ''//A
                },
                options: []
            }
        },
        created() {
            Get({
                url: 'work/selGivingTime',//接口
                success: res => {
                    this.form = res.data
                }
            })
        },
        methods: {
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
                    url: 'work/updGivingTime', //接口
                    data: {
                        timeSet: this.form.timeSet,//A
                        id:this.form.id
                    },
                    success: res => {
                        if (res.code === 0) {
                            this.$message({
                                message: res.data,
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$message({
                                message: res.data,
                                type: 'error',
                                duration: 2000
                            })
                        }

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
