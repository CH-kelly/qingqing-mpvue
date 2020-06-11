<template>
  <div class="report"  @click.stop="cancel">
    <div v-if="status===0 && isDelete ===0" class="report-anonymous" @click.stop="anonymous">匿名举报</div>
    <div v-if="status===0 && isDelete ===1" style="color:#E62C2C" class="report-anonymous" @click.stop="deleteDynamic">删除</div>

    <div v-if="status===1" class="report-reason">
      <div class="report-reason-title">
        <img class="title-report" src="/static/images/new/report.png" alt />
        <div class="reason-title">请选择举报理由</div>
      </div>
      <div class="report-reason-list">
        <div class="report-reason-item" v-for="(item,i) in reason" :key="i">
          <div class="item-title">{{item}}</div>
          <div class="item-right" @click.stop="clickReason(i)">
            <img
              v-if="i===isActive"
              class="item-hook-active"
              src="/static/images/new/hook2.png"
              alt
            />
            <div v-else class="item-hook"></div>
          </div>
        </div>
      </div>
      <div class="report-button">
        <div class="button-left"  @click.stop="cancel">取消</div>
        <div class="button-left" style="color:#595E6D;border-right:none" @click.stop="nextReport">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>

import store from "@/store";

export default {
  props:{
    id:{type:Number},
    uid:{type:Number},
    isDelete:{type:Number}
  },
  data() {
    return {
      status: 0,
      reason: [
        "资料作假",
        "垃圾广告",
        "低俗色情",
        "诽谤谩骂",
        "诈骗、托儿",
        "其他违规行为"
      ],
      isActive: 0,
      token:''
    };
  },
  mounted(){
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    console.log(this.token);
  },
  methods: {
    anonymous() {
      this.status = 1;
    },
    deleteDynamic(){
        let that = this;
        let data = {
          token:that.token,
          id:that.id
        }
        console.log(data);
        that.postRequest('/home/moment/delete_moment',data).then(res=>{  
          if(res.code===0){
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 3000
            })
            
            this.$emit('cancel');
          }
        },err=>{
          console.log(err);
          
        })
    },
    clickReason(i) {
      this.isActive = i;
    },
    cancel(){
        // 取消举报
        this.$emit('cancel');
    },
    nextReport(){
        //下一步
        console.log('下一步',this.isActive);
        
        wx.navigateTo({
            url:"/pages/dynamic/pages/dynamicRelease/main?reason="+this.isActive+"&type=3&id="+this.id+"&uid="+this.uid
        })
        
        this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.report {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.report-anonymous {

  width: 567rpx;
  height: 82rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;

    text-align: center;
    line-height: 82rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.report-reason-item{
    margin-top: 20rpx;
    display: flex;
    align-items: center;
}
.report-reason {
  border-radius: 20rpx;
  background: #ffffff;
  border-radius: 16px
}
.title-report {
  width: 76rpx;
  height: 67rpx;
}

.report-reason-title {
    padding-top: 30rpx;
    padding-bottom: 30rpx;
  width: 567rpx;
  background: rgba(89, 94, 109, 1);
  border-radius: 16px 16px 0px 0px;
  text-align: center;
}
.report-reason-list {
  padding: 36rpx;
  background: #ffffff;
}
.reason-title {
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.item-hook {
  width: 24rpx;
  height: 24rpx;
  border: 1rpx solid rgba(153, 153, 153, 1);
  border-radius: 50%;
}
.item-title{
    width: 80%;
}
.item-hook-active {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
}

.report-button {
    height: 90rpx;
  border-top: 1px solid #eeeeee;
  display: flex;
  align-items: center;
}
.button-left {
  width: 50%;

  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(187, 187, 187, 1);
  text-align: center;
  border-right: 1px solid #eeeeee;
}
</style>