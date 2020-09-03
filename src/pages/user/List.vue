<template>
  <div>
    <el-button type="danger" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
    <el-table
      @selection-change="selsChange"
      :data="userlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column type="selection" width="100"></el-table-column>

      <el-table-column label="#" type="index" width="200" ></el-table-column>
      <el-table-column label="用户名" prop="username" width="230"></el-table-column>
      <el-table-column prop="age" label="年龄" width="200"></el-table-column>
      <el-table-column prop="gender" label="性别" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="200">
        <!-- 需要获取数据id -->
        <template v-slot:default="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="goto(scope.row._id)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteUser(scope.row._id)"
          ></el-button>
          <!-- <el-button type="warning" @click="deleteAll(scope.row._id)">全部删除</el-button> -->
          <!-- deleteUser(scope.row._id) -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="pagesize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="userlist.length"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      sels: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
    };
  },
  // computed:{
  //   userlist(){userlist.slice((currentPage-1)*pagesize,currentPage*pagesize)}
  // },
  methods: {
    // 实现分页
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },

    // 批量删除
    deleteFileOrDirectory() {
      var ids = this.sels.map((item) => item._id).join(); //获取所有选中行的id组成的字符串，以逗号分隔
      this.$confirm("此操作将删除所用选中用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        ids = ids.split(",");
        //  const { data } = await this.$request.delete("/user/" + ids);
        for (let i = 0; i < ids.length; i++) {
          let { data } = await this.$request.delete("/user/" + ids[i]);
          this.userlist = this.userlist.filter((item) => item._id !== ids[i]);
        }
        history.go(0);
        console.log("删除成功");
      });
    },

    selsChange(sels) {
      this.sels = sels;
      console.log(this.sels);
    },
    async deleteUser(id) {
      // const { data } = await this.$request.delete("/user/" + id);
      // this.userlist = this.userlist.filter((item) => item._id !== id);
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/user/" + id);
        this.userlist = this.userlist.filter((item) => item._id !== id);
        this.$message({
          type: "success",
          message: "删除成功!",
          
        });
      });
    },
    goto(id) {
      this.$router.push("/user/edit/" + id);
    },

    async handleUserList() {
      const { data } = await this.$request.get("/user");
      this.userlist = data.data;
      console.log(this.userlist);
    },

    // 删除弹出框
  },

  created() {
    this.handleUserList();
  },
};
</script>
<style lang ="scss">
</style>