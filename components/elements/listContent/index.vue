<template>
  <v-container grid-list-xs class="my-12">
    <v-layout row wrap class="py-6">
      <v-flex xs12 class="d-flex justify-center justify-md-start align-center flex-wrap flex-column flex-sm-row text-center">
        <v-avatar
          v-if="data.categoryAnimation != undefined && data.categoryAnimation === true"
          class="my-2 my-sm-0 mr-sm-2 mr-md-4"
          size="55"
          color="grey lighten-3"
        >
          <lottie v-if="lottie" height="100px" width="100px" :options="lottie" />
        </v-avatar>
        <h1 class="display-1 text-center text-md-left">
          `my work
        </h1>
      </v-flex>
      <v-flex xs12 class="mt-6">
        <v-layout row wrap v-for="parent, parentIndex in category" :key="parentIndex">
          <v-flex xs12 class="mt-6">
            <v-subheader>/{{ parent }}</v-subheader>
          </v-flex>
          <v-flex v-for="item, index in items" v-if="item.category.toLowerCase() === parent && item.visible === true" :key="index" :class="$vuetify.breakpoint.smAndDown ? 'py-3' : 'pa-3'" xs12 md6>
            <cardMyWork :item="item" :static-data="data" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import cardMyWork from '@/components/elements/cardMyWork/index'
import lottie from '@/components/elements/lottie/index'
export default {
  components: {
    cardMyWork,
    lottie
  },
  props: {
    category: {
      type: Array,
      default: () => ([]),
      required: false
    },
    items: {
      type: Array,
      default: () => ([]),
      required: false
    },
    data: {
      type: Object,
      default: null,
      required: false
    },
    lottie: {
      type: Object,
      default: null,
      required: false
    }
  }
}
</script>