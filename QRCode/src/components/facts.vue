<template>
<div id='facts'>
  <table v-if='!isView'>
    <caption>营养成分表</caption>
    <tr class='tableTitle'>
      <th>项目</th>
      <th>每100g</th>
      <th colspan='2'>营养素参考值</th>
    </tr>
    <tr v-for='(element,index) in factsTable' @mouseover='onHover(index)'>
      <td><input v-model='element.item' @change='onChange'></input></td>
      <td><input v-model='element.per100g' @change='onChange'></input></td>
      <td><input v-model='element.nrv' @change='onChange'></input></td>
      <td>
        <el-button-group v-if='element.isHover'>
          <el-button size='mini' icon="plus"  @click='addItem(index)'></el-button>
          <el-button size='mini' icon="minus" @click='deleteItem(index)'></el-button>
        </el-button-group>
      </td>
    </tr>
</table>
<table v-else>
    <caption>营养成分表</caption>
    <tr class='tableTitle'>
      <th>项目</th>
      <th>每100g</th>
      <th>营养素参考值</th>
    </tr>
    <tr v-for='(element,index) in propData'>
      <td>{{element.item}}</td>
      <td>{{element.per100g}}</td>
      <td>{{element.nrv}}</td>
    </tr>
</table>
</div>
    <!-- <el-table-column prop="item" label="项目" width="180">
    </el-table-column>
    <el-table-column prop="per100g" label="每100克" width="180">
    </el-table-column>
    <el-table-column prop="nrv" label="营养素参考值">
    </el-table-column> -->
</template>
<script>
  export default {
    name: 'facts',
    props: ['isView', 'elementId', 'propData'],
    data () {
      return {
        factsTable: [{
          item: '能量',
          per100g: '1194千焦(kJ)',
          nrv: '14%',
          isHover: false
        }, {
          item: '蛋白质',
          per100g: '3.9克(g)',
          nrv: '7%',
          isHover: false
        }]
      }
    },
    mounted: function () {
      this.$emit('elementChange', this.elementId, this.factsTable)
    },
    methods: {
      onHover: function (index) {
        this.factsTable.forEach(function (el) {
          el.isHover = false
        })
        this.factsTable[index].isHover = true
        this.$set(this._data, index, true)
      },
      addItem: function (index) {
        this.factsTable.splice(index + 1, 0, {item: '', per100g: '', nrv: '', isHover: false})
      },
      deleteItem: function (index) {
        this.factsTable.splice(index, 1)
      },
      // input变化时通知index更新数据
      onChange: function () {
        console.log(this.elementId)
        this.$emit('elementChange', this.elementId, this.factsTable)
      }
    }
  }
</script>
<style lang='less' scoped>
  #facts{
    width: 50%;
    margin-left: 25%;
  }
  h3{
    border-bottom: 1px solid black;
  }
  input {
    border: none;
    // border-bottom: 1px solid black;
    background: transparent;
    text-align: center;
    font-size: 1em;
  }
  caption{
    font-size: 1.2em;
  }
  table {
    border: 2px solid black;
    border-collapse:collapse;
    width: 100%;
  }
  th,td{
     border-bottom: 1px solid black; 
  }
</style>

