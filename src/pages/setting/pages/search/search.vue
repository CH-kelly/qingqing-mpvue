<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">搜索设置</div>
    </navigation-bar>

    <div class="index-center" :style="{marginTop:systemHeight+'px'}">
      <div class="index-center-title">修改后次日生效</div>
      <div class="center-content">
        <div class="center-content-item">
          <div class="content-item-title">地区设置</div>
            <div class="content-item-title1">
              <div class="content-item-city">城市</div>
              <div class="content-item-city1">
                <picker mode="region" @change="changeCityValue">
                  <span>请选择：{{province}} {{city}}</span>
                </picker>
                <img class="item-back" src="/static/images/new/back.png" alt />
              </div>
            </div>
        </div>
        <div class="center-content-item">
          <div class="content-item-title">职业设置</div>

            <div class="content-item-title1">
              <div class="content-item-city">职业</div>
              <div class="content-item-city1">
                <picker mode="multiSelector" @change="bindPickerChange4" @columnchange="changeNextCol" :range="mulArr" >
                  <view class="picker"> 请选择：{{professionValue}} </view>
                </picker>
                <img class="item-back" src="/static/images/new/back.png" alt />
              </div>
            </div>
        </div>
      </div>
      <!-- <div class="center-content">
        <div class="center-content-item">
          <div class="content-item-age">
            <div class="content-item-title">年龄设置</div>
            <div class="content-item-age-area">18 - 50</div>
          </div>
          <div class="center-content-slider">
            <slider min=18 max=50  step=1 value=18   block-size=12 block-color="#CCCCCC"
            activeColor="#A0E8DA" backgroundColor="#E9EEF1" 
            @change="sliderChange" />
          </div>
        </div>
      </div> -->

      <div class="center-content">
        <div class="center-content-item">
          <div class="content-item-age">
            <div class="content-item-title">年龄设置</div>
            <div class="content-item-age-area">18 - 50</div>
          </div>
          <div class="center-content-slider">
            <slider class="center-slider" min=18 max=34  step=1 value=18   block-size=12 block-color="#CCCCCC"
            activeColor="#EEEEEE" backgroundColor="#EEEEEE" 
            @change="sliderChange" />
            <slider class="center-slider1"  min=34 max=50  step=1 value=50   block-size=12 block-color="#CCCCCC"
            activeColor="#EEEEEE" backgroundColor="#EEEEEE" 
            @change="sliderChange1"/>
          </div>
          <div class="content-item-age-area">{{age}} - {{age1}}</div>
        </div>
      </div>
    </div>
    
    <div class="button">
      <div class="submit" @click="submit">提交</div>
    </div>
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
      isShowBuyMemberVip: false,

      province: "",
      city: "",      
      professionValue:'',
      age:18,
      age1:50,
      
      mulIndex: [0,0],
      mulArr:[],
      json:[]
    };
  },
  onLoad() {
   
    let token = store.state.token || wx.getStorageSync("token");
    this.token = token;
    this.get_classfy(token);
  },
  components: {
    navigationBar
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
  },
  methods: {
     changeCityValue(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      console.log(id);
      this.province = e.mp.detail.value[0];
      this.city = e.mp.detail.value[1];
    },
     bindPickerChange4: function(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      let name = e.mp.target.dataset.name;
      this.profession = this.mulArr[0][this.mulIndex[0]] + ','+this.mulArr[1][this.mulIndex[1]];
      this.professionValue = this.mulArr[0][this.mulIndex[0]] + ','+this.mulArr[1][this.mulIndex[1]];
      console.log(this.professionValue);
    
    },
    changeNextCol(e){
        // 监听用户操作，改变mulIndex的值
        this.mulIndex[e.target.column] = e.target.value;
        // mulArr[0]的值是不会随用户操作变更的，因此不需要改变  
        // mulArr[1]的值是由 mulIndex[0]的值决定的
        this.mulArr.splice(1,1,this.json[this.mulIndex[0]].children.map(function(v){return v.title}));
        // mulArr[2]的值是由 muIndex[1]的值决定的 
        this.mulArr.splice(2,1,this.json[this.mulIndex[0]].children[this.mulIndex[1]].title);
        
          this.profession = this.mulArr[0][this.mulIndex[0]] + ','+this.mulArr[1][this.mulIndex[1]];
          this.professionValue = this.mulArr[0][this.mulIndex[0]] + ','+this.mulArr[1][this.mulIndex[1]];
          console.log(this.professionValue);
        },
    get_classfy(token, pid = 0) {
      let that = this;
      that.postRequest("home/user/classfy", { token, pid }).then(
        res => {
          if (res.code === 0) {
            that.$nextTick(function(){
              that.json = res.data.classfy;
              that.mulArr[0] = that.json.map(function(v){return v.title});
              that.mulArr[1] = that.json[that.mulIndex[0]].children.map(function(v){return v.title});
            })
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    submit() {    //设置偏好
      let that = this;
      let data = {
        token: this.token,
        province: this.province,
        city: this.city,
        occupate: this.professionValue,
        age: this.age+","+this.age1
      };
      that.postRequest("home/recommend/set_preference", data).then(
        res => {
          if (res.code === 0) {
            wx.showToast({
              title: "修改成功"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    sliderChange(e){
      console.log(e);
      this.age = e.mp.detail.value;
      
    },
     sliderChange1(e){
      console.log(e);
      this.age1 = e.mp.detail.value;
      
    }
  },

  created() {
    // let app = getApp()
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
  /* padding: 0 20rpx 40rpx 20rpx; */
  background: #f2f6f9;
  /* background:skyblue; */
  overflow: hidden;
}

.index-center-title {
  padding: 30rpx;
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 38rpx;
}
.center-content {
  background: #ffffff;
}
.center-content-item {
  padding: 30rpx;
  border-bottom: 1px solid #eeeeee;
}
.content-item-title {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.content-item-title1 {
  margin-top: 15rpx;
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;

  display: flex;
  position: relative;
}
.content-item-city1 {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50rpx;
}
.content-item-city {
  width: 30%;
}

.item-back {
  width: 16rpx;
  height: 20rpx;
  transform: rotate(180deg);
  position: absolute;
  right: 20rpx;
  top: 11rpx;
}








.content-item-age{
  display: flex;
}
.content-item-title{
  width: 60%;
}
.content-item-age-area{
  width: 40%;
  display: flex;
  justify-content: flex-end;
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
  line-height:38rpx;
  padding-right: 50rpx;
}


/* 提交按钮 */
.button {
  margin: 24rpx 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.submit {
  width: 544rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  /* background: rgba(89, 94, 109, 1); */
  background:linear-gradient(0deg,rgba(219,128,100,1),rgba(253,59,109,1));
box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0rpx 6rpx 18rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 40rpx;

  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}



.center-content-slider{
  position: relative;
  width: 100%;
  height: 40rpx;
  margin-bottom: 30rpx;
  /* background: rgb(185, 196, 201,0.5); */
}

.center-slider{
  position: absolute;
  top: 0;
  width: 40%;
}
.center-slider1{
  position: absolute;
  top: 0;
  width: 40%;
  left: 40%;
}
</style>
