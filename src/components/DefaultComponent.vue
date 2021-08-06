<template>
  <v-container class="my-3">

    <v-row justify="center" align="center">

      <v-col cols="3" v-if="false">
        <v-list two-line dark v-if="loadedMetaData">

          <v-list-item>
            <v-list-item-title>Playing</v-list-item-title>
            <v-list-item-subtitle>{{playing}}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Duration</v-list-item-title>
            <v-list-item-subtitle>{{player().duration}}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Current Time</v-list-item-title>
            <v-list-item-subtitle>{{currentTime}}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Current General Time</v-list-item-title>
            <v-list-item-subtitle>{{ currentTime }}</v-list-item-subtitle>
          </v-list-item>

        </v-list>
      </v-col>

      <v-col cols="12">
        <div class="videoContainer" ref="videoContainer">

          <v-container class="indigo" fluid>
            <v-row align="center" justify="center" no-gutters>

              <video 
                src="@/assets/dance.mp4"
                ref="player" 
                muted
                @playing="playing = true"
                @pause="playing = false"
                @loadedmetadata="loadedMetaData = true"
                @timeupdate="timeUpdate()"
              ></video>

              <v-overlay class="overlay-container d-flex flex-column justify-end align-stretch" absolute opacity="0">
                <v-container fluid>  
                  <v-row class="info overlay-content" align="center" justify="center" no-gutters>
                    <div style="width: 5%;">
                      <v-btn large icon>
                        <v-icon large> far {{ playing ? "fa-pause-circle" : "fa-play-circle" }} </v-icon>
                      </v-btn>
                    </div>

                    <div class="d-flex justify-center align-center wrap" style="width: 85%;">
                      <input style="width: 100%;" class="mx-3" type="range" ref="timebar" value="0" min="0" max="100">
                    </div>

                    <v-spacer/>

                    <div style="width: 5%;">
                      <v-btn large icon>
                        <v-icon large> mdi-volume-high </v-icon>
                      </v-btn>
                    </div>

                    <div style="width: 5%;">
                      <v-btn large icon>
                        <v-icon large> mdi-fullscreen </v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-container>
              </v-overlay>

            </v-row>
          </v-container>
          
        </div>
      </v-col>

      <v-col cols="3">
        <v-card class="grey darken-3">
          <v-card-actions>
            <v-btn dark @click="log($refs.videoContainer.requestFullscreen())">
              fullscreen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Hls from 'hls.js'

@Component({
  components: { }
})

export default class DefaultComponent extends Vue {

  playing: boolean = false
  loadedMetaData: boolean = false
  currentTime: number = NaN

  player(): HTMLMediaElement { //@ts-ignore
    return this.$refs.player
  }

  log(v: any) {
    console.log(v)
  }

  percentage(partialValue: number, totalValue: number) {
   return (100 * partialValue) / totalValue;
  }

  mounted() {
    /*if (Hls.isSupported()) {
      let hls = new Hls();
      console.log(hls);
      hls.loadSource("https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8");
      hls.attachMedia(this.$refs.player);
    }*/
  }


  play() { //@ts-ignore
  }
  
  timeUpdate() {
    this.currentTime = this.player().currentTime
    this.$refs.timebar!.value = this.percentage(this.currentTime, this.player().duration)
  }
}

</script>

<style>
.videoContainer {
  width: 100%;
}

.overlay-container {
  pointer-events: none;
}

.overlay-content {
  pointer-events: all;
}

/*lol {
  position:absolute;
	bottom:2%;
	width:100%;
	z-index:2147483647;
}*/

</style>