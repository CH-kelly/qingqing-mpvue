<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">
        搜索设置
      </div>
    </navigation-bar>
     
    <div class="index-center" :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
      <div class="index-center-title">
          修改后次日生效
      </div>
      <div class="center-content">
          <div class="center-content-item">
              <div class="content-item-title">地区设置</div>
              <div class="content-item-title1">
                  <div class="content-item-city">城市</div>
                  <div class="content-item-city1">
                      <span>四川德阳</span>
                      <img class="item-back" src="/static/images/new/back.png" alt="">
                  </div>
              </div>
          </div>
          <div class="center-content-item">
              <div class="content-item-title">职业设置</div>
              <div class="content-item-title1">
                  <div class="content-item-city">职业</div>
                  <div class="content-item-city1">
                      <span>设计师</span>
                      <img class="item-back" src="/static/images/new/back.png" alt="">
                  </div>
              </div>
          </div>
      </div>
      <div class="center-content">
          <div class="center-content-item">
              <div class="content-item-age">
                <div class="content-item-title">年龄设置</div>
                <div class="content-item-age-area">18-50</div>
              </div>
              <div class="content-item-title1">
                  
              </div>
          </div>
      </div>
      

    </div>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import store from '@/store'

export default {
  data () {
    return {
      

      systemHeight:0,
      contentHeight:0,
      isShowBuyMemberVip:false
    }
  },

  components: {
    navigationBar,
    
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
    
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.navigation-left-back{
  width:90rpx;
  height:44rpx;
  line-height: 44rpx;
  text-align: center;
  background:rgba(255,255,255,1);
  border-radius:22rpx;
  color: #333333;
  font-size: 26rpx;
  font-weight:normal;

  overflow: hidden;

}
.navigation-center-image{
  width: 45%;
  height: 50%;
}


.index-center{
  /* padding: 0 20rpx 40rpx 20rpx; */
  background: #F2F6F9;
  /* background:skyblue; */
  overflow: hidden;

}




.index-center-title{
    padding: 30rpx;
    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:38rpx;
}
.center-content{
  background: #ffffff;
}
.center-content-item{

    padding: 30rpx;
    border-bottom: 1px solid #EEEEEE;
}
.content-item-title{
    font-size:28rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:38rpx;
}
.content-item-title1{
    margin-top: 15rpx;
    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:38rpx;

    display: flex;
    position: relative;


}
.content-item-city1{
  display: flex;
  align-items: center;
}
.content-item-city{
  width: 78%;
}

.item-back{
  width: 16rpx;
  height: 20rpx;
  transform: rotate(180deg);
  position: absolute;
  right: 20rpx;
}
</style>
