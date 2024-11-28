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
			@edit-product="editProduct"
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

		// Método para abrir el modal de edición
		editarProducto(producto) {
			this.selectedProduct = producto;
			this.showEditProductModal = true;
		},

		// Método para eliminar un producto
		eliminarProducto(id) {
			// Implementar lógica de eliminación
			console.log(`Eliminar producto ${id}`);
		},

		// Método para manejar la edición del producto
		editProduct(product) {
			console.log("Producto editado:", product);
			// Lógica para editar el producto en la lista
			this.showEditProductModal = false;
		},
	},
	async mounted() {
		await this.obtenerProductos();
	},
};
</script>
