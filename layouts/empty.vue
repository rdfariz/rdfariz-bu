<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
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
  }),
  computed: {
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
}
</script>