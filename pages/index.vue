<template>
  <div>
    <v-container v-show="staticData.header != undefined && staticData.header.visible === true"  grid-list-xs class="my-12">
      <v-layout column justify-center align-center>
        <v-slide-y-reverse-transition>
          <v-flex v-show="loadedCover" xs12 class="mt-12 transitionCustom">
            <h1
              v-if="staticData.header != undefined && staticData.header.title != undefined"
              class="display-1 text-center"
            >
              <span v-html="staticData.header.title" />
            </h1>
            <h1
              v-if="staticData.header != undefined && staticData.header.subtitle != undefined"
              class="display-1 text-center"
            >
              <span v-html="staticData.header.subtitle" />
            </h1>
            <v-divider class="my-6" />
            <v-layout class="subtitle-1" column wrap align-center justify-center>
              <p
                v-if="staticData.header != undefined"
                class="text-center"
              >
                <template v-if="staticData.header.info != undefined">
                  <span v-html="staticData.header.info" />
                </template>
                <template v-if="staticData.header != undefined && staticData.header.link != undefined">
                  <br v-if="!staticData.header.link.inline">
                  <nuxt-link v-if="staticData.header.link.local" :to="staticData.header.link.url">{{ staticData.header.link.text }}</nuxt-link>
                  <a v-else @click="toExplore(staticData.header.link.url)">{{ staticData.header.link.text }}</a>
                </template>
              </p>
            </v-layout>
          </v-flex>
        </v-slide-y-reverse-transition>
        <v-flex
          v-if="Array.isArray(staticData.coverImages) && staticData.coverImages[0] !== '' && staticData.coverImages[0] !== undefined"
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
                :src="staticData.coverImages[0]"
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

    <v-divider />

    <div id="biography" />
    <v-container grid-list-xs class="my-12">
      <v-layout row wrap>
        <v-flex xs12 style="width: 100%">
          <v-card flat class="d-flex py-6" color="transparent">
            <v-layout row wrap align-start justify-center>
              <v-flex xs12 md6>
                <h1 class="display-1 text-center text-md-left">
                  bio`graphy
                </h1>
              </v-flex>
              <v-flex xs12 md6 class="text-center text-md-left mt-3 mt-md-0 pr-0 pr-md-6 body-1">
                <p v-if="staticData.biography != undefined">
                  {{ staticData.biography }}
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

    <bannerImage v-if="staticData.coverImages[1] != '' && staticData.coverImages[1] != undefined" :coverImage="staticData.coverImages[1]" />
    <v-divider v-else />

    <div id="portfolio" />
    <v-container grid-list-xs class="my-12">
      <v-layout row wrap class="py-6">
        <v-flex xs12>
          <h1 class="display-1 text-center text-md-left">
            `my work
          </h1>
        </v-flex>
        <v-flex xs12 class="mt-6">
          <v-layout row wrap v-for="category, parentIndex in myWorkCategory" :key="parentIndex">
            <v-flex xs12 class="mt-6">
              <v-subheader>/{{ category }}</v-subheader>
            </v-flex>
            <v-flex v-for="item, index in myWork" v-if="item.category.toLowerCase() === category && item.visible === true" :key="index" :class="$vuetify.breakpoint.smAndDown ? 'py-3' : 'pa-3'" xs12 md6>
              <cardMyWork :item="item" :staticData="staticData" />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <bannerImage v-if="staticData.coverImages[2] != '' && staticData.coverImages[2] != undefined" :coverImage="staticData.coverImages[2]" />
    <v-divider v-else />

    <div id="experience" />
    <v-container grid-list-xs class="my-12">
      <v-layout row wrap class="py-6">
        <v-flex xs12>
          <h1 class="display-1 text-center text-md-left">
            `my experience
          </h1>
        </v-flex>
        <v-flex xs12 class="mt-6">
          <v-layout row wrap v-for="category, parentIndex in myExperienceCategory" :key="parentIndex">
            <v-flex xs12 class="mt-6">
              <v-subheader>/{{ category }}</v-subheader>
            </v-flex>
            <v-flex v-for="item, index in myExperience" v-if="item.category.toLowerCase() === category && item.visible === true" :key="index" :class="$vuetify.breakpoint.smAndDown ? 'py-3' : 'pa-3'" xs12 md6>
              <cardMyExperience :item="item" :staticData="staticData" />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <bannerImage v-if="staticData.coverImages[3] != '' && staticData.coverImages[3] != undefined" :coverImage="staticData.coverImages[3]" />
    <v-divider v-else />

    <v-container v-show="staticData.footer != undefined && staticData.footer.visible === true" grid-list-xs class="my-12" >
      <v-layout column justify-center align-center>
        <v-slide-y-reverse-transition>
          <v-flex v-show="loadedCover" xs12 class="mt-12 transitionCustom">
            <h1
              v-if="staticData.footer != undefined && staticData.footer.title != undefined"
              class="display-1 text-center"
            >
              <span v-html="staticData.footer.title" />
            </h1>
            <h1
              v-if="staticData.footer != undefined && staticData.footer.subtitle != undefined"
              class="display-1 text-center"
            >
              <span v-html="staticData.footer.subtitle" />
            </h1>
            <v-divider class="my-6" />
            <v-layout class="subtitle-1" column wrap align-center justify-center>
              <p
                v-if="staticData.footer !== undefined"
                class="text-center"
              >
                <template v-if="staticData.footer.info != undefined">
                  <span v-html="staticData.footer.info" />
                </template>
                <template v-if="staticData.footer != undefined && staticData.footer.link != undefined">
                  <br v-if="!staticData.footer.link.inline">
                  <nuxt-link v-if="staticData.footer.link.local" :to="staticData.footer.link.url">{{ staticData.footer.link.text }}</nuxt-link>
                  <a v-else @click="toExplore(staticData.footer.link.url)">{{ staticData.footer.link.text }}</a>
                </template>
                <template v-if="staticData.footer != undefined && staticData.footer.beforeSocial != undefined">
                  <span v-if="staticData.footer.beforeSocial.inline">{{ staticData.footer.beforeSocial.separatorText }}</span>
                  <span v-else>
                    <br>{{ staticData.footer.beforeSocial.separatorText }}<br>
                  </span>
                </template>
                <template v-if="staticData.socialMedia != undefined && Array.isArray(staticData.socialMedia) && staticData.socialMedia.length > 0">
                  <span v-for="social, index in staticData.socialMedia">
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
  </div>
</template>

<script>
import cardMyWork from '@/components/elements/cardMyWork/index'
import cardMyExperience from '@/components/elements/cardMyExperience/index'
import bannerImage from '@/components/elements/bannerImage/index'

export default {
  components: {
    cardMyWork,
    cardMyExperience,
    bannerImage
  },
  data: () => ({
    loadedCover: false,
    showDetailWork: false,
    showDetailExperience: false
  }),
  computed: {
    staticData () {
      return this.$store.getters.static
    },
    myWork () {
      return this.$store.getters.myWork
    },
    myExperience () {
      return this.$store.getters.myExperience
    },
    myWorkCategory () {
      return this.$store.getters.myWorkCategory
    },
    myExperienceCategory () {
      return this.$store.getters.myExperienceCategory
    }
  },
  mounted () {
    if (this.staticData.coverImages[0] === undefined || this.staticData.coverImages[0] === '') {
      this.loaded()
    } else {
      this.loaded()
    }
  },
  methods: {
    loaded () {
      this.loadedCover = true
    },
    toExplore (url) {
      window.open(url, '_blank')
    }
  },
  head: {
    title: '`rdfariz'
  },
}
</script>
