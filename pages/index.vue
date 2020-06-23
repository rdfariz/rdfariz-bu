<template>
  <div v-if="!isLoading">
    <headerCover :data="staticData" :lottie="lottieHeader" />
    <v-divider />
    <bioContent :data="staticData" :lottie="lottieBio" />
    <bannerImage v-if="staticData.coverImages[1] != '' && staticData.coverImages[1] != undefined" :cover-image="staticData.coverImages[1]" />
    <v-divider v-else />
    <listContent :data="staticData" :category="myWorkCategory" :items="myWork" :lottie="lottieWork" />
    <bannerImage v-if="staticData.coverImages[2] != '' && staticData.coverImages[2] != undefined" :cover-image="staticData.coverImages[2]" />
    <v-divider v-else />
    <listContent :data="staticData" :category="myExperienceCategory" :items="myExperience" :lottie="lottieExperience" />
    <bannerImage v-if="staticData.coverImages[3] != '' && staticData.coverImages[3] != undefined" :cover-image="staticData.coverImages[3]" />
    <v-divider v-else />
    <footerContent :data="staticData.footer" :social-media="staticData.socialMedia" :lottie="lottieOptions" />
  </div>
</template>

<script>
import headerCover from '@/components/elements/header/index'
import bannerImage from '@/components/elements/bannerImage/index'
import bioContent from '@/components/elements/bioContent/index'
import listContent from '@/components/elements/listContent/index'
import footerContent from '@/components/elements/footer/index'

import animationData from '@/static/lottie/9844-loading-40-paperplane.json'
import animationHeader from '@/static/lottie/18123-developer.json'
import animationBio from '@/static/lottie/5313-loading-7-book.json'
import animationWork from '@/static/lottie/5399-loading-17-coffee-cup.json'
import animationExperience from '@/static/lottie/5315-archived-folder-document.json'

export default {
  components: {
    headerCover,
    bioContent,
    listContent,
    footerContent,
    bannerImage
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    return {
      lottieOptions: { animationData },
      lottieHeader: { animationData: animationHeader },
      lottieBio: { animationData: animationBio },
      lottieWork: { animationData: animationWork },
      lottieExperience: { animationData: animationExperience }
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
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
  head: {
    title: '`rdfariz'
  }
}
</script>
