<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="用户名称"
      >
        <a-input
          v-decorator="[
            'roleName',
            {rules: [{ required: true, message: '请输入用户名称' }]}
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="权限类型"
      >
        <a-select v-model="selected" placeholder="请选择" default-value="0">
          <a-select-option value="0">无</a-select-option>
          <a-select-option value="1">管理员权限</a-select-option>
          <a-select-option value="2">教师权限</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-bind="buttonCol"
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button type="primary" html-type="submit">保存</a-button>
        <a-button @click="handleGoBack" style="margin-left: 8px" >返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  // import moment from 'moment'
  import pick from 'lodash.pick'

  export default {
    name: 'RoleEdit',
    props: {
      record: {
        type: [Object, String],
        default: ''
      }
    },
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },
        buttonCol: {
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12, offset: 5 }
          }
        },
        form: this.$form.createForm(this),
        selected: ''
      }
    },
    // beforeCreate () {
    //   this.form = this.$form.createForm(this)
    // },
    mounted () {
      this.$nextTick(() => {
        this.loadEditInfo(this.record)
      })
    },
    methods: {
      handleGoBack () {
        this.$emit('onGoBack')
      },
      handleSubmit () {
        const { form: { validateFields } } = this
        validateFields((err, values) => {
          if (!err) {
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values)
          }
        })
      },
      handleGetInfo () {
      },
      loadEditInfo (data) {
        // ajax
        console.log(`将加载 ${this.id} 信息到表单`)
        new Promise((resolve) => {
          setTimeout(resolve, 10)
        }).then(() => {
          const formData = pick(data, ['roleName', 'permissionName', 'permission'])
          this.selected = formData.permission
          console.log('formData', formData, this.selected1)
          this.form.setFieldsValue(formData)
        })
      }
    }
  }
</script>
