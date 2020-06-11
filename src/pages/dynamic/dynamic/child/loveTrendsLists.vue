<template>
  <div class="love-trends-head" v-if="dynamicList.length != 0">
    <div class="love-trends-lists-item" v-for="(item,i) in dynamicList" :key="i" @click="dynamicDetail(item.id)">
      <div class="head-top">
        <div class="head-left">
          <img class="head-avatar" :src="item.avatar_url" alt />
        </div>
        <div class="head-center">
          <div class="head-nickname">{{item.nickname}}</div>
          <div class="head-desc">{{item.add_time}}</div>
        </div>
        <div class="head-right"></div>
      </div>
      <div class="lists-item-center">
        <div class="lists-item-center-content" v-if="item.content">{{item.content}}</div>
        <div class="lists-item-center-image" v-if="item.photos">
          <img :src="s" alt v-for="(s,r) in item.photos" :key="r" />
        </div>
        <div class="comment-q">
          <div class="comment-q-left">
            <div class="comment-like" @click.stop="commentLike(item,1)">
              <img v-if="item.isLike == 1" class="dynamic-icon" src="/static/images/new/heart2.png" alt />
              <img v-else class="dynamic-icon" src="/static/images/new/no-like1.png" alt />
              <div class="center-heart">{{item.thumbs_num}}</div>
            </div>
            <div class="comment-like"  @click.stop="dynamicDetail(item.id)">
              <img v-if="item.isComment == 1" class="dynamic-icon" src="/static/images/new/comment.png" alt />
              <img v-else class="dynamic-icon" src="/static/images/new/no-like2.png" alt />
              <div class="center-heart">{{item.dynamic_review_num}}</div>
            </div>
          </div>
          <div class="comment-q-right"  @click.stop="report(item)">
            <img class="dynamic-icon-report" src="/static/images/new/no-like3.png" alt />
          </div>
        </div>
      </div>
    

    </div>
    
        
  </div>
</template>
<script>

import store from '@/store'


export default {
  props: {
    dynamicList: { type: Array, defaula: [] }
  },
  methods:{
    dynamicDetail(id){
      console.log('dynamicDetail',id);
      wx.navigateTo({
        url:"/pages/dynamic/pages/dynamicDetail/main?id="+id
      })
    },
    commentLike(item){ //点赞
      let that = this;
      let token = store.state.token || wx.getStorageSync('token');
      let id = item.id;
      let url = '';
      let title = '';
      if(item.isLike == 1){ //取消点赞

          url = "/home/moment/cancel_thumbs_num";
          title="取消成功"
      }else{    //点赞

          url = "/home/moment/thumbs_num";
          title="点赞成功"
      }
      that.postRequest(url,{token,id:id}).then(res=>{
        console.log('res',res);  
          if(res.code===0){
            if(item.isLike == 1){
              item.thumbs_num = item.thumbs_num - 1;
            }else{
              item.thumbs_num = item.thumbs_num + 1;
            }
            item.isLike = !item.isLike;

            wx.showToast({
              title: title,
              icon: 'success',
              duration: 3000
            })
          }
        },err=>{
          console.log(err);
          
        })
    },
    report(item){ //点了三个按钮
        this.$emit('more',item);
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
  padding: 0 30rpx 30rpx 30rpx;
}
.lists-item-center-content {

  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;


line-height:56rpx;
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 20rpx;
}

.lists-item-center-image {
  height: 340rpx;
  overflow: hidden;
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