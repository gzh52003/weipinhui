<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="userlist"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="100"></el-table-column>
      
      <el-table-column label="#" type="index" width="200"></el-table-column>
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
     
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
    };
  },
  methods: {
    async deleteUser(id) {
      
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(async () => {
        console.log(id);
        const { data } = await this.$request.delete("/user/" + id);
        this.userlist = this.userlist.filter((item) => item._id !== id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        console.log(data)
      });
    },
    goto(id) {
      this.$router.push("/user/edit/"+id);
    },

    // 删除弹出框
  },

  async created() {
    const { data } = await this.$request.get("/user");
    console.log(data);
    this.userlist = data.data;
  },
};
</script>
<style lang ="scss">
</style>