<template>
  <v-sheet color="transparent">
    <div :style="`height: ${height} !important; width: ${width} !important`" ref="animationContainer" />
  </v-sheet>
</template>

<script>
import lottie from 'lottie-web'
export default {
  props: {
    height: {
      type: String,
      default: '300px',
      required: false
    },
    width: {
      type: String,
      default: '100%',
      required: false
    },
    options: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  mounted () {
    const animationEvt = () => {
      const anim = lottie.loadAnimation({
        container: this.$refs.animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: this.options.animationData,
        renderConfig: {
          viewBoxOnly: true
        }
      })
      anim.addEventListener('complete', () => {
      })
    }
    animationEvt()
  }
}
</script>
