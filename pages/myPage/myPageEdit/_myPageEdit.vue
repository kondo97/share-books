<template>
  <div class="mx-auto fixed-width">
    <v-card class="my-6 mypage-width mx-auto" color="#fff" flat>
      <v-form ref="form" v-model="valid">
        <v-card-text class="pb-0">
          <p class="ml-6 ml-sm-16 pl-sm-16">マイページ編集</p>
        </v-card-text>
        <v-row class="ml-6 pa-3 ml-sm-16 pl-sm-16">
          <v-col cols="11" sm="8" class="justify-center align-center d-flex">
            <v-avatar class="avatar-size"
              ><img v-if="uploadImageUrl" :src="uploadImageUrl" /></v-avatar
            ><v-file-input
              v-model="input_image"
              accept="image/*"
              show-size
              label="画像をアップロード"
              @change="onImagePicked"
            ></v-file-input>
          </v-col>
          <v-col cols="8" sm="8">
            <v-text-field
              placeholder="ユーザーネームを入力"
              solo
              dense
              v-model="myPage.userName"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="10" sm="10" class="pb-0">
            <v-textarea
              solo
              placeholder="自己紹介文を入力（最大140文字）"
              height="100"
              v-model="myPage.intro"
              :rules="introRules"
            ></v-textarea>
          </v-col>
          <v-col cols="10" sm="10">
            <v-text-field
              placeholder="TwitterURLを貼付"
              solo
              dense
              v-model="myPage.twitterURL"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <div class="text-center mb-6">
      <v-btn elevation="2" color="grey lighten-2" class="mr-3" @click="cancelMyPageEdit">キャンセル</v-btn
      >
      <v-btn class="primary ml-3" @click="reMypaged" :disabled="!valid"> 更新 </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.myPage.userName = this.$store.getters['myPageProfile/watchedProfile'].userName
    this.uploadImageUrl = this.$store.getters['myPageProfile/watchedProfile'].iconURL
    this.myPage.intro = this.$store.getters['myPageProfile/watchedProfile'].intro
    this.myPage.twitterURL = this.$store.getters['myPageProfile/watchedProfile'].twitterURL
  },
  data() {
    return {
      // ルール設定
      valid: false,
      nameRules: [
        (v) => !!v || "user name is required",
        (v) => (v && v.length <= 15) || "最大15文字です。",
      ],
      introRules: [
        (v) => !!v || "introduction is required",
        (v) => (v && v.length <= 140) || "最大140文字です。",
      ],
      input_image: null,
      uploadImageUrl: "",
      myPage:{
        userName:'',
        // iconURL:'',
        intro:'',
        twitterURL:''
      }
    };
  },
  methods: {
    reMypaged() {
      this.$store.dispatch('profile/editMyPage', {iconURL:this.uploadImageUrl, myPage:this.myPage})
      const uid = this.$route.params["myPageEdit"]
      this.$router.push(`/myPage/${uid}`)
    },
    cancelMyPageEdit() {
      const uid = this.$route.params["myPageEdit"]
      this.$router.push(`/myPage/${uid}`)
    },
    onImagePicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.uploadImageUrl = fr.result;
        });
      } else {
        this.uploadImageUrl = "";
      }
    },
  },
};
</script>