<template>
    <div class="button" :style="{bottom:'0px'}">
        <div class="button-circle" @click="gotoSend">
            <div>
                <img class="button-circle-img"  src="/static/images/new/send.png" alt="">
                <div class="button-title">发布</div>
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/store'
export default {
    props:{
        type:{type:Number,default:1}
    },
    data () {
        return {
            // distanceBottom:70
        }
    },
    computed:{
        // distanceBottom(){   
        //     console.log('distanceBottom');
            
        //     return store.state.bottomNavBarHeight ? store.state.bottomNavBarHeight : 70;
        // }
    },
    onshow(){
        
        
    },
    mounted(){
        // this.distanceBottom = store.state.bottomNavBarHeight;
        // console.log('distanceBottom',this.distanceBottom);
        
        
    },
    methods:{
        gotoSend(){ //发送动态
            console.log('type',this.type);
            
            let token = store.state.token || wx.getStorageSync('token');
            console.log(token);
            if(token){
                wx.navigateTo({
                    // url:'/pages/dynamic/pages/dynamicRelease/main?type='+this.type
                    url:'/pages/dynamicRelease/dynamicRelease/main?type='+this.type
                })
            }else{
               wx.showToast({
                    title: '请登录',
                    icon: 'none',
                    duration: 2000
                })
            }
           
        }
    }
}
</script>
<style scoped>
.button{
    width: 116rpx;
    height: 116rpx;
    /* width: 100%; */
    position: fixed;
    bottom: 0px;
    left: 50%;
    right: 50%;
    transform: translate(-50%,-50%);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-circle{
    width:120rpx;
    height:120rpx;
    background:rgba(111,121,181,1);
    box-shadow:0px 0px 20px 0px rgba(55,63,114,0.36);
    border-radius:50%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:row-reverse;

}
.button-circle-img{
    width: 50rpx;
    height: 40rpx;
}
.button-title{
    font-size:24rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
}
</style>