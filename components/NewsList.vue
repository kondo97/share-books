<template>
  <v-card class="mx-auto" width="250">
    <v-list>
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          @click="menuActionClick(item.action)"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"  class="wrap-text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        text: "田中さんが記事にコメントをしました。",
        to: "/demo",
        action: 'closeNews'
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        text: "鈴木さんが記事にコメントをしました。",
        to: "/demo",
        action: 'closeNews'
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        text: "佐藤さんが記事にコメントをしました。",
        to: "/demo",
        action: 'closeNews'
      },
    ],
    model: 1,
  }),
  methods: {
    menuActionClick() {
      //メニューを閉じる。AppBarのメソッドを呼び出す。
      this.$emit('CloseMenu')
    },
  },
};
</script>

<style>
.wrap-text {
  word-break: break-all;
  white-space: normal;
}
</style>