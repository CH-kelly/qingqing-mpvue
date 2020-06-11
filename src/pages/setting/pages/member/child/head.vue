<template>
    <div class="love-trends-head">
        <div class="head-left">
            <img class="head-avatar" :src="headInfo.avatar_url" alt="">
        </div>
        <div class="head-center">
            <div class="head-center-top">
                <span class="head-nickname">{{headInfo.nickname}}</span>
                <span class="head-right head-right-problem">遇到会员问题</span>
            </div>
            <div class="head-center-middle">
                <span class="head-desc" v-if="headInfo.is_vip === 0">暂未激活会员</span>
                <span class="head-desc" v-else>会员</span>
                <span class="head-right head-right-service">请联系客服</span>
            </div>
        </div>
        <!-- <div class="head-center">
            <div class="head-nickname">{{headInfo.nickname}}</div>
            <div class="head-desc">{{headInfo.isVip}}</div>
        </div>
        <div class="head-right">
            <div class="head-right-problem">遇到会员问题</div>
            <div class="head-right-service">请联系客服</div>
        </div> -->
    </div>
</template>
<script>
export default {
    props:{
        headInfo:{type:Object}
    }
}
</script>
<style scoped>
.love-trends-head{
    width:100%;
    height:170rpx;
    background:#F2F6F9;

    display: flex;
    align-items: center;

}
.head-left{
    padding-left: 30rpx;
    width: 20%;
    /* background: orange; */
}
.head-center{
    width: 80%;
    /* background: skyblue; */
}

.head-center-top{
    display: flex;
    position: relative;
    align-items: baseline;
}
.head-center-middle{
    display: flex;
    position: relative;
    align-items: baseline;
}
.head-right {
    position: absolute;
    right: 0px;
}




.head-right{
    width: 30%;
}
.head-avatar{
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    display: block;
}
.head-center{
font-size:34rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(0,0,0,1);
}
.head-desc{
    margin-top: 20rpx;
    font-size:24rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
}
.head-right-problem{

    font-size:24rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
}
.head-right-service{
    
    margin-top: 20rpx;
    font-size:24rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(52,91,120,1);
}
</style>