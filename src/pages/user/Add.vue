<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username" style="width:400px">
      <el-input type="text" v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" style="width:400px">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="gender" style="width:200px">
      <el-select v-model="ruleForm.gender" placeholder="请选择">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
        <el-option label="保密" value="保密"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="年龄" prop="age" style="width:200px">
      <el-input v-model.number="ruleForm.age"></el-input>
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (value !== this.ruleForm.username) {
        callback(new Error("用户名错误!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: "",
        age: "",
        gender: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { ruleForm } = this;
          //   const { username, password, age, gender } = ruleForm;
          this.$request.post("/user/", {
            // username,
            // password,
            // gender,
            // age,
            ...ruleForm,
          });

          this.$router.push("./list");
          this.$message({
            message: "修改成功",
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