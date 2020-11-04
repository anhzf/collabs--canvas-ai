<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </div>
  <router-view @flash="newFlash" />
  <div class="flashes">
    <div
      :class="{ flash: true, 'flash--error': isErrorFlash(flash) }"
      v-for="(flash, index) in flashMessages"
      :key="index"
      @click="delFlash(index)"
      title="close"
    >
      <span>{{ flash.message }}</span>
      <span class="close">X</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

export enum flashType {
  success, error
}

interface Flash {
  message: string;
  type: flashType;
}

@Options({
  data: () => ({
    flashMessages: [] as Flash[],
  }),

  methods: {
    newFlash(data: Flash) {
      this.flashMessages.push(data);
    },
    delFlash(id: number) {
      this.flashMessages = this.flashMessages.filter((v: Flash, i: number) => i !== id);
    },
    isErrorFlash(flash: Flash): boolean {
      return flash.type === flashType.error;
    },
  },
})

export default class Home extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.flashes {
  position: fixed;
  bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .flash {
    cursor: pointer;
    user-select: none;
    position: relative;

    &:hover {
      background-color: #0001;
    }

    &--error {
      color: yellow;
      background-color: #f006;

      &:hover {
        background-color: #f009;
      }
    }

    .close {
      position: absolute;
      right: 2em;
    }
  }
}
</style>
