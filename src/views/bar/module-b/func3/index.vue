<template>
  <div>path: {{path}}</div>
</template>

<script>
export default {
  name: 'func3',
  data () {
    return {}
  },
  computed: {
    path () {
      return this.$store.state.route.path
    }
  }
}
</script>

<style lang="less" scoped>
</style>
