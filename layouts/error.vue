<template>
  <v-container grid-list-xs class="my-12">
    <v-layout column justify-center align-center>
      <v-slide-y-reverse-transition>
        <v-flex xs12 class="mt-12 transitionCustom">
          <h1 v-if="error.statusCode === 404" class="display-1 text-center">
            {{ pageNotFound }}
          </h1>
          <h1 v-else class="display-1 text-center">
            {{ otherError }}
          </h1>
          <v-divider class="my-6" />
          <v-layout class="subtitle-1" column wrap align-center justify-center>
            <p>
              Back to
              <NuxtLink to="/">
                Home page
              </NuxtLink>
            </p>
          </v-layout>
        </v-flex>
      </v-slide-y-reverse-transition>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    pageNotFound: '404 Not Found',
    otherError: 'An error occurred'
  }),
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
