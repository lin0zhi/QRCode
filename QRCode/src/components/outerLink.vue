<template>
	<div v-if='!isView'>
    <span>链接:</span> 
    <span v-for='(link,index) in links' :key='index' @mouseover='onHover(index)'>
      <input v-model='link.site' @change='computeIcon'></input>
      <el-button-group v-if='link.isHover'>
        <el-button size='mini' icon='plus' @click='addItem(index)'></el-button>
        <el-button size='mini' icon='minus' @click='deleteItem(index)'></el-button>
      </el-button-group>
      </span>
  </div>
  <div v-else>
    <span v-for='link in propData'>
      <a :href='link.site' target='_blank'>
        <i class="iconfont" :class='link.icon'></i>
      </a>
    </span>
  </div>
</template>
<script>
  export default{
    name: 'outerLink',
    props: ['isView', 'elementId', 'propData'],
    data () {
      return {
        links: [{
          site: 'www.jd.com',
          icon: '',
          isHover: false
        }, {
          site: 'www.weixin.com',
          icon: '',
          isHover: false
        }]
      }
    },
    mounted: function () {
      this.computeIcon()
      this.$emit('elementChange', this.elementId, this.links)
    },
    methods: {
      onHover: function (index) {
        this.links.forEach(function (el) {
          el.isHover = false
        })
        this.links[index].isHover = true
      },
      addItem: function (index) {
        this.links.splice(index + 1, 0, {site: '', icon: '', isHover: false})
        this.computeIcon()
      },
      deleteItem: function (index) {
        this.links.splice(index, 1)
      },
      computeIcon: function () {
        this.$emit('elementChange', this.elementId, this.links)
        this.links.forEach(function (el, index) {
          if (/taobao/.test(el.site)) {
            el.icon = 'icon-taobao'
          } else if (/weixin/.test(el.site)) {
            el.icon = 'icon-weixin'
          } else if (/jd.com/.test(el.site)) {
            el.icon = 'icon-weibiaoti-'
          } else if (/tmall/.test(el.site)) {
            el.icon = 'icon-tianmaot'
          } else if (/weibo/.test(el.site)) {
            el.icon = 'icon-weibo'
          } else if (/baidu/.test(el.site)) {
            el.icon = 'icon-baidu2'
          } else if (/amazon/.test(el.site)) {
            el.icon = 'icon-yamaxun'
          } else if (/qq.com/.test(el.site)) {
            el.icon = 'icon-qq'
          } else {
            el.icon = 'icon-waibulianjie'
          }
        })
      }
    }
  }
</script>
<style>
  input{
    border: none;
    // border-bottom: 1px solid black;
    background: transparent;
    text-align: center;
    font-size: 1em;
    text-align: left;
  }
  a{
    color:blue;
  }
  a:link{
    text-decoration: none;
  }
  .iconfont{
    font-size:2em;
  }

</style>
