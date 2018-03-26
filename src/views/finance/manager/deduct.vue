<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="120px">
 <el-form-item label="币种：">
		<el-select v-model="form.vName" style='width:440px'>
				<el-option
				  v-for="item in options"
				  :key="item.id"
				  :label="item.vName"
				  :value="item.vName">
				</el-option>
		</el-select>
	  </el-form-item>
	<el-form-item label="用户名：">
		<el-input v-model="form.nickName"  placeholder="请输入用户名"></el-input>
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
		name: 'defuct',
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
				success: res => {
					this.options = res.data;
				}
			})
		},
		methods: {
			onSubmit() {
				Get({
					url: 'virtualWallet/findvTotal',
					data: {
						vName: this.form.vName,
						nickName: this.form.nickName,
					},
					success: res => {
						if (res.data.vTotal < this.form.number) {
							this.$message({
								title: '成功',
								message: '扣钱失败！用户余额不足',
								type: 'error',
								duration: 2000
							})
							return 
						}
						Get({
							url: 'virtualWallet/findvTotal',
							data: {
								vTotal: res.data.vTotal - this.form.number,
								virtualId: res.data.virtualId,
								userId: res.data.userId,
							},
							success: res => {
								this.form.vName = '';
								this.form.nickName = '';
								this.form.number = '';
								this.$notify({
									title: '成功',
									message: '扣钱成功！',
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
