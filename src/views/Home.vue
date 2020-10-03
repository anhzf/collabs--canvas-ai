<template>
  <div class="home">
    <canvas
      ref="cvs"
      width="500"
      height="500"
      @mousemove="showAxis"
    />
    <div>X: {{ x }}</div>
    <div>Y: {{ y }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  data: () => ({
    ctx: CanvasRenderingContext2D,
    x: 0,
    y: 0,
  }),

  methods: {
    drawLine(fromX: number, fromY: number, toX: number, toY: number) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#333';
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(fromX, fromY);
      this.ctx.lineTo(toX, toY);
      this.ctx.stroke();
      this.ctx.closePath();
    },

    showAxis(e: MouseEvent): void {
      this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
      // Set the end path
      this.x = e.offsetX;
      this.y = e.offsetY;
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
