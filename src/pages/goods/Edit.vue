<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="书名" prop="itemName">
      <el-input type="text" v-model="ruleForm.itemName" disabled></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input type="text" v-model="ruleForm.author"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input type="text" v-model="ruleForm.price"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="submitForm('ruleForm')">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
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
        price: [{required:true, validator: checkprice, trigger: "blur" }],
        author: [{ validator: checkauthor, trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            const {goodsid,ruleForm}  = this
          this.$request.put('/goods/'+goodsid,{
              ...ruleForm
          })
          this.$router.push('../glist')
          console.log(this.$router);
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
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/goods/" + id);
    this.goodsid = id
    Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang ="scss">
</style>