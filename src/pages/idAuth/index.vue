<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">身份认证</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        <!-- 提示 -->
        <div class="center-explain">
          <img class="center-explain-img" src="/static/images/new/anquan.png" alt />
          <div class="center-explain-text">信息仅用审核，青青校园保障您的信息安全</div>
        </div>

        <!-- 分割线-->
        <div class="index-center-line1"></div>

        <!-- 步骤条 Steps -->

        <div class="index-center-steps">
          <div class="steps-item">
            <div class="steps-item-circular-number">
              <div class="steps-item-circular" :class="status===1?'active':''">1</div>
            </div>
            <div class="steps-item-title" :class="status===1?'activeTitle':''">身份认证</div>
          </div>
          <div class="steps-item">
            <div class="steps-item-circular-number">
              <div class="steps-item-circular" :class="status===2?'active':''">2</div>
            </div>
            <div class="steps-item-title" :class="status===2?'activeTitle':''">公司认证</div>
          </div>
          <div class="steps-item">
            <div class="steps-item-circular-number">
              <div class="steps-item-circular" :class="status===3?'active':''">3</div>
            </div>
            <div class="steps-item-title" :class="status===4?'activeTitle':''">学历认证</div>
          </div>
        </div>

        <!-- 分割线-->
        <div class="index-center-line"></div>

        <!-- 输入框 -->
        <div class="index-center-id-auth">
          <div class="center-id-auth-input" v-for="(item,i) in inputArray[status]" :key="i">
            <idAuthInput :inputArray="item"></idAuthInput>
          </div>
        </div>

        <!-- 下一步 -->
        <div class="index-center-next">
          <div class="index-center-next-button" @click="nextButton">{{buttonText}}</div>
        </div>
        <div class="index-center-service">
          <img class="service-icon" src="/static/images/new/service.png" alt />
          <span class="service-title">联系客服</span>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";

import idAuthInput from "./child/idAuthInput";
export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      secondPageHeight: 0,
      status: 1,
      buttonText: "下一步",
      inputArray: {
        1: [{ title: "姓名" }, { title: "身份证号码" }],
        2: [{ title: "公司名称" }, { title: "职务" }],
        3: [{ title: "学校名称" }, { title: "学籍号" }]
      }
    };
  },

  components: {
    navigationBar,
    idAuthInput
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {
    nextButton() {
      let status = this.status + 1;

      if (status >= 3) {
        this.status = status;
        this.buttonText = "提交";
        if (status > 3) {
          this.buttonText = "下一步";
          // 发送网络请求
          wx.showToast({
            title: "成功",
            icon: "success",
            duration: 2000
          });
          this.status = 1;
        }
      } else {
        this.status = status;
      }
    }
  },

  created() {}
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
  /* background: #f2f6f9; */
  background: #ffffff;
  overflow: hidden;
  padding-bottom: 40rpx;
}

/* 安全 */
.center-explain {
  /* margin: 20rpx; */
  /* background: rgba(255, 255, 255, 1); */
  background: #f2f6f9;
  padding: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-explain-img {
  width: 30rpx;
  height: 30rpx;
  vertical-align: middle;
  margin-right: 20rpx;
}
.center-explain-text {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}

/* 步骤条 */
.index-center-steps {
  display: flex;
  justify-content: space-between;
  padding: 34rpx 120rpx 80rpx 120rpx;
}
.steps-item {
  text-align: center;
  /* width: 30%; */
}
.steps-item-circular {
  width: 48rpx;
  height: 48rpx;
  line-height: 48rpx;
  background: rgba(201, 201, 201, 1);
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
}
.active {
  background: rgba(52, 104, 247, 1);
  color: #ffffff;
}
.activeTitle {
  color: #333333;
}

.index-center-line {
  height: 10rpx;
  background: #f2f6f9;
}
.index-center-id-auth {
  padding: 83rpx 90rpx;
}
.steps-item-circular-number {
  display: flex;
  justify-content: center;
}
.steps-item-title {
  height: 27rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 66rpx;
}

/* 输入框 */
.center-id-auth-input {
  margin-top: 20rpx;
}

/* 下一步 */
.index-center-next {
  position: fixed;
  bottom: 110rpx;
  width: 100%;
  display: flex;
  justify-content: center;
}
.index-center-next-button {
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: linear-gradient(
    0deg,
    rgba(242, 204, 146, 1),
    rgba(229, 178, 101, 1)
  );
  box-shadow: 0px 6rpx 18rpx 0px rgba(0, 0, 0, 0.15);
  border-radius: 40rpx;

  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.index-center-service {
  position: fixed;
  bottom: 36rpx;
  width: 100%;
  text-align: center;
}
.service-icon {
  width: 36rpx;
  height: 34rpx;
  vertical-align: middle;
}
.service-title {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(17, 17, 17, 1);
}
</style>
