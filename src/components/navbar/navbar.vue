<template>
  <div class="navigation-bar" :style="{paddingTop: paddingTop + 'px', height: height + 'px', backgroundColor: background||barStyle.background}" :class="shadow?'navigation-bar-background':''">
    <div class="navigation-left">
      <slot name="left">
        <img class="left-image-back" src="/static/images/new/back.png" alt="" @click="gotoBack()">
      </slot>
    </div>
    <div class="navigation-center">
      <slot name="center"></slot>
    </div>
    <div class="navigation-right">
      
    </div>


  </div>
</template>

<script>
  import {statusBar, navigationBar, navBarStyle} from '@/utils/systemSetting'
  import store from '@/store'

  export default {
    props: {
      background: {type: String, default: ''},
      shadow:{type:Boolean,default:false}
    },
    /**
     * 组件的初始数据
     */
    data () {
      return {
        paddingTop: statusBar.android, // 默认为android大部分普通机型高度
        height: navigationBar.default + statusBar.android,
        barStyle: {},
        currentPage: '',
        leftShow: false,
        marginTop: 0,
        scale: 1
      }
    },
    computed: {
      
      menuSettings () {
        return store.state.menuSettings
      }
    },
    onLoad(option) {
      // const systemInfo = wx.getSystemInfoSync()
    
      //   if (this.menuSettings.height === 0) {
      //     this.getMenuSettings(1, 3)
      //   }
      //   this.scale = 1 - (0.5 / this.menuSettings.height)
      //   this.marginTop = this.menuSettings.top - systemInfo.statusBarHeight
      //   const ratio = systemInfo.screenHeight / systemInfo.screenWidth // 高宽比例
      //   const isNewModel = ratio >= 2
      //   const isIPhone = systemInfo.model.indexOf('iPhone') >= 0
      //   // const barHeight = systemInfo.statusBarHeight || (isNewModel ? statusBar.newModel : isIPhone ? statusBar.iPhone : statusBar.android)
      //   const barHeight = systemInfo.statusBarHeight;
        
      //   this.paddingTop = barHeight
      //   this.height = barHeight + navigationBar.default;
      //   var systemHeight = barHeight + navigationBar.default;
        
      //   store.commit('setSystemHeight', systemHeight)

        
      //   let barStyle = {...navBarStyle}
      //   barStyle.height = navigationBar.default
      //   this.barStyle = barStyle
    },
    mounted () {
      
      const systemInfo = wx.getSystemInfoSync()
  
      if (this.menuSettings.height === 0) {
        this.getMenuSettings(1, 3)
      }
      this.scale = 1 - (0.5 / this.menuSettings.height)
      this.marginTop = this.menuSettings.top - systemInfo.statusBarHeight
      const ratio = systemInfo.screenHeight / systemInfo.screenWidth // 高宽比例
      const isNewModel = ratio >= 2
      const isIPhone = systemInfo.model.indexOf('iPhone') >= 0
      // const barHeight = systemInfo.statusBarHeight || (isNewModel ? statusBar.newModel : isIPhone ? statusBar.iPhone : statusBar.android)
      const barHeight = systemInfo.statusBarHeight;
      console.log('paddingTop',barHeight);
      
      this.paddingTop = barHeight
      this.height = barHeight + navigationBar.default;

      var systemHeight = barHeight + navigationBar.default;
      
      store.commit('setSystemHeight', systemHeight)
      
      let bottomNavBarHeight = 50 ;   // 计算底部导航栏的高度
       
       // 判断是否iponex的代码
        var model = systemInfo.model;
        if(model.search('iPhone X')!=-1){
            store.commit('setISipx', 1)
            bottomNavBarHeight = 50+20;
        }
        // 计算内容可视区域
        let setContentHeight  = systemInfo.windowHeight -  systemHeight - bottomNavBarHeight;
        let setSecondPageHeight = systemInfo.windowHeight -  systemHeight ; //二级页面内容可视区域
        store.commit('setContentHeight', setContentHeight)
        store.commit('setSecondPageHeight', setSecondPageHeight)
        store.commit('setBottomNavBarHeight', bottomNavBarHeight)
      
      let barStyle = {...navBarStyle}
      barStyle.height = navigationBar.default
      this.barStyle = barStyle
    },
    /**
     * 组件的方法列表
     */
    methods: {
      getMenuSettings (current, count) {
        let menuSettings = wx.getMenuButtonBoundingClientRect()
        if (menuSettings.height === 0) {
          if (current > 3) {
            return
          }
          setTimeout(() => {
            this.getMenuSettings(current + 1, count)
          }, 200)
        } else {
          store.commit('setMenuSettings', menuSettings)
        }
      },
      gotoBack(){
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style scoped>
.navigation-bar{
  width: 100vw;
  height: 46px;
  background: #ffffff;
  color: #333333;
  font-size:32rpx;
  font-family:PingFang SC;
  font-weight:bold;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 1000;


}
.navigation-bar-background{
  
box-shadow:0px 0px 16px 2px rgba(4,0,0,0.08);
}


.navigation-left{
  width: 20%;
  display: flex;
  align-items: center;
  padding-left: 30rpx;
}
.navigation-left>.left-image-back{
    width: 20rpx;
    height: 28rpx;
    vertical-align: middle;
    position: relative;
    top: 6rpx;
}
.navigation-center{
  width: 60%;
  /* background: skyblue; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigation-right{
  width: 20%;
  /* background: orange; */
}

</style>