<template>
  <a-card :bordered="false">
    <component @onAdd="handleAdd" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </a-card>
</template>

<script>

import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
// 动态切换组件
import List from '@/views/list/dict/DictList'
import Edit from '@/views/list/dict/DictEdit'
import Add from '@/views/list/dict/DictAdd'

export default {
  name: 'DictListWrapper',
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
