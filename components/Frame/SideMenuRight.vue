<template>
<div>
  <div
    class="
      right-menu
      d-none d-sm-none d-md-block d-lg-block d-xl-block
      fixed
      ml-lg-6
      mb-12
    "
  >
  <nuxt-link to="/explanation">
    <v-card
      width="200"
      height="160"
      class="mx-auto mt-12 contents"
      elevation="1"
      color="#7D9A94"
    >
      <p class="white--text contents--inner">「Share Hondana」の<br>主な機能をご紹介</p>
      <div class="icon-hondana">
        <img src="~/static/hondana.png" alt="本棚のアイコン" />
      </div>
    </v-card>
    </nuxt-link>
    <nuxt-link to="/introduction">
    <v-card
      width="2000"
      height="160"
      class="mx-auto mt-12 contents"
      elevation="1"
      color="#454444"
    >
      <p class="white--text contents--inner">本サイトの作成目的・開発理念</p>
      <div class="icon-human">
        <img src="~/static/human.png" alt="人のアイコン" />
      </div>
    </v-card>
     </nuxt-link>
  </div>
  <div class="d-md-none">
    <nuxt-link to="/explanation">
    <v-card
      width="250"
      height="160"
      class="mx-auto mt-3 contents"
      elevation="1"
      color="#7D9A94"
    >
      <p class="white--text contents--inner">「Share Books」の<br>主な機能をご紹介</p>
      <div class="icon-hondana">
        <img src="~/static/hondana.png" alt="本棚のアイコン" />
      </div>
    </v-card>
    </nuxt-link>
    <nuxt-link to="/introduction">
    <v-card
      width="250"
      height="160"
      class="mx-auto mt-3 mb-3 contents"
      elevation="1"
      color="#454444"
    >
      <p class="white--text contents--inner">本サイトの作成目的・開発理念</p>
      <div class="icon-human">
        <img src="~/static/human.png" alt="人のアイコン" />
      </div>
    </v-card>
    </nuxt-link>
  </div>
  </div>
</template>

<style>
.icon-hondana, .icon-human {
  width: 60px;
  position: absolute;
  bottom: 0%;
  right: 0%;
}

.icon-hondana img {
  width: 100%;
}

.icon-human img {
  width: 100%;
  color: #fff;
}
</style>

