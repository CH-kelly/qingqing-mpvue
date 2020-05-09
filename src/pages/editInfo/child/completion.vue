<template>
  <div class="completion-progress-bar">
    <div class="progress-bar-content">
        <div class="progress-bar-text">完成度</div>
        <div class="progress-bar-slider">
            <div class="slider-active" :style="{width:'50%'}" ></div>
            <!-- <div class="slider-active-block-size" :style="{transform:'translatex(50%)'}">{{number}}%</div> -->
            <div class="slider-active-block-size" :style="{left:'45%'}">{{number}}%</div>
        </div>
    </div>

  </div>

</template>

<script>


export default {
  data () {
    return {
     number:50
    }
  },

  components: {
    
  },
  mounted(option){
    
  },
  methods: {
    
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.completion-progress-bar{
    width: 100%;
    height: 90rpx;
    background: #ffffff;
    padding: 15rpx 17rpx;
    display: flex;
    align-items: center;
}

.progress-bar-content{
    width: 94%;
    display: flex;
    align-items: center;
}
.progress-bar-text{
    width: 20%;
    font-size:28rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
}
.progress-bar-slider{
    width:80%;
    height: 20rpx;
    background:rgba(242,246,249,1);
    border-radius:10rpx;
    /* overflow: hidden; */
    position: relative;
}
.slider-active{
    height:20rpx;
    background:linear-gradient(140deg,rgba(160,232,218,1),rgba(127,221,198,1));
    border-radius:10rpx;
    position: absolute;
}
.slider-active-block-size{
    position: absolute;
    z-index: 1;
    top: -16rpx;
}
.slider-active-block-size{
    width:48rpx;
    height:48rpx;
    line-height: 48rpx;
    background:rgba(233,238,241,1);
    border:2rpx solid rgba(255,255,255,1);
    border-radius:50%;
    
    font-size:16rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(30,126,147,1);
    text-align: center;

}
</style>
