<template>
  <v-container v-show="data.visible === true" grid-list-xs class="my-12">
    <v-layout column justify-center align-center>
      <v-slide-y-reverse-transition>
        <v-flex v-show="loadedCover" xs12 class="mt-12 transitionCustom">
          <h1
            v-if="data.title != undefined"
            class="display-1 text-center"
          >
            <span v-html="data.title" />
          </h1>
          <h1
            v-if="data.subtitle != undefined"
            class="display-1 text-center"
          >
            <span v-html="data.subtitle" />
          </h1>
          <v-divider class="my-6" />
          <v-layout class="subtitle-1" column wrap align-center justify-center>
            <p
              v-if="data !== undefined"
              class="text-center"
            >
              <lottie v-if="data.animation === true && lottie" height="200px" :options="lottie" />
              <template v-if="data.info != undefined">
                <span v-html="data.info" />
              </template>
              <template v-if="data.link != undefined">
                <br v-if="!data.link.inline">
                <nuxt-link v-if="data.link.local" :to="data.link.url">{{ data.link.text }}</nuxt-link>
                <a v-else @click="toExplore(data.link.url)">{{ data.link.text }}</a>
              </template>
              <template v-if="data.beforeSocial != undefined">
                <span v-if="data.beforeSocial.inline">{{ data.beforeSocial.separatorText }}</span>
                <span v-else>
                  <br>{{ data.beforeSocial.separatorText }}<br>
                </span>
              </template>
              <template v-if="socialMedia.length > 0">
                <span v-for="social, index in socialMedia">
                  <span v-if="index > 0"> / </span>
                  <a :key="index" @click="toExplore(social.url)">{{ social.text }}</a>
                </span>
              </template>
            </p>
          </v-layout>
        </v-flex>
      </v-slide-y-reverse-transition>
    </v-layout>
  </v-container>
</template>

<script>
import lottie from '@/components/elements/lottie/index'
export default {
  components: {
    lottie
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
      required: false
    },
    socialMedia: {
      type: Array,
      default: () => ([]),
      required: false
    },
    lottie: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  data: () => ({
    loadedCover: false
  }),
  mounted () {
    this.loaded()
  },
  methods: {
    loaded () {
      this.loadedCover = true
    },
    toExplore (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
