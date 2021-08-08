<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: { }
})

export default class App extends Vue {

}

</script>

<style>
.full-width {
  width: 100%;
}

.full-height {
  height: 100%;
}
</style>