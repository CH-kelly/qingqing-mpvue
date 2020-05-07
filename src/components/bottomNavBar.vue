<template>
    <!-- <div class="bottom-nav-bar" :class="{'ipx':isIPX}" > -->
    <div class="bottom-nav-bar" :style="{paddingBottom:isIPX+'px',height:'50px'}" >
        <div class="nav-bar-item" v-for="(item,i) in barLists" :key="i" @click="goToNavBar(item)" >
            <div>
                <img v-if="currentIndex !== item.key" class="item-image" :src="item.icon" alt="">
                <img v-else class="item-image" :src="item.activeIcon" alt="">
            </div>
            <div class="nav-bar-title" :class="currentIndex === item.key?'activeColor':''"  >{{item.title}}</div>
        </div>
        <div></div>   
    </div>
</template>
<script>
import store from '@/store'
export default {
    data(){
        return {
            barLists:[
                {
                    title:'首页',
                    icon:'/static/images/new/index.png',
                    activeIcon:'/static/images/new/index_active.png',
                    path:'/pages/index/main',
                    key:'index'
                },
                {
                    title:'消息',
                    icon:'/static/images/new/message.png',
                    activeIcon:'/static/images/new/message_active.png',
                    path:'/pages/message/main',
                    key:'message'
                },
                {
                    title:'中意人',
                    icon:'/static/images/new/heart.png',
                    activeIcon:'/static/images/new/heart_active.png',
                    path:'/pages/heart/main',
                    key:'heart'
                },
                {
                    title:'动态',
                    icon:'/static/images/new/dynamic.png',
                    activeIcon:'/static/images/new/dynamic_active.png',
                    path:'/pages/dynamic/main',
                    key:'dynamic'
                },
                {
                    title:'设置',
                    icon:'/static/images/new/setting.png',
                    activeIcon:'/static/images/new/setting_active.png',
                    path:'/pages/setting/main',
                    key:'setting'
                },
            ],
            isIPX:0,
            currentIndex:store.state.currentIndex,
        }
    },
    onShow(){
        console.log('onshow');
        this.currentIndex=store.state.currentIndex
    },
    mounted(option){
        const systemInfo = wx.getSystemInfoSync();     
        let bottomNavBarHeight = 50 ;   // 计算底部导航栏的高度
        // 判断是否iponex的代码
        var model = systemInfo.model;
        if(model.search('iPhone X')!=-1){
            store.commit('setISipx', 1)
            bottomNavBarHeight = 50+20;
            this.isIPX = 20;
        }
        console.log('机型：',store.state.isIPX);
        
        const systemHeight = store.state.systemHeight;

    },
    methods:{
        goToNavBar(item){
            console.log(item);
            this.currentIndex = item.key;
            store.commit('setCuttentIndex', item.key)
            wx.switchTab({
                url:item.path
            })
        }
    }
}
</script>
<style scoped>
.bottom-nav-bar{
    position: relative;
    bottom: 0;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:rgba(255,255,255,1);
    box-shadow:0px -8px 10px 0px rgba(171,171,171,0.1);

}
.nav-bar-item{
    flex: 1;
    /* background: red; */
    text-align: center;
    /* padding: 20rpx 0 ; */
}
.item-image{
    width: 46rpx;
    height: 46rpx;
}
.nav-bar-title{
    font-size:22rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:30rpx;
}
.ipx{
    padding-bottom: 20px;
}
.activeColor{
    color:#595E6D ;
}
</style>