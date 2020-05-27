<template>
  <v-hover
    v-slot:default="{ hover }"
  >
    <v-card outlined>
      <v-card flat @click="showDetailWork = !showDetailWork">
        <v-card-title v-if="item.name !== '' && item.name !== undefined" :class="$vuetify.breakpoint.smAndDown ? 'subtitle-1 font-weight-medium' : 'title'" class="px-6">
          {{ item.name }}
          <v-spacer />
          <v-icon>{{ showDetailWork ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-card-title>

        <v-card-subtitle class="text--primary px-6 subtitle-1">
          <div v-if="item.description !== '' && item.description !== undefined">
            {{ item.description }}
          </div>
          <div v-else>
            -
          </div>
        </v-card-subtitle>
      </v-card>

      <v-expand-transition>
        <div v-show="showDetailWork">
          <v-divider class="mb-1" />
          <template v-if="Array.isArray(item.media) && item.media.length !== 0 && item.media[0] !== ''">
            <v-img
              class="white--text align-end"
              height="235px"
              :src="item.media[0]"
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
            <v-divider class="mb-1" />
          </template>
          <template v-else-if="staticData.notFoundImage != undefined">
            <v-img
              class="white--text align-end"
              height="235px"
              :src="staticData.notFoundImage"
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
            <v-divider class="mb-1" />
          </template>

          <v-card-text v-if="Array.isArray(item.tag) && item.tag.length !== 0" class="pb-0 px-6">
            <v-chip
              v-for="tag, index in item.tag"
              :key="index"
              class="mr-2 mb-2"
            >
              {{tag}}
            </v-chip>
          </v-card-text>
          <v-card-text v-else class="pb-0 px-6">
            Tidak memiliki tag
          </v-card-text>

          <v-divider class="mt-3 mb-2" />

          <v-card-actions class="px-6 pb-6">
            <v-btn
              color="primary"
              text
              :disabled="item.demo === '' || item.demo === undefined"
              @click="toExplore(item.demo)"
            >
              Explore
            </v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    item: {
      default: () => ({

      }),
      type: Object
    },
    staticData: {
      default: () => ({

      }),
      type: Object
    }
  },
  data: () => ({
    showDetailWork: false
  }),
  methods: {
    toExplore (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
