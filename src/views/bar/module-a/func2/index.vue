<template>
  <div>
    <Row>按钮权限，使用 v-permission 指令，“删除”按钮已隐藏。</Row>
    <Row>
      <Button type="info" v-permission:add>新建</Button>
      <Button type="error" v-permission:delete>删除</Button>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'func2',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
</style>
