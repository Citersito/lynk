<template>
	<div>
		<div v-for="orden in ordenesConNombres" :key="orden.OrdenID" class="pedido">
			<div class="pedido-info">
				<h3 class="pedido-id">ID del Pedido: {{ orden.OrdenID }}</h3>
				<p class="pedido-cliente">
					Cliente: {{ orden.nombreUsuario || "Cargando..." }}
				</p>
				<p class="pedido-total">Total: ${{ orden.Total }}</p>
				<p class="pedido-fecha">
					Fecha de Pedido: {{ formatFecha(orden.FechaCreacion) }}
				</p>
			</div>
			<div class="pedido-acciones">
				<button class="pedido-ver" @click="mostrarModal(orden)">
					Ver pedido
				</button>
			</div>
		</div>

		<!-- Modal -->
		<PedidoView
			:isVisible="isModalVisible"
			:pedido="pedidoSeleccionado"
			:productos="productos"
			:direccion="direccion"
			@close="cerrarModal"
		/>
	</div>
</template>

<script>
import apiClient from "@/services/api.js";
import PedidoView from "./PedidoView.vue";

export default {
	components: { PedidoView },
	data() {
		return {
			ordenes: [],
			ordenesConNombres: [],
			isModalVisible: false,
			pedidoSeleccionado: null,
			productos: [], // Productos de la orden seleccionada
			direccion: null, // Dirección del cliente
		};
	},
	methods: {
		async obtenerOrdenes() {
			try {
				const response = await apiClient.get("/api/ordenes");
				this.ordenes = response.data;
				await this.fetchUserNames();
			} catch (error) {
				console.error(
					"Error al obtener los pedidos:",
					error instanceof Error ? error.message : error
				);
			}
		},
		async fetchUserNames() {
			this.ordenesConNombres = await Promise.all(
				this.ordenes.map(async (orden) => {
					try {
						const userResponse = await apiClient.get(
							`/api/usuarios/${orden.UsuarioID}`
						);
						return {
							...orden,
							nombreUsuario: userResponse.data.Nombre,
						};
					} catch (error) {
						console.error(
							`Error al obtener nombre de usuario para ID ${orden.UsuarioID}:`,
							error instanceof Error ? error.message : error
						);
						return {
							...orden,
							nombreUsuario: "Error al cargar",
						};
					}
				})
			);
		},
		async mostrarModal(pedido) {
			this.pedidoSeleccionado = pedido;
			this.isModalVisible = true;

			// Obtener los productos de la orden
			await this.obtenerDetallesOrden(pedido.OrdenID);

			// Obtener la dirección del cliente
			await this.obtenerDireccion(pedido.UsuarioID);
		},
		async obtenerDetallesOrden(ordenId) {
			try {
				const response = await apiClient.get(
					`/api/detalles-orden?OrdenID=${ordenId}`
				);
				const detalles = response.data;

				// Enriquecer los detalles con información del producto
				this.productos = await Promise.all(
					detalles.map(async (detalle) => {
						try {
							const productoResponse = await apiClient.get(
								`/api/productos/${detalle.ProductoID}`
							);
							return {
								...detalle,
								producto: productoResponse.data,
							};
						} catch (error) {
							console.error(
								`Error al obtener producto ${detalle.ProductoID}:`,
								error
							);
							return {
								...detalle,
								producto: { Nombre: "Producto no encontrado" },
							};
						}
					})
				);
			} catch (error) {
				console.error("Error al obtener detalles de la orden:", error);
			}
		},
		async obtenerDireccion(usuarioId) {
			try {
				const response = await apiClient.get(`/api/direccion/${usuarioId}`);
				this.direccion = response.data;
			} catch (error) {
				console.error("Error al obtener dirección:", error);
				this.direccion = "Dirección no disponible";
			}
		},
		cerrarModal() {
			this.isModalVisible = false;
			this.pedidoSeleccionado = null;
			this.productos = [];
			this.direccion = null;
		},
		formatFecha(fechaOriginal) {
			const fecha = new Date(fechaOriginal);
			return fecha.toLocaleDateString("es-MX", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
		},
	},
	async mounted() {
		await this.obtenerOrdenes();
	},
};
</script>
