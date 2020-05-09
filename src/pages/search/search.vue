<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">搜索设置</div>
    </navigation-bar>

    <div class="index-center" :style="{marginTop:systemHeight+'px'}">
      <div class="index-center-title">修改后次日生效</div>
      <div class="center-content">
        <div class="center-content-item">
          <div class="content-item-title">地区设置</div>
          <picker
            mode="multiSelector"
            @columnchange="changeCityValue"
            :value="mulIndex"
            :range="mulArr"
          >
            <div class="content-item-title1">
              <div class="content-item-city">城市</div>
              <div class="content-item-city1">
                <span>{{mulArr[0][mulIndex[0]]}}，{{mulArr[1][mulIndex[1]]}}，{{mulArr[2][mulIndex[2]]}}</span>
                <img class="item-back" src="/static/images/new/back.png" alt />
              </div>
            </div>
          </picker>
        </div>
        <div class="center-content-item">
          <div class="content-item-title">职业设置</div>
          <picker
            mode="multiSelector"
            @columnchange="changeOccupationValue"
            :value="occupationIndex"
            :range="occupationArr"
          >
            <div class="content-item-title1">
              <div class="content-item-city">职业</div>
              <div class="content-item-city1">
                <!-- <span>设计师</span> -->
                <span>{{occupationArr[2][occupationIndex[2]]}}</span>
                <img class="item-back" src="/static/images/new/back.png" alt />
              </div>
            </div>
          </picker>
        </div>
      </div>
      <div class="center-content">
        <div class="center-content-item">
          <div class="content-item-age">
            <div class="content-item-title">年龄设置</div>
            <div class="content-item-age-area">18 - 50</div>
          </div>
          <div class="center-content-slider">
            <slider min=18 max=50  step=1 value=20   block-size=12 block-color="#7FDDC6"
            activeColor="#A0E8DA" backgroundColor="#E9EEF1" 
            @change="sliderChange" show-value/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      isShowBuyMemberVip: false,
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
      ]
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
  components: {
    navigationBar
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
  },
  methods: {
    changeCityValue(e) {
      //更新城市
      // 列的值改变时触发   我这里是三列：车子类型  品牌名称  车型
      console.log("修改的列", e.target.column, "值为", e.target.value);
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
    sliderChange(e){
      console.log(e);
      
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.navigation-left-back {
  width: 90rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 22rpx;
  color: #333333;
  font-size: 26rpx;
  font-weight: normal;

  overflow: hidden;
}
.navigation-center-image {
  width: 45%;
  height: 50%;
}

.index-center {
  /* padding: 0 20rpx 40rpx 20rpx; */
  background: #f2f6f9;
  /* background:skyblue; */
  overflow: hidden;
}

.index-center-title {
  padding: 30rpx;
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 38rpx;
}
.center-content {
  background: #ffffff;
}
.center-content-item {
  padding: 30rpx;
  border-bottom: 1px solid #eeeeee;
}
.content-item-title {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.content-item-title1 {
  margin-top: 15rpx;
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;

  display: flex;
  position: relative;
}
.content-item-city1 {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50rpx;
}
.content-item-city {
  width: 60%;
}

.item-back {
  width: 16rpx;
  height: 20rpx;
  transform: rotate(180deg);
  position: absolute;
  right: 20rpx;
  top: 11rpx;
}








.content-item-age{
  display: flex;
}
.content-item-title{
  width: 60%;
}
.content-item-age-area{
  width: 40%;
  display: flex;
  justify-content: flex-end;
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
  line-height:38rpx;
  padding-right: 50rpx;
}




</style>
