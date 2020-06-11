<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">恋爱故事</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        
        <!-- 恋爱故事列表 -->
          <loveTrendsLists :dynamicList="dynamicList"  @more="more"></loveTrendsLists>

      </div>

    </scroll-view>
    
    <release :type="2"></release>

    
  <report v-if="isReport===1" @cancel="cancel" :id="id" :uid="uid" :isDelete="isDelete" ></report>

    
    </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";


import loveTrendsLists from "@/pages/dynamic/dynamic/child/loveTrendsLists";  //动态列表
import release from "@/pages/dynamic/dynamic/child/send"; //发布按钮


import report from "@/components/report";

// import loveTrendsLists from "./child/loveTrendsLists";  //动态列表
// import release from "./child/send"; //发布按钮
export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      secondPageHeight: 0,
      dynamicList:[],
      
      isReport:0,
      id:0,
      uid:0,
      isDelete:0,
    };
  },
onLoad(option){
    
  },
  onShow(){
    
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.get_user_moment(token);
  },
  components: {
    navigationBar,loveTrendsLists,release,
    report
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {
     get_user_moment(token){
      let that = this;
      // let page = this.page+1;
      that.postRequest('/home/moment/get_user_moment',{token,type:2}).then(res=>{  
          if(res.code===0){
            that.dynamicList = res.data.list;
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
  background: #ffffff;
  overflow: hidden;
  /* padding: 34rpx 30rpx; */
}


</style>
