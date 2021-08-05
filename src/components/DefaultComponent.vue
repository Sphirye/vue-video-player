<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card class="d-flex justify-center align-center flex-column" dark height="500px">
          <span class="text-h4 my-5 text--white">Vue.js - Typescript template</span>
          <span class="text-body my-5 text--white">Uploaded by Sphirye</span>
          <v-icon color="white">fas fa-star</v-icon>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="d-flex justify-center align-center flex-column" dark height="500px">
          <span class="text-h4 my-5 text--white">This template contains:</span>
          <span class="text-body text--white">Vue and Vuex decorators, vue-axios, Vuetify </span>
          <span class="text-body my-5 text--white">And obviously, Typescript.</span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: { }
})

export default class HelloWorld extends Vue {

}

</script>
