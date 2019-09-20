<!-- 消息中心 -->
<template>
  <div class="msg-center">
    <Row>
      <Button
        :disabled="searchLoading || selectAllLoading || messageUnreadCount === 0"
        :loading="selectLoading"
        @click="makeAsRead"
        icon="md-checkmark"
      >设为已读</Button>
      <Poptip @on-ok="makeAllAsRead" confirm title="确定将所有已读消息设为已读?" transfer>
        <Button
          :disabled="searchLoading || selectLoading || messageUnreadCount === 0"
          :loading="selectAllLoading"
          icon="md-done-all"
          style="margin-left: 4px;"
        >全部已读{{messageUnreadCount > 0 ? `(${messageUnreadCount})` : '' }}</Button>
      </Poptip>
      <DatePicker
        :disabled="searchLoading || selectAllLoading || selectLoading"
        :editable="false"
        placeholder="请选择日期范围"
        style="width: 200px;margin-left: 8px;"
        type="daterange"
        v-model="searchForm.searchDateRange"
      ></DatePicker>
      <Button
        :disabled="selectAllLoading || selectLoading"
        :loading="searchLoading"
        @click="doInitSearch"
        style="margin-left: 8px;"
        type="primary"
      >查询</Button>
    </Row>
    <br />
    <Table
      :columns="columns"
      :data="dataList"
      :loading="searchLoading"
      :row-class-name="rowClassName"
      @on-selection-change="onSelectionChange"
      border
    ></Table>
    <br />
    <Page
      :current.sync="searchForm.pageNum"
      :page-size="searchForm.pageSize"
      :total="total"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      show-elevator
      show-sizer
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import commonList from '@/mixin/commonList'
import MsgAPI from '@api/sys/msg'
import { format } from 'date-fns'
export default {
  name: 'msg',
  mixins: [commonList],
  data () {
    return {
      searchForm: {
        searchDate: null
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center',
          tooltip: true
        },
        {
          title: '日期',
          width: 150,
          key: 'createTime'
        },
        {
          title: '消息类型',
          width: 150,
          key: 'type'
        },
        {
          title: '内容',
          key: 'content',
          tooltip: true
        },
        {
          title: '状态',
          key: 'action',
          width: 120,
          render: (h, params) => {
            const status = params.row.status
            if (status === 1) {
              return h(
                'div',
                {
                  class: 'unread-state'
                },
                '未读'
              )
            } else if (status === 2) {
              return h('div', '已读')
            } else {
              return h('div', '未知')
            }
          }
        }
      ],
      dataList: [],
      todoList: [],
      selectLoading: false,
      selectAllLoading: false
    }
  },
  computed: {
    messageUnreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  watch: {
    searchDateRange () {
      if (this.searchDateRange) {
        this.searchForm.searchDate = format(
          this.searchDateRange,
          this.$config.MONTH_FORMAT
        )
      } else {
        this.searchForm.searchDate = null
      }
    }
  },
  mounted () {
    this.searchDateRange = null
  },
  methods: {
    ...mapActions(['getUnreadMessageCount']),
    rowClassName (row) {
      const status = row.status
      if (status === 1) {
        return 'table-row-unread'
      } else {
        return 'table-row-readed'
      }
    },
    doSearch () {
      this.searchLoading = true
      this.$nextTick(() => {
        MsgAPI.viewList({ ...this.searchForm })
          .then(({ data }) => {
            if (data.status === 'success') {
              this.dataList = data.list
              this.total = data.total
            }
          })
          .catch(err => {
            console.error('err:', err)
          })
          .finally(() => {
            this.searchLoading = false
          })
      })
    },
    onSelectionChange (selection) {
      this.todoList = []
      selection.forEach(item => {
        this.todoList.push(item.uuid)
      })
    },
    // 勾选已读
    makeAsRead () {
      const msgList = this.todoList
      if (msgList.length === 0) {
        this.$Message.warning('请选择消息')
        return
      }
      this.selectLoading = true
      const operate = 0
      MsgAPI.operate({ msgList, operate })
        .then(({ data }) => {
          if (data.status === 'success') {
            this.$Message.success('操作成功')
            this.doSearch()
            this.todoList = []
            this.getUnreadMessageCount()
          }
        })
        .catch(err => {
          console.error('err', err)
        })
        .finally(() => {
          this.selectLoading = false
        })
    },
    // 全部已读
    makeAllAsRead () {
      this.selectAllLoading = true
      const operate = 1
      MsgAPI.operate({ operate })
        .then(({ data }) => {
          if (data.status === 'success') {
            this.$Message.success('操作成功')
            this.doSearch()
            this.todoList = []
            this.getUnreadMessageCount()
          }
        })
        .catch(err => {
          console.error('err', err)
        })
        .finally(() => {
          this.selectAllLoading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.msg-center {
  /deep/ .ivu-table {
    .table-row {
      &-unread {
        td {
          color: @msg-unread-color;
          .unread-state {
            color: @error-color;
          }
        }
      }
      &-readed {
        td {
          color: @msg-readed-color;
        }
      }
    }
  }
}
</style>
