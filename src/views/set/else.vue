<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="200px">
	<el-form-item label="安全异常接收手机" placeholder="发现安全异常接收短信的手机">
		<el-input v-model="form.name"></el-input>
	</el-form-item> 
	<el-form-item label="是否开启手机接收异常推送">
		<el-select v-model="form.region" placeholder="需要下载硕科技安全提醒助手" style='width:360px'>
		  <el-option label="关闭" value="shanghai"></el-option>
		  <el-option label="开启" value="beijing"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="总资产排名显示数量">
		<el-select v-model="form.region" placeholder="可在导航里添加/jhk/hj访问页面" style='width:360px'>
		  <el-option label="10" value="shanghai"></el-option>
		  <el-option label="20" value="beijing"></el-option>
		  <el-option label="30" value="beijing"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="新用户注册交易限制">
		<el-select v-model="form.region" placeholder="新注册用户是否需要审核才能交易，可在用户管理里边进行审核" style='width:360px'>
		  <el-option label="需要" value="shanghai"></el-option>
		  <el-option label="不需要" value="beijing"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="推荐链接默认访问页面">
		<el-select v-model="form.region" placeholder="设置用户点击推荐链接默认访问那个页面" style='width:360px'>
		  <el-option label="注册页面" value="shanghai"></el-option>
		  <el-option label="登录页面" value="beijing"></el-option>
		  <el-option label="系统页面" value="beijing"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="新注册是否必须填写推荐码">
		<el-select v-model="form.region" placeholder="需要下载硕科技安全提醒助手" style='width:360px'>
		  <el-option label="可选" value="shanghai"></el-option>
		  <el-option label="必选" value="beijing"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="默认模板首页显示认购部分">
		<el-select v-model="form.region" placeholder="需要下载硕科技安全提醒助手" style='width:360px'>
		  <el-option label="显示" value="shanghai"></el-option>
		  <el-option label="不显示" value="beijing"></el-option>
		</el-select>
  	</el-form-item>
	<el-form-item label="头部文字" placeholder="头部文字备用">
		<el-input v-model="form.name"></el-input>
	</el-form-item> 
	<el-form-item label="域名转入提示" placeholder="填写备案号">
		<el-input v-model="form.name"></el-input>
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
