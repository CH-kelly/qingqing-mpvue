<script>

// import AppIMDelegate from "./delegate/app-im-delegate";

export default {
  data () {
    return {
      
    }
  },
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    console.log(wx.getSystemInfo())
    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }

  },
  methods:{
    getIMHandler() {
        return this.appIMDelegate.getIMHandlerDelegate();
    },
  },
    onLaunch() {
      // console.log(this.appIMDelegate);
        // this.appIMDelegate = new AppIMDelegate(this);
        // this.appIMDelegate = new this.appIMDelegate();
        // console.log('socket start 1');
        
       
    },
    relink(){
        // this.appIMDelegate = new AppIMDelegate(this);
        this.appIMDelegate.relink();
    },
    onHide() {
        this.appIMDelegate.onHide();
    },
    onShow(options) {
       this.appIMDelegate.onLaunch();
       this.appIMDelegate.onShow();
        // this.globalData.appIMDelegate = this.appIMDelegate.getIMHandlerDelegate();
       
    },
  methods:{},
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
