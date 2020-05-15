<template>
  <div class="id-auth-input">
    <div class="id-auth-input-left">{{inputArray.title}}</div>
    <div class="id-auth-input-right">
      <input type="text" placeholder="点击填写" placeholder-style="color:#999999;font-size:26rpx;direction: rtl;" />
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";

export default {
  props: {
    inputArray: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped>
.id-auth-input {
  width: 100%;
  height: 75rpx;
  border: 1rpx solid rgba(204, 204, 204, 1);
  border-radius: 10rpx;

  display: flex;
}
.id-auth-input-left {
  width: 30%;

  line-height: 75rpx;
  padding-left: 32rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.id-auth-input-right {
  width: 70%;
  /* background: orange; */
}
.id-auth-input-right > input {
  height: 75rpx;
  padding-right: 32rpx;
  direction: rtl;
  color:#333;font-size:26rpx;
  font-family: PingFang SC;

  }
</style>
