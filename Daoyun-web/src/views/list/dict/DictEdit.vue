<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="字典名称"
      >
        <a-input
          name="dictionaryName"
          v-decorator="[
            'dictionaryName',
            {rules: [{ required: true, message: '请输入字典名称' }]}
          ]"
        ></a-input>
      </a-form-item>
      <h1 class="">字典数据配置：</h1>
      <a-table
          :columns="columns"
          :dataSource="data"
          :pagination="false"
        >
          <template v-for="(col, i) in ['key', 'name', 'value']" :slot="col" slot-scope="text, record">
            <a-input
              :key="col"
              style="margin: -5px 0"
              :value="text"
              :placeholder="columns[i].title"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
          </template>
          <template slot="operation" slot-scope="text, record">
            <template >
            <span >
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
              <!--<span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>-->
            </template>
          </template>
        </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newDict">新增字典项</a-button>
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
import moment from 'moment'
import pick from 'lodash.pick'

export default {
  name: 'DictEdit',
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
      id: 0,
      columns: [
        {
          title: '字典名称',
          dataIndex: 'name',
          key: 'name',
          width: '40%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '字典值',
          dataIndex: 'value',
          key: 'value',
          width: '40%',
          scopedSlots: { customRender: 'value' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [
        {
          key: '1',
          name: '性别',
          workId: '001'
        },
        {
          key: '2',
          name: '学校',
          workId: '002'
        }
      ]
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
      // const { form } = this
      // ajax
      console.log(`将加载 ${this.id} 信息到表单`)
      new Promise((resolve) => {
        setTimeout(resolve, 1500)
      }).then(() => {
        const formData = pick(data, ['dictionaryName'])
        formData.updatedAt = moment(data.updatedAt)
        console.log('formData', formData)
        this.form.setFieldsValue(formData)
      })
    },
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    newDict () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: ''
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    }
  }
}
</script>
