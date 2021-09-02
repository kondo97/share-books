<template>
  <v-footer dark padless>
    <v-card
      flat
      tile
      class="white--text text-center footer-card"
      color="#3E3E3E"
    >
      <div class="d-flex justify-center my-2">
        <div v-for="icon in icons" :key="icon" class="white--text mx-3" icon>
          <div @click="fotterIcon(icon)" class="pointer">
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </div>
        </div>
        <nuxt-link to="/inquiry" class="text-decoration-none">
          <p class="my-0 ml-3 white--text">お問い合わせ</p>
        </nuxt-link>
      </div>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Share Books</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter"],
  }),
  methods: {
    fotterIcon(icon) {
      const currentURL = window.location.href
      console.log(currentURL)
      if (icon == "mdi-facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`)
      }
      if (icon == "mdi-twitter") {
        window.open(`http://twitter.com/share?url=${currentURL}&text=「Share Hondana」でおすすめの本を紹介しよう！&hashtags=ShareHondana`)
      }
    },
  },
};
</script>

<style>

</style>