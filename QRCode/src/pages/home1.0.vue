<template>
	<div class='home'>
  <div class='banner'></div>
    <!-- 中间的图标 -->
    <div class='imgbox rotate move' :class='{rotate0:firstScen}' @click='onRotate' >
      <img src='./../assets/下载.png'>
      <particle></particle>
    </div>
    <div class='leftSide scaleleft' :class='{toleft:firstScen}'>
    </div>
     <div class='rightSide scaleright move' :class='{toright:firstScen}'>
      <div>
        你的产品信息
      </div>
    </div> 
  </div>
</template>
<script>
  import particle from '../components/qrParticle'
  export default{
    name: 'home',
    components: {
      particle
    },
    mounted: function () {
      // this.firstScen = true
    },
    data () {
      return {
        firstScen: false
      }
    },
    methods: {
      onRotate: function () {
        this.firstScen = !this.firstScen
      }
    }
  }
</script>
<style lang='less'>
  .home{
    width: 100%;
    height:100%;
    position: relative;
  }
  .imgbox{
    width:200px;
    height: 200px;
    position: absolute;
    left:0px;
    right:0px;
    top:0px;
    bottom: 0px;
    margin:auto;
    transform: rotate(45deg);
    box-shadow: -2px -2px 2px grey;
    z-index:2;
  }
  img{
    width:100%;
    height: 100%;
  }
  .leftSide{
    width:50%;
    height: 100%;
    background-color: #204042;
  }
  .rightSide{
    width: 50%;
    height:100%;
    position: relative;
    left:50%;
    top:-100%;
    background-color:#5E6F66;  
  }
    //旋转动画
    .rotate{
      transition:transform 2s ease;
    }
    //背景变换
    .scaleleft{
      transition:width 2s ease;
    }
     .scaleright{
      transition:width 1s ease;
    }
    //移动
    .move{
      transition:left 2s ease;
    }
    //旋转后的角度
    .rotate0{
      transform: rotate(0deg);
      left: -70%;
    }
    //左边变化后的位置
    .toleft{
      width: 30%;
    }
    //右边变化后的位置以及大小
    .toright{
      width: 70%;
      left:30%;
    }
    // 上部分动画
   .animated{
    animation-duration:3s; 
   }
</style>
