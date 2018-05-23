<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF" >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import SidebarItem from './SidebarItem'
    import ScrollBar from '@/components/ScrollBar'

    export default {
        components: {
            SidebarItem,
            ScrollBar
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            routes() {
                if (this.$store.state.menu.length === 0) {
                    return
                }

                var arr = this.$router.options.routes.slice(3, 15);
                for (var i = 0; i < arr.length; i++) {
                    arr[i].hidden = !this.$store.state.menu[i].showOrHide;
                    for (var j = 0; j < arr[i].children.length; j++) {
                        arr[i].children[j].hidden = !this.$store.state.menu[i].lf[j].showOrHide;
                    }
                }
                return this.$router.options.routes
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        },
    }

</script>
