<template>
  <transition name="fade" mode="out-in">
      <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'user',
  computed: {
    /*cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }*/
  }
}
</script>