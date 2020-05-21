import { axios } from '@/axios'
import { getQueryParameters } from '@/mock/util'
import Mock from 'mockjs2'
// import { axios } from '@/utils/request'

export function dictlist (parameter) {
  return axios({
    url: '/auth/login',
    method: 'post',
    data: parameter
  })
}

const totalCount = 5701
export function dictlist1 (options) {
  return new Promise(function (resolve, reject) {
    const parameters = getQueryParameters(options)

    const result = []
    const pageNo = parseInt(parameters.pageNo)
    const pageSize = parseInt(parameters.pageSize)
    const totalPage = Math.ceil(totalCount / pageSize)
    const key = (pageNo - 1) * pageSize
    const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

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
}
