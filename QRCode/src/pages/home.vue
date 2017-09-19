<template>
	<div class='home'>
    <div class='topMenu'>
      <ul>
        <li class='current'>主页</li>
        <li><a href='#/index'>创建页面</a></li>
        <li>
          <button v-if='glob.isLoged' @click='onShowProfile' class='profile' :style="{'background-image':'url(glob.profile) no-repeat'}"></button>
          <button v-else class='profile' @click=' onLog'></button>
        </li>
      </ul>
    </div>
    <div class='area1'>
    
      <div class='slogan'>
        <h1>
          {{slogan}}
        </h1>
      </div>
      <div class='phone'>
        <img src='./../assets/phone1.png'>
        <div class='phoneScreen'>
          <div class='imgbox'>
             <div class='carousel'>
              <img v-for='image in phoneImage' :key='image' :src='image.imgSrc'>
            </div>
             <div class='carouse2'>
              <img v-for='image in phoneImage' :key='image' :src='image.imgSrc'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='area2Bg'>
      <div class='area2'>
        <h1 class='title bigtitle'>
          <span class='lefttitle'>如何</span><br><span clsass='righttitle'>使用</span>
        </h1>
        <div class='howto'>
          <div class='guide'>
            <h1>01</h1>
            <h2>登录</h2>
            <p>如果你还没有账号，即可注册账号,已有账号，登录。</p>
          </div>
          <div class='guide'>
            <h1>02</h1>
            <h2>创建页面</h2>
            <p>为你提供拖拽式页面创建方式，使你能够轻松创建属于你自己的产品页面。</p>
          </div>
          <div class='guide'>
            <h1>03</h1>
            <h2>获取二维码</h2>
            <p>页面创建成功后，为你的页面生成二维码，成为你产品的专属名片。</p>
          </div>
        </div>
      </div>
    </div>
    <div class='area3Bg'>
      <div class='area3'>
        <h1 class='bigtitle'>用作</h1>
        <div class='story'>
          <img :src='storyImage1'>
          <div class='rightContent'>
            <h2>记录产品信息</h2>
            <p>通过拖拽组件构建产品信息页面，我们为你提供诸如营养成分表、产品生产信息、联系方式、多种外部链接。简单而灵活的构建产品信息页面，使你的客户能够随时获取你的产品信息。</p>
          </div>
        </div>
        <div class='story'>
          <img :src='storyImage1'>
          <div class='rightContent'>
            <h2>记录产品信息</h2>
            <p>通过拖拽组件构建产品信息页面，我们为你提供诸如营养成分表、产品生产信息、联系方式、多种外部链接。简单而灵活的构建产品信息页面，使你的客户能够随时获取你的产品信息。</p>
          </div>
        </div>
      </div>
    </div>
    <div class='area4Bg'>
      <div class='area4'>
        <h1 class='bigtitle'>保持联系</h1>
        <ul>
          <li>lin.chih@outlook.com</li>
          <li>微信号:eycnryf.weixin</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'home',
    data () {
      return {
        slogan: '使你的产品信息随时可以访问,仅需一步,仅需一个二维码',
        storyImage1: require('../assets/bulid.jpg'),
        // 用户图片
        profile: require('./../assets/下载.png'),
        phoneImage: [
          {
            imgSrc: require('./../assets/下载.png')
          },
          {
            imgSrc: require('./../assets/product.jpg')
          },
          {
            imgSrc: require('./../assets/下载.png')
          }
        ]
      }
    },
    methods: {
      onLog: function () {
        this.$router.push('/login')
      },
      onShowProfile: function () {
        this.$router.push('/profile')
      }
    },
    mounted: function () {
      if (this.glob.isLoged) {
      }
    }
  }
