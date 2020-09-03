<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="书名" prop="itemName" style="width:400px">
      <el-input type="text" v-model="ruleForm.itemName"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author" style="width:400px">
      <el-input type="text" v-model="ruleForm.author"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price" style="width:400px">
      <el-input type="text" v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    var checkitemname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("作者不能为空"));
      }else{
        callback()
      }
    };
    var checkauthor = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("作者不能为空"));
      }else{
        callback()
      }
    };
    var checkprice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value-0)) {
          callback(new Error("请输入正确价格"));
        } else {
          // value = (value-0).toFixed(2)
          // console.log(value);
          callback();
        }
      }, 1000);
    };
    return {
        goodsid: "",
      ruleForm: {
        author: "",
        price: "",
      },
      rules: {
        itemName:[{required:true, validator: checkitemname, trigger: "blur"}],
        price: [{required:true, validator: checkprice, trigger: "blur" }],
        author: [{required:true, validator: checkauthor, trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { ruleForm } = this;
        //   const { username, password, age, gender } = ruleForm;
          this.$request.post("/goods/", {
            // username,
            // password,
            // gender,
            // age,
            ...ruleForm
          });

          this.$router.push("./glist");
          this.$message({
            message: "添加成功",
            type: "success",
          });
        } else {
          this.$message.error("修改失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang ="scss">
</style>