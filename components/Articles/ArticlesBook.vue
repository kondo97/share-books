<template>
  <v-list>
    <template v-for="(content, index) in contents">
      <v-list-item :key="index" class="d-flex flex-column">
        <p class="mt-sm-12 mx-sm-6 pl-3 d-flex book-count-width text-h4 font-weight-medium">{{ index + 1 }}冊目</p>
        <v-card class="mt-4  px-sm-6 pa-6 pb-0" elevation="3" width="600">
          <v-list-item-title v-html="content.title" class="mt-4 text-sm-h5 text-h6 font-weight-bold"></v-list-item-title>
          <p v-html="content.author" class="mt-3"></p>
          <p v-html="content.descript" class=""></p>
          <div class="logo--wrap--amazon mt-6 mx-auto">
            <a :href="content.url"  target="_blank">
            <img
              src="~/static/amazon.png"
              alt="amazonのロゴ"
              class="logo--amazon"
            >
            </a>
          </div>
        </v-card>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    contents() {
      return this.$store.getters["postsDetail/postDetail"].contents;
    },
  },
};
</script>

<style>
</style>