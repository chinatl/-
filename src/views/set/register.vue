<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="120px">
	<el-form-item label="允许注册">
		<el-select v-model="form.region" placeholder="网站状态" style='width:440px'>
		  <el-option label="正常注册" value="shanghai"></el-option>
		  <el-option label="非正常注册" value="beijing"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="开启注册赠送">
		<el-select v-model="form.region" placeholder="网站状态" style='width:440px'>
		  <el-option label="禁止" value="shanghai"></el-option>
		  <el-option label="启用" value="beijing"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="注册赠送币种">
		<el-select v-model="form.region" style='width:440px'>
		  <el-option label="群币股" value="shanghai"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="赠送数量">
		<el-input v-model="form.name"  placeholder="赠送数量（赠送给用户自己）"></el-input>
	</el-form-item>  
	<el-form-item label="一代赠送数量">
		<el-input v-model="form.name"  placeholder="一代赠送数量"></el-input>
	</el-form-item>   
	<el-form-item label="二代赠送数量">
		<el-input v-model="form.name"  placeholder="二代赠送数量"></el-input>
	</el-form-item>   
	<el-form-item label="三代赠送数量">
		<el-input v-model="form.name"  placeholder="三代赠送数量"></el-input>
	</el-form-item> 
	<el-form-item label="注册限制IP">
		<el-input type="textarea" v-model="form.desc" placeholader='注册限制IP多用一个"|"分隔'></el-input>
	</el-form-item>
	<el-form-item label="注册限制用户名">
		<el-input type="textarea" v-model="form.desc" placeholader='注册限制用户名多用一个"|"分隔'></el-input>
	</el-form-item>
	<el-form-item label="登录限制IP">
		<el-input type="textarea" v-model="form.desc" placeholader='登录限制用户名多用一个"|"分隔'></el-input>
	</el-form-item>
	<el-form-item label="是否开启图片认证上传">
		<el-select v-model="form.region" style='width:440px' placeholder='是否开启图片认证上传，开启后实名认证部分将出现图片上传部分'>
		  <el-option label="关闭" value="shanghai"></el-option>
		  <el-option label="开启" value="shanghai"></el-option>
		</el-select>
  	</el-form-item>
	<el-form-item label="证件照上传说明">
		<el-input type="textarea" v-model="form.desc" placeholader='证件照上传说明'></el-input>
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
