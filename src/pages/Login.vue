<template>
<div class="login-box">
  
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm landIn"
  >
  <p class="Login_">账号密码登录</p>
    <el-form-item label="用户名" prop="username" style="width:250px">
      <el-input type="text" v-model="ruleForm.username" style="width:250px"></el-input>
    </el-form-item>
    <!-- <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item> -->
    <el-form-item label="密码" prop="password"  style="width:250px">
      <el-input v-model.number="ruleForm.password" style="width:250px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="submitForm('ruleForm')" style="margin-top:15px">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="toHome()"><a href="reg">没有账号？注册</a></el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.username !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    // toHome(){
    //     this.$router.push('./reg')
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
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
a{
  text-decoration: none;
  color: blue;
}
body{
    position: relative;
    /* background-color: brown; */
}
.login-box{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    background: url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3742461545,3072500225&fm=26&gp=0.jpg) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    display: flex;
    height: 100%;
    z-index: 1;
}
.Login_{
  color: #606266;
  margin-left: 48px;
  margin-bottom: 20px;;
}
.landIn{

  z-index: 999;
  border:2px solid #cccccc;
  background-color: #fff;
  height: 200px;
  width: 400px;
  padding-top: 20px;
  padding-bottom: 50px;;
  margin: auto;
}
</style>