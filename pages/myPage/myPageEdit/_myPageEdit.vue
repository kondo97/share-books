<template>
  <div class="mx-auto fixed-width">
    <v-card class="my-12 mypage-width mx-auto" color="#fff" flat>
      <v-card-text>
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
            label="画像をアップロード。"
            @change="onImagePicked"
          ></v-file-input>
        </v-col>
        <v-col cols="8" sm="8">
          <v-text-field
            label="ユーザーネームを入力。"
            placeholder="ユーザーネームを入力。"
            solo
            height="10"
          ></v-text-field>
        </v-col>
        <v-col cols="10" sm="10" class="pb-0">
          <v-textarea
            label="自己紹介文を入力。（最大140文字）"
            solo
            placeholder="自己紹介文を入力。（最大140文字）"
            height="120"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-center mb-6">
      <v-btn class="primary" @click="reMypaged"> 更新 </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input_image: null,
      uploadImageUrl: ''
    }
  },
  methods: {
    reMypaged() {
      this.$router.push('/myPage/params.id')
    },
    onImagePicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadImageUrl = fr.result
        })
      } else {
        this.uploadImageUrl = ''
      }
    }
  },
}
</script>