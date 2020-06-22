<template>
  <div>
    <navigation-bar>
      <div slot="center">详情</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        <swiper :images="images" v-if="images.length>0" />

        <div class="center-content">
          <div style="padding:30rpx">
            <div class="center-content-top">
            <img class="contnent-top-avatar" :src="list.avatar_url" alt />
            <div class="center-content-title1">
              <div class="center-content-title">{{list.nickname}}</div>
              <div class="center-content-date">{{list.add_time}}</div>
            </div>
          </div>
          <div class="content">{{list.content}}</div>
          <div class="comment-q">
            <div class="comment-q-left">
              <div class="comment-like"  @click.stop="commentLike(list,1)">
                <img v-if="list.isLike == 1" class="dynamic-icon" src="/static/images/new/heart2.png" alt />
                <img v-else class="dynamic-icon" src="/static/images/new/no-like1.png" alt />
                <div class="center-heart">{{list.thumbs_num}}</div>
              </div>
              <div class="comment-like">
                <img v-if="list.isComment == 1" class="dynamic-icon" src="/static/images/new/comment.png" alt />
                <img v-else class="dynamic-icon" src="/static/images/new/no-like2.png" alt />
                <div class="center-heart">{{list.dynamic_review_num}}</div>
              </div>
            </div>
            <div class="comment-q-right" @click="report">
              <img class="dynamic-icon-report" src="/static/images/new/no-like3.png" alt />
            </div>
          </div>
          </div>
          <div class="content-comment" v-if="dynamic_review.length>0">
            <div class="contnent-comment-q" v-for="(item,i) in dynamic_review" :key="i">
              <img class="contnent-comment-q-avatar" :src="item.avatar_url" alt />
              <div class="center-comment-title">
                <div class="center-content-title">{{item.nickname}}</div>
                <div class="center-comment-content">{{item.content}}</div>
              </div>
              <div class="comment-right">{{item.add_time}}</div>
            </div>
          </div>
        </div>
        <div class="contnent-comment-message"  :style="{'bottom':inputBottom+'px'}" >
          <div class="comment-message">
            <input
              :adjustPosition="false"
              class="weui-input"
              :value="content"
              @input="inputContent"
              @focus="_chatInput$bind$focus$event" 
              @blur="_chatInput$bind$blur$event"
              placeholder="走心评论，说点好听的~"
              placeholder-class="placeholder-class"
            />
          </div>
          <div class="send-comment-message" @click="sendComment">发送</div>
        </div>
      </div>
    </scroll-view>


    <report v-if="isReport===1" @cancel="cancelReport" :id="list.id" :uid="list.uid" :isDelete="isDelete" ></report>

  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import swiper from "@/components/swiper";
import report from "@/components/report";


import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      images: [],
      isReport:0,
      id:0,
      list:{},
      dynamic_review:[],  //评论列表
      content:'',
      isDelete:0,

      inputBottom:0,
    };
  },
  onLoad(option){
    this.id = option.id
  },
  onShow(){

    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.get_user_moment_detail(token);
  },
  components: {
    navigationBar,
    swiper,
    report
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight- 50;
  },
  methods: {
    _chatInput$bind$focus$event(e){
      console.log("键盘聚焦")
      if(e.mp.detail.height != 0){
          this.inputBottom = e.mp.detail.height
      }
    },
    _chatInput$bind$blur$event(){
      console.log('失去焦点')
      this.inputBottom = 0
    },
    inputContent(e){
      console.log(e,e.mp.detail.value)
      this.content = e.mp.detail.value;
    },
    sendComment(){  //发送评论
        let that = this;
        let data = {
          token:this.token,
          id:this.id,
          content:this.content
        }
        that.postRequest('/home/moment/dynamic_review',data).then(res=>{  
          if(res.code===0){
            wx.showToast({
              title: '发布评论成功',
              icon: 'success',
              duration: 3000
            })
            that.content = '';
            that.get_user_moment_detail(that.token);
          }
        },err=>{
          console.log(err);
          
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
    get_user_moment_detail(token){
      let that = this;
      that.postRequest('/home/moment/get_user_moment_detail',{token,id:that.id}).then(res=>{  
          if(res.code===0){
            that.images = res.data.list.photos;
            console.log(that.images)
            that.list = res.data.list;
            that.dynamic_review = res.data.list.dynamic_review;
            that.isDelete = res.data.isDelete
          }
        },err=>{
          console.log(err);
          
        })
    },
    report(){
      // 举报
      console.log('report举报');
      this.isReport = 1;
    },
    cancelReport(){
      this.isReport = 0;
      
      this.get_user_moment_detail(this.token);
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.navigation-left-back {
  width: 90rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 22rpx;
  color: #333333;
  font-size: 26rpx;
  font-weight: normal;

  overflow: hidden;
}
.navigation-center-image {
  width: 45%;
  height: 50%;
}

.index-center {
  /* margin: 20rpx 20rpx 40rpx 20rpx; */
  overflow: hidden;
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
.contnent-comment-q{
  
  padding: 30rpx;
  display: flex;
  align-items: center;
  
  background: #F6F6F6;
}
.contnent-comment-q-avatar{
  width:82rpx;
height:82rpx;
border-radius: 50%;
margin-right: 10rpx;
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
.center-heart {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.center-comment-content{
  
font-size:26rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
}
.comment-right{
  
font-size:22rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
}




.placeholder-class {
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}

.contnent-comment-message {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  border-top: 1px solid #f2f2f2;


}
.comment-message{
  width: 76%;
}

.send-comment-message {
  width: 20%;
  /* width: 137rpx; */
  height: 65rpx;
  line-height: 65rpx;
  text-align: center;
  background: rgba(89, 94, 109, 1);
  border-radius: 33rpx;

  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.weui-input{
  padding-left: 36rpx;
}

.center-content-top{
  
  display: flex;
  align-items: center;

}
.contnent-top-avatar{
  width:90rpx;
height:90rpx;
border-radius: 50%;
margin-right: 20rpx;
}
.center-content-title{
  
font-size:30rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(111,121,181,1);
}
.center-content-date{
  
font-size:22rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(102,102,102,1);
}
.content{
  
font-size:26rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
line-height:56rpx;
}

.center-comment-title{
  width: 70%;
}









</style>
