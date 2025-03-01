<template>
  <div id="app">
    <h1 class="text-4xl font-bold text-center mt-10">Добро пожаловать в приложение!</h1>
    <ProductList />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';

export default {
  components: {
    ProductList,
  },
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}
</style>
