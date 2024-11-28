<template>
  <div class="productos">
    <div
      v-for="producto in productosConCategorias"
      :key="producto.ProductoID"
      class="producto"
    >
      <div class="producto__img">
        <img
          :src="producto.imagenURL || 'https://via.placeholder.com/150'"
          alt="Producto"
          class="w-full h-48 object-cover"
        />
      </div>
      <div class="producto__info">
        <h3 class="producto__nombre">{{ producto.Nombre }}</h3>
        <p class="producto__precio">Precio: ${{ producto.Precio }}</p>
        <p class="producto__categoria">
          Categoria: {{ producto.nombreCategoria || "Cargando..." }}
        </p>
        <p class="producto__descripcion">
          Descripcion: {{ producto.Descripcion }}
        </p>
      </div>
      <div class="producto__acciones">
        <button
          @click="editarProducto(producto)"
          class="producto__boton editar"
        >
          ✏️
        </button>
        <button
          @click="eliminarProducto(producto.ProductoID)"
          class="producto__boton eliminar"
        >
          🗑️
        </button>
      </div>
    </div>
    <ProductoEdit
      :isVisible="showEditProductModal"
      v-if="showEditProductModal"
      :product="selectedProduct"
      @close="showEditProductModal = false"
      @edit-product="updateProductInList"
    />
  </div>
</template>

<script>
// Importa la instancia configurada de Axios
import apiClient from "@/services/api.js";
import ProductoEdit from "./ProductoEdit.vue";

export default {
  components: {
    ProductoEdit,
  },
  data() {
    return {
      productos: [],
      productosConCategorias: [],
      showEditProductModal: false,
      selectedProduct: {},
    };
  },
  methods: {
    // Método para obtener los productos desde el backend
    async obtenerProductos() {
      try {
        const response = await apiClient.get("/api/productos");
        this.productos = response.data;

        // Fetch category names and images for each product
        await this.fetchProductDetails();
      } catch (error) {
        console.error(
          "Error al obtener los productos:",
          error instanceof Error ? error.message : error
        );
      }
    },

    // Método para obtener detalles de cada producto (categoría e imagen)
    async fetchProductDetails() {
      // Create a copy of productos with category names and images
      this.productosConCategorias = await Promise.all(
        this.productos.map(async (producto) => {
          try {
            // Fetch category name
            const categoriaResponse = await apiClient.get(
              `/api/categorias/${producto.CategoriaID}`
            );

            // Fetch product image
            const imagenResponse = await apiClient.get(
              `/api/productos/imagenes/principal/${producto.ProductoID}`
            );

            return {
              ...producto,
              nombreCategoria: categoriaResponse.data[0].Nombre,
              imagenURL: imagenResponse.data[0]?.ImagenURL || null,
            };
          } catch (error) {
            console.error(
              `Error al obtener detalles para producto ID ${producto.ProductoID}:`,
              error instanceof Error ? error.message : error
            );
            return {
              ...producto,
              nombreCategoria: "Error al cargar",
              imagenURL: null,
            };
          }
        })
      );
    },

    // Resto de los métodos permanecen igual...
    editarProducto(producto) {
      this.selectedProduct = producto;
      this.showEditProductModal = true;
    },

    async eliminarProducto(id) {
      try {
        const confirmacion = confirm(
          "¿Está seguro de que desea eliminar este producto?"
        );

        if (confirmacion) {
          await apiClient.delete(`/api/productos/${id}`);

          this.productosConCategorias = this.productosConCategorias.filter(
            (producto) => producto.ProductoID !== id
          );

          alert("Producto eliminado exitosamente");
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto. Por favor, intente nuevamente.");
      }
    },

    updateProductInList(updatedProduct) {
      const index = this.productosConCategorias.findIndex(
        (p) => p.ProductoID === updatedProduct.ProductoID
      );

      if (index !== -1) {
        this.productosConCategorias[index] = {
          ...this.productosConCategorias[index],
          Nombre: updatedProduct.nombre,
          Descripcion: updatedProduct.descripcion,
          Precio: updatedProduct.precio,
          CategoriaID: updatedProduct.categoriaId,
        };
      }

      this.showEditProductModal = false;
    },
  },
  async mounted() {
    await this.obtenerProductos();
  },
};
</script>
