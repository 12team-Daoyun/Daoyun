import axios from 'axios'
import env from './env'

const util = {

}
util.title = function (title) {
    title = title ? title + ' - Home' : 'iView project'
    window.document.title = title
}

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8000'
    : env === 'production'
    ? 'http://116.62.176.2:5000'
    : 'http://127.0.0.1:8000'

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
})

export default util
