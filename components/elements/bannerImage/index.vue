<template>
  <v-layout column wrap>
    <v-flex xs12 class="my-6" style="width: 100%">
      <v-card
        width="100%"
        height="100%"
        flat
        tile
      >
        <v-img
          width="100%"
          :height="$vuetify.breakpoint.smAndDown ? `100%` : `80vh`"
          :src="coverImage"
          :lazy-src="coverImage"
          :contain="$vuetify.breakpoint.smAndDown"
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    coverImage: {
      default: '',
      type: String
    }
  }
}
</script>