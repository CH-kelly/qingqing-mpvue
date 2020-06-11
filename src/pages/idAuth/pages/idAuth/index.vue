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
          <!-- <div class="steps-item"  @click="changeTitleBar(1)"> -->
          <div class="steps-item" >
            <div class="steps-item-circular-number" >
              <div class="steps-item-circular" :class="status===1?'active':''" >1</div>
            </div>
            <div class="steps-item-title" :class="status===1?'activeTitle':''">身份认证</div>
          </div>
          <!-- <div class="steps-item"  @click="changeTitleBar(2)"> -->
          <div class="steps-item" >
            <div class="steps-item-circular-number" >
              <div class="steps-item-circular" :class="status===2?'active':''">2</div>
            </div>
            <div class="steps-item-title" :class="status===2?'activeTitle':''">公司认证</div>
          </div>
          <!-- <div class="steps-item"  @click="changeTitleBar(3)">   -->
          <div class="steps-item">  
            <div class="steps-item-circular-number" >
              <div class="steps-item-circular" :class="status===3?'active':''">3</div>
            </div>
            <div class="steps-item-title" :class="status===3?'activeTitle':''">学历认证</div>
          </div>
        </div>

        <!-- 分割线-->
        <div class="index-center-line"></div>

        <!-- 输入框 -->
        <div class="index-center-id-auth">
          <div v-if="status==1">
            <!-- <div class="center-id-auth-input" v-for="(item,i) in inputArray[status]" :key="i"> -->
            <div class="center-id-auth-input">
              <div class="id-auth-input">
                <div class="id-auth-input-left">姓名</div>
                <div class="id-auth-input-right">
                  <input type="text" placeholder="点击填写" placeholder-style="color:#999999;font-size:26rpx;direction: rtl;" :value="certInfo.name" @input="input1"/>
                </div>
              </div>
            </div>
            <div class="center-id-auth-input">
              <div class="id-auth-input">
                <div class="id-auth-input-left">身份证号码</div>
                <div class="id-auth-input-right">
                  <input type="text" placeholder="点击填写" placeholder-style="color:#999999;font-size:26rpx;direction: rtl;" :value="certInfo.id_card_no"   @input="input2"/>
                </div>
              </div>
            </div>
          </div>
          <div v-if="status==2">
            <div class="center-id-auth-input">
              <div class="id-auth-input">
                <div class="id-auth-input-left">公司名称</div>
                <div class="id-auth-input-right">
                  <input type="text" placeholder="点击填写" placeholder-style="color:#999999;font-size:26rpx;direction: rtl;"  :value="certInfo.conpany"  @input="input3"/>
                </div>
              </div>
            </div>
            <div class="center-id-auth-input">
              <div class="id-auth-input">
                <div class="id-auth-input-left">职务</div>
                <div class="id-auth-input-right">
                  <input type="text" placeholder="点击填写" placeholder-style="color:#999999;font-size:26rpx;direction: rtl;" :value="certInfo.profession"   @input="input4"/>
                </div>
              </div>
            </div>
          </div>
          <div v-if="status === 3">
                <div class="education">
                  <div class="education-title">
                    <div class="top-rounded"></div>
                    <div class="top-title">选择认证方式</div>
                  </div>
                  <div class="education-tabbar">
                    <div class="tabbar-item" :class="educationStauts===1?'educationActive':''"  @click="changeTabBar(1)">毕业证书</div>
                    <div class="tabbar-item" :class="educationStauts===2?'educationActive':''"  @click="changeTabBar(2)">国内学信网在线认证</div>
                    <div class="tabbar-item" :class="educationStauts===3?'educationActive':''"  @click="changeTabBar(3)">港澳台或海外学历认证</div>
                  </div>


                  <div  v-if="educationStauts===1">
                      <div class="education-title-h2">上传毕业证书</div>
                      <div class="education-image">
                          <div style="width:48%">
                              <div class="education-image-left">
                                <img v-if="image" :src="image" alt="">
                                <img v-else src="/static/images/certificate.png" alt="">
                              </div>
                              <div class="education-desc">毕业证书示例</div>
                          </div>
                          <div style="width:48%">
                              <div class="education-image-left image-upload" @click="uploadCer">
                                  <img class="education-upload-icon" src="/static/images/camera.png" alt="">
                                  <div class="left-title">上传毕业证原件</div>
                              </div>
                              <div class="education-desc"> 照片仅供青青校园审核使用</div>
                          </div>
                      </div>
                      <div class="education-image">

                      </div>
                      
                  </div>
                  <div v-if="educationStauts===2">
                      <div class="education-title-h2">学信网学历/学籍在线验证报告的在线验证码：</div>
                      <div class="education-input">
                          <input type="text" placeholder="请输入在线验证码" placeholder-style="color:#999999;font-size:26rpx;"   @input="input5"/>
                      </div>
                      <div class="education-desc">在线验证码通常为12或16数字加字母</div>
                  </div>
                  <div v-if="educationStauts===3">
                      <div class="education-title-h2"> 如果您有教育部留学服务中心的国外学历学位证书请提供认证书编码：</div>
                      <div class="education-input">
                          <input type="text" class="educaiton-input-wu" placeholder="请输入认证书编号" placeholder-style="color:#999999;font-size:26rpx;"  @input="input6"/>
                      </div>
                      <div class="education-waring">温馨提示：<span style="color:#E92D2D">只输入红色部分</span></div>
                      <div class="education-desc">旧版认证书编号样式为：教留服认 美[2010]00001号</div>
                      <div class="education-desc">新版认证编号样式为：120190000001</div>
                  </div>

                </div>

              <!-- <education></education> -->
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

