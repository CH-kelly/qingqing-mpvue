<template>
    <div class="heart-list-item">
        <div class="list-item" v-for="(item,i) in heartList" :key="i">
            <img :src="item.avatar" alt="">
            <div>{{item.nickname}}</div>
            <div class="info">
                <span class="info-desc">19岁</span>
                <span class="info-line"></span>
                <span class="info-desc">166cm</span>
                <span class="info-line"></span>
                <span class="info-desc">水瓶座</span>
            </div>
            <div class="education">
                <img src="/static/images/icon_school@2x.png" alt="">
                <span>{{item.education}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        heartList:{type:Array,default:[]}
    }
}
</script>
<style scoped>
.info-desc{
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
</style>