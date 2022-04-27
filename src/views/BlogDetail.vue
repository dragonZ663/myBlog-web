<template>
  <div>
    <Header></Header>

    <div class="m-blog">
      <h2> {{ blog.title }}</h2>
      <!--编辑按钮-element ui-->
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">
          编辑
        </router-link>
      </el-link>
      <!--分隔线-->
      <el-divider></el-divider>
      <el-card class="box-card">
        <div class="text item">{{blog.description}}</div>
      </el-card>
      <el-divider></el-divider>
      <!--Markdown格式div调用-->
      <div class="markdown-body" v-html="blog.content"></div>

    </div>

  </div>
</template>

<script>
import 'github-markdown-css'
import Header from "../components/Header";

export default {
  name: "BlogDetail.vue",
  components: {Header},
  data() {
    return {
      blog: {
        id: "",
        title: "",
        description:"",
        content: ""
      },
      ownBlog: false
    }
  },
  created() {
    // 从路由信息中获取blogId
    const blogId = this.$route.params.blogId
    console.log(blogId)
    const _this = this
    // 根据id查询博客
    this.$axios.get('/blog/' + blogId).then(res => {
      const blog = res.data.data
      _this.blog.id = blog.id
      _this.blog.title = blog.title
      _this.blog.description = blog.description

      var MardownIt = require("markdown-it")
      var md = new MardownIt()

      // 使用Markdown进行格式渲染
      var result = md.render(blog.content)
      _this.blog.content = result
      // 如果查询到的博客的用户id与本页面（跳转时传入）的用户id一致，则可以对该博客进行修改
      _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)

    })
  }
}
</script>

<style scoped>
.m-blog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 4px 0;
}

.box-card {
  /*width: 480px;*/
}

</style>