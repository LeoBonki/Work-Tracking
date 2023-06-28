<template>
  <!-- ROUTE TO HOMEPAGE -->
  <div v-show="false">
    <router-link to="/home">Home</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Gill Sans Extrabold", sans-serif;
  background-color: rgb(22, 23, 30);
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    color: white;
}

</style>