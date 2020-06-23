<template>
  <div>
    <v-container grid-list-xs class="my-12">
      <v-layout column justify-center align-center>
        <v-slide-y-reverse-transition>
          <v-flex xs12 class="mt-12 transitionCustom">
            <h1
              class="display-1 text-center"
            >
              <span>
                Documentary
              </span>
            </h1>
            <h1
              class="display-1 text-center"
            >
              <span>
                for my absurd day
              </span>
            </h1>
            <v-divider class="my-6" />
            <v-layout class="subtitle-1" column wrap align-center justify-center>
              <p
                class="text-center"
              >
                <span>
                  On Maintenance..
                </span>
              </p>
            </v-layout>
          </v-flex>
        </v-slide-y-reverse-transition>
      </v-layout>
      <lottie height="225px" :options="lottieOptions" />
    </v-container>
  </div>
</template>

<script>
import lottie from '@/components/elements/lottie/index'
import animationData from '@/static/lottie/24636-dancing-pallbearers.json'

export default {
  components: {
    lottie
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    return {
      lottieOptions: { animationData }
    }
  },
  computed: {
    staticData () {
      return this.$store.getters.static
    }
  },
  head: {
    title: '`rdfariz / diary'
  },
}
</script>
