<template>
  <div>
    <v-card class="mx-auto" width="250">
      <v-list>
        <v-list-item-group >
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
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-home",
          text: "HOME",
          to: "/",
          action: "closeMenu",
        },
        
        {
          icon: "mdi-account",
          text: "マイページ",
          action: "myPage",
        },
        // {
        //   icon: "mdi-send",
        //   text: "ご利用ガイド",
        //   to: "/gide",
        //   action: "closeMenu",
        // },
        {
          icon: "mdi-logout",
          text: "ログアウト",
          action: "logout",
        },
        
        
      ],
      uid: this.$store.getters["profile/user"].uid,
    
    };
  },
  methods: {
    menuActionClick(action) {
      //メニューを閉じる。AppBarのメソッドを呼び出す。
      this.$emit("closeMenu");
      //logoutの確認
      if (action == "logout") {
        if (confirm("ログアウトしますか？")) {
          this.$store.dispatch("signIn/logout");
        }
      }
      //マイページへ遷移
      if (action == "myPage") {
        const user = firebase.auth().currentUser;
        if (user.emailVerified == true) {
          const uid = this.uid;
          this.$router.push(`/myPage/${uid}`);
        } else {
          this.$emit('parent-event')
        }
      } else {
        return;
      }
    },
  },
};
</script>

<style>
</style>