<template>
<div class='dialog'>
  <h2>创建新的页面</h2>
  <form>
    <el-row>
      <el-col :span=4 :push=1>
        <label>页面名称</label>
      </el-col>
      <el-col :span=16 :push=2>
        <el-input v-model='dialog.name' @blur='validateSame'></el-input>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span=16 :push=1>
        <el-checkbox v-model='isCopyPage'></el-checkbox>
        <label>从已有页面复制</label>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=8 :push=6>
        <el-select :disabled='!isCopyPage' palceholder='选择页面' v-model='selected'>
        <el-option v-for='(page,index) in pages.children' :label='page.label' :value='page.label' :key=index>
        </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row v-if='inhint'>
      <el-col :span=16 :push=6 class='inhint'>{{inhint}}</el-col>
    </el-row>
    <el-row>
      <el-col :span=4 :push=5>
        <el-button size='medium' type='primary'>确定</el-button>
      </el-col>
      <el-col :span=4 :push=6>
        <el-button size='medium' type='danger' @click='cancel'>取消</el-button>
      </el-col>
    </el-row>
  </form>
  
  <!-- 一些弹窗 -->
  <!-- <el-dialog title='创建新的页面'>
    <el-form  :rules='rules'>
      <el-form-item label='页面名称'  prop = 'same'>
        <el-input v-model = 'dialog.name' ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click='newPageVisible = false'>取 消</el-button>
      <el-button type="primary" @click="addPage">确 定</el-button>
    </div>
  </el-dialog> -->
</div>
</template>
<script >
export default {
  name: 'dialog',
  props: ['pages'],
  rules: {
    same: [
      {validator: this.validateSame, trigger: 'blur'}
    ]
  },
  data () {
    return {
      // 弹窗数据
      dialog: {name: null},
      isCopyPage: false,
      selected: '',
      inhint: ''
    }
  },
  mounted: function () {
    this.dialog.name = '页面' + (this.pages.children.length + 1)
  },
  methods: {
    validateSame: function () {
      this.inhint = ''
      if (!this.dialog.name) {
        this.inhint = '名称不能为空'
        return false
      }
      if (this.dialog.name.length < 2 || this.dialog.name.length > 15) {
        this.inhint = '名称不能小于2个字符或大于15个字符'
        return false
      }
      for (var i = 0; i < this.pages.children.length; i++) {
        if (this.pages.children[i].label === this.dialog.name) {
          this.inhint = '名称不能相同'
          return false
        }
      }
    },
    cancel: function () {
      this.$emit('cancelAddPage')
    },
    submit: function () {
      if (this.inhint) {
        return false
      } else {

      }
    }
  }
}
</script>
<style lang='less' scoped>
  @bgcolor:#336699;
  .dialog{
    // z-index: 3;
    background-color: #336699;
    width:550px;
    height: 500px;
    margin: auto;
    border-radius: 10px;
    color: white;
    form{
      margin:0px;
      width: 100%;
      .el-row{
         height: 36px;
         line-height: 36px;
         margin-bottom: 40px;
        .el-col{
          
        }
        .inhint{
          text-align: left;
          text-align: left;
          font-size: 14px;
          color:#CC6633;
        }
      }
    }
  }
</style>
