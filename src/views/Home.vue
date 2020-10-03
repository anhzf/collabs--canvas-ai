<template>
  <div class="home">
    <canvas
      ref="cvs"
      width="500"
      height="500"
      @mousemove="draw"
    />
    <div>X: {{ x }}</div>
    <div>Y: {{ y }}</div>
    <button @click="sendData">
      send my data
    </button>
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
  }),

  methods: {
    draw(e: MouseEvent): void {
      this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
      // Set the end path
      this.x = e.offsetX;
      this.y = e.offsetY;
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

    sendData() {
      analystPicture.getAnalyst(this.$refs.cvs);

      this.$emit('flash', {
        message: `Data sent to ${analystPicture.apiUrl}`,
        type: 1,
      });
    },
  },

  mounted() {
    const el = this.$refs.cvs as HTMLCanvasElement;
    const ctx = el.getContext('2d') as CanvasRenderingContext2D;

    this.ctx = ctx;
  },
})
export default class Home extends Vue {}
</script>
