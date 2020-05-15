<template>
  <div class="education">
    <div class="education-title">
      <div class="top-rounded"></div>
      <div class="top-title">选择认证方式</div>
    </div>
    <div class="education-tabbar">
      <div class="tabbar-item" :class="status===1?'active':''"  @click="changeTabBar(1)">毕业证书</div>
      <div class="tabbar-item" :class="status===2?'active':''"  @click="changeTabBar(2)">国内学信网在线认证</div>
      <div class="tabbar-item" :class="status===3?'active':''"  @click="changeTabBar(3)">港澳台或海外学历认证</div>
    </div>


    <div  v-if="status===1">
        <div class="education-title-h2">上传毕业证书</div>
        <div class="education-image">
            <div style="width:48%">
                <div class="education-image-left">
                  <img src="/static/images/certificate.png" alt="">
                </div>
                <div class="education-desc">毕业证书示例</div>
            </div>
            <div style="width:48%">
                <div class="education-image-left image-upload">
                    <img class="education-upload-icon" src="/static/images/camera.png" alt="">
                    <div class="left-title">上传毕业证原件</div>
                </div>
                <div class="education-desc">
                  照片仅供青青校园审核使用</div>
            </div>
        </div>
        <div class="education-image">

        </div>
        
    </div>
    <div v-if="status===2">
        <div class="education-title-h2">学信网学历/学籍在线验证报告的在线验证码：</div>
        <div class="education-input">
            <input type="text" placeholder="请输入在线验证码" placeholder-style="color:#999999;font-size:26rpx;" />
        </div>
        <div class="education-desc">在线验证码通常为12或16数字加字母</div>
    </div>
    <div v-if="status===3">
        <div class="education-title-h2"> 如果您有教育部留学服务中心的国外学历学位证书请提供认证书编码：</div>
        <div class="education-input">
            <input type="text" class="educaiton-input-wu" placeholder="请输入认证书编号" placeholder-style="color:#999999;font-size:26rpx;" />
        </div>
        <div class="education-waring">温馨提示：<span style="color:#E92D2D">只输入红色部分</span></div>
        <div class="education-desc">旧版认证书编号样式为：教留服认 美[2010]00001号</div>
        <div class="education-desc">新版认证编号样式为：120190000001</div>
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
  },
  data(){
      return {
          status:1,
      }
  },
  methods:{
      changeTabBar(key){
          this.status = key;
      }
  }
};
</script>

<style scoped>
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
.active {
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
