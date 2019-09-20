<template>
  <Layout :style="{ height: height + 'px','overflow': 'hidden'}">
    <Sider
      :collapsed-width="64"
      :style="{overflow: 'hidden'}"
      :width="230"
      class="left-sider"
      collapsible
      hide-trigger
      v-model="collapsed"
    >
      <side-menu
        :active-name="$route.name"
        :collapsed="collapsed"
        :menu-list="menuList"
        @on-select="turnToPage"
        accordion
        ref="sideMenu"
      ></side-menu>
    </Sider>
    <div class="v-line"></div>
    <Layout :style="{ height: height + 'px' }" class="main-layout" id="main-layout">
      <div style="flex: 0 0 auto; padding: 4px 8px;">
        <sider-trigger :collapsed="collapsed" @on-change="handleCollpasedChange" icon="md-menu"></sider-trigger>
        <custom-bread-crumb :list="breadCrumbList" show-icon style="margin-left: 12px;"></custom-bread-crumb>
      </div>
      <div class="h-line"></div>
      <router-view style="padding-top: 8px;"></router-view>
    </Layout>
  </Layout>
</template>

<script>
import siderTrigger from '@c/sider-trigger'
import customBreadCrumb from '@c/custom-bread-crumb'
import SideMenu from '@c/side-menu'
import { on, off } from '@/lib/tools'
import mixin from '@/lib/mixin'
export default {
  mixins: [mixin],
  components: {
    siderTrigger,
    customBreadCrumb,
    SideMenu
  },
  data () {
    return {
      openedNames: [],
      collapsed: false,
      height: 0
    }
  },
  props: {
    // 顶部菜单子路由名称
    frameName: {
      type: String
    }
  },
  methods: {
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollpasedChange (state) {
      this.collapsed = state
    },
    setHeight () {
      this.height = document.getElementById('app').clientHeight - 60
    }
  },
  computed: {
    menuList () {
      const menuList = this.$store.getters.menuList.filter(
        item => item.name === this.frameName
      )
      return menuList.length > 0 ? menuList[0].children : []
    },
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  mounted () {
    on(window, 'resize', this.setHeight)
    this.$nextTick(() => {
      this.setHeight()
    })
  },
  beforeDestroy: function () {
    off(window, 'resize', this.setHeight)
  }
}
</script>

<style lang="less"  scoped>
.main-layout {
  #cs.main-layout-bg();
}
.left-sider {
  /deep/ .ivu-layout-sider-children {
    overflow-y: scroll;
    margin-right: -18px;
  }
}
</style>
