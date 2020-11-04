<template>
  <div
    class="home"
    @keydown.ctrl="handleSystemKey"
  >
    <div>Hasil Prediksi : {{ analysist }}</div>
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
        type="url"
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

      analysist: '',

      lineWidth: 10,
      lineColor: '#333',

      realTime: false,
      apiUrl: '',
      debouncedAnalysist: null,
    };
  },

  emits: [
    'flash',
  ],

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

    draw({ offsetX, offsetY }: MouseEvent): void {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, offsetX, offsetY);
        // set starting point to the last offset move
        ([this.x, this.y] = [offsetX, offsetY]);
      }
    },

    drawLine(fromX: number, fromY: number, toX: number, toY: number) {
      const drawingContext = this.ctx as CanvasRenderingContext2D;
      drawingContext.beginPath();
      drawingContext.lineWidth = this.lineWidth;
      drawingContext.moveTo(fromX, fromY);
      drawingContext.lineTo(toX, toY);
      drawingContext.stroke();
      drawingContext.closePath();

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
        .then(({ response }) => {
          this.analysist = response;
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
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    this.debouncedAnalysist = debounceWithPromise(this.sendData);

    try {
      this.apiUrl = analystPicture.apiUrl;
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err);
      this.$refs.apiUrlInput.focus();
    }
  },

  watch: {
    lineColor: {
      immediate: true,
      handler(newVal) {
        this.ctx.strokeStyle = newVal;
      },
    },

    apiUrl: {
      immediate: false,
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
