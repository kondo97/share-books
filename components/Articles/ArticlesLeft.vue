<template>
  <div>
    <div class="mt-16 fixed d-none d-sm-none d-md-block d-lg-block d-xl-block">
      <v-row class="d-flex flex-column mt-6">
        <v-col>
          <v-row class="d-flex flex-column">
            <v-col class="py-1 text-center"
              ><v-icon color="pink darken-1" size="36">mdi-heart</v-icon></v-col
            >
            <v-col class="py-0 text-center"><p>12</p></v-col>
          </v-row>
        </v-col>
        <v-col class="text-center"><v-icon>mdi-twitter</v-icon></v-col>
        <v-col class="text-center"><v-icon>mdi-facebook</v-icon></v-col>
        <v-col class="text-center"><v-icon>mdi-pencil</v-icon></v-col>
        <v-col class="text-center"><v-icon>mdi-delete</v-icon></v-col>
      </v-row>
    </div>
    <!-- タブレット以下は表示-->
    <div class="d-block d-sm-block d-md-none d-lg-none d-xl-none white--text">
      <v-row class="d-flex justify-center">
        <v-col cols="4" sm="6">
          <v-row class="justify-center">
            <v-col cols="4" sm="2" class="text-center d-flex align-center"
              ><v-icon color="pink darken-1" size="24">mdi-heart</v-icon></v-col
            >
            <v-col cols="6" sm="4" class="text-center d-flex align-center"><p class="ma-0">12</p></v-col>
          </v-row>
        </v-col>
        <v-col cols="2" sm="1" class="text-center d-flex align-center"><v-icon dark>mdi-twitter</v-icon></v-col>
        <v-col cols="2"  sm="1" class="text-center d-flex align-center"><v-icon dark>mdi-facebook</v-icon></v-col>
        <v-col cols="2" sm="1" class="text-center d-flex align-center"><v-icon dark>mdi-pencil</v-icon></v-col>
        <v-col cols="2" sm="1" class="text-center d-flex align-center"><v-icon dark>mdi-delete</v-icon></v-col>
        
      </v-row>
    </div>
  </div>
</template>

<style>
</style>