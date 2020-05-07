<template>
    <div class="personal">
        <div class="info-card">  
            <div class="card-left">
                <div class="nickname">小星</div>
                <div class="info">
                    <span class="info-desc">19岁</span>
                    <span class="info-line"></span>
                    <span class="info-desc">166cm</span>
                    <span class="info-line"></span>
                    <span class="info-desc">水瓶座</span>
                </div>
            </div>
            <div class="card-right">
                <img class="card-right-location" src="/static/images/new/location.png" alt="">
                <span>四川</span><span>成都</span>
            </div>
        </div>
<!-- 学历 -->
        <div class="info-card-education background-border-radius">
            <span class="ellipsis">电子科技大学</span>
            <span class="info-line"></span>
            <span>本科·全日制</span>
        </div>
        <!-- 职业 -->
        <div class="info-card-occupation">
            <div class="occupation-left background-border-radius">职业：美容/化妆师</div>
            <div  class="occupation-left background-border-radius">收入：20-30W</div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.personal{
    margin-top: 20rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 20rpx;
}
.nickname{
    font-size: 34rpx;
    font-family:PingFang SC;
    font-weight:bold;
}
.background-border-radius{
    background: #F4F5F9;
    border-radius: 10rpx;
    margin-top: 16rpx;
    /* height: 44rpx; */
    /* line-height: 44rpx; */
    /* padding-left: 16rpx; */
    padding: 10rpx 20rpx;
    font-size: 24rpx;
    color: #000;
    font-family:PingFang SC;
    font-weight:560;
}
.info-card{
    padding-bottom: 10rpx;
    border-bottom: 1px solid #EEEEEE;
    color: #333;

    display: flex;


}
.info-card>.info{
    display: flex;
    align-items: center;
}
.card-left{
    width: 75%;
}
.card-left>.info>.info-desc{
    display: inline-block;
    font-size: 24rpx;
}
.info-line{
    display: inline-block;
    width: 1px !important;
    height: 10px !important;
    background: #cccccc;
    margin: 0 10rpx;
}
.info-card>.info{
    font-size: 28rpx;
}
.card-right{
    font-size: 22rpx;
    display: flex;
    justify-content: center;
    font-family:PingFang SC;
    font-weight:bold;
}
.card-right-location{
    width: 40rpx;
    height: 40rpx;
}








.info-card-education{
    /* margin-top: 20rpx;
    font-size: 24rpx;
    color: #000; */
}
.info-card-occupation{
    display: flex;
}
.occupation-left{
    font-size: 22rpx !important;
    margin-right: 20rpx;
}
</style>