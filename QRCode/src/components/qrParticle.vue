<template>
	<div class='qrParicle'>
   <span v-for='p in particle' class='particle' :style="{left: p.localX+ 'px', top: p.localY+ 'px'}">
   {{p.char}}
   </span> 
  </div>
</template>
<script>
export default {
  name: 'qrParicle',
  data () {
    return {
      particle: [
        {
          char: 'a',
          localX: Math.random() * 200,
          localY: Math.random() * 400,
          initAngle: Math.random() * Math.PI * 2,
          initVe: 10
        },
        {
          char: 't',
          localX: Math.random() * 200,
          localY: Math.random() * 200,
          initAngle: 0,
          initVe: 10
        }
      ]
    }
  },
  created: function () {
    var that = this
    setInterval(function () {
      return (function () {
        for (var i = 0; i < that.particle.length; i++) {
          // that.particle[i].localX += (that.particle[i].initVe * Math.cos(that.particle[i].initAngle))
          // that.particle[i].localY += (that.particle[i].initVe * Math.sin(that.particle[i].initAngle) - 5)
          that.particle[i].localX = (that.particle[i].localX * Math.cos(that.particle[i].initAngle))
          that.particle[i].localY = (that.particle[i].localY * Math.sin(that.particle[i].initAngle))
          that.particle[i].initAngle += (Math.PI / 8)
          console.log(that.particle[i].localX)
        }
      })()
      /* for (var i = 0; i < that.particle.length; i++) {
        return (function (i) {
          that.particle[i].localX += (that.particle[i].initVe * Math.cos(that.particle[i].initAngle))
          that.particle[i].localY += (that.particle[i].initVe * Math.sin(that.particle[i].initAngle) + 5)
          console.log(that.particle[i].localX)
        })(i)
        // this.particle[i].localX++
        // console.log(this.particle[i].localX)
      } */
    }, 2000)
  }
}
</script>
<style>
  .qrParicle{
    position: absolute;
    top:0px;
    bottom: 0px;
    left: 0px;
    right:0px;
  }
	.particle{
    position: absolute;
    color:red;
  }
</style>
