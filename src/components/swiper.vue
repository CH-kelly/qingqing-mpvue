<template>
    <swiper class="swiper" :indicator-dots="indicatorDots" 
    :autoplay="autoplay" :interval="interval" 
    :circular="true"
    :duration="duration">
        <block v-for="(item, index) in images" :key="index">
            <swiper-item v-if="item!=1">
                <img v-if="item!=1" :src="item" class="slide-image" mode="aspectFill">
            </swiper-item>
        </block>
    </swiper>
</template>
<script>
export default {
  props: {
    images: {
      type: Array
    }
  },
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500
    };
  }
};
</script>

<style scoped>
.swiper {
    width: 100%;
    height: 680rpx;
    border-radius: 16rpx;
    background-color: #fff;
    overflow: hidden;
}
.slide-image{

  height: 100%;
  width: 100%;
  border-radius: 16rpx;
}
</style>