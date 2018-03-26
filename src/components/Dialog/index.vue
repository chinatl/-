<template>

</template>

<script>
	export default {
		data(){
			return {
				dialogFormVisible:true,
			}
		},
		props:["title","label_width","list","show_dialog"],
		methods:{
			updateData(){
				this.$emit('submit',this.data.children)
			}
		}
	}
</script>
<style>
	.el-dialog__body {
		padding: 30px 0px;
	}
</style>
