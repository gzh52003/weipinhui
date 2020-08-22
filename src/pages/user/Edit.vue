<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="ruleForm.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" disabled></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-select v-model="ruleForm.gender" placeholder="请选择">
        <el-option label="男" value="male"></el-option>
        <el-option label="女" value="female"></el-option>
        <el-option label="保密" value="baomi"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="submitForm('ruleForm')">修改</el-button>
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
    // var validatePassword = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("密码不能为空"));
    //   }else{
    //      if(value.length<6 || value.length>32){
    //          callback(new Error("密码必须是6到32位"));
    //      }else{
    //          callback();
    //      }
    //   }

    // }
    return {
        userid:'',
      ruleForm: {
        username: "",
        password: "",
        gender: "male",
        age: "",
      },
      rules: {
        // password: [{ validator: validatePassword, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            const {userid,ruleForm}  = this
          this.$request.put('/user/'+userid,{
              ...ruleForm
          })
          this.$router.push('../list')
               this.$message({
          message: '修改成功',
          type: 'success',
        })
        } else {
                     this.$message.error('修改失败')
          return false;
        }
      });
    },
  },
  async created() {
    console.log(this.$route);
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/user/" + id);
    this.userid = id
    console.log("user=", data);
    Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang ="scss">
</style>