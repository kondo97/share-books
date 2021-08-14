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
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
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
        icon: "mdi-home",
        text: "HOME",
        to: "/",
        action: 'closeMenu'
      },
      {
        icon: "mdi-account",
        text: "マイページ",
        // userによって動的に変化
        to: "/myPage/myPage",
        action: 'closeMenu'
      },
      {
        icon: "mdi-send",
        text: "ご利用ガイド",
        to: "/gide",
        action: 'closeMenu'
      },
      {
        icon: "mdi-logout",
        text: "ログアウト",
        action: "logout",
      },
    ],
    model: 1,
  }),
  methods: {
    menuActionClick(action) {
      //メニューを閉じる。AppBarのメソッドを呼び出す。
      this.$emit('closeMenu')
      //logoutの確認
      if (action == "logout") {
        confirm("clear!");
      } else {
        return;
      }
    },
  },
};
</script>

<style>


</style>