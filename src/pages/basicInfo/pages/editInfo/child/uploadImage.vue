<template>
  <div class="center-upload-backgroundImg">
    <div class="center-upload-title">
      <div class="center-upload-origin"></div>
      <div class="center-upload-title">添加个人照片，可得到对方青睐</div>
    </div>
    <div class="center-upload-center">
      <div class="center-upload-left center-upload-border" @click="uploadImage(0)">
        <img v-if="images[0] !=1" :src="images[0]" alt />
        <img v-else  src="/static/images/new/upload-background.png" alt />
      </div>
      <div class="center-upload-right">
        <div class="center-upload-right1  center-upload-border1"  @click="uploadImage(1)">
        <img v-if="images[1] !=1" :src="images[1]" alt />
          <img v-else src="/static/images/new/upload-background.png" alt />
        </div>
        <div class="center-upload-right1  center-upload-border1"  @click="uploadImage(2)">
        <img v-if="images[2] !=1" :src="images[2]" alt />
          <img v-else src="/static/images/new/upload-background.png" alt />
        </div>
      </div>
    </div>
    <div class="center-upload-bottom">
      <div class="center-upload-bottom-image  center-upload-border1"  @click="uploadImage(3)">
        <img v-if="images[3] !=1" :src="images[3]" alt />
          <img  v-else src="/static/images/new/upload-background.png" alt />
      </div>
      <div class="center-upload-bottom-image  center-upload-border1"  @click="uploadImage(4)">
        <img v-if="images[4] !=1" :src="images[4]" alt />
          <img  v-else  src="/static/images/new/upload-background.png" alt />
      </div>
      <div class="center-upload-bottom-image  center-upload-border1"  @click="uploadImage(5)">
        <img v-if="images[5] !=1" :src="images[5]" alt />
          <img  v-else  src="/static/images/new/upload-background.png" alt />
      </div>
    </div>
  </div>
</template>
<script lang="">
export default {
  props:{
    images:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      isModel:false,
    }
  },
  methods:{
    uploadImage(key){
      console.log('uploadImage');
      this.$emit('uploadImageModel',key);
    }
  }
};
</script>
<style scoped>
img{
    vertical-align: middle;
}
.center-upload-backgroundImg {
  margin: 20rpx;
  padding: 20rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 20rpx;
}
.center-upload-origin {
  width: 14rpx;
  height: 14rpx;
  background: rgba(127, 221, 198, 1);
  border-radius: 50%;
  margin-right: 20rpx;
}
.center-upload-title {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
  display: flex;
  align-items: center;
}
.center-upload-center {
  display: flex;
  justify-content: space-between;
  margin: 24rpx 0;
}
.center-upload-left {
    width: 69%;
  border-radius: 20rpx;
  overflow: hidden;
  /* background: chartreuse; */
}
.center-upload-left>image{
    height: 440rpx;
    width: 100%;
}
.center-upload-right{
    width: 29%;
    /* background: orange; */
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    flex-direction:column
    
}

.center-upload-border1 {
  border-radius: 20rpx;
  overflow: hidden;
}
.center-upload-border1>image{
    height: 100%;
    width: 100%;
}
.center-upload-right1{
    height: 48%;
    width: 100%;



}

.center-upload-bottom{
    display: flex;
    justify-content: space-between;
}
.center-upload-bottom-image{
    width: 30%;
    height: 208rpx;
}
.center-upload-bottom-image>image{
    height: 100%;
    width: 100%;
}









</style>