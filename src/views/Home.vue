<template>
  <div
    class="home"
    @keydown.ctrl="handleSystemKey"
  >
    <canvas
      ref="cvs"
      width="500"
      height="500"
      @mousemove="draw"
      @mousedown="beginDrawing"
      @mouseup="stopDrawing"
    />
    <div>
      <span>api url = </span>
      <input
        v-model="apiUrl"
        type="text"
        ref="apiUrlInput"
      >
    </div>
    <div>
      <button @click="sendData">
        send my data
      </button>
      <button @click="clearCanvas">
        clear canvas
      </button>
      <div>
        <input
          v-model="lineWidth"
          type="range"
          min="1"
          max="20"
        >
        <div>
          <small>Line width = </small>
          <span>{{ lineWidth }}</span>
        </div>
      </div>
    </div>
    <button @click="realTime = !realTime">
      <input
        v-model="realTime"
        type="checkbox"
      >
      Toggle Realtime
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import analystPicture from '@/services/analystPicture';
import { debounceWithPromise } from '@/utils';
import { flashType } from '@/App.vue';

@Options({
  data() {
    return {
      ctx: CanvasRenderingContext2D,
      x: 0,
      y: 0,
      isDrawing: false,

      lineWidth: 1,
      realTime: false,

      apiUrl: '',
      debouncedAnalysist: null,
    };
  },

  methods: {
    beginDrawing(e: MouseEvent) {
      // set starting point to where the mousedown
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },

    stopDrawing() {
      this.isDrawing = false;
    },

    draw(e: MouseEvent): void {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        // set starting point to the last offset move
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },

    drawLine(fromX: number, fromY: number, toX: number, toY: number) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#333';
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.moveTo(fromX, fromY);
      this.ctx.lineTo(toX, toY);
      this.ctx.stroke();
      this.ctx.closePath();

      if (this.realTime) this.debouncedAnalysist();
    },

    clearCanvas() {
      const { width, height } = this.ctx.canvas;
      this.ctx.clearRect(0, 0, width, height);
    },

    sendData() {
      // eslint-disable-next-line new-cap
      const analyser = new analystPicture(this.$refs.cvs);

      analyser.getAnalyst()
        .then(() => {
          this.$emit('flash', {
            message: `Data sent to ${analystPicture.apiUrl}, see console to see output`,
            type: flashType.success,
          });
        })
        .catch(() => {
          this.$emit('flash', {
            message: 'Oops, something went wrong',
            type: flashType.error,
          });
        });
    },
  },

  mounted() {
    const el = this.$refs.cvs as HTMLCanvasElement;

    this.ctx = el.getContext('2d') as CanvasRenderingContext2D;

    this.debouncedAnalysist = debounceWithPromise(this.sendData);

    try {
      this.apiUrl = analystPicture.apiUrl;
    } catch (err) {
      window.alert(err);
      this.$refs.apiUrlInput.focus();
    }
  },

  watch: {
    apiUrl: {
      immediate: true,
      handler(newVal) {
        analystPicture.apiUrl = newVal;
      },
    },
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid #f00;
}
</style>
