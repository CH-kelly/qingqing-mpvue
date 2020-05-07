<template>
  <div class="news_center">

    <div v-for="(item,index) in messageLists" :key="index">
        <div class="news_lists">
            <div class="news_msg_left">
                <img :src="item.avatar" class="news_avatar" alt="">
            </div>
            <div class="news_msg_content">
                <div class="msg_personnel">
                    <div class="nickname">{{item.nickname}}</div>
                    <div class="msg_content">{{item.content}}</div>
                </div>
                <div  class="msg_send_time">{{item.timer}}</div>
            </div>
        </div>
    </div>
    
  </div>

</template>

<script>

export default {
    props:{
        messageLists: {type: Array, default: []},
    }
}
</script>

<style scoped>
.news_center{
    width: 100%;
    background-color: #fff;
    overflow: hidden;

}
.news_lists{
    height: 140rpx;
    display: flex;
    align-items: center;
    
    font-size:22rpx;
    color: #999999;
}
.news_msg_left{
    width: 15%;
    padding-left:32rpx;
}
.news_avatar{
    width: 90rpx;
    height: 90rpx;
}
.news_msg_content{
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    
    padding-right:32rpx;
}
.msg_personnel{
    width: 80%;

}
.msg_personnel .nickname{
    font-size: 32rpx;
    color: #101010;
    font-weight:bold;
    padding-bottom: 5px;

}

</style>
