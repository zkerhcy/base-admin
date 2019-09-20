<template>
  <Layout :style="{'overflow-x': 'hidden'}" class="main">
    <main-header />
    <main-frame frameName="main" />
  </Layout>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import routers from '@/router/routers'
import mainHeader from '@@c/main-header'
import mainFrame from '@@c/main-frame'

export default {
  name: 'Main',
  components: {
    mainHeader,
    mainFrame
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setHomeRoute'
    ]),
    ...mapActions(['getUserInfo']),
    name () {}
  },
  watch: {
    $route (newRoute) {
      this.setBreadCrumb(newRoute)
    }
  },
  created () {
    this.getUserInfo()
    this.setHomeRoute(routers)
    this.setBreadCrumb(this.$route)
  },
  mounted () {
  }
}
</script>
