<template>
  <div class="describe">
    <div class="top">
      <div class="top-rounded"></div>
      <div class="top-title">基本资料</div>
      <div class="top-edit" @click="editInfo">编辑</div>

      <!-- <div class="top-edit top-edit-complete" v-if="isEdit==1" @click="complete">保存</div> -->
    </div>
    <div class="center">
        <div class="personal">
            <div class="info-card">  
                <div class="card-left">
                    <div class="nickname">{{headInfo.nickname}}</div>
                    <div class="info">
                        <div class="info-desc">{{headInfo.age}}岁</div>
                        <div class="info-line"></div>
                        <div class="info-desc">{{headInfo.stature}}cm</div>
                        <div class="info-line"></div>
                        <div class="info-desc">{{headInfo.horoscope}}</div>
                    </div>
                </div>
                <div class="card-right">
                    <img class="card-right-location" src="/static/images/new/location.png" alt="">
                    <span>{{headInfo.province}}</span><span>{{headInfo.city}}</span>
                </div>
            </div>
            <!-- 职业 -->
            <div class="info-card-occupation">
                <div class="occupation-left background-border-radius">职业：{{headInfo.profession}}</div>
                <div  class="occupation-left background-border-radius">收入：{{headInfo.annual_salary}}</div>
            </div>
        </div>
    </div>
  </div>
    
</template>
<script>
export default {
  props: {
    headInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isEdit: 0,
      birthday:'',
      province:'',
      city:'',
    };
  },
  onLoad() {
  },
  methods: {
    editInfo() {
      // console.log("编辑");
      // this.isEdit = 1;  
      wx.navigateTo({
        url: "/pages/basicInfo/pages/basicInfo/main"
        // url:'/pages/basicInfo/main'
      })
    },
  }
};
</script>
<style scoped>
.describe {
  margin: 20rpx;
  /* margin-top: 20rpx; */
  background: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
}
.describe > .top {
  display: flex;
  align-items: center;
  position: relative;
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
.describe > .center {
    height: 240rpx;

  overflow: hidden;

  margin-top: 10rpx;

  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}

.top-edit {
  width: 87rpx;
  height: 41rpx;
  background: rgba(241, 241, 241, 1);
  border-radius: 21rpx;

  position: absolute;
  right: 0;

  line-height: 41rpx;
  text-align: center;
  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.top-edit-complete {
  background: rgba(130, 222, 199, 1);
  color: #ffffff;
}

/* 发布文本框 */
.index-center-textarea {
  width: 100%;
  height: 300rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333;
}
.placeholder-class {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: red;
}


.personal{
    margin-top: 20rpx;
    background: #ffffff;
    border-radius: 16rpx;
}
.nickname{
    font-size: 34rpx;
    font-family:PingFang SC;
    font-weight:bold;
}
.background-border-radius{
    background: #F4F5F9;
    border-radius: 10rpx;
    margin-top: 16rpx;
    /* height: 44rpx; */
    /* line-height: 44rpx; */
    /* padding-left: 16rpx; */
    padding: 10rpx 20rpx;
    font-size: 24rpx;
    color: #000;
    font-family:PingFang SC;
    font-weight:560;
}
.info-card{
    padding-bottom: 10rpx;
    border-bottom: 1px solid #EEEEEE;
    color: #333;

    display: flex;


}
.info{
    display: flex;
    align-items: center;
    margin-top: 20rpx;

}
.card-left{
    width: 55%;
}
.card-left>.info>.info-desc{
    /* display: inline-block; */
    font-size: 24rpx;
    display: flex;
    align-items: center;
}
.info-line{
    display: inline-block;
    width: 1px !important;
    height: 10px !important;
    background: #cccccc;
    margin: 0 10rpx;
}
.info-card>.info{
    font-size: 28rpx;
}
.card-right{
    width: 45%;
    font-size: 22rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family:PingFang SC;
    font-weight:bold;


}
.card-right-location{
    width: 40rpx;
    height: 40rpx;
}

.info-card-education{
    /* margin-top: 20rpx;
    font-size: 24rpx;
    color: #000; */
}
.info-card-occupation{
    display: flex;
}
.occupation-left{
    width: 40%;
    font-size: 22rpx !important;
    margin-right: 20rpx;
    display: flex;
    align-items: center;
}


.card-right-picker{
    display: flex;
    justify-content: center;
    align-items: center;
}



.weui-input{
  background: #f2f2f2;
border-radius: 8rpx;

    display: inline-block;
    width: 200rpx;
}
.weui-input-nickName{
  
  background: #f2f2f2;
border-radius: 8rpx;
    width: 100%;
    display: inline-block;
}
.weui-input-age{
  
  background: #f2f2f2;
border-radius: 8rpx;
    display: inline-block;
    width: 80rpx;
}
</style>