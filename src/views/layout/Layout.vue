<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
		<div class="loading" v-show='$store.state.loading.loading'>
			<img :src="loading" alt="">
		</div>
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
	import {
		Navbar,
		Sidebar,
		AppMain
	} from '@/views/layout/components'
	import Loading from '@/assets/404_images/loading.gif'
	export default {
		name: 'layout',
		components: {
			Navbar,
			Sidebar,
			AppMain
		},
		data() {
			return {
				loading: Loading
			}
		},
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			}
		}
	}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
	}
	
	.loading {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, .6);
		top: 0;
		left: 180px;
		right: 0;
		bottom: 0;
		z-index: 9999
	}

</style>
