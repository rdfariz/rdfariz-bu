<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-app-bar
      class="transition-only-bg"
      fixed
      app
      hide-on-scroll
      height="75px"
      flat
    >
      <v-container grid-list-xs>
        <v-layout row wrap justify-center align-center>
          <nuxt-link class="linkCustom" to="/">
            <v-toolbar-title>`rdfariz</v-toolbar-title>
          </nuxt-link>
          <v-spacer />
          <v-btn icon to="/diary">
            <v-icon>mdi-book-play-outline</v-icon>
          </v-btn>
          <v-btn icon @click="toggleTheme"><v-icon>mdi-brightness-6</v-icon></v-btn>
        </v-layout>
      </v-container>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-overlay opacity="1" :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-5'" :value="isLoading">
      <lottie height="225px" :options="lottieLoading" />
    </v-overlay>
  </v-app>
</template>

<script>
import lottie from '@/components/elements/lottie/index'
import animationData from '@/static/lottie/9844-loading-40-paperplane.json'

export default {
  components: {
    lottie
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    }
  },
  data: vm => ({
    initialDark: vm.$vuetify
      ? vm.$vuetify.theme.dark
      : false,
    lottieLoading: { animationData }
  }),
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    darkMode () {
      return this.$store.getters.darkMode
    }
  },
  beforeDestroy () {
    if (!this.$vuetify) return
    this.$vuetify.theme.dark = this.initialDark
  },
  created () {
    this.$vuetify.theme.dark = this.darkMode
  },
  mounted () {
    setTimeout(() => {
      this.$store.dispatch('setLoading', false)
    }, 1500)
  },
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$store.dispatch('toggleTheme', this.$vuetify.theme.dark)
    }
  }
}
</script>
