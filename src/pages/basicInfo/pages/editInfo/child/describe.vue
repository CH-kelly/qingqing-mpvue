<template>
  <div class="describe">
    <div class="top">
      <div class="top-rounded"></div>
      <div class="top-title">{{title}}</div>
      <div class="top-edit" @click="gotoBaseInfo" v-if="type!==4">编辑</div>
      <!-- <div class="top-edit" v-if="isEdit==0" @click="editInfo">编辑</div> -->

      <!-- <div class="top-edit top-edit-complete" v-if="isEdit==1" @click="complete">保存</div> -->
    </div>
    <!-- <div v-if="isEdit==0" class="center">{{content}}</div> -->

    <div class="center">
      <!-- <scroll-view style="height:300rpx"> -->

      {{content}}
      <!-- </scroll-view> -->
    </div>

    <!-- <div v-if="isEdit==1" class="center">
      <textarea
        @blur="bindTextAreaBlur"
        class="index-center-textarea"
        placeholder="这一刻想分享给大家..."
        placeholder-class="placeholder-class"
        :value="content"
      />
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "自我介绍"
    },
    content: {
      type: String,
      default: "我介绍自我介绍自我介绍自我介绍自"
    },
    type:{
      type:Number
    }
  },
  data() {
    return {
      isEdit: 0
    };
  },
  methods: {
    gotoBaseInfo(){
      //pages/basicInfoDesc/main
      let title = '';
      let placeholder = '';
      let key = this.type;
      if(key==1){ //自我介绍
        title = "自我介绍";
        placeholder="说说自己的自我介绍~"
      }else if(key==2){  //个人爱好
        title = "个人爱好";
        placeholder="说说自己的个人爱好~"

      }else if(key==3){  //内心独白
        title = "内心独白";
        placeholder="说说自己的内心独白~"

      }
      wx.navigateTo({
        url:'/pages/basicInfo/pages/basicInfoDesc/main'+"?title="+title+"&placeholder="+placeholder+"&type="+key
      })
    },
    editInfo() {
      console.log("编辑");
      this.isEdit = 1;
    },
    bindTextAreaBlur(e) {
      console.log(e);
    },
    complete() {
      this.isEdit = 0;
      console.log("提交s");
      wx.showToast({
        title: "成功",
        icon: "success",
        duration: 2000
      });
    }
  }
};
</script>
<style scoped>
.describe {
  margin: 20rpx;
  /* margin-top: 20rpx; */
  background: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
}
.describe > .top {
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
.describe > .center {
  /* height: 300rpx; */
  overflow: hidden;

  margin-top: 10rpx;

  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}

.top-edit {
  width: 87rpx;
  height: 41rpx;
  background: rgba(241, 241, 241, 1);
  border-radius: 21rpx;

  position: absolute;
  right: 0;

  line-height: 41rpx;
  text-align: center;
  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.top-edit-complete {
  background: rgba(130, 222, 199, 1);
  color: #ffffff;
}

/* 发布文本框 */
.index-center-textarea {
  width: 100%;
  height: 300rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333;
}
.placeholder-class {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: red;
}
</style>