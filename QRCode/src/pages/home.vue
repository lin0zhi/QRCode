<template>
	<div class='home'>
  <div class='banner'></div>
    <!-- 中间的图标 -->
    <div class='imgbox'>
      <img src='./../assets/下载.png'>
    </div>
    <div class='topSide animated slideOutUp'>
      <div class='topLeft'>
      </div>
      <div class='topRight'>
      </div>
    </div>

     <div class='bottomSide animated fadeOutDown'>
       <div class='bottomLeft'> 
       </div>
       <div class='bottomRight'> 
       </div>
    </div> 
  </div>
</template>
<script>
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
  .topSide{
    height: 50%;
    background-color: #8FB65D;
    filter:blur(5px);
    opacity: 0.7;
    position: relative;
    .topLeft{
      width: 144px;
      height: 144px;
      position: absolute;
      bottom: 0px;
      left:50%;
      margin-left: -144px;
      background: linear-gradient(135deg, transparent 49%, white 51%) ;
    }
    .topRight{
      width: 144px;
      height: 144px;
      position: absolute;
      bottom: 0px;
      left:50%;
      background: linear-gradient(45deg,  white 49%, transparent 51%) ;
    }
  }
  .bottomSide{
    height: 50%;
    top:0px;
    background-color: blue;
    position: relative;
    filter:blur(5px);
    opacity: 0.7;
    .bottomLeft{
      width: 144px;
      height: 144px;
      position: absolute;
      top: 0px;
      left:50%;
      margin-left: -144px;
      background: linear-gradient(45deg, transparent 49%,   white 51%) ;
    }
    .bottomRight{
      width: 144px;
      height: 144px;
      position: absolute;
      top: 0px;
      left:50%;
      background: linear-gradient(135deg, white 49%, transparent 51%) ;
    }
    // 上部分动画
  }
   .animated{
    animation-duration:8s; 
   }
</style>
