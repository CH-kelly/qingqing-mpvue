<template>
  <div class="count-down-timer">
    <div
      class="count-down-timer-title"
    >本次推荐已结束，今天你喜欢了{{downTimerArray.like}}个人，后续将会把你推荐给他们，如果相互喜欢即可配对聊天</div>
    <div class="count-down-timer-line"></div>
    <div class="count-down-timer-content">
      <div class="next-recommend">距离下次推荐开始</div>
      <div class="down-timer">02:49:35</div>
      <div class="timer-image">
        <img src="/static/images/new/timer-image.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  props: {
    downTimerArray: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // distanceBottom:70
    };
  },
  computed: {},
  onshow() {},
  mounted() {}
};
</script>
<style scoped>
.count-down-timer {
  padding: 30rpx;
  background: #ffffff;
  border-radius: 30rpx;
}
.count-down-timer-title {
  padding: 0rpx 70rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
  text-align: center;
}
.count-down-timer-line {
  height: 1rpx;
  margin-top: 36rpx;
  background: rgba(238, 238, 238, 1);
}
.next-recommend {
  margin-top: 48rpx;
  text-align: center;
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.down-timer {
  margin-top: 26rpx;
  text-align: center;
  font-size: 64rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  /* line-height: 38rpx; */
}

.timer-image {
  margin-top: 80rpx;
  text-align: center;
  margin-bottom: 65rpx;
}
.timer-image > image {
  width: 429rpx;
  height: 329rpx;
}
</style>