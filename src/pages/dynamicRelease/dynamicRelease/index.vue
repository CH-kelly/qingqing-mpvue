<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center" v-if="type!=3">发布</div>
      
      <div slot="center" v-else>举报</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        <!-- 发布 -->

        <textarea
          @input="bindTextAreaBlur"
          class="index-center-textarea"
          :placeholder="placeholder"
          placeholder-class="placeholder-class"
        />
        <div class="index-center-line"></div>

        <!-- 上传图片 -->
        <div class="index-center-upload-image">
          <div class="upload-image-success" v-for="(item,i) in successImage" :key="i">
            <img class="success-image" :src="item" alt />
            <img
              @click="deleteImage(i)"
              class="delete-image"
              src="/static/images/new/delete-image.png"
              alt
            />
          </div>
          <div
            class="upload-image-success"
            @click="addUploadImage"
            v-show="successImage.length < 9"
          >
            <img class="upload-background" src="/static/images/new/upload-background.png" alt />
          </div>
        </div>

        <!-- 举报提示 -->
        <div class="report" v-if="type==3">
          <img class="report-icon" src="/static/images/new/report-waring.png" alt />
          <div class="report-title">告诉我们具体原因，以及提供相关截图有利于正确处理哦~</div>
        </div>
      </div>
    </scroll-view>

    <!-- 发布-->
    <div class="index-center-next" v-if="type!=3">
      <div class="index-center-next-button" @click="release">发布</div>
    </div>
    <!-- 发布-->
    <div class="index-center-next" v-else>
      <div class="index-center-next-button report-submit" @click="release">提交</div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      secondPageHeight: 0,
      placeholder:"这一刻想分享给大家...",
      successImage: [],
      photos:[],
      type:0,   //1动态 2恋爱故事 3举报
      content:'',
      token:'',
      reason: [
        "资料作假",
        "垃圾广告",
        "低俗色情",
        "诽谤谩骂",
        "诈骗、托儿",
        "其他违规行为"
      ],
      title:'',
      id:0,
      uid:0
    };
  },

  components: {
    navigationBar
  },
  onLoad: function(options) {
    this.token = store.state.token || wx.getStorageSync('token');
    console.log(options);
    if (options) {
      this.type = options.type || 1;
      if(this.type == 3 ){
        this.placeholder = "填写举报原因.....（必填）";
        this.title = this.reason[options.reason];
        this.id=options.id;
        this.uid=options.uid;
        console.log(this.title,options.reason,this.id,this.uid);
      }
      
    }
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {
    bindTextAreaBlur(e) {
      this.content = e.mp.detail.value;
    },
    deleteImage(key) {
      this.successImage.splice(key, 1);
      this.photos.splice(key, 1);
      console.log("key", key);
    },
    addUploadImage() {
      let that = this;
      let token = this.token;
      console.log("上传图片");
       wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera','album'],
        success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            that.successImage.push(tempFilePaths[0]);
            that.isShowModel = 0;

            let data = {token,tempFilePaths:res.tempFilePaths};
            that.uploadPhoto(data).then(res=>{  
              let result = JSON.parse(res.data);
              console.log(res,result);
              if(result.code === 0){
                that.photos.push(result.data.img);
              }
            },err=>{
              console.log(err);
              
            })
            
            
          }
        })
    },
    // 发布或举报
    release(){
      let that = this;
      let url = '';
      let data = {};
      if(this.type == 3){ //1动态 2恋爱故事 3举报
         data = {
            token:that.token,
            id:that.id,
            uid:that.uid,
            type:1,
            title:that.title,
            reason:that.content,
            reason_url:JSON.stringify(that.photos),
        };
        url = "home/moment/reported_moment"; 
      }else{
        data = {
            token:that.token,
            content:that.content,
            photos:JSON.stringify(that.photos),
            type:that.type
        };
        url = '/home/moment/add_moment';
      }

      
      console.log(data);
      that.postRequest(url,data).then(res=>{  
          if(res.code===0){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 3000
            })
             //1动态 2恋爱故事 3举报
            if(that.type ==1){
              setTimeout(() => {
                wx.switchTab({
                    url:'/pages/dynamic/dynamic/main'
                })
              }, 3000);
            }else if(that.type  ==2){
              setTimeout(() => {
                wx.navigateBack({
                  delta:1
                })
              }, 3000);
            }else if(that.type  ==3){
              setTimeout(() => {
                wx.navigateBack({
                  delta:1
                })
              }, 3000);
              
            }
           
          }
        },err=>{
          console.log(err);
          
        })
    },
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
  padding: 34rpx 30rpx;
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

.index-center-line {
  margin: 20rpx 0;
  height: 1px;
  background: #dddddd;
}

/* 上传图片 */
.index-center-upload-image {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.upload-image-success {
  width: 22%;
  height: 160rpx;
  position: relative;
  /* background: orange; */
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}
.upload-image-success > image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  border-radius: 16rpx;
}
.delete-image {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  z-index: 1;
  width: 24rpx !important;
  height: 24rpx !important;
}

/* 发布按钮 */
.index-center-next {
  position: fixed;
  bottom: 52rpx;
  width: 100%;
  display: flex;
  justify-content: center;
}
.index-center-next-button {
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  
  background:linear-gradient(0deg,rgba(219,128,100,1),rgba(253,59,109,1));
box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);

  box-shadow: 0px 6rpx 18rpx 0px rgba(0, 0, 0, 0.15);
  border-radius: 40rpx;

  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
/* 举报提交按钮 */
.report-submit {
  /* background: rgba(89, 94, 109, 1); */
  
  /* box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.15); */
}

.report {
  height: 84rpx;
  background: rgba(241, 241, 241, 1);
  border-radius: 10rpx;

  display: flex;
  align-items: center;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  padding-left: 40rpx;
}

.report-icon {
  width: 42rpx;
  height: 42rpx;
  vertical-align: middle;
  margin-right: 10rpx;

}
.report-title {
  width:338rpx;
height:51rpx;
font-size:20rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
line-height:32rpx;
}
</style>
