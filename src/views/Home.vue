<template>
  <DefaultComponent/>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import DefaultComponent from "@/components/DefaultComponent.vue"

@Component({
  components: { DefaultComponent }
})

export default class Home extends Vue {

}

</script>
