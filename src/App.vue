<template>
  <div id="app">
    <!-- route outlet -->
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  }
};
</script>

<style>
@font-face {
    font-family: "Weitrose";
    font-style: normal;
    font-weight: 300;
    src: url("./assets/fonts/Weitrose-Light.woff") format("woff");
}

#app {
  min-height: 100vh;
  width: 90vw;
  margin: 0 auto;
}

.router-view {
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
}

body * {
  font-family: 'Weitrose', sans-serif;
  font-weight: 300;
  letter-spacing: 0.2em;
  line-height: 3em;
}

table {
  width: 100%;
  margin: 1em 0 1em 0;
  border-collapse: collapse;

  td, th {
    padding: 0 1em 0;
    border-right: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;

    &:last-child {
      border-right: 0px solid lightgrey;
    }
  }
}

input {
  padding-left: 1em;
}

.inline-container {
  display: flex;
  flex-wrap: nowrap;

  * {
    flex-grow: 1;
    margin-right: 5px;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  > * {
    flex-grow: 1;
    margin-right: 1em;
    margin-top: 1em;
  }
}

.action {
  display: block;
  padding: 0 1em 0 1em;
  border: 1px solid lightgrey;
  background-color: lightgrey;
  color: white;
  border-radius: 3px;
  text-align: center;
  margin: 1em;
}
</style>
