<template>
	<el-form >
    <h2 v-if='this.model.isLogin' class=''>登录</h2>
    <h2 v-if='this.model.isFindback'>找回密码</h2>
    <h2 v-if='this.model.iscreateAccount'>注册</h2>
    <el-row >
        <div class='placeholder'>
        </div>
         <transition name='focus'>
            <div  v-if='focusOnUser' class='tips'>{{tips.userName}}</div>
         </transition>
      <el-col :span=16 :push=4 class='inputItem'>
        <el-input placeholder='电子邮箱' id='userName' v-model='form.userName' @focus='focusOn' @blur='blur'></el-input>
      </el-col>
    </el-row>
    <el-row >
      <div class='placeholder'>
      </div>
      <transition name='focus'>
        <div  v-if='focusOnPass' class='tips'>{{tips.password}}</div>
      </transition>
      <el-col :span=16 :push=4 class='inputItem'>
        <el-input placeholder='密码' id='password' v-model='form.password' @focus='focusOn' @blur='blur'></el-input>
      </el-col>
    </el-row>
    <transition name='slide'>
      <el-row v-if='model.iscreateAccount'>
        <div class='placeholder'>
        </div>
        <transition name='focus'>
          <div  v-if='focusOnRepeat' class='tips'>{{tips.passwordRepeat}}</div>
        </transition>
        <el-col :span=16 :push=4 class='inputItem'>
          <el-input placeholder='再次输入密码' id='passwordRepeat' v-model='form.passwordRepeat' @focus='focusOn' @blur='blur'></el-input>
        </el-col>
      </el-row>
    </transition>
    <!-- 验证码 -->
    <transition name='slide'>
      <el-row v-if='isOverTimes'>
        <div class='placeholder'>
        </div>
        <transition name='focus'>
          <div v-if='focusOnVerfication' class='tips'>{{tips.verfication}}</div>
        </transition>
        <!-- <span v-if='tips.inhint'>{{tips.inhint}}</span> -->
        <el-col :span=8 :push=4>
          <el-input v-model='form.verfication' placeholder='验证码' id='verfication' @focus='focusOn' @blur='blur'></el-input>
        </el-col>
        <el-col :span=8 :push=5 >
           <img :src=verficationImg @mouseover='onHover' >
           <img :src=verficationImg v-if='isHover' class='cover-bg' ></img>
           <div v-if='isHover' class='cover' @mouseleave='onBlur' @click='getVerfication'>换一张</div>
        </el-col>
      </el-row>
    </transition>
    <!-- 提交后的反馈 -->
    <transition name='slide'>
      <el-row v-if='tips.inhint'>
        <el-col :span=16 :push=4 class='inhint'>
          <span >{{tips.inhint}}</span>
        </el-col>
      </el-row>
    </transition>
    <el-row >
      <el-col :span=4 :push=4>
        <el-checkbox label='记住密码' v-if='!model.isFindback' v-model='form.remeber' class='whitefont'></el-checkbox>
      </el-col>
      <el-col :span=4 :push=12>
        <transition name='slide'>
        <el-button v-if='model.isLogin' size='small' type='text' class='whitefont'  @click='changeModel'><span id='findback'>忘记密码？</span></el-button>
        </transition>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=16 :push = 4>
        <el-button type='primary' size='large' class='submit' :disabled='disabled && model.isLogin' @click='submit'>
          <span v-if='model.isLogin'>登录</span>
          <span v-if='model.iscreateAccount'>注册</span>
          <span v-if='model.isFindback'>找回密码</span>
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=4 :push=16>
        <el-button type='text' class='whitefont' @click='changeModel' >
          <span id='createAccount' v-if='model.isLogin'>注册</span>
          <span id= 'login' v-if='model.iscreateAccount ||model.isFindback'>登录</span>
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script >
export default {
  name: 'login',
  data () {
    return {
      // 表单数据
      form: {
        remeber: false,
        userName: '',
        password: '',
        passwordRepeat: '',
        isValited: true,
        verfication: ''
      },
      model: {
        isLogin: true,
        iscreateAccount: false,
        isFindback: false
      },
      // 当前焦点位置
      focusOnUser: false,
      focusOnPass: false,
      focusOnRepeat: false,
      focusOnVerfication: false,
      isOverTimes: false,
      verficationImg: '',
      disabled: false,
      isHover: false,
      // 提示字符内容
      tips: {
        userName: '电子邮箱',
        password: '密码',
        passwordRepeat: '再次输入密码',
        inhint: '',
        verfication: '验证码'
      }
    }
  },
  methods: {
    // 提交输入结果
    submit: function () {
      this.tips.inhint = ''
      if (this.model.isLogin) {
        if (!(this.valitor('userName', this.form.userName) && this.valitor('password', this.form.password))) {
          return false
        }
        console.log(this.isOverTimes && this.valitor('verfication', this.form.verfication))
        if (this.isOverTimes && !this.valitor('verfication', this.form.verfication)) {
          return false
        }
        this.$http.post('/debug/login', this.form).then(function (data) {
          if (data.data['message'] === 'sucess') {
            this.tips.inhint = '登录成功'
            this.glob.isLoged = true
            this.glob.userName = this.form.userName
          } else if (data.data['message'] === 'invalid') {
            this.tips.inhint = '账户不存在或密码错误'
          } else if (data.data['message'] === 'overTimes') {
            this.isOverTimes = true
            this.tips.inhint = '账户不存在或密码错误,请输入验证码'
            this.verficationImg = 'data:image/jpg;base64,' + data.data['img']
          } else if (data.data['message'] === 'invalidVerfication') {
            this.isOverTimes = true
            this.tips.inhint = '验证码错误'
            this.verficationImg = 'data:image/jpg;base64,' + data.data['img']
          } else if (data.data['message'] === 'forbiden') {
            this.isOverTimes = false
            this.tips.inhint = '尝试次数太多 请找回密码'
            this.disabled = true
          }
        })
      }
      if (this.model.iscreateAccount) {
        if (!(this.valitor('userName', this.form.userName) && this.valitor('password', this.form.password) && (this.form.password === this.form.passwordRepeat))) {
          return false
        }
        this.$http.post('/debug/signUp', this.form).then(function (data) {
          switch (data.data['message']) {
            case 'sucess':
              this.disabled = true
              this.tips.inhint = '注册成功,请邮件确认'
              break
            case 'exist':
              this.isOverTimes = true
              this.tips.inhint = '用户已经存在,尝试找回密码或者使用另外的邮箱地址'
              console.log(data.data['img'])
              this.verficationImg = 'data:image/jpg;base64,' + data.data['img']
              break
            case 'invalidVerfication':
              this.isOverTimes = true
              this.tips.inhint = '验证码错误'
              this.verficationImg = 'data:image/jpg;base64,' + data.data['img']
              break
            case 'forbiden':
              this.disabled = true
              break
          }
        })
      }
      // this.$router.push('/index')
    },
    getVerfication: function () {
      this.$http.get('/debug/getVerfication').then(function (data) {
        this.verficationImg = 'data:image/jpg;base64,' + data.data['img']
      })
    },
    // 输入框获得焦点
    focusOn: function (e) {
      if (e.target.parentNode.id === 'userName') {
        this.focusOnUser = true
        e.target.placeholder = ''
      } else if (e.target.parentNode.id === 'password') {
        this.focusOnPass = true
      } else if (e.target.parentNode.id === 'passwordRepeat') {
        this.focusOnRepeat = true
      } else if (e.target.parentNode.id === 'verfication') {
        this.focusOnVerfication = true
      }
    },
    // 输入框失去焦点
    blur: function (e) {
      if (e.target.parentNode.id === 'userName') {
        if (this.valitor('userName', this.form.userName)) {
          this.focusOnUser = false
          this.tips.userName = '电子邮箱'
          e.target.placeholder = '电子邮箱'
        } else {
          this.tips.userName = '错误的邮箱地址'
        }
      } else if (e.target.parentNode.id === 'password') {
        if (this.valitor('password', this.form.password)) {
          this.focusOnPass = false
          this.tips.password = '密码'
          e.target.placeholder = '密码'
        } else {
          this.tips.password = '字母开头,6位及以上字母或数字'
        }
      } else if (e.target.parentNode.id === 'passwordRepeat') {
        if (this.form.password === this.form.passwordRepeat) {
          this.focusOnRepeat = false
          this.tips.passwordRepeat = '再次输入密码'
          e.target.placeholder = '再次输入密码'
        } else {
          this.tips.passwordRepeat = '两次密码输入不一致'
        }
      } else if (e.target.parentNode.id === 'verfication') {
        if (this.valitor('verfication', this.form.verfication)) {
          this.focusOnVerfication = false
          this.tips.verfication = '验证码'
          e.target.placeholder = '验证码'
        } else {
          this.tips.verfication = '验证码出错'
        }
      }
    },
    // 鼠标在图片上时显示提示文字
    onHover: function () {
      console.log('hover')
      this.isHover = true
    },
    // 鼠标离开图片时隐藏提示文字
    onBlur: function () {
      this.isHover = false
    },
    // 验证器
    valitor: function (type, value) {
      switch (type) {
        case 'userName':
          return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
        case 'password':
          return /^[a-zA-Z]\w{5,17}$/.test(value)
        case 'verfication':
          return /^[a-zA-Z1-9]{4}$/.test(value)

      }
    },
    // 更改当前页面
    changeModel: function (e) {
      this.disabled = false
      switch (e.target.id) {
        case 'createAccount':
          this.tips.inhint = ''
          this.model.iscreateAccount = true
          this.model.isLogin = this.model.isFindback = false
          break
        case 'findback':
          this.tips.inhint = ''
          this.model.isFindback = true
          this.model.iscreateAccount = this.model.isLogin = false
          break
        case 'login':
          this.tips.inhint = ''
          this.model.isLogin = true
          this.model.iscreateAccount = this.model.isFindback = false
          break
      }
    }
  }
}
</script>
<style lang='less'>
  @bgcolor:#336699;
  form{
    background-color: @bgcolor;
    width:550px;
    height: 500px;
    min-width: 550px;
    margin:auto;
    padding-top:20px;
    border-radius: 10px;
    position: relative;
    color: white;
    .el-row{
        margin-bottom: 20px;
        .placeholder{
          height:40px;
          font-size: 14px;
          z-index: 2;
          color:#c63;
        }
            //top:6px;
        .tips{
          position: absolute;
          top:10px;
          left:70px;
          z-index: 2;
          font-size: 14px;
          color:#CC6633;
        }
        .inhint{
          text-align: left;
          font-size: 14px;
          color:#CC6633;
        }
        img {
         line-height: 100%;
        }
        .cover{
          line-height: 35px;
          position: absolute;
          left: 0px;
          top: 0px;
          right: 0px;
          bottom: 0px;
          font-size: 12px;
          z-index: 2;
          color:black;
          font-weight: bold;
        }
        .cover:hover {
          cursor: default;
        }
        .cover-bg{
          position: absolute;
          left: 0px;
          top: 0px;
          right: -2px;
          bottom: 0px;
          z-index: 1;
          opacity: 0.9; 
          -webkit-filter: blur(2px);
        }
        .focus-enter-active,.focus-leave-active {
            transition: all 0.5s ease;
          }
          .focus-enter{
             opacity: 0;
             font-size:17px;
             left: 70px;
             top:50px;
             //-webkit-transform: translateY(30px);
          }
          .focus-enter-to{
            opacity: 1;
            left:70px;
            top:10px;
            font-size:14px;
            //transform: translateY(-40px);
          }
          .focus-leave-to{
            opacity:0;
          }
        &:last-child{
          margin-bottom:0px;
          margin-top:-10px;
        }
        .submit{
          width:100%;
          background-color:#c63;
        }
        .inputItem{
          .el-input{
            input{
              //background-color: transparent;
              outline: 1px solid transparent ;
              boder:none;
              border-bottom: 2px solid white;
            }
            input:focus{
              outline: 1px #336699 solid;
            }
          }
          // .focus-leave,.focus-enter-to{
          //   opacity: 1;
          //   top:-20px;
          //   //transform: translateY(-20px);
          // }
      }
      .whitefont{
       color:#fff;
      }  
    }
    .slide-enter-active,.slide-leave-active{
      transition: all 0.5s ease;
    }
    .slide-enter,.slide-leave-to {
      transform: translateX(100px);
      opacity: 0;
    }
    .slide-enter-to,.slide-leave{
      opacity: 1;
    }
  }
</style>
