<template>
  <div class="describe">
    <div class="top">
      <div class="top-rounded"></div>
      <div class="top-title">基本资料</div>
      <div class="top-edit" v-if="isEdit==0" @click="editInfo">编辑</div>

      <div class="top-edit top-edit-complete" v-if="isEdit==1" @click="complete">保存</div>
    </div>
    <div class="center" v-if="isEdit == 0">
        <div class="personal">
            <div class="info-card">  
                <div class="card-left">
                    <div class="nickname">{{headInfo.nickname}}</div>
                    <div class="info">
                        <div class="info-desc">{{headInfo.age}}岁</div>
                        <div class="info-line"></div>
                        <div class="info-desc">{{headInfo.stature}}cm</div>
                        <div class="info-line"></div>
                        <div class="info-desc">{{headInfo.horoscope}}</div>
                    </div>
                </div>
                <div class="card-right">
                    <img class="card-right-location" src="/static/images/new/location.png" alt="">
                    <span>{{headInfo.province}}</span><span>{{headInfo.city}}</span>
                </div>
            </div>
            <!-- 职业 -->
            <div class="info-card-occupation">
                <div class="occupation-left background-border-radius">职业：{{headInfo.occupation}}</div>
                <div  class="occupation-left background-border-radius">收入：{{headInfo.income}}</div>
            </div>
        </div>
    </div>
    <div class="center" v-if="isEdit == 1">
        <div class="personal">
            <div class="info-card">  
                <div class="card-left">
                  <div class="nickname">{{headInfo.nickname}}</div>
                    <!-- <div class="nickname">
                        <input class="weui-input-nickName" auto-focus :value="headInfo.nickname"/>
                    </div> -->
                    <div class="info">
                        <div class="info-desc">
              
                            <picker mode="date" :value="headInfo.birthday"  @change="bindDateChange">
                              <view class="picker">
                                请点击选择出生日期: {{birthday}}
                              </view>
                            </picker>
                        </div>
                        <div class="info-line"></div>
                        <div class="info-desc">
                            <input class="weui-input-age" :value="headInfo.stature"/>cm</div>
                        <div class="info-line"></div>
                        <!-- <div class="info-desc">
                            <input class="weui-input-age" :value="headInfo.horoscope"/>
                        </div> -->
                    </div>
                </div>
                
                <div class="card-right">
                    <!-- 居住地址 -->
                    <!-- <picker
                        mode="multiSelector"
                        @columnchange="changeCityValue"
                        :value="mulIndex"
                        :range="mulArr"
                    >
                        <div class="card-right-picker">
                            <img class="card-right-location" src="/static/images/new/location.png" alt="">
                    
                            <span>{{mulArr[1][mulIndex[1]]}}</span><span>{{mulArr[2][mulIndex[2]]}}</span>
                        
                        </div>
                    </picker> -->
                    <picker
                        mode="region"
                        @columnchange="changeCityValue"
                        :value="headInfo.province"
                    >
                        <div class="card-right-picker">
                            <img class="card-right-location" src="/static/images/new/location.png" alt="">
                            <span>{{province}}</span><span>{{city}}</span>
                            
                        </div>
                    </picker>
                </div>
                
            </div>
            <!-- 职业 -->
            <div class="info-card-occupation">
                <div class="occupation-left background-border-radius">职业：
                    <picker
                        mode="multiSelector"
                        @columnchange="changeOccupationValue"
                        :value="occupation"
                        :range="occupationArr"
                    >
                        
                        <span>{{occupationArr[2][occupationIndex[2]]}}</span>
                    </picker>
                
                </div>

                <div  class="occupation-left background-border-radius">收入：
                    <input class="weui-input" :value="headInfo.income"/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isEdit: 0,
      occupationIndex: [0, 0, 0],
      occupationArr:[],
      occupationArrJson: [
        {
          type:'销售/客服',
          brand:[
            {
              name: "销售业务",
              cars: ["客服专员", "助理"]
            },
            {
              name: "销售管理",
              cars: ["客服专员", "助理"]
            }
          ]
        },
        {
          type:'技术',
          brand:[
            {
              name: "前端开发",
              cars: ["web开发", "JavaScript", "HTML5", "Flash"]
            },
            {
              name: "后端开发",
              cars: ["java", "PHP"]
            }
          ]
        }
      ],
      mulIndex: [0, 0, 0],
      mulArr: [],
      json: [
        {
          type: "汽车",
          brand: [
            {
              name: "领克",
              cars: ["01", "02", "03"]
            },
            {
              name: "丰田",
              cars: ["汉兰达", "凯美瑞", "卡罗拉"]
            }
          ]
        },
        {
          type: "摩托车",
          brand: [
            { name: "雅马哈", cars: ["MT-9", "迅鹰"] },
            { name: "铃木", cars: ["钻豹", "gw250"] }
          ]
        },
        {
          type: "自行车",
          brand: [
            { name: "美利达", cars: ["挑战者300", "挑战者900"] },
            { name: "捷安特", cars: ["ATX777", "XTR"] }
          ]
        }
      ],
      birthday:'',
      province:'',
      city:'',
    };
  },
  onLoad() {
    // 初始化picker默认值
    this.mulArr[0] = this.json.map(function(v) {
      return v.type;
    });
    this.mulArr[1] = this.json[this.mulIndex[0]].brand.map(function(v) {
      return v.name;
    });
    this.mulArr[2] = this.json[this.mulIndex[0]].brand[this.mulIndex[1]].cars;

    // 初始化职业的值
    this.occupationArr[0] = this.occupationArrJson.map(function(v){
      return v.type
    })
    this.occupationArr[1] = this.occupationArrJson[this.occupationIndex[0]].brand.map(function(v) {
      return v.name;
    });
    this.occupationArr[2] = this.occupationArrJson[this.occupationIndex[0]].brand[this.occupationIndex[1]].cars;



  },
  methods: {
      changeCityValue(e) {
      //更新城市
      // 列的值改变时触发   我这里是三列：车子类型  品牌名称  车型
      console.log("修改的列", e.target.column, "值为", e.target.value,'城市', e.detail.value);
      // 监听用户操作，改变mulIndex的值
      this.mulIndex[e.target.column] = e.target.value;
      // mulArr[0]的值是不会随用户操作变更的，因此不需要改变
      // mulArr[1]的值是由 mulIndex[0]的值决定的
      this.mulArr.splice(
        1,
        1,
        this.json[this.mulIndex[0]].brand.map(function(v) {
          return v.name;
        })
      );
      // mulArr[2]的值是由 muIndex[1]的值决定的
      this.mulArr.splice(
        2,
        1,
        this.json[this.mulIndex[0]].brand[this.mulIndex[1]].cars
      );
    },
    bindDateChange(e){
      // 更新生日
      console.log('更新生日', e.detail.value)
        this.birthday =  e.detail.value
    },
    changeOccupationValue(e) {
      //监听职业联动
      console.log("修改职业联动", e.target.column, "值为", e.target.value);
      this.occupationIndex[e.target.column] = e.target.value;

      this.occupationArr.splice(1,1,
      
        this.occupationArrJson[this.occupationIndex[0]].brand.map(function(v){
          return v.name;
        })
      )
      this.occupationArr.splice(2,1,
      
        this.occupationArrJson[this.occupationIndex[0]].brand[this.occupationIndex[1]].cars
      )
    },
    editInfo() {
      console.log("编辑");
      this.isEdit = 1;
    },
    bindTextAreaBlur(e) {
      console.log(e);
    },
    complete() {
      this.isEdit = 0;
      console.log("提交s");
      wx.showToast({
        title: "成功",
        icon: "success",
        duration: 2000
      });
    }
  }
};
</script>
<style scoped>
.describe {
  margin: 20rpx;
  /* margin-top: 20rpx; */
  background: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
}
.describe > .top {
  display: flex;
  align-items: center;
  position: relative;
}
.top-rounded {
  width: 10rpx;
  height: 30rpx;
  background: rgba(130, 222, 199, 1);
  border-radius: 5px;
  margin-right: 20rpx;
}
.top-title {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.describe > .center {
    height: 240rpx;

  overflow: hidden;

  margin-top: 10rpx;

  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}

.top-edit {
  width: 87rpx;
  height: 41rpx;
  background: rgba(241, 241, 241, 1);
  border-radius: 21rpx;

  position: absolute;
  right: 0;

  line-height: 41rpx;
  text-align: center;
  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.top-edit-complete {
  background: rgba(130, 222, 199, 1);
  color: #ffffff;
}

/* 发布文本框 */
.index-center-textarea {
  width: 100%;
  height: 300rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333;
}
.placeholder-class {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: red;
}


.personal{
    margin-top: 20rpx;
    background: #ffffff;
    border-radius: 16rpx;
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
.info{
    display: flex;
    align-items: center;
    margin-top: 20rpx;

}
.card-left{
    width: 75%;
}
.card-left>.info>.info-desc{
    /* display: inline-block; */
    font-size: 24rpx;
    display: flex;
    align-items: center;
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
    width: 25%;
    font-size: 22rpx;
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 40%;
    font-size: 22rpx !important;
    margin-right: 20rpx;
    display: flex;
    align-items: center;
}


.card-right-picker{
    display: flex;
    justify-content: center;
    align-items: center;
}



.weui-input{
  background: #f2f2f2;
border-radius: 8rpx;

    display: inline-block;
    width: 200rpx;
}
.weui-input-nickName{
  
  background: #f2f2f2;
border-radius: 8rpx;
    width: 100%;
    display: inline-block;
}
.weui-input-age{
  
  background: #f2f2f2;
border-radius: 8rpx;
    display: inline-block;
    width: 80rpx;
}
</style>