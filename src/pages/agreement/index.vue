<template>
  <div>
    <navigation-bar background="#F4F5F9" >

      <div slot="center">
        {{title}}
      </div>
    </navigation-bar>


<scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
    <!-- <div class="index-center" :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"> -->
    <div class="index-center">
        <div>
            {{content}}
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
      systemHeight: 0,
      contentHeight: 0,
      showModel: 0,
      isReadDialog: 0,
      agreement:0,
      content:'',
      title:'用户协议',
    };
  },
    onShow(){
        // 1用户协议    2隐私协议
        let that = this;
        let type = 1;
        if(this.agreement == 2){
            type = 2;
            this.title = "隐私协议"
        }
        
        this.postRequest('home/login/agreement',{type}).then(res=>{ 
            if(res.code===0){
                that.content = res.data.content;
            }
        },err=>{
        console.log(err);
        
        })
    },
  components: {
    navigationBar
  },
  onLoad(options) {
    console.log(options);
    this.agreement = options.agreement;
    
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {
 
    
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
  text-align: center;
  margin: 0 auto;
  padding: 20rpx;

}
</style>
