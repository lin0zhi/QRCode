<template>
  <div v-if='!isView'>
    <el-row>
      <input placeholder='名称' class='mainTitle' v-model='titleData' required></input>
    </el-row>
  </div>
  <div v-else>
    <el-row>
      <h2 class='mainTitle'>{{propData.mainTitle}}</h2>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: 'title',
    props: ['isView', 'elementId', 'propData'],
    data () {
      return {
        titleData: ''
      }
    },
    watch: {
      titleData: function () {
        console.log('change:' + this.elementId)
        this.$emit('elementChange', this.elementId, {mainTitle: this.titleData})
      }
    }
  }
</script>
<style lang='less' scoped>
  input{
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    font-size: 2em;
    text-align: center;
  }
  h2{
    text-align: center;
  }
</style>
