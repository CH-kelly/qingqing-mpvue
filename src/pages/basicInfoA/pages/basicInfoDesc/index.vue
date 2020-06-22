<template>
  <div>
    <navigation-bar  shadow="true">
      <div slot="center">
        {{title}}
      </div>
    </navigation-bar>
    <scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">

    <div class="index-center" >
        <div class="info">
            <textarea class="info-textarea"
            :placeholder="placeholder" 
            :value="content"
            @input="textareaInput"
            placeholder-class="placeholder-class"></textarea>
        </div>
        <div class="line"></div>
        <div class="button">
            <div class="submit" @click="submit">提交</div>
        </div>
    </div>
    
 </scroll-view>

  </div>
</template>
<script>

import navigationBar from '@/components/navbar/navbar'
import store from '@/store'

export default {
    
  components: {
    navigationBar
  },
//   props:{
//     title:{
//         type:String,
//         default:"编辑资料"
//     },
//     placeholder:{
//         type:String,
//         default:"说说自己的想法~"
//     }
//   },
  data(){
      return {
          systemHeight:0,
          contentHeight:0,
          title:'',
          placeholder:'',
          type:0,
          token:null,
          content:'',
          userInfo:[],
      }
  },
  onLoad(option){
      let token = store.state.token || wx.getStorageSync('token');
      console.log(option);
      this.title = option.title;
      this.placeholder = option.placeholder;
      this.type = option.type;
      this.token = token;
    this.get_user_info(token);
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     
     this.systemHeight = store.state.systemHeight;
     let height = store.state.secondPageHeight;
     this.contentHeight = height;
     
  },
  methods:{
     get_user_info(token){
      let that = this;
      that.postRequest('home/user/get_user_info',{token}).then(res=>{  
          if(res.code===0){
              that.userInfo = res.data;
              let contnet = '';
              if(that.type==1){ //自我介绍
                contnet = res.data.about_me
              }else if(that.type==2){  //个人爱好
                contnet = res.data.hobbies
              }else if(that.type==3){  //内心独白
                contnet = res.data.emotional_view
              }
              that.content = contnet;
          }
        },err=>{
          console.log(err);
          
        })
    },
    submit(){
      let that = this;
      let name = '';
      if(that.type==1){ //自我介绍
        name = "about_me";
      }else if(that.type==2){  //个人爱好
        name = 'hobbies';
      }else if(that.type==3){  //内心独白
        name = "emotional_view";
      }
      let data = {
        token:this.token,
        [name]:this.content,
      }
      console.log(data);
      that.postRequest('home/user/update_user_info',data).then(res=>{  
        if(res.code===0){
            wx.showToast({
              title: "修改成功",
              icon: "success",
              duration: 2000
            });
        }
      },err=>{
        console.log(err);
        
      })
    },
    textareaInput(e){
      this.content = e.mp.detail.value;
    }
  }
};
</script>
<style scoped>
.index-center{
  background: #ffffff;
    overflow: hidden;
    padding-bottom: 40rpx;
}
.line{
    margin: 34rpx 26rpx;
    height: 1rpx;
background:rgba(221,221,221,1);
}
.button{
    width: 100vw;
    position: fixed;
    bottom: 52rpx;

    /* margin: 24rpx 36rpx; */
    display: flex;
    align-items: center;
    justify-content: center;
}
.submit{
    width:610rpx;
    height:80rpx;
    line-height: 80rpx;
    text-align: center;
    /* background:rgba(89,94,109,1); */
    
  /* background:linear-gradient(0deg,rgba(219,128,100,1),rgba(253,59,109,1)); */
  background:linear-gradient(0deg,#1ce9cb,#1ce9cb);

box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);

    box-shadow:0rpx 6rpx 18rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius:40rpx;
    
    font-size:30rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
}

.info-textarea{
    padding: 34rpx 26rpx;
    font-size:28rpx;
    font-family:PingFang SC;
    font-weight:500;
}
.placeholder-class{
    font-size:28rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(204,204,204,1);
    line-height:56rpx;
}

</style>