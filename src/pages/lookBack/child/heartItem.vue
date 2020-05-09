<template>
  <div class="heart-list-item">
    <div class="list-item" v-for="(item,i) in heartList" :key="i">
      <img class="list-item-img" :src="item.avatar" alt />
      <div class="nickname">{{item.nickname}}</div>
      <div class="info">
        <span class="info-desc">19岁</span>
        <span class="info-line"></span>
        <span class="info-desc">166cm</span>
        <span class="info-line"></span>
        <span class="info-desc">水瓶座</span>
      </div>
      <div class="education">
        <img class="education-icon" src="/static/images/icon_school@2x.png" alt />
        <span class="education-title">{{item.education}}</span>
      </div>
      <div class="list-item-desc" v-if="item.like==1">
        <img src="/static/images/greet/like_icon.png" alt />
        <span>已喜欢</span>
      </div>
      <div class="list-item-desc" v-if="item.like==0">
        <img src="/static/images/greet/like_icon.png" alt />
        <span>无感</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    heartList: { type: Array, default: [] }
  }
};
</script>
<style scoped>
.heart-list-item {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.list-item {
  width: 47%;
  /* background-color: skyblue; */
  margin-bottom: 20rpx;
  position: relative;
}
.list-item-img {
  width: 100%;
  height: 340rpx;
  border-radius: 26rpx;
}
.education-icon {
  width: 26rpx;
  height: 24rpx;
  margin-right: 8rpx;
}
.nickname {
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(16, 16, 16, 1);
}

.info-desc {
  display: inline-block;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.info-line {
  display: inline-block;
  width: 1px !important;
  height: 10px !important;
  background: #cccccc;
  margin: 0 10rpx;
}
.education {
  display: flex;
  align-items: center;
}
.education-title {
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 51, 51, 1);
}

.list-item-desc {
  position: absolute;
  top: 10rpx;
  right: 10rpx;

  display: flex;
  align-items: center;
  /* padding: 5rpx 8rpx; */
  background: rgba(0, 0, 0, 0.8);
  width: 130rpx;
  height: 50rpx;
  border-radius: 38rpx;
  color: #ffffff;

    
font-size:23rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,255,255,1);


}
.list-item-desc > image {
  width: 30rpx;
  height: 30rpx;
  vertical-align: middle;
}
</style>