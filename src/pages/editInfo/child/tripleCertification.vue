<template>
  <div class="triple-certification">
    <div class="triple-certification-title">
      <div class="title-left">
        <div class="top-rounded"></div>
        <div class="top-title">三重认证</div>
      </div>
      <div class="title-right" @click="againAuth">重新认证</div>
    </div>

    <div class="triple-certification-item">
      <span class="triple-certification-item-title">身份认证</span>
      <div class="triple-authentication">
        <img class="authentication" v-if="isProve==1" src="/static/images/new/authentication.png" alt />
        <span class="triple-authentication-title" v-if="isProve==1">已认证</span>
        <span class="triple-authentication-title" v-else>未认证</span>
      </div>
    </div>
    <div class="triple-certification-item">
      <span class="triple-certification-item-title">学历认证</span>
      <div class="triple-authentication"  v-if="isEducation==1">
        <img class="authentication" src="/static/images/new/authentication.png" alt />
        <div class="triple-authentication-title">
            <span class="triple-authentication-education">{{userInfo.education}}</span>
            <span class="triple-authentication-title-line">|</span>
            <span class="triple-authentication-education1">{{userInfo.education1}}·{{userInfo.education2}}</span>
        </div>
      </div>
      <div class="triple-authentication"  v-else>
        <div class="triple-authentication-title">
            未认证
        </div>
      </div>
    </div>
    <div class="triple-certification-item">
      <span class="triple-certification-item-title">公 司</span>
      <div class="triple-authentication">
        <span class="triple-authentication-title">{{userInfo.company}}</span>
      </div>
    </div>
    <div class="triple-certification-item">
      <span class="triple-certification-item-title">职 务</span>
      <div class="triple-authentication">
        <span class="triple-authentication-title">{{userInfo.occupation}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: {}
    }
  },
  methods:{
    againAuth(){
      wx.navigateTo({url:'/pages/idAuth/main'})
    }
  }
};
</script>
<style scoped>
.triple-certification {
  margin: 20rpx;
  padding: 20rpx;
  /* margin-top: 20rpx; */
  background: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
}
.triple-certification-title {
  display: flex;
  justify-content: space-between;
}
.title-left{
  display: flex;
  align-items: center;
}
.top-rounded {
  width: 10rpx;
  height: 30rpx;
  background: rgba(130, 222, 199, 1);
  border-radius: 5px;
  margin-right: 20rpx;
}
.top-title {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.title-right {
  width: 130rpx;
  height: 41rpx;
  background: rgba(241, 241, 241, 1);
  border-radius: 20rpx;
  line-height: 41rpx;
  text-align: center;
  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.triple-certification-item {
  margin-top: 42rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.triple-certification-item-title {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.triple-authentication-title {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}


.authentication{
    width: 40rpx;
    height: 40rpx;
}



</style>