<template>
    <div class="love-trends-head">
        <div class="love-trends-lists-item" v-for="(item,i) in dynamicList" :key="i">
            <div class="head-top">
                <div class="head-left">
                    <img class="head-avatar" :src="item.avatar" alt="">
                </div>
                <div class="head-center">
                    <div class="head-nickname">{{item.nickname}}</div>
                    <div class="head-desc">{{item.create}}</div>
                </div>
                <div class="head-right"></div>
            </div>
            <div class="lists-item-center">
                <div class="lists-item-center-content">{{item.content}}</div>
                <div class="lists-item-center-image">
                    
                    <img :src="s" alt="" v-for="(s,r) in item.image" :key="r">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        dynamicList:{type:Array,defaula:[]}
    }
}
</script>
<style scoped>
.love-trends-head{
    width:100%;
}
.head-top{
    height: 140rpx;
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
    font-size:30rpx;
    font-family:PingFang SC;
    font-weight:bold;
    /* color:rgba(255,255,255,1); */
    color:rgba(111,121,181,1);
}
.head-right{
    width: 35%;
    /* background: orange; */
}
.love-trends-lists-item{
    margin-top: 20rpx;
    background: #ffffff;
}
.head-avatar{
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    display: block;
}
.head-desc{
    margin-top: 6rpx;
    font-size:22rpx;
    font-family:PingFang SC;
    font-weight:500;
    /* color:rgba(255,255,255,0.8); */
    color:rgba(102,102,102,1);
}
.lists-item-center{
    padding-left: 30rpx;
    padding-bottom: 30rpx;
}
.lists-item-center-content{
    
    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 20rpx;
}

.lists-item-center-image>img{
    width:265rpx;
    height:264rpx;   
    border-radius: 20rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    vertical-align: middle;
}

</style>