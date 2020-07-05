<template>
  <a-card :bordered="false">
    <component @onAdd="handleAdd" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </a-card>
</template>

<script>

import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
// 动态切换组件
import List from '@/views/list/permission/PermissionList'
import Edit from '@/views/list/permission/PermissionEdit'
import Add from '@/views/list/permission/PermissionAdd'

export default {
  name: 'PermissionList',
  components: {
    AInput,
    ATextarea,
    List,
    Edit,
    Add
  },
  data () {
    return {
      currentComponet: 'List',
      record: ''
    }
  },
  created () {

  },
  methods: {
    handleEdit (record) {
      this.record = record || ''
      this.currentComponet = 'Edit'
      console.log(record)
    },
    handleAdd () {
      this.currentComponet = 'Add'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    }
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    }
  }
}
</script>
