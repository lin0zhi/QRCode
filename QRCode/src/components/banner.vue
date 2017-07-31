<template>
	<div class='banner'>
    <div class='backgoundText'>
      <span v-if='isView'>预览模式</span>
      <span v-else>编辑模式</span>
    </div>
     <div class='buttonGroup'>
       <button @click='toggleView'>
         <i v-if='!isView' class='iconfont icon-yulan'></i>
         <i v-else class='iconfont icon-biyan'></i>
       </button>
     </div>
  </div>
</template>
<script >
  export default{
    name: 'banner',
    props: ['isView'],
    methods: {
      toggleView: function () {
        this.$emit('toggleView')
      }
    }
  }
</script>
<style scoped>
  .banner{
    display: inline-block;
    background-color: #8BACC4;
    width: 100%;
  }
  .backgoundText{
    width: 100%;
    font-size: 1.5em;
    color:rgba(0,0,0,0.2);
  }
  .buttonGroup{
    position: absolute;
    background-color: transparent;
    top: 0px;
    width: 100%;
    z-index: 2;
  }
  button{
    background-color: transparent;
    border: none;
  }
  button:active{
    border: none;
    color:white;
  }
  i{
    font-size:2em;
    font-weight: bold;
  }
</style>
