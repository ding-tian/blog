<template>
  <div>
    <div class="hero">
      <h2>
        笔记列表
      </h2>
    </div>
    <!-- 笔记列表 -->
    <ul class="note_list">
      <li v-for="(note, index) in noteList" :key="index">
        <router-link class="note" :to="'article/' + note.name" :key="index">
          <p class="item_header" v-text="note.name"></p>
          <span class="ctime">{{ note.ctime | formatDate }}</span>
          <p v-html="note.content"></p>
        </router-link>
      </li>
    </ul>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="[3, 4, 5, 8]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'Note',
  data() {
    return {
      // 笔记列表
      noteList: [],
      // 分页参数
      pagination: {
        page: 1,
        size: 3
      },
      // 笔记总数量
      total: 0
    }
  },
  created() {
    // 请求笔记数据
    this.getNoteList()
  },
  methods: {
    // 请求笔记数据
    async getNoteList() {
      // 向后台请求数据
      const result = await this.$axios.get('/note/findNoteList', {
        params: this.pagination
      })
      // 请求失败处理
      if (result.status !== 200) return console.log('获取数据失败')
      // 将数据赋值给noteList
      console.log(result.data)
      this.noteList = result.data.noteList
      this.total = result.data.total
      console.log(this.noteList)
    },
    // 当每页显示的数量发生变化时触发
    handleSizeChange(size) {
      this.pagination.size = size
      this.getNoteList()
    },
    // 当前页发生改变触发
    handleCurrentChange(page) {
      this.pagination.page = page
      this.getNoteList()
    }
  },
  filters: {
    // 处理时间的
    formatDate(date) {
      return format(new Date(date), 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped lang="less">
.hero::after {
  content: '';
  display: block;
  background-color: #d4a259;
  margin-top: 1.66667em;
  height: 1px;
  width: 60px;
}
.note_list {
  padding-top: 30px;
  li {
    position: relative;
    border-left: 1px solid #a1a1a1;
    border-bottom: 1px solid#a1a1a1;
    border-right: 1px solid #a1a1a1;
    height: 126px;
    &:nth-child(1) {
      border-top: 1px solid #a1a1a1;
    }
    &:hover {
      background-color: #2d87db;
      .note {
        color: #fff;
        padding-left: 100px;
      }
    }
    .note {
      display: block;
      width: 100%;
      height: 100%;
      padding-left: 30px;
      -moz-transition: padding-left 0.5s;
      -webkit-transition: padding-left 0.5s;
      -ms-transition: padding-left 0.5s;
      -o-transition: padding-left 0.5s;
      transition: padding-left 0.5s;
      .item_header {
        padding-top: 1em;
        margin-bottom: 10px;
      }
      .ctime {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
