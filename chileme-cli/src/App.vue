<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@mixin init{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
html,body{
 @include init;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  @include init;
}
</style>
