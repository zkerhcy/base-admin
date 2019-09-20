// import { startOfMonth, endOfMonth } from 'date-fns'
export default {
  data () {
    return {
      searchLoading: false,
      searchForm: {
        pageNum: 1,
        pageSize: this.$config.PAGE_SIZE,
        searchDateRange: null,
        startTime: null,
        endTime: null
      },
      total: 0,
      current: 0
    }
  },
  mounted () {
    this.searchDateRange = new Date()
    this.doSearch()
  },
  watch: {
    'searchForm.searchDateRange' () {
      if (this.searchForm.searchDateRange[0]) {
        this.searchForm.startTime = this.searchForm.searchDateRange[0].getTime()
        this.searchForm.endTime = this.searchForm.searchDateRange[1].getTime()
      } else {
        this.searchForm.startTime = null
        this.searchForm.endTime = null
      }
    }
  },
  methods: {
    doInitSearch () {
      this.searchForm.pageNum = 1
      this.doSearch()
    },
    pageChange (pageNum) {
      this.searchForm.pageNum = pageNum
      this.doSearch()
    },
    pageSizeChange (pageSize) {
      this.searchForm.pageSize = pageSize
      this.doSearch()
    }
  }
}
