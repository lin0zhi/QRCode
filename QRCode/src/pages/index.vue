<template>
	<div id='index'>
    <el-row class='topMenu'>
      <el-col span=3>
        <a href='#/home'>主页</a>
      </el-col>
      <el-col span=2 push=14>
        <button id='save'>保存</button>
      </el-col>
      <el-col span=2 push=14>
        <button id='preview' @click='toggleView'>预览</button>
      </el-col>
      <el-col span=3 push=14>
        <button v-if='glob.isLoged' class='profile' @click='onShowProfile' :style="{'background-image':'url(glob.profile) no-repeat'}"></button>
         <button v-else class='profile' @click='onLog'></button>
        <!-- <img :src='profile'> -->
      </el-col>
    </el-row>
    <el-row>
      <transition name='slideAwayleft'>
        <el-col span=3  class='left' v-if='!isView' >
          <!-- 左侧菜单 -->
            <div>
              <!-- 编辑菜单 -->
              <div v-if='!isView'>
                <el-row >
                </el-row>
                <!-- <页面以及模版树> -->
                <el-row>
                  <tree :impt='pageTree'  @onAdd='addPage'>
                  </tree>
                  <tree :impt='moduleTree'  @node-click='handleNodeClick'>
                  </tree>
                </el-row>
                <!-- 控件盒子 -->
                <el-row>
                  <el-collapse accordion>
                    <el-collapse-item title='基本控件' name='1'>
                      <draggable class='dragArea' :list='baseComponents' :options="{group:{name:'components', pull: 'clone',put: false}}" >
                          <div v-for ='element in baseComponents' :key='element.id'>
                            {{element.name}}
                          </div>
                      </draggable>
                    </el-collapse-item>
                    <el-collapse-item title='自定义控件控件' name='2'>
                    </el-collapse-item>
                  </el-collapse>
                </el-row>
              </div>
            </div>
        </el-col>
      </transition>
      <el-col span=18 push=3 class='middle'>
        <!-- 右侧内容区 -->
        <div class='content'>
          <!-- <banner :is-view='isView' @toggleView='toggleView'></banner>  -->
          <draggable :list='contentComponents' class='dragArea' :options="{group:'components'}"  @add="onAdd">
            <div v-for ='element in contentComponents' :key='element.id' class='component'>
              <component :is='element.component' :is-view='isView' :element-id='element.id' :prop-data='element.data' @elementChange='onChanges'>
              </component>
             <!--  <div> {{element}}</div> -->
            </div>
          </draggable> 
        </div>
      </el-col>
      <transition name='slideAway'>
        <el-col v-if='!isView' span=3 push=21  class='right'>
          <div></div>
        </el-col>
      </transition>
    </el-row>
    <dialogs v-if='newPageVisible' :pages='pageTree' @cancelAddPage='cancelAddPage'></dialogs>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import proTitle from '../components/title'
