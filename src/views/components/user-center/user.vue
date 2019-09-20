<template>
  <div class="user-avatar-dropdown">
    <Dropdown
      :transfer="false"
      :visible="dropdownVisible"
      @on-click="handleClick"
      @on-clickoutside="handleClickOutside"
      trigger="custom"
    >
      <Avatar :src="userAvatar" @click="dropdownVisible = true" />
      <Badge :dot="!!messageUnreadCount">
        <div @click="dropdownVisible = true" class="username">{{userName}}</div>
      </Badge>
      <Icon :size="18" @click="dropdownVisible = true" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          <Icon type="md-chatboxes" style="margin-right: 4px;" />消息中心
          <Badge :count="messageUnreadCount" style="margin-left: 4px"></Badge>
        </DropdownItem>
        <Poptip @on-cancel="dropdownVisible = false" @on-ok="logout" confirm title="确定退出登录？">
          <DropdownItem name="logout">
            <Icon type="md-exit" style="margin-right: 4px;" />退出登录
          </DropdownItem>
        </Poptip>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import avatar from '@icon/avatar.png'
export default {
  name: 'UserCenter',
  data () {
    return {
      dropdownVisible: false,
      logoutConfirm: false
    }
  },
  props: {
    userAvatar: {
      type: String,
      default: avatar
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.userName || '未设置姓名'
    },
    messageUnreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    ...mapActions(['handleLogOut']),
    logout () {
      this.$Message.loading({
        content: '正在退出...',
        duration: 0
      })
      this.handleLogOut()
        .then(({ data }) => {
          this.$Message.destroy()
          this.$Message.success('已退出！')
          this.$router.replace({
            name: this.$config.LOGIN_PAGE_NAME
          })
        })
        .catch(err => {
          console.error('logout error: ', err)
        })
    },
    message () {
      this.dropdownVisible = false
      this.$router.push({
        name: 'msg'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout':
          // this.logout()
          this.logoutConfirm = true
          break
        case 'message':
          this.message()
          break
      }
    },
    handleClickOutside () {
      this.dropdownVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.user-avatar-dropdown {
  /deep/ .ivu-poptip-body-message {
    color: #515a6e;
  }
}
</style>
