<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <div class="mytemp">
        <div class="mybox">
          <div class="mychannel">
            我的频道
            <span>点击进入频道</span>
          </div>
          <van-button
            v-if="showing"
            @click="dochoose"
            size="small"
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
          >筛选</van-button>
          <van-button
            v-else
            size="small"
            @click="chooseok"
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
          >完成</van-button>
        </div>
        <van-grid clickable>
          <van-grid-item v-for="(item,index) in channel" :key="index">
            <div slot="text">
              <div
                class="myname"
                :class="{ 'active': index==active }"
                @click="doActive(index)"
              >{{ item.name }}</div>
              <van-icon v-if="!showing && index>=1" @click="dodel(index)" name="clear" />
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="mytemp">
        <div class="mybox">
          <div class="mychannel">
            添加频道
            <span>点击添加频道</span>
          </div>
        </div>

        <van-grid clickable>
          <van-grid-item v-for="(item,index) in addChannel" :key="index" @click="doAdd(item)">
            <div slot="text">
              <div class="myname">{{ item.name }}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { allChannel, setUserChannel } from "@/api/channel";
export default {
  props: ["value", "channel", "active"],
  data() {
    return {
      showing: true,
      allChannelList: []
    };
  },
  methods: {
    // 点击高亮
    doActive(index) {
      this.$emit("update:active", index);
    },
    // 点击筛选
    dochoose() {
      this.showing = false;
    },
    // 筛选完成
    chooseok() {
      this.showing = true;
    },
    // 给channel添加属性的方法
    addAttr() {
      this.channel.forEach(item => {
        this.$set(item, "article", []);
        this.$set(item, "uploading", false);
        this.$set(item, "finished", false);
        this.$set(item, "downloading", false);
        this.$set(item, "pre_timestamp", 0);
      });
    },
    // 点击删除我的频道
    async dodel(index) {
      // 直接先删除
      this.channel.splice(index, 1);
      // 判断是否登录
      if (this.$store.state.user) { // 已登录 则发请求
        // 改造channel数组,第一项默认无法删除,故先截去第一项
        let channels = this.channel.slice(1).map((it, index) => {
          return {
            id: it.id,
            seq: index + 2
          };
        });
        let res = await setUserChannel({ channels: channels });
      } else { // 未登录

        // 将改变后的数据更新到本地
        window.localStorage.setItem("channel", JSON.stringify(this.channel));
      }
      // 将channel传回home页
      this.$emit("updata:channel", this.channel);
    },
    // 点击添加频道
    async doAdd(item) {
      // 点击当前的频道将其添加到channel数组中
      this.channel.push(item);
      this.addAttr();
      // 判断是否登录
      if (this.$store.state.user) {
        //已登录
        // 改造channel数组,第一项默认无法删除,故先截去第一项
        let channels = this.channel.slice(1).map((it, index) => {
          return {
            id: it.id,
            seq: index + 2
          };
        });
        let res = await setUserChannel({ channels: channels });
      } else {
        //未登录

        // 将添加后的数据更新到本地
        window.localStorage.setItem("channel", JSON.stringify(this.channel));
      }
      // 将channel传回home页
      this.$emit("updata:channel", this.channel);
    },
    // 获取所有频道的方法
    async getAllChannel() {
      let res = await allChannel();
      this.allChannelList = res.channels;
    }
  },
  mounted() {
    this.getAllChannel();
  },
  computed: {
    addChannel() {
      // 获取用户频道的id
      let userid = this.channel.map(item => {
        return item.id;
      });

      return this.allChannelList.filter(item => {
        return !userid.includes(item.id);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mytemp {
  margin-bottom: 40px;
  .mybox {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .mychannel {
      font-size: 18px;

      span {
        font-size: 12px;
      }
    }
    .van-button {
      border-radius: 20px;
    }
  }
  .van-grid-item {
    position: relative;
    .myname {
      font-size: 12px;
      color: #333;
    }
    .active {
      color: pink;
    }
    .van-icon {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
}
</style>