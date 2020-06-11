import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menuSettings: {height: 0},
    systemHeight:0, //头部导航栏可显示高度
    isIPX:0,  //是否是iphonex
    contentHeight:0,  //内容可显示区域
    secondPageHeight:0,  //二级页面内容可视区域
    bottomNavBarHeight:0, //底部导航栏的高度
    currentIndex:'index',
    SignInTemporarily:0,
    isLogin:0,  //是否已登录
    userInfo:null,
    is_new_user:null,
    token:null,
    inviter:'',
  },
  mutations: {
    setMenuSettings (state, settings) {
      state.menuSettings = settings
    },
    setSystemHeight (state, settings) {
      state.systemHeight = settings
    },
    setISipx (state, status) {
      state.isIPX = status
    },
    setContentHeight (state, height) {
      state.contentHeight = height
    }, 
    setSecondPageHeight (state, height) {
      state.secondPageHeight = height
    },
    setBottomNavBarHeight (state, height) {
      state.bottomNavBarHeight = height
    },
    setCuttentIndex(state,index){
      state.currentIndex = index
    },
    setSignInTemporarily(state,key){
      state.SignInTemporarily = key
      console.log(state.SignInTemporarily);
      
    },
    setisLogin(state,key){
      state.isLogin = key
          
    },
    setUserInfo(state,value){
      state.userInfo = value
    },
    setInviter(state,key){
      state.inviter = key   
    }
  }
})

export default store
