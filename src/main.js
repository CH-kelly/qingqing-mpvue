import Vue from 'vue'
import App from './App'
import { getRequest, postRequest,uploadPhoto } from "./utils/request"



import AppIMDelegate from "./delegate/app-im-delegate";

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.uploadPhoto = uploadPhoto

Vue.prototype.appIMDelegate =  new AppIMDelegate();

const app = new Vue(App)
app.$mount()
