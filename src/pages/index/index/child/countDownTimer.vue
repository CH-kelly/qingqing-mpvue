<template>
  <div class="count-down-timer">
    <div
      class="count-down-timer-title"
    >本次推荐已结束，今天你喜欢了{{downTimerArray.like}}个人，后续将会把你推荐给他们，如果相互喜欢即可配对聊天</div>
    <div class="count-down-timer-line"></div>
    <div class="count-down-timer-content">
      <div class="next-recommend">距离下次推荐开始</div>
      <!-- <div class="down-timer">02:49:35</div> -->
      <div class="down-timer">{{downTimerString}}</div>
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
      downTimerInter: null,
      downTimerString: this.getDownTimer(this.downTimerArray.timer)
    };
  },

  computed: {
    downTimer() {
      // let timer = 10170;
      let timer = this.downTimerArray.timer;
      this.downTimerInter = setInterval(() => {
        timer--;
        if (timer < 0) {
          clearInterval(this.downTimerInter);
        } else {
          this.downTimerString = this.getDownTimer(timer);
        }
      }, 1000);
    }
  },
  onshow() {},
  mounted() {},
  methods: {
    getDownTimer(timer) {
      // console.log(timer);

      if (timer < 60 && timer > 10) {
        return "00:00:" + timer;
      }

      if (timer < 10) {
        return "00:00:0" + timer;
      }
      let hour1, minute1;
      let hour = String(parseInt(timer / 3600));

      if (hour.length < 2) {
        hour1 = "0" + hour;
      } else {
        hour1 = hour;
      }

      let minute = String(parseInt((timer - hour * 3600) / 60));
      if (minute.length < 2) {
        minute1 = "0" + minute;
      } else {
        minute1 = minute;
      }

      let second = String(timer - hour * 3600 - minute * 60);
      if (second.length < 2) {
        second = "0" + second;
      }
      return hour1 + ":" + minute1 + ":" + second;
    }
  }
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