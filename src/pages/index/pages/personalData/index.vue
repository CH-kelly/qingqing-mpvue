<template>
  <div>
    <navigation-bar shadow="true"></navigation-bar>
    <!-- 主题内容 -->
    <div class="index-center" :style="{marginTop:systemHeight+'px'}">
      <!-- 头部 -->
      <div class="index-center-header">
        <img class="header-image" src="/static/images/new/personal-data.png" alt />
        <div class="header-title-h2">
          <div class="title-origin"></div>
          <div class="title-h2">选择你的{{titleH2}}</div>
          <div class="title-origin"></div>
        </div>
      </div>

      <!-- 内容 性别 -->
      <div class="index-center-content" v-show="nextStatus==1">
        <div class="center-content">
          <div class="content-left">
            <div class="content-sex">男</div>
            <img class="content-image" src="/static/images/new/boy.png" alt />
            <div class="content-radio" :class="isActive==1?'active':''" @click="clickRadio(1)">
                <img class="content-radio-image" v-show="isActive==1" src="/static/images/new/hook.png" alt="">
            </div>
          </div>
          <div class="content-right">
            <div class="content-sex">女</div>
            <img class="content-image" src="/static/images/new/girl.png" alt />
            <div class="content-radio" :class="isActive==2?'active':''" @click="clickRadio(2)">
                <img class="content-radio-image" v-show="isActive==2" src="/static/images/new/hook.png" alt="">
            </div>
          </div>
        </div>
        <div class="content-desc">注册成功后性别将不可修改</div>
      </div>

<!-- 生日 -->
    <div class="index-center-content" v-show="nextStatus==2">
        
        <img class="center-content-birthday" src="/static/images/new/happy.png" alt="">
        <div class="center-content-picker">
            <picker mode = date @change="bindMultiPickerChange">
                
                <div class="center-content-title">{{birthdayTimer}}</div>

            </picker>
        </div>
        <div class="index-center-line">
            <div class="center-line"></div>
        </div>
        
      </div>

      <!-- 地区 -->
      <div class="index-center-content" v-show="nextStatus==3">
        <img class="center-content-birthday" style="width: 86rpx;"  src="/static/images/new/location1.png" alt="">
        <!-- <div class="center-content-picker">
            <picker mode="multiSelector" @columnchange="changeCityValue" :value="mulIndex" :range="mulArr" @change="changeCity">
                <div class="center-content-title" v-show="choiceCityValue==1">点击选择地区</div>
                <div class="center-content-title" v-show="choiceCityValue==2">{{mulArr[0][mulIndex[0]]}}，{{mulArr[1][mulIndex[1]]}}，{{mulArr[2][mulIndex[2]]}}</div>
            
            </picker>
        </div> -->
        <div class="center-content-picker">
          <picker mode="region" @change="changeCityValue">
              <div class="center-content-title" v-show="choiceCityValue==1">点击选择地区</div>
              <div class="center-content-title" v-show="choiceCityValue==2">{{province}} {{city}}</div>
            </picker>
        </div>
        <div class="index-center-line">
            <div class="center-line"></div>
        </div>
      </div>


      <!-- 按钮 -->
      <div class="index-center-button" v-if="lookAround==0">
        <div class="center-button" @click="nextButton">{{nextTtitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar.vue";
import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      titleH2: "性别",
      lookAround:0,     //随便看看
      isActive: 0,
      nextStatus: 1, //第一步是性别      第二步是选择生日    第三部是地区
      nextTtitle: "下一步",
      birthdayTimer: '点击选择生日',
      gender:0,
      choiceCityValue:1,
      area:null,
      province:'',
      city:'',
      token:'',
    };
  },
  components: {
    navigationBar
  },
  onLoad(options) {
    
    if(options.lookAround){
      this.lookAround = options.lookAround;
    }
    console.log('lookAround-------',this.lookAround);

    let token = store.state.token || wx.getStorageSync("token");
    this.token = token;

  },
  mounted() {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
  },
  methods: {
    clickRadio(key) {
      this.isActive = key;
      this.gender = key;
      if(this.lookAround == 1){  //表示随便看看
        wx.setStorageSync('lookAround', 1);   //记录随便看看的值
        wx.setStorageSync('isReadDialog', 1);   //记录随便看看的值
        wx.setStorageSync('lookAroundSex', key);  //记录随便看看的性别
        
        setTimeout(() => {
          wx.switchTab({
            url: "/pages/index/index/main"
          });
        }, 1000);
      }
    },
    radioChange(e) {
      console.log("radioChange");
    },
    nextButton(){
        // 下一步
        this.nextStatus = this.nextStatus+1;
        if(this.nextStatus == 2){
            this.titleH2 = "生日"
        }
        if(this.nextStatus == 3){
            this.titleH2 = "地区"
            this.nextTtitle = "开启青青校园"
        }
        if(this.nextStatus >3){ //提交
            this.nextStatus = 3;

          wx.setStorageSync('isReadDialog', 1);   //记录随便看看的值
          wx.setStorageSync('lookAroundSex', this.isActive);  //记录随便看看的性别
          wx.setStorageSync('lookAroundBirthday', this.birthdayTimer);  //记录登录后用户选择的生日
          wx.setStorageSync('lookAroundArea', this.province+','+ this.city);  //记录登录后用户选择的地区
            
            let that = this;
            let data = {
              token: this.token,
              birthday: this.birthdayTimer,
              province: this.province,
              city: this.city,
              gender:this.gender
            };
            that.postRequest("home/user/update_user_info", data).then(res => {
              console.log('update_user_info',res)
                wx.showLoading({
                      title: res.message,
                      icon: 'success',
                      duration: 1000
                  })
                if (res.code === 0) {
                  
                  setTimeout(() => {
                    wx.switchTab({
                      url: "/pages/index/index/main"
                    });
                  }, 3000);
                }
              },
              err => {
                console.log(err);
              }
            );
            
        }
        
    },
    bindMultiPickerChange(e){
        // 获取时间日期
        this.birthdayTimer = e.mp.detail.value;
    },
    changeCity(e){
      console.log(e);
      this.area = e.mp.detail.value;
    },
    changeCityValue(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      this.choiceCityValue = 2;
      console.log(id);
      this.province = e.mp.detail.value[0];
      this.city = e.mp.detail.value[1];
    },
  }
};
</script>

