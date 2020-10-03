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
    <div>X: {{ x }}</div>
    <div>Y: {{ y }}</div>
    <div>
      <button @click="sendData">
        send my data
      </button>
      <button @click="clearCanvas">
        clear canvas
      </button>
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
      this.ctx.lineWidth = 1;
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
      analystPicture.getAnalyst(this.$refs.cvs)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      console.log({ img: analystPicture.lastPicSent });

      this.$emit('flash', {
        message: `Data sent to ${analystPicture.apiUrl}, see console to see output`,
        type: 1,
      });
    },
  },

  mounted() {
    const el = this.$refs.cvs as HTMLCanvasElement;

    this.ctx = el.getContext('2d') as CanvasRenderingContext2D;
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid #f00;
}
</style>
