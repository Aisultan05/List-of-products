import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://dev.mindwave.kz/api/sandbox/crud');
        console.log('GET response:', response.data);
        // Извлекаем массив продуктов из response.data.content.rows
        this.products = Array.isArray(response.data?.content?.rows)
          ? response.data.content.rows
          : [];
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.products = [];
      }
    },
    async createProduct(product) {
      try {
        const response = await axios.post('http://dev.mindwave.kz/api/sandbox/crud', product);
        console.log('POST response:', response.data);
        // Предполагаем, что после создания продукт добавляется и возвращается в массив rows
        // Если сервер возвращает свежий список всех продуктов, обновляем полностью:
        if (response.data?.content?.rows) {
          this.products = response.data.content.rows;
        } else {
          console.warn('Не удалось найти контент с rows после создания продукта');
        }
      } catch (error) {
        console.error('Ошибка при создании продукта:', error);
      }
    },
    async updateProduct(id, updatedProduct) {
      try {
        const response = await axios.put(`http://dev.mindwave.kz/api/sandbox/crud/${id}`, updatedProduct);
        console.log('PUT response:', response.data);
        // Предполагаем, что после обновления возвращается актуальный список products
        if (response.data?.content?.rows) {
          this.products = response.data.content.rows;
        } else {
          console.warn('Не удалось найти rows после обновления продукта');
        }
      } catch (error) {
        console.error('Ошибка при обновлении продукта:', error);
      }
    },
    async deleteProduct(id) {
      try {
        const response = await axios.delete(`http://dev.mindwave.kz/api/sandbox/crud/${id}`);
        console.log('DELETE response:', response.data);
        // Предполагаем, что после удаления также возвращается актуальный список products
        if (response.data?.content?.rows) {
          this.products = response.data.content.rows;
        } else {
          // Если сервер не возвращает список, просто удалим продукт из массива по id
          this.products = this.products.filter((product) => product.id !== id);
        }
      } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
      }
    },
  },
});