<style scoped>
.index-center {
  padding: 98rpx 0;
  background: #ffffff;
  /* background:skyblue; */
  overflow: hidden;
}

.index-center-header {
  text-align: center;
}
.header-image {
  width: 274rpx;
  height: 45rpx;
}
.header-title-h2 {
  margin-top: 47rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-origin {
  width: 14rpx;
  height: 14rpx;
background:rgba(253,59,109,1);
  border-radius: 50%;
}
.title-h2 {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(16, 16, 16, 1);
  margin: 0 10rpx;
}

/* 内容样式 */
.index-center-content {
  margin-top: 160rpx;
    text-align: center;
}
.center-content {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.content-left {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

}
.content-right{
    align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content-sex {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(16, 16, 16, 1);
  margin-bottom: 20rpx;
}
.content-image {
  width: 184rpx;
  height: 184rpx;
}
.content-radio {
    
  margin-top: 10rpx;
  width: 26rpx;
  height: 26rpx;
  border: 2rpx solid rgba(34, 209, 183, 1);
  border-radius: 50%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
}
.content-radio-image{
    width: 22rpx;
    height: 22rpx;
    vertical-align: middle;
    position: absolute;
    top: 2rpx;
    left: 2rpx;

}
.active {
  
background:linear-gradient(180deg,rgba(219,128,100,1),rgba(253,59,109,1));

  /* background: #f0c88b; */
  color: #ffffff;
}
.content-desc {
    margin-top: 60rpx;
  text-align: center;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}


/* 选择生日样式 */
.center-content-birthday{
    width: 98rpx;
    height: 98rpx;
}
.index-center-line{
    display: flex;
    justify-content: center;
}
.center-line{
    margin-top: 20rpx;
    width:394rpx;
    height:1rpx;
    background:rgba(221,221,221,1);
}
.center-content-title{
    margin-top: 70rpx;
font-size:34rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(16,16,16,1);
}



















/* 按钮样式 */
.index-center-button {
  width: 100%;
  position: fixed;
  bottom: 100rpx;
  display: flex;
  justify-content: center;
}
.center-button {
    width:500rpx;
  height: 80rpx;

background:linear-gradient(180deg,rgba(219,128,100,1),rgba(253,59,109,1));
box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);

  border-radius: 40rpx;
    text-align: center;
    line-height: 80rpx;
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
</style>