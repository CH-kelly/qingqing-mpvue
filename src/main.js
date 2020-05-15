import Vue from 'vue'
import App from './App'
import { getRequest, postRequest,uploadPhoto } from "./utils/request"

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.uploadPhoto = uploadPhoto

const app = new Vue(App)
app.$mount()
