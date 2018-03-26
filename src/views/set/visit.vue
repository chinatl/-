<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="120px">
	<el-form-item label="专属推广语">
		<el-input v-model="form.name"  placeholder="网站关键字"></el-input>
	</el-form-item>
	<el-form-item label="风险警告">
		<el-input v-model="form.name"  placeholder="填写网站标题"></el-input>
	</el-form-item>
	<el-form-item label="提现金额倍数">
		<el-input v-model="form.name"  placeholder="提现整倍数"></el-input>
	</el-form-item>
	<el-form-item label="网站关键字">
		<el-input type="textarea" v-model="form.desc"></el-input>
	</el-form-item>
	<el-form-item label="网站描述">
		<el-input type="textarea" v-model="form.desc"></el-input>
	</el-form-item>
	 <el-form-item label="弹出警告状态">
		<el-select v-model="form.region" placeholder="首次访问弹出警告" style='width:440px'>
		  <el-option label="正常访问" value="shanghai"></el-option>
		  <el-option label="异常访问" value="beijing"></el-option>
		</el-select>
	  </el-form-item>
	<el-form-item label="弹窗风险警告">
		<el-input type="textarea" v-model="form.desc"></el-input>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="onSubmit">立即创建</el-button>
		<el-button>取消</el-button>
	</el-form-item>
</el-form>
</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>

<style scoped>
	.layout {
		width: 600px;
	}
	
</style>
