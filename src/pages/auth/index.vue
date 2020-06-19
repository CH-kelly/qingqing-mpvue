<template>
  <div class="index-center">
    <div class="index-center-model">
      <img class="logo" src="/static/images/lvy_icon.png" alt />
      <div class="index-center-title-h1">马上注册青青校园</div>
      <div class="index-center-title-h1">高学历优质青年的交友平台</div>
      <div class="index-center-bottom">
        <div class="index-center-bottom-wx">
          <div class="bottom-wx-log" @click="wxLogin">
            <span class="bottom-wx">微信登录</span>
            <span class="bottom-wx-secert">私密</span>
          </div>
        </div>
        <div class="bottom-tourist" @click="lookAround">暂不登录</div>
        <div class="bottom-agreement">
          登录即表明您同意
          <span class="bottom-agreement-protocol" @click="goUserAgreement">《用户协议》</span>与
          <span class="bottom-agreement-protocol" @click="goPrivacyPolicy">《隐私政策》</span>
        </div>
      </div>
    </div>

    <div v-if="showModel===1" class="reminder">
      <div class="reminder-model">
        <div class="reminder-title">温馨提示</div>
        <div class="reminder-content">
          <div>亲，感谢您信任并使用青藤之恋！我们依据最新的法律法规、监管政策要求及业务实际情况更新了青藤之恋</div>
        </div>
        <div class="reminder-button">
          <div class="reminder-button-left" @click="disagree">不同意</div>
          
          <div >
              <button class="reminder-button-left" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo"  style="background: rgba(27,233,201,1);border: none;" >同意</button>
          </div>

          <!-- <div
            class="reminder-button-left"
            @click="agree"
            style="background: rgba(27,233,201,1);border: none;"
          >同意</div> -->
        </div>
      </div>
    </div>




  </div>

  

</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
        showModel: 0,
        code:"",
    };
  },
  methods: {
    goUserAgreement() {
      // wx.showToast({
      //   title: "《用户协议》",
      //   icon: "success",
      //   duration: 2000
      // });
      wx.navigateTo({
        url: "/pages/agreement/main?agreement=1"
      });
    },
    goPrivacyPolicy() {
      // wx.showToast({
      //   title: "《隐私政策》",
      //   icon: "success",
      //   duration: 2000
      // });
      wx.navigateTo({
        url: "/pages/agreement/main?agreement=2"
      });
    },
    lookAround() {
      this.$emit('SignInTemporarily',0)
    },
    wxLogin() {
      console.log("微信登录");
      let that = this;
      wx.login({
          success (res) {
            if (res.code) {
              console.log(res.code);
              that.code = res.code;
            }
          }
      })
      
      this.showModel = 1;
    },
    disagree() {
      console.log("不同意");
      // 不同意
      this.showModel = 0;
    },
    bindGetUserInfo(e) {
        // console.log('回调事件后触发')
        const self = this;
        if(this.code === ''){
          console.log('这是code是空',code)
        }
        if (e.mp.detail.userInfo){
            let code = self.code;  
            let inviter = store.state.inviter || wx.getStorageSync('inviter');
            let { encryptedData,userInfo,iv } = e.mp.detail;

            console.log('inviter------',inviter);
            self.postRequest('home/user/login',{ encryptedData,iv,code,inviter}).then(res=>{
                wx.showToast({
                  title: res.message,
                  icon: 'success',
                  duration: 2000
                })
              if(res.code ===0){
                let openid = res.data.openID;
                store.state.is_new_user = res.data.is_new_user
                store.state.token = res.data.token
                
                userInfo.openid = openid;
                console.log('userInfo------------',userInfo);

                wx.setStorageSync('userInfo', JSON.stringify(userInfo)); //保存用户信息
                wx.setStorageSync('token', res.data.token); //保存用户登录的token信息

                self.$emit('SignInTemporarily',res.data.token)  //弹框隐藏,并发送事件通知父组件
                store.commit('setisLogin',1)
                store.commit('setUserInfo',userInfo)

                console.log('----------------')
                console.log(this.appIMDelegate);
                
                this.appIMDelegate.onLaunch();
                this.appIMDelegate.onShow();
              
              }
            }).catch(res=>{
              wx.showToast(res)
            })
        } else {
            //用户按了拒绝按钮
            console.log('用户按了拒绝按钮');
        }
    },
  },

  created() {}
};
</script>

<style scoped>
.index-center {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
}

.index-center-model {
  padding: 40rpx;

  height: 660rpx;
  border-radius: 14rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  background: #ffffff;
}
.logo {
  width: 108rpx;
  height: 108rpx;
  margin-top: 98rpx;
  margin-bottom: 44rpx;
}
.index-center-title-h1 {
  font-size: 30rpx;
  line-height: 42rpx;
  font-weight: bold;

  font-family: PingFang SC;
}

.index-center-bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.index-center-bottom-wx {
  margin-top: 60rpx;

  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-wx-log {
  width: 440rpx;
  height: 100rpx;
  border-radius: 56rpx;
  color: #29363b;
  background: #1be9c9;

  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-wx {
  font-size: 32rpx;
  font-weight: 800;
  font-family: PingFang SC;
}
.bottom-wx-secert {
  width: 68rpx;

  height: 28rpx;
  line-height: 28rpx;
  background: #29363b;
  border-radius: 14rpx;
  color: #1be9c9;
  font-weight: bold;
  margin-left: 12rpx;
  text-align: center;
  font-size: 20rpx;
}
.bottom-tourist {
  margin-top: 30rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFang SC;
}
.bottom-agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40rpx;
  color: #999;
  text-align: center;
  font-size: 22rpx;
  font-family: PingFang SC;
}

.bottom-agreement-protocol {
  margin: 0 8rpx;
  color: #1be9c9;
}










/* 温馨提示 */
.reminder {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reminder-model {
  border-radius: 10rpx;
  background: #fff;
}
.reminder-title {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  font-size: 32rpx;
  font-family: PingFang SC;
}
.reminder-content {
  width: 568rpx;
  margin: 40rpx;
  margin-bottom: 96rpx;
  line-height: 50rpx;
}
.reminder-button {
  margin-bottom: 32rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.reminder-button-left {
  width: 260rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border-radius: 45rpx;
  border: 2rpx solid rgba(238, 238, 238, 1);
  padding: 0;
}
</style>
