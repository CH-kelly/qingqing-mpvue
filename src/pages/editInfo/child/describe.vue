<template>
    <div class="describe">
        <div class="top">
            <div class="top-rounded"></div>
            <div class="top-title">{{title}}</div>
        </div>
        <div class="center">{{content}}</div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:'自我介绍'
        },
        content:{
            type:String,
            default:'我介绍自我介绍自我介绍自我介绍自'
        }
    }
}
</script>
<style scoped>
.describe{
    margin: 20rpx;
    /* margin-top: 20rpx; */
    background: #ffffff;
    border-radius: 16rpx;
    padding: 20rpx;
}
.describe>.top{
    display: flex;
    align-items: center;
}
.top-rounded{
    width:10rpx;
    height:30rpx;
    background:rgba(130,222,199,1);
    border-radius:5px;
    margin-right: 20rpx;
}
.top-title{
    font-size:32rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:38rpx;
}
.describe>.center{
    margin-top: 10rpx;

    font-size:28rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:38rpx;
}
</style>