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
    <span
      v-for="(flash, index) in flashMessages"
      :key="index"
    >{{ flash.message }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

enum flashType {
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
}
</style>
