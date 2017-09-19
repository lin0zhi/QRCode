<template>
	<div class='tree'>
   <div class='title' @click='expand'>
     <span >
     <i v-if='isExpand'>-</i>
     <i v-else>+</i>
     </span>
     <span class='title'>
       {{impt.label}}
     </span>
   </div>
   <transition name='expand'>
       <div class='content' v-if='isExpand'>
          <span v-for='item in impt.children' class='item'>{{item.label}}</span>
          <button @click='onAdd'>新增</button>
       </div>
    </transition>
  </div>
</template>
<script >
  export default{
    name: 'tree',
    props: ['impt'],
    data () {
      return {
        // 是否展开
        isExpand: false
      }
    },
    methods: {
      expand: function () {
        this.isExpand = !this.isExpand
      },
      onAdd: function () {
        this.$emit('onAdd')
      }
    }
  }
</script>
<style lang='less'>
  @bgcolor:#CCCCCC;
  @color: black;
  @hover:grey;
  .tree{
    background-color: @bgcolor;
    //border: 1px solid grey;
    color: @color;
    transition:height 0.5s;
    -moz-transition:height 0.5s; /* Firefox 4 */
    -webkit-transition:height 0.5s; /* Safari and Chrome */
    -o-transition:height 0.5s; /* Opera */
    .title{
      font-size: 0.9em;
      color: @color;
      font-family: arial;
    }
    .title:hover{

      color:@hover;
      cursor: pointer;
    }
    .expand-enter-active, .expand-leave-active {
      transition: all 0.5s ease;
    }
    .expand-enter,.expand-leave-to{
      max-height: 0px;
      opacity: 0;
      transform:translateX(10px);
    }
    .expand-enter-to,.expand-leave{
      max-height: 500px;
      opacity: 1;
    }
    .content{
      //-webkit-transition:max-height 0.5s; /* Safari and Chrome */
      .item{
        color: @color;
        font-size: 0.8em;
        display: block;
      }
      .item:hover{
        color:@hover;
        cursor:pointer;
      }
      button{
        color:black;
        background-color: #658AAB;
        box-shadow: none;
        border: none;
      }
    }
  }
</style>

