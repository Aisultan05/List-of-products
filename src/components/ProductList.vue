<template>
  <div class="max-w-3xl mx-auto mt-10">
    <h1 class="text-3xl font-bold mb-5 text-center">Список продуктов</h1>

    <ul class="space-y-4">
      <li
        v-for="product in products"
        :key="product.id"
        class="flex justify-between items-center bg-white shadow p-4 rounded"
      >
        <div>
          <p class="text-lg font-semibold">{{ product.product_name }}</p>
          <p class="text-gray-500">Количество: {{ product.product_amount }}</p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="removeProduct(product.id)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Удалить
          </button>
          <button
            @click="editProduct(product)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Редактировать
          </button>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-bold mt-10">Добавить новый продукт</h2>
    <form @submit.prevent="addProduct" class="mt-5 bg-gray-100 p-6 rounded shadow">
      <div class="mb-4">
        <label for="name" class="block text-lg font-medium mb-2">Название продукта</label>
        <input
          id="name"
          v-model="newProductName"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Введите название продукта"
          required
        />
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-lg font-medium mb-2">Количество</label>
        <input
          id="amount"
          v-model.number="newProductAmount"
          type="number"
          min="1"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Введите количество"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
      >
        Добавить
      </button>
    </form>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useProductStore } from '../stores/productStore';

export default {
  setup() {
    const productStore = useProductStore();

    const newProductName = ref('');
    const newProductAmount = ref(1);

    const products = computed(() => productStore.products);

    onMounted(() => {
      productStore.fetchProducts();
    });

    const addProduct = async () => {
      const product = {
        product_name: newProductName.value,
        product_amount: newProductAmount.value,
      };
      await productStore.createProduct(product);
      newProductName.value = '';
      newProductAmount.value = 1;
    };

    const removeProduct = async (id) => {
      await productStore.deleteProduct(id);
    };

    const editProduct = async (product) => {
      const updatedProduct = {
        product_name:
          prompt('Введите новое название:', product.product_name) || product.product_name,
        product_amount:
          parseInt(prompt('Введите новое количество:', product.product_amount)) ||
          product.product_amount,
      };
      await productStore.updateProduct(product.id, updatedProduct);
    };

    return {
      products,
      newProductName,
      newProductAmount,
      addProduct,
      removeProduct,
      editProduct,
    };
  },
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
