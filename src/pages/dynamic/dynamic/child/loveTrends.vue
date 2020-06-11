<template>
    <div class="love-trends-head">
        <div class="head-left">
            <img class="head-avatar" :src="head.avatar_url" alt="">
        </div>
        <div class="head-center">
            <div class="head-nickname">{{head.nickname}}</div>
            <div class="head-desc">TA发布了{{head.total}}条动态</div>
        </div>
        <div class="head-right">
            <div class="head-right-button" @click="gotoLoveStory">
                <img class="head-right-icon" src="/static/images/new/heart-love.png" alt="">
                <span class="head-right-title">恋爱故事</span>
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/store'
export default {
    props:{
        head:{type:Object}
    },
    methods:{
        //pages/loveStory/main
        gotoLoveStory(){


            let token = store.state.token || wx.getStorageSync('token');
            if(token){
                 
                wx.navigateTo({
                    url:'/pages/loveStory/main'
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
.love-trends-head{
    width:100%;
    height:170rpx;
    background:rgba(107,194,213,1);

    display: flex;
    align-items: center;

}
.head-left{
    padding-left: 30rpx;
    width: 15%;
    /* background: orange; */
}
.head-center{
    width: 50%;
    /* background: skyblue; */
}
.head-right{
    width: 35%;
    /* background: orange; */
}
.head-avatar{
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    display: block;
}
.head-center{
    font-size:30rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
}
.head-desc{
    margin-top: 6rpx;
    font-size:22rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,0.8);
}

.head-right-button{
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 20rpx 0px rgba(91,91,91,0.27);
    border-radius:26rpx;

    display: flex;
    width: 80%;
    height:51rpx;
    justify-content: center;
    align-items: center;

}
.head-right-icon{
    width: 34rpx;
    height: 34rpx;
    display: block;
    margin-right: 8rpx;
    position: relative;
    top: -1px;

}
.head-right-title{
    font-size:22rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
}
</style>