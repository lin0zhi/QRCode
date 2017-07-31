<template>
  <div class='contact' v-if='!isView'>
    <el-row v-for='(bm,index) in baseMessage' @click='onHover(index)' :key='index'>
    <input v-model='bm.item' @change='onChange'><input v-model='bm.content' @change='onChange'></input>
    <el-button-group v-if='bm.isHover'>
      <el-button size='mini' icon='plus' @click='addItem(index)'></el-button>
      <el-button size='mini' icon='minus' @click='deleteItem(index)'></el-button>
    </el-button-group>
  </el-row>
  </div>
  <div class='contact'v-else>
    <el-row v-for='(bm,index) in propData' :key='index'>
      <span class='item'>{{bm.item}}</span><span class='content'>{{bm.content}}</span>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'contact',
    props: ['isView', 'elementId', 'propData'],
    data () {
      return {
        baseMessage: [{
          item: '产地:',
          content: '成都',
          isHover: false
        }, {
          item: '公司:',
          content: '菲尼迪科',
          isHover: false
        }, {
          item: '地址:',
          content: '是否符合的',
          isHover: false
        }, {
          item: '电话:',
          content: '400-525-5955-125',
          isHover: false
        }]
      }
    },
    mounted: function () {
      this.$emit('elementChange', this.elementId, this.baseMessage)
    },
    methods: {
      onHover: function (index) {
        this.baseMessage.forEach(function (el) {
          el.isHover = false
        })
        this.baseMessage[index].isHover = true
      },
      addItem: function (index) {
        this.baseMessage.splice(index + 1, 0, {item: '', content: '', isHover: false})
      },
      deleteItem: function (index) {
        this.baseMessage.splice(index, 1)
      },
      onChange: function () {
        this.$emit('elementChange', this.elementId, this.baseMessage)
      }
    }
  }
</script>
<style lang='less' scoped>
  .contact{
    width: 50%;
    margin-left: 25%;
  }
  input {
    border: none;
    // border-bottom: 1px solid black;
    background: transparent;
    text-align: center;
    font-size: 1em;
    text-align: left;
  }
  .el-row{
    text-align: left;
  }
  .item{
    font-weight: bold;
  }
  .content{
    position: absolute;
    left: 20%;
  }
</style>
