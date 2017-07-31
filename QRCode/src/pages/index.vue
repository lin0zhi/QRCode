<template>
	<div id='index'>
    <!-- 左侧菜单 -->
   
    <!-- 右侧内容区 -->
    <div class='right'>
      <banner :is-view='isView' @toggleView='toggleView'></banner> 
      <draggable :list='contentComponents' class='dragArea' :options="{group:'components'}"  @add="onAdd">
        <div v-for ='element in contentComponents' :key='element.id' class='component'>
          <component :is='element.component' :is-view='isView' :element-id='element.id' :prop-data='element.data' @elementChange='onChanges'>
          </component>
         <!--  <div> {{element}}</div> -->
        </div>
      </draggable> 
    </div>
    <div v-if='!isView'  class='left'>
      <!-- 编辑菜单 -->
      <div v-if='!isView'>
        <el-row >
          <el-menu mode='horizontal'>
            <el-menu-item index='1'>
              <el-button size='small' @click='giveName'>
                <i class='iconfont icon-tianjia'></i>
              </el-button>
            </el-menu-item>
            <el-menu-item index='2'>
              <el-button size='small' @click='removeNode'>
                <i class='iconfont icon-shanchu'></i>
              </el-button>
            </el-menu-item>
          </el-menu>
        </el-row>
        <!-- <页面以及模版树> -->
        <el-row>
          <el-tree :data='pageTree' :highlight-current='true' @node-click='handleNodeClick'>
          </el-tree>
          <el-tree :data='moduleTree' :highlight-current='true' @node-click='handleNodeClick'>
          </el-tree>
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
    <!-- 一些弹窗 -->
    <el-dialog title='创建新的页面' :visible.sync='newPageVisible' >
      <el-form  :rules='rules' ref='ruleForm1'>
        <el-form-item label='页面名称'  prop = 'same'>
          <el-input v-model = 'dialog.name' ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click='newPageVisible = false'>取 消</el-button>
        <el-button type="primary" @click="addPage">确 定</el-button>
      </div>
    </el-dialog>

      <bottom></bottom>
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
import banner from '../components/banner'
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
    banner
  },
  data () {
    return {
      // 页面数
      pageTree: [{
        id: 'pageTree',
        label: '我的页面',
        children: [{
          label: '页面1'
        }]
      }],
      // 模板树
      moduleTree: [{
        label: '我的模版',
        children: [{
          label: '模版1'
        }]
      }],
      // 当前点击的tree节点
      currentNode: null,
      // 弹窗数据
      dialog: {name: null},
      // 是否显示弹窗
      newPageVisible: false,
      // 是否预览模式
      isView: false,
      rules: {
        same: [
        {validator: this.validateSame, trigger: 'blur'}
        ]
      },
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
    handleNodeClick: function (e, m, n) {
      this.currentNode = m
    },
    // 弹窗命名新页面
    giveName: function () {
      // console.log(this.currentNode.parent.parent.data[0].id)
      // console.log(this.currentNode.data)
      if (this.currentNode.parent.parent && this.currentNode.parent.parent.data[0].id === 'pageTree') {
        this.newPageVisible = true
        this.dialog.name = '页面' + (this.currentNode.parent.parent.data[0].children.length + 1)
      } else if (this.currentNode.data.id === 'pageTree') {
        this.newPageVisible = true
        this.dialog.name = '页面' + (this.currentNode.data.children.length + 1)
      }
    },
    // 弹窗确定是添加新页面
    addPage: function () {
      this.$refs['ruleForm1'].validate((valid) => {
        if (valid) {
          if (this.currentNode.parent.parent) {
            this.currentNode.parent.data.children.push({label: this.dialog.name})
          } else {
            this.currentNode.data.children.push({label: this.dialog.name})
          }
          this.newPageVisible = false
        }
      })
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
    // 验证名称输入是否合法
    validateSame: function (rule, value, callback) {
      var children = this.currentNode.parent.parent ? this.currentNode.parent.data.children : this.currentNode.data.children
      console.log(children)
      if (!this.dialog.name) {
        return callback(new Error('名称不能为空'))
      }
      if (this.dialog.name.length < 2 || this.dialog.name.length > 15) {
        return callback(new Error('名称不能小于2个字符或大于15个字符'))
      }
      for (var i = 0; i < children.length; i++) {
        if (children[i].label === this.dialog.name) {
          return callback(new Error('名称不能相同'))
        }
      }
      callback()
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
  .dragArea{
  }
  .component{
    margin-bottom: 40px;
  }
  .el-tree .el-collapse{
    background-color: transparent;
  }
  #index{
    position: relative;
    min-height: 100%;
    background-color: #EDF7FF;
    width: 70%;
    margin-left: 15%;
    .left{
      height: 100%;
      width: 10%;
      position: fixed;
      top:0px;
      background-color: #6E719B;
    }
    .right{
      height: 100%;
      position: relative;
      left:10%;
      background-color: #EDF7FF;
      width: 90%;
    }
    .bottom{
      position: relative;
      top: 800px;
      width:100%;
    }
  }
  

</style>
