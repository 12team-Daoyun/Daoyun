<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="权限名称"
      >
        <a-input
          v-decorator="[
            'permissionName',
            {rules: [{ required: true, message: '请输入权限名称' }]}
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="权限菜单"
      >
        <tr>
          <input type="checkbox" value="1" v-model="checkedNames">用户管理</tr>
        <tr>
          <input type="checkbox" value="2" v-model="checkedNames">角色管理</tr>
        <tr>
          <input type="checkbox" value="3" v-model="checkedNames">权限管理</tr>
        <tr>
          <input type="checkbox" value="4" v-model="checkedNames">学生管理</tr>
        <tr>
          <input type="checkbox" value="5" v-model="checkedNames">教师管理</tr>
        <tr>
          <input type="checkbox" value="6" v-model="checkedNames">课程管理</tr>
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
// import pick from 'lodash.pick'
import { TagSelect, StandardFormRow } from '@/components'
const TagSelectOption = TagSelect.Option

export default {
  name: 'PermissionAdd',
  props: {
    record: {
      type: [Object, String],
      default: ''
    }
  },
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow
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
      this.selected = '1,2'
      console.log(`将加载 ${this.id} 信息到表单`)
    }
  }
}
</script>
