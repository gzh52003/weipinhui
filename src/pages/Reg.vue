<template>
  <div class="reg-box">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm reg_input"
    >
      <h1>快速注册</h1>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" style="width:350px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" style="width:350px;"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
          <el-option label="保密" value="baomi"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" style="width:350px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="toLogin()">已有账号，去登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value < 18) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("未满18禁止注册"));
      } else {
        // 规则通过后的回调
        callback();
      }
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
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        username: [{ validator: validateUsername, trigger: "blur" }],
        age: [
          {
            validator: checkAge,
            required: true,
            message: "年龄必填",
            trigger: "blur",
          },
          { type: "number", message: "只能输入数字", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { ruleForm } = this;
          //   const { username, password, age, gender } = ruleForm;
          const { data } = await this.$request.post("/reg/", {
            // username,
            // password,
            // gender,
            // age,
            ...ruleForm,
          });
          console.log(data);
          if (data.code === 1) {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            this.$router.push("./login");
          } else {
            this.$message.error('注册失败，该用户已存在');
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
<style lang ="scss">
body {
  position: relative;
}
.reg-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("https://img.zcool.cn/community/01a2245f40a60fa801215aa063bd3d.jpg@1280w_1l_2o_100sh.jpg") no-repeat;
  background-size:100% 100%;
  z-index: 2;
  display: flex;
}

.reg_input {
  width: 500px;
  z-index: 3;
  margin: auto;
  border: 1px solid #ccc;
  background:rgba(250, 250, 250, 0.6);
  padding-top: 10px;
}

h1 {
  font-size: 30px;
  color: #000;
  font-weight: normal;
  margin: 0 0 30px 40px;
}
</style>