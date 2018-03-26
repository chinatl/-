<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: 'app'
	}

</script>

<style>
	.layout {
		padding: 20px
	}
	
	.page_size {
		margin-top: 12px
	}
	
	.el-pagination {
		float: right
	}

</style>
