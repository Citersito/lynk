<template>
	<div v-if="isVisible" class="modal">
		<div class="modal-content">
			<span class="close" @click="$emit('close')">&times;</span>
			<h2>Detalles del Pedido</h2>

			<!-- Información de la dirección -->
			<div v-if="direccion && typeof direccion === 'object'" class="direccion">
				<h3>Dirección del Cliente</h3>
				<p>{{ direccion.Calle }}, {{ direccion.Numero }}</p>
				<p>{{ direccion.Ciudad }}, {{ direccion.Estado }}</p>
				<p>Código Postal: {{ direccion.CodigoPostal }}</p>
			</div>
			<p v-else>{{ direccion }}</p>

			<!-- Lista de productos -->
			<div
				v-for="producto in productos"
				:key="producto.DetalleID"
				class="producto"
			>
				<h3>{{ producto.producto.Nombre }}</h3>
				<p>Precio Unitario: ${{ producto.Precio }}</p>
				<p>Cantidad: {{ producto.Cantidad }}</p>
				<p>Total: ${{ producto.Cantidad * producto.Precio }}</p>
			</div>

			<button @click="$emit('close')">Cerrar</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		isVisible: { type: Boolean, required: true },
		pedido: { type: Object, default: null },
		productos: { type: Array, default: () => [] },
		direccion: { type: String, default: null },
	},
};
</script>

<style>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-content {
	background: white;
	padding: 2rem;
	border-radius: 10px;
	width: 80%;
	max-width: 500px;
}
</style>
