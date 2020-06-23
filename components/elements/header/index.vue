<template>
  <v-container v-show="data.header != undefined && data.header.visible === true" grid-list-xs class="my-12">
    <v-layout column justify-center align-center>
      <v-slide-y-reverse-transition>
        <v-flex v-show="loadedCover && !isLoading" xs12 class="mt-8 transitionCustom">
          <lottie v-if="data.header != undefined && data.header.animation === true && lottie" height="225px" :options="lottie" />
          <h1
            v-if="data.header != undefined && data.header.title != undefined"
            class="display-1 text-center"
          >
            <span v-html="data.header.title" />
          </h1>
          <h1
            v-if="data.header != undefined && data.header.subtitle != undefined"
            class="display-1 text-center"
          >
            <span v-html="data.header.subtitle" />
          </h1>
          <v-divider class="my-6" />
          <v-layout class="subtitle-1" column wrap align-center justify-center>
            <p
              v-if="data.header != undefined"
              class="text-center"
            >
              <template v-if="data.header.info != undefined">
                <span v-html="data.header.info" />
              </template>
              <template v-if="data.header != undefined && data.header.link != undefined">
                <br v-if="!data.header.link.inline">
                <nuxt-link v-if="data.header.link.local" :to="data.header.link.url">{{ data.header.link.text }}</nuxt-link>
                <a v-else @click="toExplore(data.header.link.url)">{{ data.header.link.text }}</a>
              </template>
            </p>
          </v-layout>
        </v-flex>
      </v-slide-y-reverse-transition>
      <v-flex
        v-if="Array.isArray(data.coverImages) && data.coverImages[0] !== '' && data.coverImages[0] !== undefined"
        xs12
        class="mt-12"
        style="width: 100%"
      >
        <v-slide-y-reverse-transition>
          <v-card
            v-show="loadedCover"
            width="100%"
            :height="$vuetify.breakpoint.smAndDown ? `55vh` : `70vh`"
            flat
            tile
            class="d-flex"
            :style="`border-radius: ${$vuetify.breakpoint.smAndDown ? '17.5px' : '35px'}`"
          >
            <v-img
              width="100%"
              height="100%"
              :src="data.coverImages[0]"
              aspect-ratio="1"
              @load="loaded"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="primary" />
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-slide-y-reverse-transition>
      </v-flex>
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
    lottie: {
      type: Object,
      default: null,
      required: false
    },
    data: {
      type: Object,
      default: null,
      required: false
    }
  },
  data: () => ({
    loadedCover: false
  }),
  mounted () {
    if (this.data.coverImages[0] === undefined || this.data.coverImages[0] === '') {
      this.loaded()
    } else {
      this.loaded()
    }
  },
  methods: {
    loaded () {
      this.loadedCover = true
    }
  }
}
</script>
