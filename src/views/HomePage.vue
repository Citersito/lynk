<template>
	<div id="homepage">
		<!-- Header Section -->
		<header>
			<h1>Bienvenido a Tu Tienda</h1>
			<p>Gestiona y personaliza tu tienda de forma fácil y rápida.</p>
		</header>

		<!-- Dashboard Links/Quick Actions Section -->
		<section class="dashboard-actions">
			<div class="action-item" @click="goToProductos">
				<h2>Productos</h2>
				<p>Gestiona los productos que vendes.</p>
			</div>

			<div class="action-item" @click="goToPedidos">
				<h2>Pedidos</h2>
				<p>Revisa los pedidos de tus clientes.</p>
			</div>

			<div class="action-item" @click="goToConfiguracion">
				<h2>Configuración</h2>
				<p>Configura tu tienda, métodos de pago y más.</p>
			</div>

			<div class="action-item" @click="goToMiPagina">
				<h2>Mi Página</h2>
				<p>Accede a la configuración de tu perfil.</p>
			</div>
		</section>

		<!-- Footer Section -->
		<footer>
			<p>&copy; 2024 Tienda Online | Todos los derechos reservados.</p>
		</footer>
	</div>
</template>

<script>
export default {
	methods: {
		goToProductos() {
			// Navegar a la página de productos
			this.$router.push("/productos");
		},
		goToPedidos() {
			// Navegar a la página de pedidos
			this.$router.push("/pedidos");
		},
		goToConfiguracion() {
			// Navegar a la página de configuración
			this.$router.push("/configuracion");
		},
		goToMiPagina() {
			// Navegar a la página de configuración del vendedor
			this.$router.push("/mi-pagina");
		},
	},
};
</script>
