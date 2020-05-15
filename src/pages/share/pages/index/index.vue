<template>
  <div style="background: #FF421E">
    <navigation-bar >
      <div slot="center">推荐给好友</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
          <img src="/static/images/receive_member.png" alt="">
        
            <div class="index-content">
                <div class="receive">
                    <div class="receive-content">
                        <div class="title">
                            <img src="/static/images/left.png" alt="">
                            <div class="title-center">免费领取会员</div>
                            <img class="image-right" src="/static/images/left.png" alt="">
                        </div>
                        <scroll-view scroll-y enable-back-to-top style="height:260rpx">
                            <div class="item" v-for="(item,i) in list" :key="i">
                                <div class="content_left">{{item.content_left}}</div>
                                <div class="content_left content_right">{{item.content_right}}</div>
                            </div>
                        </scroll-view>
                    </div>
                </div>
                <div class="receive rule">
                    <div class="title">
                        <img src="/static/images/left.png" alt="">
                        <div class="title-center">活动规则</div>
                        <img class="image-right" src="/static/images/left.png" alt="">
                    </div>
                    
                    <scroll-view scroll-y enable-back-to-top style="height:260rpx">
                        <rich-text :nodes="rule"></rich-text>   
                    </scroll-view>
                </div>
                <div class="button">
                    立即邀请好友
                </div>
            </div>


      </div>
    </scroll-view>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";


export default {
  data() {
    return {
      headInfo: {},
      systemHeight: 0,
      contentHeight: 0,
      token:null,
      userInfo:[],
      rule:'',
      list:[],
    };
  },
  onShow() {

    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.get_user_info(token);
    this.recommend_count(token);
  },

  components: {
    navigationBar,
   
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
  },
  methods: {
    get_user_info(token){
      let that = this;
      that.postRequest('home/user/get_user_info',{token}).then(res=>{  
          if(res.code===0){
              that.userInfo = res.data;
          }
        },err=>{
          console.log(err);
          
        })
    },
    recommend_count(token){
      let that = this;
      that.postRequest('home/user/recommend_count',{token}).then(res=>{  
          if(res.code===0){
            this.rule = res.data.rule;
            this.list = res.data.list;
          }
        },err=>{
          console.log(err);
          
        })
    },
  }
};
</script>

<style scoped>
.index-center{
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #FF421E
}
.index-center>image{
width: 100%;
height: 126%;
vertical-align: middle;
}
.index-content{
    
    /* background: #FF421E; */
    width: 100%;
    position:absolute;
    top: 55%;

    left: 0;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: center;


}
.receive{
    margin-bottom: 40rpx;

    width:700rpx;
    height:410rpx;
    /* background:rgba(244,159,131,1); */
    background:rgba(255,255,255,1);
    border:16rpx solid rgba(244,159,131,1);
    box-shadow:0px 0px 13rpx 0px rgba(0, 0, 0, 0.23);
    border-radius:40rpx;
}


.receive-content{
    /* width: 100%; */
    /* height: 80%;
    margin: 20rpx;
    background: #ffffff;
    border-radius:36rpx; */

}


.item{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30rpx;
}
.content_left{
    width: 50%;
    text-align: center;
    font-size:30rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(102,102,102,1);
}
.content_right{
    /* margin-left: 60rpx; */
    
font-weight:bold;
color:rgba(253,127,77,1);
}




.title{
    margin: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title>image{
    width: 33rpx;
    height: 28rpx;
}



.title-center{
    margin: 0 20rpx;
    font-size:36rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    text-shadow:0px 2rpx 10rpx rgba(0, 0, 0, 1);
}
.image-right{
    transform: rotateY(180deg);
}

.button{
    width:700rpx;
height:80rpx;
/* background:linear-gradient(180deg,rgba(255,64,29,1),rgba(255,133,60,1)); */
background:linear-gradient(180deg,#ED9C6D,#C18360);
box-shadow:0px 6rpx 18rpx 0rpx rgba(0, 0, 0, 0.15);
border-radius:40px;
    
    text-align: center;
    line-height: 80rpx;
    
    font-size:36rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);

    margin-bottom: 40rpx;
}



</style>