// import idAuthInput from "./child/idAuthInput";
// import education from "./child/education"


export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      secondPageHeight: 0,
      status: 1,
      educationStauts:1,
      buttonText: "下一步",
      inputArray: {
        1: [{ title: "姓名" }, { title: "身份证号码" }],
        2: [{ title: "公司名称" }, { title: "职务" }],
        3: [{ title: "学校名称" }, { title: "学籍号" }]
      },
      certInfo:{},
      name:'',
      id_card_no:'',
      conpany:'',
      profession:'',
      code:'',
      certificateNo:'',
      image:'',
    };
  },

  components: {
    navigationBar
    // idAuthInput,
    // education
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  onLoad() {
  
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.get_cert_info(token);

  },
  methods: {
    input1(e){
      this.name = e.mp.detail.value;
    },
    input2(e){
      this.id_card_no = e.mp.detail.value;
    },
    input3(e){
      this.conpany = e.mp.detail.value;
    },
    input4(e){
      this.profession = e.mp.detail.value;
    },
    input5(e){
      this.code = e.mp.detail.value;
    },
    input6(e){
      this.certificateNo = e.mp.detail.value;
    },
    uploadCer(){
      let that = this;
      let token = this.token;
      // 上传图片
      wx.chooseImage({  
      sizeType: ['original', 'compressed'],  
      sourceType:['album', 'camera'],
      count:1,
      success: function (res) {  
        console.log("uploadimg",res);
        let tempFilePaths = res.tempFilePaths;
        let data = {token,tempFilePaths:res.tempFilePaths};
        console.log('data',data);
        wx.showToast({
          title: '上传中，不要离开',
          icon: 'loading',
          duration: 2000
        })
        that.uploadPhoto(data).then(res=>{  
          let result = JSON.parse(res.data);
          console.log(res,result);
          if(result.code === 0){
            that.image = result.data.img;
          }
        },err=>{
          console.log(err);
          
        })
      }
    })
    },
    changeTabBar(key){
          this.educationStauts = key;
      },
    changeTitleBar(key){
          this.status = key;
      },
    get_cert_info(token){
      let that = this;
      that.postRequest('home/user/get_cert_info',{token}).then(res=>{  
        if(res.code===0){
            that.certInfo = res.data; 
            that.name = that.certInfo.name;
            that.id_card_no = that.certInfo.id_card_no;
            that.conpany = that.certInfo.conpany;
            that.profession = that.certInfo.profession;
            that.credential_id = that.certInfo.credential_id;
            
        }
      },err=>{
        console.log(err);
        
      })
    },
    nextButton() {
      let status = this.status + 1;

      if (status >= 3) {
        this.status = status;
        this.buttonText = "提交";
        if (status > 3) {
          this.buttonText = "提交";
          // 发送网络请求
          this.submit_cert();
          this.status = 3;
        }
      } else {
        this.buttonText = "下一步";
        this.status = status;
      }
    },
    submit_cert(){
      if(!this.token){
        this.showMessage('请登录')
        return 
      }
      // console.log(!this.name,this.name);return
      if(!this.name){
        this.showMessage('请输入姓名')
        return 
      }
      if(!this.id_card_no){
        this.showMessage('请输入身份号码')
        return 
      }
      if(!this.conpany){
        this.showMessage('请输入公司名称')
        return 
      }
      if(!this.profession){
        this.showMessage('请输入职务')
        return 
      }
      
      //1证书图片2在线验证码3正式编码
      let credential_id = '';
      let type = this.educationStauts;
      if(type === 1){
        credential_id = this.image;
      }else if(type === 2){ //在线验证码
        credential_id = this.code;
      }else{
        credential_id = this.certificateNo;
      }
      if(!credential_id){
        this.showMessage('请选择学历认证')
        return 
      }
      let data = {
          token:this.token,
          name:this.name,
          id_card_no:this.id_card_no,
          conpany:this.conpany,
          profession:this.profession,
          credential_id:credential_id,
          type
      };
      let that = this;
      console.log(data);
      that.postRequest('home/user/submit_cert',data).then(res=>{  
          if(res.code===0){
              that.showMessage('提交成功','success')
          }
        },err=>{
          console.log(err);
          
        })
    },
    showMessage(title,icon='none'){
      wx.showToast({
        title: title,
        icon: icon,
        duration: 2000
      });
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
  
background:linear-gradient(180deg,rgba(219,128,100,1),rgba(253,59,109,1));
box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);

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













  
.education-title {
  display: flex;
  align-items: center;
  position: relative;
}
.top-rounded {
  width: 10rpx;
  height: 30rpx;
  background: rgba(130, 222, 199, 1);
  border-radius: 5px;
  margin-right: 20rpx;
}
.top-title {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.education-tabbar{
    margin-top: 50rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tabbar-item {
  width: 178rpx;
  height: 87rpx;
  border: 1rpx solid rgba(204, 204, 204, 1);
  border-radius: 10rpx;

  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 38rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.educationActive {
  color: #6f8bd7;
  border-color: #6f8bd7;
}

.education-title-h2 {
    margin-top: 34rpx;
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.education-image{

    margin-top: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.education-image-left{
    /* width:48%; */
    width: 100%;
    height:208rpx;
    border:1rpx solid rgba(204,204,204,1);
    border-radius:10rpx;

    display: flex;
    align-items: center;
    justify-content: center;
}
.education-image-left>image{
  width: 258rpx;
  height: 152rpx;
}
.education-waring{
    margin-top: 20rpx;

    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(102,102,102,1);
    line-height:38rpx;
}
.education-desc{
    margin-top: 20rpx;
    
font-size:22rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
line-height:38rpx;
}
/* .deucation-icon{
  width: 66rpx;
  height: 56rop;
} */

.image-upload{
    background: #CCCCCC;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.education-upload-icon{
    width:66rpx;
    height:56rpx;
}
.left-title{
    
font-size:26rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
line-height:38rpx;
}

.education-input{
    margin-top: 20rpx;
    width:596rpx;
    height:75rpx;
    border:1rpx solid rgba(204,204,204,1);
    border-radius:10rpx;

    display: flex;
    align-items: center;
    padding-left: 20rpx;
}



</style>
