<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Agregar Producto</h2>
      <form @submit.prevent="submitForm">
        <input
          type="text"
          v-model="productName"
          placeholder="Nombre del Producto"
          required
        />
        <textarea
          v-model="productDescription"
          placeholder="Descripción del Producto"
          required
        ></textarea>
        <input
          type="number"
          v-model="productPrice"
          placeholder="Precio"
          required
        />
        <input
          type="text"
          v-model="productCategory"
          placeholder="Categoría"
          required
        />
        <button type="submit">Agregar</button>
        <button type="button" @click="closeModal">Cerrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api.js";

export default {
  props: ["isVisible"],
  data() {
    return {
      productName: "",
      productDescription: "",
      productPrice: null,
      productCategory: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async submitForm() {
      try {
        // Prepare the payload according to the API specification
        const payload = {
          nombre: this.productName,
          descripcion: this.productDescription,
          precio: Number(this.productPrice),
          categoriaId: Number(this.productCategory),
        };

        // Send POST request to the products endpoint
        const response = await apiClient.post("/api/productos", payload);

        // Optional: Handle successful response
        this.$emit("product-added", response.data);

        // Reset form and close modal
        this.resetForm();
        this.closeModal();
      } catch (error) {
        // Optional: Error handling
        console.error("Error adding product:", error);
        // You might want to add user-friendly error messaging here
        alert("Error al agregar el producto. Por favor, intente nuevamente.");
      }
    },
    resetForm() {
      this.productName = "";
      this.productDescription = "";
      this.productPrice = null;
      this.productCategory = null;
    },
  },
};
</script>
