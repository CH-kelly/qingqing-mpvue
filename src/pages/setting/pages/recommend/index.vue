<template>
  <div>
    <navigation-bar  shadow="true">
      <div slot="center">
        推荐给好友
      </div>
    </navigation-bar>
    <scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">

    <div class="index-center" >
        
    </div>
    
 </scroll-view>

  </div>
</template>
<script>

import navigationBar from '@/components/navbar/navbar'
import store from '@/store'

export default {
    
  components: {
    navigationBar
  },
  data(){
      return {
          systemHeight:0,
          contentHeight:0,
          title:'',
          placeholder:''
      }
  },
  onLoad(option){
      
  },
  mounted(){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     
     this.systemHeight = store.state.systemHeight;
     let height = store.state.secondPageHeight;
     this.contentHeight = height;
     
  },
  methods:{
     
      bindDateChange(){

      }
  }
};
</script>
<style scoped>
.index-center{
  background: #ffffff;
    overflow: hidden;
    padding-bottom: 40rpx;
}


</style>