import imageBox from '../components/imageBox'
import story from '../components/story'
import facts from '../components/facts'
import baseMessage from '../components/baseMessage'
import contact from '../components/contact'
import links from '../components/outerLink'
import tree from '../components/tree'
import dialogs from '../components/dialog'
export default{
  name: 'index',
  components: {
    draggable,
    proTitle,
    imageBox,
    story,
    facts,
    baseMessage,
    contact,
    links,
    tree,
    dialogs
  },
  data () {
    return {
       // 用户图片
      profile: require('./../assets/下载.png'),
      // 页面数
      pageTree: {
        id: 'pageTree',
        label: '我的页面',
        url: '/addPage',
        children: [{
          label: '页面1'
        }, {
          label: '页面2'
        }
        ]
      },
      // 模板树
      moduleTree: {
        label: '我的模版',
        url: '/addModule',
        children: [{
          label: '模版1'
        }]
      },
      // 当前点击的tree节点
      currentNode: null,
      // 是否显示弹窗
      newPageVisible: false,
      // 是否预览模式
      isView: false,
      // 拖拽组件
      // 基本组件
      baseComponents: [
        {
          name: '标题',
          component: 'proTitle',
          data: {mainTitle: ''}
        },
        {
          name: '图片',
          id: '2',
          component: 'imageBox'
        },
        {
          name: '简介/故事',
          id: '3',
          component: 'story',
          data: {textArea: ''}
        },
        {
          name: '营养成分表',
          id: '3',
          component: 'facts',
          data: {data: {}}
        },
        {
          name: '基本信息',
          id: '4',
          component: 'baseMessage'
        },
        {
          name: '公司信息/联系方式',
          id: '5',
          component: 'contact'
        },
        {
          name: '外部链接',
          id: '6',
          component: 'links'
        }
      ],
      contentComponents: [
        {
          name: '标题',
          id: '0000000',
          component: 'proTitle',
          data: {mainTitle: ''}
        }
      ]
      // proTitle: this.components.proTitle
    }
  },
  mounted: function () {
    console.log(typeof (this.baseComponents[0].data))
  },
  methods: {
    onLog: function () {
      this.$router.push('/login')
    },
    onShowProfile: function () {
      this.$router.push('/profile')
    },
    handleNodeClick: function (e, m, n) {
      this.currentNode = m
    },
    // 关闭新页面对话框
    cancelAddPage: function () {
      this.newPageVisible = false
    },
    // 弹窗确定是添加新页面
    addPage: function () {
      this.newPageVisible = true
    },
    // 删除节点
    removeNode: function () {
      if (this.currentNode.isLeaf) {
        for (var i = 0; i < this.currentNode.parent.data.children.length; i++) {
          if (this.currentNode.parent.data.children[i].label === this.currentNode.data.label) {
            this.currentNode.parent.data.children.splice(i, 1)
          }
        }
      }
    },
    // 添加组建到页面时触发
    onAdd: function (e) {
      // 先深拷贝数组中的对象，否则会指向同一组建
      this.contentComponents[e.newIndex] = JSON.parse(JSON.stringify(this.contentComponents[e.newIndex]))
      this.contentComponents[e.newIndex].id = Math.ceil(Math.random() * 10000000)
      this.$set(this.contentComponents, e.newIndex, this.contentComponents[e.newIndex])
      console.log(this.contentComponents[e.newIndex].id)
    },
    toggleView: function (view) {
      this.isView = !this.isView
      console.log(this.isView)
    },
    onChanges: function (id, data) {
      console.log('index changeid:' + id)
      this.contentComponents.forEach(function (el) {
        if (el.id === id) {
          el.data = data
          console.log(el.data)
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  @background-color:#1D2C42;
  @slideColor:#CCCCCC;
  @topMenu:#F7F7F7;
  .dragArea{
  }
  .component{
    margin-bottom: 40px;
    color: black;
  }
  .el-tree .el-collapse{
    background-color: transparent;
  }
  #index{
    position: relative;
    min-height: 100%;
    //background-color: #4E6D8F;
    //background: -webkit-linear-gradient(left, white 0,white 10%,#F7F7F7 0,#F7F7F7 90%,white 0,white );
    width: 100%;
    margin: -10px -10px 0px -10px;
    min-width: 600px;
    color:white;
    .topMenu{
      height:117px;
      line-height: 117px;
      opacity: 0.7;
      border-bottom: 2px solid #5E90E3;
      font-size: 20px;
      margin-right: -20px;
      margin-bottom: 0px;
      z-index: 1;
      background:url('./../assets/banner.jpg') no-repeat;
      background-size: cover;
        //background-color:transparent;
      .el-col{
        list-style: none;
        display: inline-block;
        margin: 0px;
        button{
          background-color: transparent;
          font-size: 20px;
          border: none;
          color: black;
        }
        a{
          color: black;
          text-decoration: none;
        }
        a:visited{
          text-decoration: none;
          color:black;
        }
        .profile{
          width: 80px;
          height: 80px;
          border-radius: 40px;
          vertical-align: middle;
          background: url('./../assets/banner.jpg') no-repeat;
          background-size: cover;
          
        }
      }
      /*.profile{
        img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        }
      }*/
    }
    //margin-left: 15%;
    .left{
      height: 100%;
      min-width: 90px;
      position: fixed;
      border-radius: 0px 5px 5px 0px;
      background: @slideColor;
      button{
        background-color: transparent;
        border: none;
        //color: white;
      }
      .el-collapse{
        border: none;
      }
      .el-collapse-item__wrap{
        margin-top: -5px;
      }
      .el-collapse-item__header,.el-collapse-item__wrap{
        background-color: @background-color;
        color:white;
        .el-collapse-item__content{
          color:white;
        }
      }
    }
    .middle{
      min-width: 400px;
     .content{
      height: 100%;
      position: relative;
      left:10%;
      background-color:transparent;
      width: 80%;
      min-width: 400px;
    }
  }
    .right{
       height: 100%;
       min-width: 90px;
       position: fixed;
       margin-left: -5px;
       border-radius: 5px 0px 0px 5px;
       background: @slideColor;
    }
    .dialog{
      position: absolute;
      left: 30%;
      //margin-left: -20%;
    }
    .slideAway-enter-active,.slideAwayleft-enter-active,.slideAwayleft-leave-active,.slideAway-leave-active{
      transition:all 1s ease;
    }
    .slideAway-enter-to,.slideAway-leave,.slideAwayleft-enter-to,.slideAwayleft-leave{
      opacity: 1;

    }
    .slideAway-enter,.slideAway-leave-to{
      opacity: 0;
      transform:translateX(100%);
    }
    .slideAwayleft-enter,.slideAwayleft-leave-to{
      opacity: 0;
      transform:translateX(-100%);
    }
  }

</style>
