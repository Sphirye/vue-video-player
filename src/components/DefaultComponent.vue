<template>
  <div ref="videoContainer" @mousemove="(e) => { mouseDebounce() }" class="d-flex flex-row justify-center align-end" style="height: 500px;">
    <video
      :class="`${ fullscreen ? 'video-fullscreen' : 'video-windowed'}`"
      src="@/assets/dance.mp4"
      ref="player" 
      @playing="playing = true"
      @pause="playing = false"
      @loadedmetadata="mountPlayer()"
      @timeupdate="timeUpdate()"
      @click="play()"
    ></video>

    <div  :class="`d-flex justify-space-around align-center pa-3 overlay-container ${ hidedControlbar ? 'hided' : '' }`" style="background:rgba(0, 0, 0, 0.521);">

      <v-btn large icon @click="play()">
        <v-icon color="white" large> far {{ playing ? "fa-pause-circle" : "fa-play-circle" }} </v-icon>
      </v-btn>

      <input 
        class="mx-3 styled-slider slider-progress"
        type="range" 
        ref="timebar" 
        style="width: 100%;"
        value="0"
        min="0" 
        max="100"
        @click="v => setCurrentTime(v.target.value)"
        @input="v => setCurrentTime(v.target.value)"
      >

      <v-btn large icon @click="switchMute()">
        <v-icon color="white" large>{{ muted ? "mdi-volume-mute" : "mdi-volume-high" }}</v-icon>
      </v-btn>
      <v-btn large icon @click="switchFullscreen()">
        <v-icon color="white" large> mdi-fullscreen </v-icon>
      </v-btn>

    </div>

  </div>

  <!--Uncoment to see video props-->

  <!--v-container class="ma-0 pa-0 grey darken-4" style="position: relative;" fluid>

    <v-row justify="center" no-gutters>

      <v-col cols="12" class="video-container d-flex justify-center align-end">
        

        <v-row :class="`${ hidedControlbar ? 'hided' : '' } overlay-container`"  no-gutters>
          <v-col cols="1" class="d-flex flex-row justify-space-around">
          </v-col>
          <v-col cols="10" class="d-flex flex-column justify-center">
          </v-col>
          <v-col cols="1" class="d-flex flex-row justify-space-around overlay-content">
          </v-col>
        </v-row>

      </v-col>

      
    </v-row>


    <v-row no-gutters v-if="false">
      <v-col cols="3">
          <v-list two-line dark v-if="mountedPlayer">
            <v-list-item>
              <v-list-item-title>Playing</v-list-item-title>
              <v-list-item-subtitle>{{ playing }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>muted</v-list-item-title>
              <v-list-item-subtitle>{{ muted }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Duration</v-list-item-title>
              <v-list-item-subtitle>{{ player().duration }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Current Time</v-list-item-title>
              <v-list-item-subtitle>{{ currentTime }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Current Percentage Time</v-list-item-title>
              <v-list-item-subtitle>{{ parseInt(percentage(currentTime, player().duration)) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fullscreen</v-list-item-title>
              <v-list-item-subtitle>{{ fullscreen }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Overlay</v-list-item-title>
                <v-btn @click="hidedControlbar = true">Hide</v-btn>
                <v-btn @click="hidedControlbar = false">Show</v-btn>
            </v-list-item>

          </v-list>
      </v-col>
    </v-row>
  </v-container-->
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Hls from 'hls.js'
import '@/assets/custom_styles/rangestyles.css'

@Component({components: { }})

export default class DefaultComponent extends Vue {

  playing: boolean = false
  muted: boolean = false
  mountedPlayer: boolean = false
  currentTime: number = NaN
  fullscreen: boolean = false
  hidedControlbar: boolean = false
  debounceTimeoutId: any


  player(): HTMLMediaElement { //@ts-ignore
    return this.$refs.player
  }

  log(v: any) {
    console.log(v)
  }

  switchFullscreen() { // @ts-ignore
    if (this.$refs.videoContainer.requestFullscreen) { // @ts-ignore
      if (!this.fullscreen) { this.$refs.videoContainer.requestFullscreen() } // @ts-ignore
      else { document.exitFullscreen() }
    }
  }

  switchMute() {
    this.muted = !this.player().muted
    this.player().muted = !this.player().muted
  }

  percentage(partialValue: number, totalValue: number) {
   return (100 * partialValue) / totalValue;
  }

  created() {
    window.addEventListener("resize", (e) => { this.fullscreen = (window.innerHeight == screen.height) })
  }

  updated() { //@ts-ignore
    for (let i of document.querySelectorAll('input[type="range"].slider-progress')) {
      i.style.setProperty('--value', i.value)
      i.style.setProperty('--min', i.min == '' ? '0' : i.min)
      i.style.setProperty('--max', i.max == '' ? '100' : i.max)
      i.addEventListener('input', () => { i.style.setProperty('--value', i.value) })
    }
  }

  mounted() {
    this.$forceUpdate()
    /*if (Hls.isSupported()) {
      let hls = new Hls();
      console.log(hls);
      hls.loadSource("https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8");
      hls.attachMedia(this.$refs.player);
    }*/
  }


  play() { //@ts-ignore
    if (this.playing) {
      this.player().pause()
      this.hidedControlbar = false
    }
    else {
      this.player().play()
      this.mouseDebounce()
    }
  }

  mouseDebounce() {
    clearTimeout(this.debounceTimeoutId)
    this.hidedControlbar = false

    this.debounceTimeoutId = setTimeout(() => {
      if (this.playing == true) {
        console.log("Playing!")
        this.hidedControlbar = true
      }
    }, 1000)
  }
  
  timeUpdate() {
    this.currentTime = this.player().currentTime //@ts-ignore
    this.$refs.timebar.value = this.percentage(this.currentTime, this.player().duration)
    this.$forceUpdate()
  }

  setCurrentTime(v: number) {
    this.log((v * this.player().duration) / 100)
    this.player().currentTime = ((v * this.player().duration) / 100)
  }

  mountPlayer() {
    this.currentTime = this.player().currentTime
    this.mountedPlayer = true
  }

  @Watch("$vuetify.breakpoint.name")
  onBreakpointChanged() {
    console.log(this.$vuetify.breakpoint.name)
  }
}

</script>

<style>
.video-container {
  max-width: 800px;
  min-width: 400px;
  position: relative;
}

.video-windowed {
  position: absolute;
  width: 100%;
}

.video-fullscreen {
  width: 100%;
  height: 100%;
}

.overlay-container {
  position:absolute;
  width: 100%;

  opacity: 1;
  transition: opacity 0.1s ease-in;
  -webkit-transition: opacity 0.1s ease-in;
  -moz-transition: opacity 0.1s ease-in;
  -o-transition: opacity 0.1s ease-in;
}

.overlay-content {
  pointer-events: all;
}

.pointer {
  cursor: pointer;
}

.hided {
  -webkit-transition: opacity 0.2s ease-in;
  -moz-transition: opacity 0.2s ease-in;
  -o-transition: opacity 0.2s ease-in;
  opacity: 0;
}

</style>