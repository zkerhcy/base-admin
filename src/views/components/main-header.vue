<template>
  <div id="main-header">
    <div class="logo">LOGO</div>
    <div class="title">Base Admin</div>
    <user-center :user-avator="userAvatar" class="user-center" />
  </div>
</template>

<script>
import userCenter from '@@c/user-center'
export default {
  components: {
    userCenter
  },
  data () {
    return {}
  },
  computed: {
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    }
  }
}
</script>

<style lang="less" scoped>
#main-header {
  display: flex;
  align-items: center;
  height: 60px;
  color: white;
  background: linear-gradient(@primary-color, fade(@primary-color, 75%));
  .logo {
    width: 194px;
    height: 100%;
    zoom: 0.9;
    text-align: center;
    line-height: 60px;
  }
  .title {
    margin-left: 16px;
    font-size: 28px;
    font-weight: bold;
  }
  .user-center {
    margin-left: auto;
    margin-right: 16px;
  }
}
</style>
