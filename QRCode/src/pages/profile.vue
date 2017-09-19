<template>
	<div class='profile' :class='{edite:isEdite,preview:!isEdite}'>
    <div class='profileContent'>
  		<el-row>
  			<h3>更多信息<span>(你不必马上填写，然而本页数据将会成为构建页面的默认数据)</span></h3>
  		</el-row>
  		<el-row class='userProfile'>
  			<el-col span=8 >
          <img :src='profileImg'>
              <label v-if='isEdite'>上传新的头像</label>
            <transition name='slide'>
      				<el-upload
                v-if='isEdite'
        				class="avatar-uploader"
        				action="https://jsonplaceholder.typicode.com/posts/"
        				:show-file-list="false"
        				:on-success="handleAvatarSuccess"
        				:before-upload="beforeAvatarUpload">
        				<img v-if="imageUrl" :src="imageUrl" class="avatar">
        				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
      				</el-upload>
          </transition>
  			</el-col>
        <el-col span=16 class='form'>
          <el-row :gutter='8'>
            <el-col span=12><label >昵称</label></el-col>
            <el-col span=12><label span=8>公司名称</label></el-col>
          </el-row>
          <transition name='slide'>
            <el-row :gutter='8' v-if='isEdite' >
              <el-col span=12><el-input v-model='form.nickName'></el-input></el-col>
              <el-col span=12><el-input v-model='form.companyName'></el-input></el-col>
            </el-row>
          </transition>
          <transition name='slide'>
            <el-row :gutter='8' v-if='!isEdite'>
              <el-col span=12><span>{{form.nickName}}</span></el-col>
              <el-col span=12><span>{{form.companyName}}</span></el-col>
            </el-row>
          </transition>
          <el-row :gutter='8' class='splitline'>
            <el-col span=8><label>电话号码</label></el-col>
            <el-col span=8><label>主页链接1</label></el-col>
            <el-col span=8><label>主页链接2</label></el-col>
          </el-row>
          <transition name='slide'>
            <el-row :gutter='8' v-if='isEdite'>
              <el-col span=8><el-input v-model='form.telNumber'></el-input></el-col>
              <el-col span=8><el-input v-model='form.link1'></el-input></el-col>
              <el-col span=8><el-input v-model='form.link2'></el-input></el-col>
            </el-row>
          </transition>
          <transition name='slide'>
            <el-row :gutter='8' v-if='!isEdite'>
              <el-col span=8><span>{{form.telNumber}}</span></el-col>
              <el-col span=8><span>{{form.link1}}</span></el-col>
              <el-col span=8><span>{{form.link2}}</span></el-col>
            </el-row>
          </transition>
          <el-row class='splitline'>
            <label>地址</label>
          </el-row>
         <el-row :gutter='8'>
            <el-col span=8><label>省</label></el-col>
            <el-col span=8><label>市</label></el-col>
            <el-col span=8><label>具体地址</label></el-col>
          </el-row>
          <transition name='slide'>
            <el-row :gutter='8' v-if='isEdite'>
              <el-col span=8><el-select v-model='form.province'></el-select></el-col>
              <el-col span=8><el-select v-model='form.city'></el-select></el-col>
              <el-col span=8><el-input v-model='form.detail'></el-input></el-col>
            </el-row>
          </transition>
          <transition name='slide'>
            <el-row :gutter='8' v-if='!isEdite'>
              <el-col span=8><span>{{form.province}}</span></el-col>
              <el-col span=8><span>{{form.city}}</span></el-col>
              <el-col span=8><span>{{form.detail}}</span></el-col>
            </el-row>
          </transition>
        </el-col>
  		</el-row>
      <el-row class='buttonGroup'>
        <el-switch
          size = 'medium'
          v-model='isEdite'
          on-text="编辑"
          off-text="查看"
          on-color='#00C8DC'
          off-color='#369'>
        </el-switch>
        <el-button  class='save' size='large' @click='submit' :disabled='!isEdite'>保存</el-button>
        <el-button class='skip' size='medium'>跳过</el-button>
      </el-row>
    </div>
	</div>
</template>
<script>
export default {
  name: 'pofile',
  data () {
    return {
      isEdite: false,
      profileImg: require('../assets/bulid.jpg'),
      form: {
        nickName: 'linzhi',
        companyName: 'shencdf',
        telNumber: '13547595588',
        link1: '542511',
        link2: '854',
        province: 'sichuan',
        city: 'chengdu',
        detail: 'balbak'
      }
    }
  },
  methods: {
    submit: function () {
      this.$http.post('/debug/saveProfile', this.form).then(function (data) {
        if (data.data['message'] === 'success') {
          console.log('chenggong')
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@bgColor:#369;
@editebgColor:#00C8DC;
@saveButton:#c63;
  .edite{
    background-color:@editebgColor;
  }
  .preview{
    background-color:@bgColor;
  }
  .profile{
    width: 40%;
    min-width: 750px;
    min-height: 780px;
    height:80%;
    margin:auto;
    // height:100%;
    //background-color:@bgColor;
    border-radius: 10px;
    color:white;
    .profileContent{
      margin:0px 50px 0px 50px;
      padding-bottom:30px;
      .userProfile{
        min-height:410px;
      }
      .splitline{
        border-top: 1px white dashed; 
      }
      .el-row{
        margin-bottom: 30px;
        text-align: left;
        h3{
            span{
              font-size: 0.5em;
            }
          }
        .form{
          border-top: 1px white dashed;
          border-bottom: 1px white dashed;
        }
        .el-col{
          img{
            width: 180px;
            height:180px;
            border-radius:90px;
            margin-bottom: 20px;
          }
          label{
            font-size: 0.8em;
            display: inline-block;
          }
          span{
            display: inline-block;
            height:36px;
            font-size: 1.2em;
            line-height: 36px;
          }
        }
      }
      .notEdite{
        position: absolute;
      }
      .buttonGroup{
        text-align: center;
        margin-top:100px;
        .el-switch{
          margin-right: 15px;
        }
        .save{
          color:white;
          width:20%;
          background-color: @saveButton;
        }
        .skip{
          width:10%;
          color:white;
          border: none;
          background-color: transparent;
        }
      }
      .slide-enter-active,.slide-leave-active{
        //transition: all 5s ease;
        transition: all 0.5s ease;
      }
      .slide-enter,.slide-leave-to{
        position: absolute;
        transform:translateX(100px);
        opacity: 0;
      }
      .slide-enter-to,.slide-leave{
        transform: translateX(0px);
        opacity: 1;
        position: static;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
