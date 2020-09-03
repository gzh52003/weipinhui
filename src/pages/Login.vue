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
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" style="width:350px" placeholder="用户名"></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>-->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model.number="ruleForm.password"
          style="width:350px"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="vcode" class="verify_code">
        <el-input placeholder="验证码" style="width:100px" v-model="ruleForm.vcode" class="write_code"></el-input>
        <span id="svgVcode" @click="addVcode()"></span>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="下次免登陆" v-model="ruleForm.mdl"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')" style="margin-top:15px">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="toReg()">没有账号？注册</el-button>
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
        password: "",
        captcha_code: "",
        mdl:true
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  mounted: function () {
    this.addVcode();
  },

  methods: {
    // toHome(){
    //     this.$router.push('./reg')
    // },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { ruleForm } = this;
          const { username, password, vcode } = ruleForm;
          const { data } = await this.$request.get("/login", {
            params: { username, password, vcode },
          });
          if (data.code === 1) {
            localStorage.setItem('userInfo',JSON.stringify(data.data))
            
            const { redirectTo = "/home" } = this.$route.query;
            this.$router.replace(redirectTo);

            this.$message({
              message: "恭喜你，登录成功",
              type: "success",
            });
          } else if (data.code === 10) {
            this.$message.error("验证码输入错误");
            this.addVcode();
          } else {
            this.$message.error("您的输入有误，请重新输入");
            this.addVcode();
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptchaKey() {
      let captchaKey = Math.random().toString(36).substring(2);
      return captchaKey;
    },
    changeCode() {
      let captcha_key = this.getCaptchaKey();
      this.ruleForm.captcha_key = captcha_key;
      this.$refs.code.setAttribute(
        "src",
        process.env.VUE_APP_API_URL +
          "auth/get_captcha?captcha_key=" +
          captcha_key
      );
    },
    toReg() {
      this.$router.push("/reg");
    },
    async addVcode() {
      const { data } = await this.$request.get(`/vcode`);
      const svgVcode = document.querySelector("#svgVcode");
      if (data.code === 1) {
        svgVcode.innerHTML = data.data;
      }
    },
  },
};
</script>
<style lang ="scss">
body {
  position: relative;
  /* background-color: brown; */
}
.login-box {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  background: url("https://img.zcool.cn/community/013f185f40a543a801215aa0360f0b.jpg@1280w_1l_2o_100sh.jpg")
    no-repeat;
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  height: 100%;
  z-index: 1;
}
.Login_ {
  font-size: 30px;
  color: #000;
  margin-left: 40px;
  margin-bottom: 30px;
}
.landIn {
  z-index: 999;
  border: 2px solid #cccccc;
  background: rgba(250, 250, 250, 0.6);
  width: 500px;
  padding-top: 20px;
  margin: auto;
}
#svgVcode {
  display: inline-block;
  width: 140px;
  height: 40px;
  vertical-align: bottom;
  margin-left: 50px;
  overflow: hidden;
}
</style>