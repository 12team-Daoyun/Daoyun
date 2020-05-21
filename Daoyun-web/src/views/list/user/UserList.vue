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
          <a @click="handleEdit(record)">修改</a>
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

export default {
  name: 'UserList',
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
          title: '用户名称',
          dataIndex: 'userName'
        },
        {
          title: '角色类型',
          dataIndex: 'roleName'
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
        userName: 'lbh',
        roleId: '1',
        roleName: '管理员'
      },
        {
        key: 2,
        id: 2,
        userName: 'luozhixiang',
        roleId: '2',
        roleName: '教师'
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
