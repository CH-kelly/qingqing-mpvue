<template>
    <div class="buy-member-vip-lists">
        <div class="vip-lists-item1">
            <div class="buy-one-title">会员中心</div>
            <div class="buy-two-title">让彼此更亲近</div>
            <div class="buy-image">
                <img src="/static/images/new/slices.png" alt="">
                <div class="buy-image-title">相应的特权及文字描述</div>
            </div>
        </div>
        <div class="vip-lists-item2">
            
            <div class="vip-items-lists">
                <div class="vip-item" 
                    v-for="(item,i) in list" :key="i"
                :class="currentIndex === item.id?'active':''"  
                @click="changeVipItem(item.id)"

                >
                    <div class="vip-item-desc" >
                        <div class="vip-item-title"  :class="currentIndex === item.id?'active':''" >{{item.num}}{{item.unitcon}}</div>
                        <div class="vip-item-title1"  :class="currentIndex === item.id?'active':''" >{{item.type === 1 ? '超级喜欢':'会员'}}</div>
                    </div>
                    <div class="vip-item-line"></div>
                    <div class="vip-item-price">
                        <div class="vip-item-newPrice"  :class="currentIndex === item.id?'active':''" >￥{{item.price}}元</div>
                        <div class="vip-item-oldPrice"  :class="currentIndex === item.id?'active':''" v-if="item.day_price">￥{{item.day_price}}元</div>
                    </div>
                </div>
                <!-- <div class="vip-item" :class="currentIndex === 2?'active':''"   @click="changeVipItem(2)">
                    <div class="vip-item-desc">
                        <div class="vip-item-title" :class="currentIndex === 2?'active':''">1天</div>
                        <div class="vip-item-title1 " :class="currentIndex === 2?'active':''">会员</div>
                    </div>
                    <div class="vip-item-line"></div>
                    <div class="vip-item-price">
                        <div class="vip-item-newPrice " :class="currentIndex === 2?'active':''">￥8.8元</div>
                        <div class="vip-item-oldPrice " :class="currentIndex === 2?'active':''"></div>
                    </div>
                </div>
                <div class="vip-item" :class="currentIndex === 3?'active':''"  @click="changeVipItem(3)">
                    <div class="vip-item-desc">
                        <div class="vip-item-title" :class="currentIndex === 3?'active':''">1周</div>
                        <div class="vip-item-title1" :class="currentIndex === 3?'active':''">会员</div>
                    </div>
                    <div class="vip-item-line"></div>
                    <div class="vip-item-price">
                        <div class="vip-item-newPrice" :class="currentIndex === 3?'active':''">￥49元</div>
                        <div class="vip-item-oldPrice" :class="currentIndex === 3?'active':''">￥7元一天</div>
                    </div>
                </div>
                <div class="vip-item" :class="currentIndex === 4?'active':''"  @click="changeVipItem(4)">
                    <div class="vip-item-desc">
                        <div class="vip-item-title" :class="currentIndex === 4?'active':''">1月</div>
                        <div class="vip-item-title1" :class="currentIndex === 4?'active':''">会员</div>
                    </div>
                    <div class="vip-item-line"></div>
                    <div class="vip-item-price">
                        <div class="vip-item-newPrice" :class="currentIndex === 4?'active':''">￥150元</div>
                        <div class="vip-item-oldPrice" :class="currentIndex === 4?'active':''">￥5元一天</div>
                    </div>
                </div> -->
            </div>


            <div class="vip-item-button">
                <div class="vip-item-button-buy" @click="openVip">开通会员</div>
            </div>
        </div>
        <div class="vip-lists-item3">
            <img class="vip-close" src="/static/images/new/close.png" alt="" @click="close">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        list:{ type: Object }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        close(){
            console.log('close');
            
            this.$emit('close',0)
        },
        changeVipItem(number){
            this.currentIndex = number
            // this.setData({
            //     currentIndex:number
            // })
            console.log(this.currentIndex);
            
        },
        openVip(){  //开通会员
            var that = this;
            if(that.currentIndex==0){
               wx.showToast({title:"请选择类型",icon:'none'})
            };
            
            let token = wx.getStorageSync('token') || '';
            if(!token){
               wx.showToast({title:"请登录",icon:'none'})
            };
            let id = that.currentIndex;
             that.postRequest('home/Order/index',{token,id}).then(res=>{
                console.log(res);
                if(res.code==0){   //下单成功后调用微信支付
                    let timeStamp = res.data.timeStamp;
                    let nonceStr = res.data.nonceStr;
                    let package1 = res.data.package;
                    let signType = res.data.signType;
                    let paySign = res.data.sign;
                    wx.requestPayment({
                        timeStamp: timeStamp,
                        nonceStr: nonceStr,
                        package: package1,
                        signType: signType,
                        paySign: paySign,
                        success (res) {
                            console.log(res);
                            if(res){
                                that.$emit('close',1)
                            }
                        },
                        fail (res) {
                            console.log(res);
                        }
                    })
                }
            },err=>{
            console.log(err);
            
            })
        }
    }
}
</script>
<style scoped>
.buy-member-vip-lists{
    width: 80%;
    overflow:hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.buy-one-title{
    
font-size:38rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
}
.buy-two-title{
    margin-top: 18rpx;
font-size:24rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
}
.buy-image{
    width: 100%;
    text-align: center;
}
.buy-image>img{
    width: 110rpx;
    height: 110rpx;
    vertical-align: middle;
}
.buy-image-title{
    
font-size:26rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
}
.vip-lists-item1{
    /* padding-bottom: 28rpx; */
    padding: 30rpx 36rpx;
    background: #EFBA6A;
    border-radius:20rpx 20rpx 0px 0px;
}



.vip-lists-item2{
    /* margin-top: 30rpx; */
    background: #ffffff;
    padding: 30rpx 20rpx;
    border-radius: 0px 0px 20rpx 20rpx;
}



.vip-items-lists{
    display: flex;
    justify-content: space-between;
}
.vip-item{
    width: 23%;
    background: #F6F6F6;
    border-radius: 10rpx;
}
.vip-item-desc{
    text-align: center;
    padding: 10rpx 20rpx;
}
.vip-item-title{
    
font-size:26rpx;
font-family:PingFang SC;
font-weight:800;
color:#333333;
}
.vip-item-title1{
    
font-size:20rpx;
font-family:PingFang SC;
font-weight:800;
color:#333333;
}

.vip-item-line{
    widows: 100%;
    height: 2rpx;
    background: #FFFFFF;
}
.vip-item-price{

    /* padding: 10rpx 20rpx; */
    padding: 10rpx;
    text-align: center;
    font-size:22rpx;
    font-family:PingFang SC;
    font-weight:800;
    color:rgba(239,186,106,1);
}
.vip-item-oldPrice{
    margin-top: 8rpx;

    font-size:16rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
}
.active{
    background: #EFBA6A !important;
    color: #ffffff !important;
}








.vip-item-button{
    margin-top: 40rpx;
    width: 100%;
    height:69rpx;
    display: flex;
    justify-content: center;
}

.vip-item-button-buy{
    width: 50%;
    height:69rpx;
    line-height: 69rpx;
    text-align: center;
    background:linear-gradient(0deg,rgba(242,204,146,1),rgba(229,178,101,1));
    box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);
    border-radius:35px;

    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
}


.vip-lists-item3{
    margin-top: 26rpx;
    display: flex;
    justify-content: center;
}
.vip-close{
    width: 50rpx;
    height: 50rpx;
    vertical-align: middle;
}


</style>