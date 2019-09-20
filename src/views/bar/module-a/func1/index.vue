<template>
  <div>
    <Form :label-width="100" :model="searchForm" ref="searchForm">
      <Row>
        <Col span="6">
          <FormItem label="姓名" prop="name">
            <Input
              :disabled="searchLoading"
              :maxlength="20"
              autofocus
              clearable
              placeholder="请输入姓名"
              ref="searchFormName"
              v-model="searchForm.name"
            ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="年龄" prop="age">
            <InputNumber :disabled="searchLoading" :min="1" v-model="searchForm.age"></InputNumber>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="性别" prop="gender">
            <RadioGroup v-model="searchForm.gender">
              <Radio :disabled="searchLoading" :label="1">男</Radio>
              <Radio :disabled="searchLoading" :label="2">女</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col class="search-btns" span="6">
          <Button :loading="searchLoading" @click="doInitSearch" icon="md-search" type="primary">查询</Button>
          <Button
            :disabled="searchLoading"
            @click="resetSearchForm"
            icon="md-sync"
            style="margin-start: 8px;"
            type="default"
          >重置</Button>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="生日" prop="searchDateRange">
            <DatePicker
              :disabled="searchLoading"
              :editable="false"
              placeholder="请选择日期范围"
              style="width: 100%;"
              type="daterange"
              v-model="searchForm.searchDateRange"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="邮箱" prop="email">
            <Input
              :disabled="searchLoading"
              :maxlength="20"
              clearable
              placeholder="请输入邮箱"
              v-model="searchForm.email"
            ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="城市" prop="city">
            <Select
              :disabled="searchLoading"
              clearable
              placeholder="请选择城市"
              v-model="searchForm.city"
            >
              <Option :key="index" :value="item.id" v-for="(item, index) in cityList">{{item.city}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col class="search-btns" span="6">
          <Button
            :disabled="searchLoading"
            @click="showFormModal = true"
            icon="md-add"
            type="info"
          >新建</Button>
        </Col>
      </Row>
    </Form>
    <Table :columns="columns" :data="dataList" :loading="searchLoading" border></Table>
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
    <br />
    <Modal title="查看图片" v-model="imgPreview">
      <img :src="previewSrc" style="width: 100%" />
      <div slot="footer"></div>
    </Modal>
    <Modal
      :title="formTitle"
      @on-visible-change="onFormVisibleChange"
      v-model="showFormModal"
      width="700"
    >
      <Form
        :label-width="80"
        :model="validateForm"
        :rules="ruleValidate"
        class="ask-leave-form"
        ref="formValidate"
      >
        <Row>
          <Col span="12">
            <FormItem label="姓名" prop="name">
              <Input
                :disabled="viewMode"
                :maxlength="20"
                clearable
                placeholder="请输入姓名"
                ref="validateFormName"
                style="width: 200px;"
                v-model="validateForm.name"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="年龄" prop="age">
              <InputNumber :disabled="viewMode" :min="1" v-model="validateForm.age"></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="validateForm.gender">
                <Radio :disabled="viewMode" :label="1">男</Radio>
                <Radio :disabled="viewMode" :label="2">女</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="生日" prop="birth">
              <DatePicker
                :disabled="viewMode"
                :editable="false"
                placeholder="请选择生日"
                style="width: 200px;"
                type="date"
                v-model="validateForm.birth"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="邮箱" prop="email">
              <Input
                :disabled="viewMode"
                :maxlength="100"
                clearable
                placeholder="请输入邮箱"
                style="width: 200px;"
                v-model="validateForm.email"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="城市" prop="city">
              <Select
                :disabled="viewMode"
                clearable
                placeholder="请选择城市"
                style="width: 200px;"
                v-model="validateForm.city"
              >
                <Option
                  :key="index"
                  :value="item.city"
                  v-for="(item, index) in cityList"
                >{{item.city}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="图片" prop="images">
          <div :key="index" class="upload-list" v-for="(item, index) in validateForm.images">
            <img :src="item.url" />
            <div class="upload-list-cover">
              <Icon @click.native="handlePreview(item.url)" type="ios-eye-outline"></Icon>
              <Icon @click.native="handleRemove(item)" type="ios-trash-outline" v-if="!viewMode"></Icon>
            </div>
          </div>
          <Upload
            :before-upload="handleBeforeUpload"
            :default-file-list="defaultFileList"
            :format="['jpg','jpeg','png']"
            :max-size="1024"
            :show-upload-list="false"
            action
            multiple
            ref="upload"
            style="display: inline-block;width:58px;"
            type="drag"
            v-if="!viewMode"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon size="20" type="ios-camera"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            :autosize="{minRows: 4,maxRows: 6}"
            :disabled="viewMode"
            :maxlength="200"
            placeholder="请输入备注"
            type="textarea"
            v-model="validateForm.remark"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer" v-if="!viewMode">
        <Button :disabled="submitLoading" @click="resetValidateForm">重置</Button>
        <Button :loading="submitLoading" @click="submitForm" type="primary">提交</Button>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import commonList from '@/mixin/commonList'
import TestAPI from '@api/common/test'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'func1',
  mixins: [commonList],
  data () {
    return {
      // search
      searchForm: {
        name: null,
        age: null,
        gender: null,
        email: null,
        city: ''
      },

      // table
      columns: [
        {
          type: 'index',
          title: '序号',
          width: 60,
          tooltip: true,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age',
          tooltip: true,
          sortable: true,
          editable: true
        },
        {
          title: '性别',
          key: 'gender',
          filters: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return value === row.gender
          },
          render (h, params) {
            const gender = params.row.gender
            return h('div', gender === 1 ? '男' : '女')
          }
        },
        {
          title: '生日',
          key: 'birth',
          tooltip: true
        },
        {
          title: '邮箱',
          key: 'email',
          tooltip: true
        },
        {
          title: '城市',
          key: 'city',
          tooltip: true
        },
        {
          title: '头像',
          key: 'image',
          render: (h, params) => {
            const imgs = params.row.images
            return h(
              'div',
              {},
              imgs.map(img =>
                h('Avatar', {
                  style: {
                    // width: '36px',
                    // height: '36px',
                    cursor: 'pointer',
                    marginLeft: '4px'
                  },
                  props: {
                    size: 'small',
                    shape: 'square',
                    src: img.url
                  },
                  nativeOn: {
                    click: () => {
                      this.handlePreview(img.url)
                    }
                  }
                })
              )
            )
          }
        },
        {
          title: '备注',
          key: 'remark',
          tooltip: true
        },
        {
          title: '操作',
          key: 'action',
          width: 170,
          render: (h, params) => {
            const row = params.row
            return h('div', [
              h(
                'Button',
                {
                  directives: [
                    {
                      name: 'permission',
                      arg: 'view',
                      value: 'func1'
                    }
                  ],
                  props: {
                    ghost: true,
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.view(row)
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  directives: [
                    {
                      name: 'permission',
                      arg: 'edit',
                      value: 'func1'
                    }
                  ],
                  props: {
                    ghost: true,
                    type: 'warning',
                    size: 'small',
                    disabled: row.age < 18
                  },
                  style: {
                    marginLeft: '4px'
                  },
                  on: {
                    click: () => {
                      this.edit(row)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Poptip',
                {
                  directives: [
                    {
                      name: 'permission',
                      arg: 'delete',
                      value: 'func1'
                    },
                    {
                      name: 'show',
                      value: row.age % 2 === 0
                    }
                  ],
                  props: {
                    confirm: true,
                    transfer: true,
                    title: '确定删除该条记录？'
                  },
                  on: {
                    'on-ok': () => {
                      this.remove(row.uuid)
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      style: {
                        'margin-left': '4px'
                      },
                      props: {
                        ghost: true,
                        type: 'error',
                        size: 'small'
                      }
                    },
                    '删除'
                  )
                ]
              )
            ])
          }
        }
      ],
      dataList: [],
      cityList: [],

      // form
      viewMode: false,
      showFormModal: false,
      submitLoading: false,
      validateForm: {
        name: null,
        age: null,
        gender: null,
        birth: null,
        email: null,
        city: null,
        images: [],
        remark: null
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '不能为空',
            trigger: 'change'
          }
        ],
        age: [
          {
            type: 'number',
            required: true,
            message: '不能为空',
            trigger: 'change'
          }
        ],
        gender: [
          {
            type: 'number',
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        birth: [
          {
            type: 'date',
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: '请输入正确格式的邮箱',
            trigger: 'change'
          }
        ],
        city: [
          {
            required: true,
            message: '请选择',
            trigger: 'blur'
          }
        ],
        images: [
          {
            type: 'array',
            required: true,
            message: '请添加图片',
            trigger: 'change'
          }
        ],
        remark: [
          {
            required: true,
            message: '不能为空',
            trigger: 'change'
          }
        ]
      },
      defaultFileList: [],

      // image preview
      imgPreview: false,
      previewSrc: ''
    }
  },
  created () {
    window.vm = this
    TestAPI.getCityList()
      .then(({ data }) => {
        if (data.code === 1) {
          this.cityList = data.list
        }
      })
      .catch(err => {
        console.error('err: ', err)
      })
  },
  computed: {
    formTitle () {
      if (this.viewMode) {
        return '查看'
      } else {
        if (this.validateForm.uuid) {
          return '编辑'
        } else {
          return '新增'
        }
      }
    }
  },
  methods: {
    // search
    doSearch () {
      this.searchLoading = true
      TestAPI.viewList({ ...this.searchForm })
        .then(({ data }) => {
          this.searchLoading = false
          if (data.code === 1) {
            this.dataList = data.list
            this.total = data.total
            this.$nextTick(() => {
              this.$refs['searchFormName'].focus()
            })
          }
        })
        .catch(err => {
          this.searchLoading = false
          console.error('err', err)
        })
    },
    resetSearchForm () {
      this.$refs['searchForm'].resetFields()
      this.$refs['searchFormName'].focus()
    },

    // CRUD
    add () {},
    view (row) {
      this.viewMode = true
      this.validateForm = cloneDeep(row)
      this.defaultFileList = cloneDeep(row.images)
      this.showFormModal = true
    },
    edit (row) {
      this.validateForm = cloneDeep(row)
      this.defaultFileList = cloneDeep(row.images)
      this.showFormModal = true
    },
    remove (uuid) {
      this.$Message.loading({
        content: '正在删除...',
        duration: 0
      })
      TestAPI.remove(uuid)
        .then(({ data }) => {
          if (data.code === 1) {
            this.$Message.destroy()
            this.$Message.success('删除成功！')
            this.doInitSearch()
          }
        })
        .catch(err => {
          this.$Message.destroy()
          console.error('err', err)
        })
    },

    // form 表单
    submitForm (uuid) {
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          let formData = new FormData()
          const formObj = cloneDeep(this.validateForm)
          Object.keys(formObj).forEach(function (key) {
            if (Array.isArray(formObj[key])) {
              formObj[key].forEach(item => {
                formData.append(item.name, item)
              })
            } else {
              formData.append(key, formObj[key])
            }
            // Inspect FormData
          })
          console.log('----Inspect FormData----')
          for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1])
          }
          this.submitLoading = true
          if (formObj.uuid) {
            // update
            TestAPI.update(formData)
              .then(({ data }) => {
                this.submitLoading = false
                if (data.code === 1) {
                  this.$Message.success('修改成功！')
                  this.showFormModal = false
                  this.doInitSearch()
                }
              })
              .catch(err => {
                this.submitLoading = false
                console.error('err', err)
              })
          } else {
            // create
            TestAPI.create(formData)
              .then(({ data }) => {
                this.submitLoading = false
                if (data.code === 1) {
                  this.$Message.success('新增成功！')
                  this.showFormModal = false
                  this.doInitSearch()
                }
              })
              .catch(err => {
                this.submitLoading = false
                console.error('err', err)
              })
          }
        }
      })
    },
    onFormVisibleChange (visible) {
      this.resetValidateForm()
      if (!visible) {
        this.viewMode = false
        this.validateForm.uuid = null
        this.$refs['searchFormName'].focus()
      } else {
        this.$nextTick(() => {
          this.$refs['validateFormName'].focus()
        })
      }
    },
    resetValidateForm () {
      this.$refs['formValidate'].resetFields()
      this.$refs['validateFormName'].focus()
    },

    // form上传文件相关
    handleRemove (file) {
      const fileList = this.validateForm.images
      this.validateForm.images.splice(fileList.indexOf(file), 1)
    },
    handleBeforeUpload (file) {
      console.log('file: ', file)
      if (
        this.validateForm.images.length >= this.$config.ATTACHMENT_MAX_COUNT
      ) {
        this.$Message.warning(
          `最多添加${this.$config.ATTACHMENT_MAX_COUNT}个附件`
        )
      } else {
        if (!new RegExp('.(jpg|jpeg|png)$').test(file.name)) {
          this.$Message.warning('请上传jpg或png格式文件')
        } else if (file.size / 1024 / 1024 > this.$config.ATTACHMENT_MAX_SIZE) {
          this.$Message.warning(
            `文件大小不要超过${this.$config.ATTACHMENT_MAX_SIZE}M`
          )
        } else {
          let reader = new FileReader()
          reader.onprogress = e => {
            // console.log('progress', e)
          }
          reader.onerror = e => {
            // this.validateForm.images.pop()
          }
          reader.readAsDataURL(file)
          reader.onloadend = e => {
            // console.log('file reader', reader)
            file.url = reader.result
            this.validateForm.images.push(file)
            this.$nextTick(() => {
              console.log(
                'file[0] type: ',
                Object.prototype.toString.call(this.validateForm.images[0])
              )
            })
          }
        }
      }
      return false
    },
    handlePreview (url) {
      this.previewSrc = url
      this.imgPreview = true
    }
  }
}
</script>

<style lang="less" scoped>
.upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.upload-list img {
  width: 100%;
  height: 100%;
}
.upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.upload-list:hover .upload-list-cover {
  display: block;
}
.upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
