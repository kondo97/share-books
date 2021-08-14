<template>
  <div class="right-menu d-none d-sm-none d-md-block d-lg-block d-xl-block fixed ml-lg-6">
    <v-card  width="160" height="160" class="mx-auto mt-12 contents" elevation="6" color="#7D9A94">
      <!-- <v-card-text class="contents--inner"> -->
        <p class="white--text contents--inner">「Share Books」の使い方をご紹介。</p>
      <!-- </v-card-text> -->
    </v-card>
    <v-card  width="160" height="160" class="mx-auto mt-12 contents" elevation="6" color="#454444">
      <p class="white--text contents--inner">本サイトの作成目的について</p>
    </v-card>
  </div>
</template>

<style>
  .right-menu {
    width: 180px;
  
  }

  .contents {
    position: relative;
    cursor: pointer;
    border-radius: 5% !important; 
  }

  .contents:hover {
    opacity: 0.8;
  }

  .contents--inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
  }

  .twitter {
    width: 100%;
  }

</style>

