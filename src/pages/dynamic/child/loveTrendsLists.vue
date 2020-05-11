<template>
  <div class="love-trends-head">
    <div class="love-trends-lists-item" v-for="(item,i) in dynamicList" :key="i" @click="dynamicDetail(item)">
      <div class="head-top">
        <div class="head-left">
          <img class="head-avatar" :src="item.avatar" alt />
        </div>
        <div class="head-center">
          <div class="head-nickname">{{item.nickname}}</div>
          <div class="head-desc">{{item.create}}</div>
        </div>
        <div class="head-right"></div>
      </div>
      <div class="lists-item-center">
        <div class="lists-item-center-content">{{item.content}}</div>
        <div class="lists-item-center-image">
          <img :src="s" alt v-for="(s,r) in item.image" :key="r" />
        </div>
        <div class="comment-q">
          <div class="comment-q-left">
            <div class="comment-like">
              <img class="dynamic-icon" src="/static/images/new/no-like1.png" alt />
              <div class="center-heart">1</div>
            </div>
            <div class="comment-like">
              <img class="dynamic-icon" src="/static/images/new/no-like2.png" alt />
              <div class="center-heart">1</div>
            </div>
          </div>
          <div class="comment-q-right">
            <img class="dynamic-icon-report" src="/static/images/new/no-like3.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dynamicList: { type: Array, defaula: [] }
  },
  methods:{
    dynamicDetail(item){
      console.log('dynamicDetail',item);
      wx.navigateTo({
        url:"/pages/dynamicDetail/main"
      })
    }
  }
};
</script>
<style scoped>
.love-trends-head {
  width: 100%;
}
.head-top {
  height: 140rpx;
  display: flex;
  align-items: center;
}
.head-left {
  padding-left: 30rpx;
  width: 15%;
  /* background: orange; */
}
.head-center {
  width: 50%;
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  /* color:rgba(255,255,255,1); */
  color: rgba(111, 121, 181, 1);
}
.head-right {
  width: 35%;
  /* background: orange; */
}
.love-trends-lists-item {
  margin-top: 20rpx;
  background: #ffffff;
}
.head-avatar {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  display: block;
}
.head-desc {
  margin-top: 6rpx;
  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: 500;
  /* color:rgba(255,255,255,0.8); */
  color: rgba(102, 102, 102, 1);
}
.lists-item-center {
  padding-left: 30rpx;
  padding-bottom: 30rpx;
}
.lists-item-center-content {
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 20rpx;
}

.lists-item-center-image {
  display: flex;
  flex-wrap: wrap;
}
.lists-item-center-image > img {
  /* width:265rpx;
    height:264rpx;    */

  /* width:28%;
    height:300rpx;   */
  width: 45%;
  height: 332rpx;

  border-radius: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  vertical-align: middle;
}

.comment-q {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
}
.comment-q-left {
  width: 90%;
  display: flex;
  align-items: center;
}
.comment-like {
  width: 87rpx;
  height: 43rpx;
  border: 1rpx solid rgba(212, 212, 212, 1);
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}
.dynamic-icon {
  width: 28rpx;
  height: 23rpx;
  margin-right: 8rpx;
}
.dynamic-icon-report {
  width: 38rpx;
  height: 8rpx;
}
.center-heart{
  
font-size:24rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
}



</style>