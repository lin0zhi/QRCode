<template>
	<el-form >
    <el-row >
      <el-col span=16 push='4'>
        <el-input placeholder='电子邮箱'></el-input>
      </el-col>
    </el-row>
    <el-row >
      <el-col span=16 push='4'>
        <el-input placeholder='密码'></el-input>
      </el-col>
    </el-row>
    <el-row >
      <el-col span=4 push='4'>
        <el-checkbox label='记住密码' class='whitefont'></el-checkbox>
      </el-col>
      <el-col span=4 push='12'>
        <el-button size='small' type='text' class='whitefont'>忘记密码？</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col span=16 push = '4'>
        <el-button type='primary' size='large' class='submit' @click='submit'>登录</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col span=4 push='16'>
        <el-button type='text' class='whitefont'>注册</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script >
export default {
  name: 'login',
  methods: {
    submit: function () {
      this.$router.push('/index')
    }
  }
}
</script>
<style lang='less'>
  @bgcolor:#336699;
  form{
    background-color: @bgcolor;
    width:35%;
    margin-left: 35%;
    padding-top:20px;
    border-radius: 10px;
    .el-row{
      margin-bottom: 20px;
      &:last-child{
        margin-bottom:0px;
        margin-top:-10px;
      }
    }
    .whitefont{
     color:#fff;
    }
    .submit{
      width:100%;
       background-color:#c63;
    }
  }
</style>
