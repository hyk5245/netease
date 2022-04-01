<template>
  <div v-if="this.singers.length > 0" class="singer-container" ref="singerTop">
    <div class="area">
      <span class="type-text">语种：</span>
      <div class="tags">
        <div @click="changeIndex(index, 0)" :class="{'tag-active': index === areaCurIndex}" class="tag-div" v-for="(item, index) in areas" :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="type">
      <span class="type-text">分类：</span>
      <div class="tags">
        <div @click="changeIndex(index, 1)" :class="{'tag-active': index === typeCurIndex}" class="tag-div" v-for="(item, index) in types" :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="initial">
      <span class="type-text">筛选：</span>
      <div class="tags">
        <div @click="changeIndex(index, 2)" :class="{'tag-active': index === initialCurIndex}" class="tag-div" v-for="(item, index) in initials" :key="index">
          <span>{{item}}</span>
        </div>
      </div>
    </div>
    <div class="singer-list">
      <div class="singer-item" v-for="singer in singers" :key="singer.id">
        <img v-lazy="singer.picUrl" alt="歌手图片">
        <span class="singer-name">{{singer.name}}</span>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="30"
        :pager-count="pagerCount"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
  <div v-else>
    <Null />
  </div>
</template>

<script>
export default {
  name: 'Singer',
  data() {
    return {
      areas: [{name: '全部', code: -1}, {name: '华语', code: 7}, {name: '欧美', code: 96}, {name: '日本', code: 8}, {name: '韩国', code: 16}, {name: '其他', code: 0}],
      types: [{name: '全部', code: -1}, {name: '男歌手', code: 1}, {name: '女歌手', code: 2}, {name: '乐队组合', code: 3}],
      initials: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      areaCurIndex: 0,
      typeCurIndex: 0,
      initialCurIndex: 0,
      limit: 15,
      offset: 0,
      singers: [],
      pagerCount: 9
    }
  },
  mounted() {
    this.getSingerList();
  },
  computed: {
    initial() {
      return this.initialCurIndex === 0 ? -1 : this.initialCurIndex === this.initials.length - 1 ? 0 : this.initials[this.initialCurIndex];
    },
    type() {
      return this.types[this.typeCurIndex].code;
    },
    area() {
      return this.areas[this.areaCurIndex].code
    }
  },
  methods: {
    // 点击每个tag的回调
    changeIndex(index, type) {
      if (type === 0) this.areaCurIndex = index;
      else if (type === 1) this.typeCurIndex = index;
      else this.initialCurIndex = index;
      this.getSingerList();
    },
    // 获取歌手列表数据
    async getSingerList() {
      let {limit, offset, initial, type, area} = this;
      const params = {
        limit,
        offset,
        initial,
        type,
        area
      }
      let result = await this.$API.reqGetSingerList(params);
      if (result.code === 200) {
        this.singers = result.artists;
      }
    },
    // 点击分页按钮回调
    currentChange(index) {
      this.offset = (index - 1) * this.limit;
      this.getSingerList();
      this.$bus.$emit('change', this.$refs.singerTop.offsetTop);
    }
  }
}
</script>

<style scoped>
.singer-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: .24rem;
}
.area, .type, .initial {
  display: flex;
  align-items: flex-start;
  margin: .1rem 0;
}
.type-text {
  display: inline-block;
  padding: .1rem 0;
}
.tags {
  flex: 1;
  text-align: left;
}
.tag-div span {
  display: inline-block;
  padding: 0 .4rem;
  border-right: 1px solid #f2f2f2;
}
.tags .tag-div:last-child span{
  border-right: none;
}
.tag-div {
  display: inline-block;
  padding: .1rem 0;
  cursor: pointer;
}
.tag-active {
  color: #ec4141;
  font-weight: 600;
}
/* 歌手样式 */
.singer-list {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.singer-item {
  padding: .2rem;
  width: 20%;
  display: flex;
  flex-direction: column;
}
.singer-item img {
  width: 100%;
  border-radius: .2rem;
}
.singer-name {
  margin-top: .12rem;
}
</style>