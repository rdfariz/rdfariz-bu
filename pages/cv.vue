<template>
  <div style="min-height: 90vh">
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <template v-if="!isEmptyObj(staticData) && staticData.cv != undefined">
            <v-card v-if="staticData.cv.image != '' && staticData.cv.image != undefined" height="100%">
              <v-img
                width="100%"
                height="100%"
                :src="staticData.cv.image"
                @load="loaded"
                contain
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
            <h1 v-else class="display-1 mt-12 text-center">
              `CV tidak ditemukan..
            </h1>
            <v-fab-transition>
              <v-btn
                v-show="staticData.cv.download != '' && staticData.cv.download != undefined"
                color="pink"
                dark
                fixed
                bottom
                right
                fab
                @click="toDownload(staticData.cv.download)"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { isObject } from '@/plugins/utils'

export default {
  data: () => ({
    isLoaded: false
  }),
  computed: {
    staticData () {
      return this.$store.getters.static
    }
  },
  methods: {
    loaded () {
      this.isLoaded = true
    },
    isEmptyObj (obj) {
      return isObject(obj)
    },
    toDownload (url) {
      window.open(url, '_blank')
    }
  },
  head: {
    title: '`rdfariz / cv',
    meta: [
      { hid: 'description', name: 'description', content: 'RdFariz CV' }
    ]
  },
}
</script>
