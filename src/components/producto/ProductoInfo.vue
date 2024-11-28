<template>
  <div>
    <div
      v-for="producto in productosConCategorias"
      :key="producto.ProductoID"
      class="producto"
    >
      <div class="producto__img">
        <img
          :src="producto.imagen || 'https://via.placeholder.com/50'"
          alt="Producto"
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
          @click="editarProducto(producto.ProductoID)"
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
  </div>
</template>

<script>
// Importa la instancia configurada de Axios
import apiClient from "@/services/api.js";

export default {
  data() {
    return {
      productos: [],
      productosConCategorias: [],
    };
  },
  methods: {
    // Método para obtener los productos desde el backend
    async obtenerProductos() {
      try {
        const response = await apiClient.get("/api/productos");
        this.productos = response.data;

        // Fetch category names for each product
        await this.fetchCategoryNames();
      } catch (error) {
        console.error(
          "Error al obtener los productos:",
          error instanceof Error ? error.message : error
        );
      }
    },

    // Método para obtener el nombre de categoría para cada producto
    async fetchCategoryNames() {
      // Create a copy of productos with category names
      this.productosConCategorias = await Promise.all(
        this.productos.map(async (producto) => {
          try {
            const categoriaResponse = await apiClient.get(
              `/api/categorias/${producto.CategoriaID}`
            );
            return {
              ...producto,
              nombreCategoria: categoriaResponse.data[0].Nombre,
            };
          } catch (error) {
            console.error(
              `Error al obtener nombre de categoría para ID ${producto.CategoriaID}:`,
              error instanceof Error ? error.message : error
            );
            return {
              ...producto,
              nombreCategoria: "Error al cargar",
            };
          }
        })
      );
    },

    // Métodos de acciones (placeholders)
    editarProducto(id) {
      // Implementar lógica de edición
      console.log(`Editar producto ${id}`);
    },

    eliminarProducto(id) {
      // Implementar lógica de eliminación
      console.log(`Eliminar producto ${id}`);
    },
  },
  async mounted() {
    await this.obtenerProductos();
  },
};
</script>
