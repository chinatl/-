<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="120px">
	<el-form-item label="工作日">
		<el-input v-model="form.name"  placeholder="工作时间例如：9:00-18:00"></el-input>
	</el-form-item>
	<el-form-item label="节假日">
		<el-input v-model="form.name" placeholder="节假日时间例如：9:00-18:00"></el-input>
	</el-form-item>
	<el-form-item label="联系QQ">
		<el-input v-model="form.name" placeholder="联系QQ多用一个'|'分割"></el-input>
	</el-form-item>
	<el-form-item label="联系电话">
		<el-input v-model="form.name"  placeholder="联系电话多用一个'|'分割"></el-input>
	</el-form-item>
	<el-form-item label="联系微博">
		<el-input v-model="form.name" placeholder="联系微博"></el-input>
	</el-form-item>
	<el-form-item label="联系QQ群">
		<el-input v-model="form.name" placeholder="联系QQ群多用一个'|'分割"></el-input>
	</el-form-item>
	<el-form-item label="联系微信">
		<el-input v-model="form.name" placeholder="联系微信100px*100px"></el-input>
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
