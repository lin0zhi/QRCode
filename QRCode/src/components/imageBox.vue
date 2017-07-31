<template>
  <div id='imageBox'>
    <el-carousel indicator-position='outside'>
      <el-carousel-item v-for='item in 4' :key='item'>
        <h3>{{item}}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-upload
      v-if='!isView'
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default{
    name: 'imageBox',
    props: ['isView'],
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang='less' scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  #imageBox{
    width: 70%;
    margin-left: 15%;
  }
</style>
