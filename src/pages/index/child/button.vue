<template>
    <div class="button" :style="{bottom:'70px'}">
        <div class="button-left" >
            <img @click="clickButtonImage" class="button-image" src="/static/images/greet/delete_icon.png" alt="">
        </div>
        <div class="button-right" >
            <img @click="clickButtonImage"  class="button-image" src="/static/images/greet/like_icon.png" alt="">
        </div>
    </div>
</template>
<script>
import store from '@/store'
export default {
    props:{
        
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
    methods:{
        clickButtonImage(){
            // console.log('k',k);
            console.log(1111);
            
            // this.$emit('clickLove',k)
        }
    },
    mounted(){
        // this.distanceBottom = store.state.bottomNavBarHeight;
        // console.log('distanceBottom',this.distanceBottom);
        
        
    }
}
</script>
<style scoped>
.button{
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 1;
    display: flex;
    justify-content: center;
}
.button-left{
    /* width: 30%; */
    background: orange;
    margin-right: 30rpx;
}
.button-right{
    background: skyblue;
}


.button-image{
    width: 160rpx;
    height: 160rpx;
}
</style>