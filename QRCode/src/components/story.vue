<template>
  <div class='story' v-if='!isView'>
    <textarea :rows='10' placeholder='输入内容' v-model='textArea' @change='onChange'>
    </textarea>
  </div>
  <div class='story' v-else>
    <p>{{propData.textArea}}</p>
  </div>
</template>
<script>
export default{
  name: 'story',
  props: ['isView', 'elementId', 'propData'],
  data () {
    return {
      textArea: ''
    }
  },
  mounted: function () {
    this.$emit('elementChange', this.elementId, {textArea: this.textArea})
  },
  methods: {
    onChange: function () {
      this.$emit('elementChange', this.elementId, {textArea: this.textArea})
    }
  }
}
</script>
<style lang='less' scoped>
  .story{
    width: 50%;
    margin-left: 25%;
    color: black;
  }
  textarea{
    background-color: transparent;
    width: 100%;
    font-size: 1em;
  }
  p{
    text-align: left;
  }
  p:first-letter{
    font-size: 2em;
  }
</style>
