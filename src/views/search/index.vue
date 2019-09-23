<template>
  <div>
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(keywords)"
      @cancel="onCancel"
    />
    <van-cell-group v-if="keywords">
      <van-cell
        icon="search"
        @click="onSearch(item.item)"
        v-for="(item, index) in keywordsList"
        :key="index"
      >
        <div slot="title" v-html="item.colorItem"></div>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template slot="right-icon">
          <div>
            <van-icon name="delete" v-if="!showHistory" @click="showHistory=true" />
            <span v-if="showHistory" @click="delAll">全部删除</span>
            <span v-if="showHistory" @click="showHistory=false">&nbsp;&nbsp;完成</span>
          </div>
        </template>
      </van-cell>
      <van-cell
        icon="search"
        :title="item"
        v-for="(item,index) in historyKeywords"
        :key="index"
        @click="onSearch(item)"
      >
        <template slot="right-icon">
          <van-icon name="close" v-if="showHistory" @click="delone(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getkeywords } from "@/api/search";
export default {
  data() {
    return {
      keywords: "",
      keywordsList: [],
      timer: null,
      showHistory: false,
      historyKeywords: JSON.parse(window.localStorage.getItem("history")) || []
    };
  },
  methods: {
    onSearch(key) {
      this.historyKeywords.unshift(key);
      // 去重
      this.historyKeywords = new Set(this.historyKeywords);
      this.historyKeywords = [...this.historyKeywords];
      // 历史搜索存入本地
      window.localStorage.setItem(
        "history",
        JSON.stringify(this.historyKeywords)
      );
      this.$router.push(`/list/${key}`);
    },
    onCancel() {},
    delAll() {
      this.historyKeywords = [];
      window.localStorage.removeItem("history");
    },
    delone(index) {
      this.historyKeywords.splice(index, 1);
      window.localStorage.setItem(
        "history",
        JSON.stringify(this.historyKeywords)
      );
    }
  },
  watch: {
    keywords: function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.keywords.trim().length == 0) {
        this.keywordsList = [];
        return;
      }
      this.timer = setTimeout(async () => {
        let res = await getkeywords(this.keywords);
        this.keywordsList = res.options;
        this.keywordsList = this.keywordsList.map(item => {
          return {
            item,
            colorItem: item
              .split(this.keywords)
              .join(`<span style="color:red">${this.keywords}</span>`)
          };
        });
      }, 500);
    }
  }
};
</script>

<style>
</style>