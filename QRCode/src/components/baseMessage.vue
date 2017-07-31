<template>
<div class='baseMessage' v-if='!isView'>
  <el-row v-for='(bm,index) in  baseMessage' @click='onHover(index)' :key='index'>
    <input v-model='bm.item' @change='onChange'><input v-model='bm.content' @change='onChange'></input>
    <el-button-group v-if='bm.isHover'>
      <el-button size='mini' icon='plus' @click='addItem(index)'></el-button>
      <el-button size='mini' icon='minus' @click='deleteItem(index)'></el-button>
    </el-button-group>
  </el-row>
</div>
<div class='baseMessage' v-else>
  <el-row v-for='(bm,index) in propData' :key='index'>
    <span class='item'>{{bm.item}}</span><span class='content'>{{bm.content}}</span>
  </el-row>
</div>
</template>
<script>
  export default {
    name: 'baseMessage',
    props: ['isView', 'elementId', 'propData'],
    data () {
      return {
        baseMessage: [{
          item: '配料:',
          content: '牛肉,食用盐,白砂糖',
          isHover: false
        }, {
          item: '食用方法:',
          content: '开袋即食',
          isHover: false
        }, {
          item: '生产日期:',
          content: '2017-1-1',
          isHover: false
        }, {
          item: '保质期:',
          content: '1年',
          isHover: false
        }, {
          item: '贮存条件:',
          content: '常温,阴凉干燥',
          isHover: false
        }, {
          item: '注意事项:',
          content: '常温,阴凉干燥',
          isHover: false
        }]
      }
    },
    mounted: function () {
      this.$emit('elementChange', this.elementId, this.baseMessage)
    },
    methods: {
      onHover: function (index) {
        this.propData.forEach(function (el) {
          el.isHover = false
        })
        this.propData[index].isHover = true
      },
      addItem: function (index) {
        this.propData.splice(index + 1, 0, {item: '', content: '', isHover: false})
      },
      deleteItem: function (index) {
        this.propData.splice(index, 1)
      },
      onChange: function () {
        this.$emit('elementChange', this.elementId, this.baseMessage)
      }
    }
  }
</script>
<style lang='less' scoped>
  .baseMessage{
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
