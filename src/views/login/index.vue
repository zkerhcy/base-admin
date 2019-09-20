<template>
  <div class="login">
    <div class="login-bg"></div>
    <Card class="login-card">
      <div class="logo" slot="title">Base Admin</div>
      <div class="form-con">
        <login-form :logining="logining" @on-success-valid="handleSubmit"></login-form>
      </div>
    </Card>
  </div>
</template>

<script>
import LoginForm from '@c/login-form'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      logining: false
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserAuthMenu']),
    handleSubmit ({ username, password }) {
      this.logining = true
      this.handleLogin({ username, password })
        .then(res => {
          if (res.status === 'success') {
            this.getUserAuthMenu()
              .then(res => {
                this.$router.push({
                  name: this.$config.HOME_PAGE_NAME
                })
              })
              .finally(() => {
                this.logining = false
              })
          }
        })
        .finally(() => {
          this.logining = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  &-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    .logo {
      text-align: center;
      font-size: 32px;
      font-weight: bold;
    }

    .form-con {
      padding: 10px 0 0;
    }
  }
}
</style>
