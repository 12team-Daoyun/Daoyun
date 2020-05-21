<template>
  <div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>
      <!--<a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>-->
    </div>

    <a-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :dataSource="dataSource"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">字典配置</a>
          <a-divider type="vertical" />
          <a @click="handleDel(record)">删除</a>
        </template>
        <!--<a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('table.disable')">
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('table.delete')">
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown> -->
      </span>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
// import Mock from 'mockjs2'
// import { getServiceList } from '@/api/manage'
// import { dictlist1 } from '@/api/dict'
import { getQueryParameters } from '../../../mock/util'
import Mock from 'mockjs2'

export default {
  name: 'DictList',
  components: {
    STable
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '字典编号',
          dataIndex: 'id'
        },
        {
          title: '字典名称',
          dataIndex: 'dictionaryName'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return new Promise(function (resolve, reject) {
          const parameters = getQueryParameters(parameter)

          const result = []
          const pageNo = parseInt(parameters.pageNo)
          const pageSize = parseInt(parameters.pageSize)
          const totalPage = Math.ceil(5000 / pageSize)
          const key = (pageNo - 1) * pageSize
          const next = (pageNo >= totalPage ? (5000 % pageSize) : pageSize) + 1

          for (let i = 1; i < next; i++) {
            const tmpKey = key + i
            result.push({
              key: tmpKey,
              id: tmpKey,
              no: 'No ' + tmpKey,
              description: '这是一段描述',
              callNo: Mock.mock('@integer(1, 999)'),
              status: Mock.mock('@integer(0, 3)'),
              updatedAt: Mock.mock('@datetime'),
              editable: false
            })
          }
        })
        // console.log('loadData.parameter', parameter)
        // return dictlist1(parameter)
        //   .then(res => {
        //     console.log(res.result)
        //     return res.result
        //   })
      },
      // loadData: parameter => {
      //   console.log('loadData.parameter', parameter)
      //   return getServiceList(Object.assign(parameter, this.queryParam))
      //     .then(res => {
      //       console.log(res.result)
      //       return res.result
      //     })
      // },
      selectedRowKeys: [],
      selectedRows: []

      // custom table alert & rowSelection

    }
  },
  mounted: function () {

  },
  created () {
    this.getList()
    /* getRoleList({ t: new Date() }) */
  },
  methods: {
    getList () {
        this.dataSource = [{
        key: 1,
        id: 1,
        dictionaryName: '这是一段描述',
        callNo: 1,
        status: 1,
        updatedAt: 1,
        editable: false
      }]
    },

    handleAdd () {
      this.$emit('onAdd')
    },
    handleEdit (record) {
      this.$emit('onEdit', record)
      console.log(record)
    },
    handleOk () {
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
