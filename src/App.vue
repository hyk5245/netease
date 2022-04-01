<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from './components/Main'
export default {
  name: 'App',
  components: {Main}
}
</script>

<style>
#app {
  color: #2c3e50;
  display: flex;
  justify-content: center;
  padding: .4rem;
  font-size: .32rem;
  flex-direction: column;
  align-items: center;
}
</style>
