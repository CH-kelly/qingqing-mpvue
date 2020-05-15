<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">编辑信息</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        <div class="title">基本信息</div>
        <div class="info">
          <div class="title-h1">昵称</div>
          <div class="title-input">
            <input
              class="input"
              type="text"
              :value="userInfo.nickname"
              @input="editName"
              placeholder="请输入昵称~"
            />
          </div>
        </div>
        <div class="info">
          <div class="title-h1">性别</div>
          <div class="title-input">
            <picker
              @change="bindPickerChange1"
              :value="userInfo.gender"
              :range="gen"
              data-name="gender"
            >
              <view class="picker">
                <!-- 请选择：{{gender}} -->
                请选择：{{genderValue}}
              </view>
            </picker>
            <!-- <input class="input" type="text" :value="userInfo.gender==1 ? '男':'女'" > -->
          </div>
        </div>
        <div class="info">
          <div class="title-h1">生日</div>
          <div class="title-input">
            <picker mode="date" value @change="bindPickerChange2" data-name="birthday">
              <view class="picker">请选择：{{birthday}}</view>
            </picker>
          </div>
        </div>
        <div class="info">
          <div class="title-h1">身高</div>
          <div class="title-input">
            <input
              class="input"
              type="text"
              :value="userInfo.stature"
              @input="editStature"
              placeholder="请输入身高~"
            />cm
          </div>
        </div>
        <div class="info">
          <div class="title-h1">所在城市</div>
          <div class="title-input">
            <picker mode="region" @change="changeCityValue">
              <div class="picker">请选择：{{province}} {{city}}</div>
            </picker>
          </div>
        </div>
        <div class="title">个人信息</div>
        <div class="info">
          <div class="title-h1">毕业院校</div>
          <div class="title-input">
            <input
              class="input"
              type="text"
              :value="userInfo.school"
              @input="editSchool"
              placeholder="请输入毕业院校~"
            />
          </div>
        </div>
        <div class="info">
          <div class="title-h1">最高学历</div>
          <div class="title-input">
            <picker
              @change="bindPickerChange3"
              :value="edu[education]"
              :range="edu"
              data-name="education"
            >
              <view class="picker">请选择：{{educationValue}}</view>
            </picker>
          </div>
        </div>
        <!-- <div class="info">
          <div class="title-h1">行业职业</div>
          <div class="title-input">
            <picker
              @change="bindPickerChange4"
              :value="pro[userInfo.profession]"
              :range="pro"
              data-name="profession"
            >
              <view class="picker">请选择：{{professionValue}}</view>
            </picker>
          </div>
        </div> -->

              <!-- @columnchange="changeNextCol" :value="mulIndex" :range="mulArr"  -->
        <div class="info">
          <div class="title-h1">行业职业</div>
          <div class="title-input">
            <picker
              mode="multiSelector"
               @change="bindPickerChange4"
              @columnchange="changeNextCol" :range="mulArr" 
            >
              <view class="picker"> 请选择：{{professionValue}} </view>
              
              <!-- <view class="picker"> 请选择：{{mulArr[0][mulIndex[0]]}}，{{mulArr[1][mulIndex[1]]}} </view> -->
            </picker>
          </div>
        </div>

        <div class="info">
          <div class="title-h1">年薪</div>
          <div class="title-input">
            <input
              class="input"
              type="text"
              :value="userInfo.annual_salary"
              @input="editSalary"
              placeholder="请输入年薪~"
            />
          </div>
        </div>
        <div class="info">
          <div class="title-h1">微信号</div>
          <div class="title-input">
            <input
              class="input"
              type="text"
              :value="userInfo.wxid"
              @input="editWxid"
              placeholder="请输入微信号~"
            />
          </div>
        </div>
        <div class="button">
          <div class="submit" @click="submit">提交</div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";

