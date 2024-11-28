<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Editar Producto</h2>
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
        <button type="submit">Guardar Cambios</button>
        <button type="button" @click="closeModal">Cerrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api.js";

export default {
  props: ["isVisible", "product"],
  data() {
    return {
      productName: this.product.Nombre || "",
      productDescription: this.product.Descripcion || "",
      productPrice: this.product.Precio || "",
      productCategory: this.product.CategoriaID || "",
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

        // Send PUT request to update the product
        const response = await apiClient.put(
          `/api/productos/${this.product.ProductoID}`,
          payload
        );

        // Emit event to parent component with updated product
        this.$emit("edit-product", {
          ...this.product,
          ...payload,
        });

        // Close the modal
        this.closeModal();
      } catch (error) {
        console.error("Error updating product:", error);
        alert(
          "Error al actualizar el producto. Por favor, intente nuevamente."
        );
      }
    },
  },
  watch: {
    product(newProduct) {
      this.productName = newProduct.Nombre || "";
      this.productDescription = newProduct.Descripcion || "";
      this.productPrice = newProduct.Precio || "";
      this.productCategory = newProduct.CategoriaID || "";
    },
  },
};
</script>

<style scoped>
/* ... (previous styles remain the same) ... */
</style>
