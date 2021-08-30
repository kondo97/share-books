<template>
  <div>
    <p class="mt-9 ml-4 mx-sm-12 mt-sm-12 bgMainColor likeUsers">記事にいいねしたユーザー</p>
    <v-row class="mt-4 mx-sm-12 mt-sm-6 bgMainColor pa-sm-6 px-3">
      <v-col cols="6" sm="3" v-for="(likedUser, i) in likedUsers" :key="i">
        <div class="text-center likeUsers-border mx-sm-6">
          <v-list-item-avatar>
            <v-img :src="likedUser.iconURL" class="pointer" @click="goProfile(likedUser)"></v-img>
          </v-list-item-avatar>
          <v-list-item-title v-text="likedUser.userName" class="pointer hover-blue" @click="goProfile(likedUser)"></v-list-item-title>
        </div>
      </v-col>
    </v-row>
    <p v-if="!noDataLikeUser" class="text-center pointer hover-blue mt-6 pb-9" @click="showMoreUsers">▼もっと表示する</p>
      <p v-if="noDataLikeUser" class="text-center mt-6 pb-6">no more data</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('like/resetLikedUsers')
    const postId = this.$route.params["likeUsers"];
    this.$store.dispatch('like/getLikeUsers', postId)
  },
  data() {
    return {
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "Summer BBQ",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday giftBrunch this weekend?Brunch this weekend?v",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
        },
      ],
    };
  },
  methods: {
    goProfile(likedUser) {
      this.$router.push(`/myPage/${likedUser.id}`)
    },
    showMoreUsers() {
      const postId = this.$route.params["likeUsers"];
      this.$store.dispatch('like/getLikeUsers', postId)
    }
  },
  computed: {
    likedUsers() {
      return this.$store.getters['like/likedUsers']
    },
    noDataLikeUser() {
      return this.$store.getters['like/noDataLikeUser']
    }
  }
};
</script>

