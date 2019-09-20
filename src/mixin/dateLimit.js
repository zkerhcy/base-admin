export default {
  data () {
    return {
      // 今天之前不可选
      dateLimit: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      // 今天及之前不可选
      dateLimitToday: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now()
        }
      }
    }
  }
}
