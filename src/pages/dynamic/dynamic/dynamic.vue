<template>
  <div>
    <navigation-bar  >
      <div slot="left">
        动态
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">
          <loveTrends :head="head"></loveTrends>
          <loveTrendsLists :dynamicList="dynamicList" @more="more"></loveTrendsLists>
    </div>
 </scroll-view>

    <release :type="1" ></release>

<!-- 底部按钮 -->
    <!-- <bottomNavBar></bottomNavBar> -->

  <report v-if="isReport===1" @cancel="cancel" :id="id" :uid="uid" :isDelete="isDelete" ></report>

  
  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
// import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import loveTrends from "./child/loveTrends";  //动态头部
import loveTrendsLists from "./child/loveTrendsLists";  //动态列表
import release from "./child/send"; //发布按钮

import report from "@/components/report";

export default {
  data () {
    return {


      systemHeight:0,
      contentHeight:0,
      head:{
        avatar_url:"/static/images/lvy_icon.png"
      },
      dynamicList:[],
      page:0,
      token:'',
      
      isReport:0,
      id:0,
      uid:0,
      isDelete:0,
    }
  },
onLoad(option){
    
  },
  onShow(){
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.get_user_moment(token);
  },
  components: {
    navigationBar,
    // bottomNavBar,
    loveTrends,loveTrendsLists,release,
    report

  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
     this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
    get_user_moment(token){
      let that = this;
      let page = this.page+1;
      that.postRequest('/home/moment/get_user_moment',{token,type:1}).then(res=>{  
          if(res.code===0){
            that.dynamicList = res.data.list;
            that.head = {
              "total": res.data.total,
              "nickname": res.data.nickname,
              "avatar_url": res.data.avatar_url
            }
          }
        },err=>{
          console.log(err);
          
        })
    },
    more(item){      
      console.log(item);
      this.isReport = 1;
      this.id = item.id;
      this.uid = item.uid;
      this.isDelete = item.isDelete;
    },
    cancel(){ //关闭举报弹框
      this.isReport = 0;
      this.get_user_moment(this.token);
    }
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
  /* margin: 20rpx 20rpx 40rpx 20rpx; */
  
  background:rgba(242,242,242,1);
  /* background:skyblue; */
  overflow: hidden;

}


</style>