export default {
  components: {
    navigationBar
  },
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      edu: ["未填写", "专科", "本科", "硕士", "博士"],
      education: 0,
      educationValue: "",

      pro: ["未填写", "销售", "设计师", "客户经理", "医生", "教师"],
      profession: 0,
      professionValue:'',

      gen: ["不详", "男", "女"],
      gender: 0,
      genderValue: "",
      province: "",
      city: "",
      userInfo: {},
      token: "",
      nickname: "",
      birthday: "",
      stature: "",
      school: "",
      profession: "",
      annual_salary: "",
      wxid: "",

       
       mulIndex: [0,0],
       mulArr:[],
      json: [
          {
                "id": 1,
                "title": "技术",
                "children":[]
          },
            {
                "id": 3,
                "title": "服务",
                "children":[]
            }
      ]
      
    };
  },
  onLoad() {
    let token = store.state.token || wx.getStorageSync("token");
    this.token = token;
    this.get_user_info(token);
    this.get_classfy(token);
    
    // this.mulArr[0] = this.json.map(function(v){return v.title});
    // this.mulArr[1] = this.json[this.mulIndex[0]].children.map(function(v){return v.title});
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {
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
            this.$nextTick(function(){
              this.json = res.data.classfy;
              this.mulArr[0] = this.json.map(function(v){return v.title});
              this.mulArr[1] = this.json[this.mulIndex[0]].children.map(function(v){return v.title});
            })
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    get_user_info(token) {
      let that = this;
      that.postRequest("home/user/get_user_info", { token }).then(
        res => {
          if (res.code === 0) {
            that.userInfo = res.data;
            that.genderValue = that.gen[that.userInfo.gender] || "";

            that.educationValue = that.edu[that.userInfo.education] || "";
            that.professionValue = res.data.profession || '';
            console.log(this.professionValue);
            that.province = res.data.province || "";
            that.city = res.data.city || "";
            that.birthday = res.data.birthday || "";
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    editName(e) {
      this.nickname = e.mp.detail.value;
    },
    editStature(e) {
      this.stature = e.mp.detail.value;
    },
    editSchool(e) {
      this.school = e.mp.detail.value;
    },
    editSalary(e) {
      this.annual_salary = e.mp.detail.value;
    },
    editWxid(e) {
      this.wxid = e.mp.detail.value;
    },

    bindPickerChange1: function(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      let name = e.mp.target.dataset.name;
      this.gender = id;
      this.genderValue = this.gen[id];
    },
    bindPickerChange2: function(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      let name = e.mp.target.dataset.name;
      this.birthday = id;
    },
    bindPickerChange3: function(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      let name = e.mp.target.dataset.name;
      this.education = id;
      this.educationValue = this.edu[id];
    },
    bindPickerChange4: function(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      let name = e.mp.target.dataset.name;
      this.profession = this.mulArr[0][this.mulIndex[0]] + ','+this.mulArr[1][this.mulIndex[1]];
      this.professionValue = this.mulArr[0][this.mulIndex[0]] + ','+this.mulArr[1][this.mulIndex[1]];
      console.log(this.professionValue);
    
    },
    bindPickerChange5: function(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      let name = e.mp.target.dataset.name;
      // this.profession = id;
    },
    changeCityValue(e) {
      console.log("picker发送选择改变，携带值为", e);
      let id = e.mp.detail.value;
      console.log(id);
      this.province = e.mp.detail.value[0];
      this.city = e.mp.detail.value[1];
    },
    submit() {
      let that = this;
      let data = {
        token: this.token,
        nickname: this.nickname,
        birthday: this.birthday,
        stature: this.stature,
        province: this.province,
        city: this.city,
        school: this.school,
        education: this.education,
        profession: this.profession,
        annual_salary: this.annual_salary,
        wxid: this.wxid,
        gender: this.gender
      };
      that.postRequest("home/user/update_user_info", data).then(
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
    }
  }
};
</script>
<style scoped>
.index-center {
  background: #f6f6f6;
  overflow: hidden;
  padding-bottom: 40rpx;
}
.title {
  padding: 24rpx 36rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 42rpx;
}
.info {
  padding: 24rpx 36rpx;
  background: #ffffff;

  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 42rpx;
  border-bottom: 1px solid #eeeeee;

  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}

.title-input {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* background: orange; */
}

.input {
  text-align: right;
}
.title-h1 {
  width: 40%;
  /* background: skyblue; */
}
.picker {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
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
  background: rgba(89, 94, 109, 1);
  box-shadow: 0rpx 6rpx 18rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 40rpx;

  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
</style>