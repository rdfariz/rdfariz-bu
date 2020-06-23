<template>
  <v-container grid-list-xs class="my-12">
    <v-layout row wrap>
      <v-flex xs12 style="width: 100%">
        <v-card flat class="d-flex py-6" color="transparent">
          <v-layout row wrap align-start justify-center>
            <v-flex xs12 md6 class="d-flex justify-center justify-md-start align-center flex-wrap flex-column flex-sm-row text-center">
              <v-avatar
                v-if="data.categoryAnimation != undefined && data.categoryAnimation === true"
                class="my-2 my-sm-0 mr-sm-2 mr-md-4"
                size="55"
                color="grey lighten-3"
              >
                <lottie v-if="lottie" height="90px" width="90px" :options="lottie" />
              </v-avatar>
              <h1 class="display-1 text-center text-md-left">
                bio`graphy
              </h1>
            </v-flex>
            <v-flex xs12 md6 class="text-center text-md-left mt-3 mt-md-0 pr-0 pr-md-6 body-1">
              <p v-if="data.biography != undefined">
                {{ data.biography }}
              </p>
              <p v-else>
                -
              </p>
            </v-flex>
          </v-layout>
        </v-card>
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
  }
}
</script>
