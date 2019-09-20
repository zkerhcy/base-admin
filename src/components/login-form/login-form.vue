<template>
  <Form :model="form" :rules="rules" @keydown.enter.native="handleSubmit" ref="loginForm">
    <FormItem prop="username">
      <Input :maxlength="36" placeholder="用户ID" v-model="form.username">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input :maxlength="36" placeholder="密码" type="password" v-model="form.password">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button :loading="logining" @click="handleSubmit" long type="primary">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    usernameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    },
    logining: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        username: 'admin',
        password: 'password'
      }
    }
  },
  computed: {
    rules () {
      return {
        username: this.usernameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.username,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
