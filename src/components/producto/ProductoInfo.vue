<template>
	<div>
		<div v-for="producto in productos" :key="producto.id" class="producto">
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
					Categoría: {{ obtenerNombreCategoria(producto.CategoriaID) }}
				</p>
				<p class="producto__descripcion">
					Descripcion: {{ producto.Descripcion }}
				</p>
			</div>
			<div class="producto__acciones">
				<button
					@click="editarProducto(producto.id)"
					class="producto__boton editar"
				>
					✏️
				</button>
				<button
					@click="eliminarProducto(producto.id)"
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
			categorias: [], // Cambiar 'categoria' a 'categorias'
		};
	},
	methods: {
		// Método para obtener los productos desde el backend
		async obtenerProductos() {
			try {
				const response = await apiClient.get("/api/productos");
				console.log("Respuesta completa del backend:", response); // Debug opcional
				console.log("Datos del backend:", response.data); // Debug opcional
				this.productos = response.data; // Asigna los datos al arreglo productos
			} catch (error) {
				console.error(
					"Error al obtener los productos:",
					error instanceof Error ? error.message : error
				);
			}
		},
		async obtenerCategorias() {
			try {
				const response = await apiClient.get("/api/categorias");
				this.categorias = response.data;
				console.log("Categorías cargadas:", this.categorias);
			} catch (error) {
				console.error("Error al obtener categorías:", error);
			}
		},
		obtenerNombreCategoria(id) {
			const categoria = this.categorias.find(
				(categoria) => categoria.id === id
			);
			return categoria ? categoria.nombre : "Sin categoría";
		},
	},
	async mounted() {
		await this.obtenerProductos();
		await this.obtenerCategorias();
	},
};
</script>