</script>
<style lang='less' scoped>
  body{
    background-color: #00C8DC;
  }
  .home{
    width:100%;
    margin: auto;
    .bigtitle{
      font-size: 4em;
      font:normal normal 4em MingLiU,sans-serif;
    }
    .topMenu{
      margin: -10px -10px 0px -10px;
      height:117px;
      line-height: 117px;
      opacity: 0.7;
      background-image: url('./../assets/banner.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      ul{
        float:right;
        list-style: none;
        display: inline-block;
        font-size: 1.2em;
        margin: 0px;
        padding-left: 0px;
        li{
          float: left;
          margin-right:30px;
          a{
            text-decoration: none;
          }
          a:visited{
            text-decoration: none;
            color:black;
          }
          button{
            background-color: transparent;
            font-size: 20px;
            border: none;
            color: black;
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
        .current{
          text-decoration: 2px white solid;
        }
      }
    }
  }
  .area1{
    background-color: transparent;
    height: 770px;
    width: 60%;
    position: relative;
    left:20%;
    color: white;
    ul{
      list-style: none;
      display: inline-block;

      li{
        float: left;
        margin-right: 30px;
        a{
          color: white;
          text-decoration: none;
        }
        a:visited{
          color: white;
          text-decoration: none;
        }
      }
    }
    .slogan{
      width:50%;
      float:left;
      margin-top: 50px;
      margin-right: 40px;
      h1{
        font-size: 76px;
      }
    }
    .phone{
      position: absolute;
      top:100px;
      left:60%;
      overflow: hidden;
      z-index: 2;
      .phoneScreen{
        position: absolute;
        background-color: grey;
        top:100px;
        bottom:102px;
        left:20px;
        right:20px;
        .imgbox{
          position: absolute;
          top: 50%;
          margin-top: -189.5px;
          width: 379px;
          height: 379px;
          overflow: hidden;
          img{
            width: 379px;
            height: 350px;
            display: inline;
          }
          .carousel{
            width: 1137px;
            position: absolute;
            -webkit-animation:change 5s linear infinite;
          }
          .carouse2{
            width: 758px;
            position: absolute;
            top:0px;
            left:758px;
           -webkit-animation:changes 5s 2s linear infinite;
          }
          @-webkit-keyframes change {
            0% {
              left: 0px;
            }
            25% {
              left: 0px;
            }
            35%{
              left: -379px;
            }
            60% {
              left: -379px;
            }
            70%{
              left: -758px;
            }
            100%{
              left: -758px;
            }
          }
        }
        
      }
    }
  }
  .area2Bg{
     width:100%;
     background-color: white;
    .area2{
      position: relative;
      width: 60%;
      left: 20%;
      color: #00C8DC;
      //z-index: -1;
      .title{
        width: 360px;
        position: relative;
        left: -50%;
        margin-left: 390px;
        .lefttitle{
          position: absolute;
          left: 0px;
        }
        .righttitle{
          position: absolute;
          right: 0px;
        }
      }
      .howto{
        width: 100%;
        display: inline-block;
        margin-top: -100px;
        .guide{
          float: left;
          width: 20%;
          margin-left: 6%;
          margin-right: 6%;
          h1{
             font:normal normal 150px MingLiU,sans-serif;
             border-bottom:5px solid #00C8DC;
          }
          h2{
            font:normal normal 30px MingLiU,sans-serif;
            margin-top: -50px;
          }
        }
      }
      
    }
  }
  .area3Bg{
    width: 100%;
    background-color: #336699;
    .area3{
      position: relative;
      width: 60%;
      left: 20%;
      color: white;
      h1{
        margin-top: 0px;
        position: relative;
        left:-50%;
        margin-left: 120px;
      }
      .story{
        display: inline-block;
        margin-bottom: 50px;
        img{
          width:250px;
          height: 250px; 
          float: left;
          margin-right: 80px;
          border-radius: 125px;
        }
        .rightContent{
          h2{
             font:normal normal 30px MingLiU,sans-serif;
          }
        }
      }
      
    }
  }
  .area4Bg{
    width: 100%;
    background-color: white;
    .area4{
      width: 60%;
      margin-left:20%;
      color:#5E90E3;
      h1{
        margin-top: 0px;
        position: relative;
        left:-50%;
        margin-left: 240px;
      }
    }
  }
</style> 
