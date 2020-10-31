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
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import analystPicture from '@/services/analystPicture';

@Options({
  data: () => ({
    ctx: CanvasRenderingContext2D,
    x: 0,
    y: 0,
    isDrawing: false,

    lineWidth: 1,

    apiUrl: '',
  }),

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
    },

    clearCanvas() {
      const { width, height } = this.ctx.canvas;
      this.ctx.clearRect(0, 0, width, height);
    },

    sendData() {
      // eslint-disable-next-line new-cap
      const analyser = new analystPicture(this.$refs.cvs);

      analyser.getAnalyst().then(() => {
        this.$emit('flash', {
          message: `Data sent to ${analystPicture.apiUrl}, see console to see output`,
          type: 1,
        });
      });
    },
  },

  mounted() {
    const el = this.$refs.cvs as HTMLCanvasElement;

    this.ctx = el.getContext('2d') as CanvasRenderingContext2D;

    try {
      this.apiUrl = analystPicture.apiUrl;
    } catch (err) {
      window.alert(err);
      this.$refs.apiUrlInput.focus();
    }
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid #f00;
}
</style>
