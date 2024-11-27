<template>
	<h1 class="center">Configuración</h1>
	<div id="configuracionVendedor">
		<div class="vendedor-perfil">
			<h3>Perfil del Vendedor</h3>
			<form @submit.prevent="guardarConfiguracionVendedor">
				<div class="input-group">
					<label for="nombre">Nombre</label>
					<input
						type="text"
						v-model="vendedor.Nombre"
						id="nombre"
						placeholder="Nombre del vendedor"
					/>
				</div>
				<div class="input-group">
					<label for="email">Email</label>
					<input
						type="email"
						v-model="vendedor.Email"
						id="email"
						placeholder="Correo electrónico"
					/>
				</div>
				<div class="input-group">
					<label for="fechaRegistro">Fecha de Registro</label>
					<input
						type="text"
						v-model="vendedor.FechaRegistro"
						id="fechaRegistro"
						disabled
					/>
				</div>
				<button type="submit">Guardar Perfil</button>
			</form>
		</div>

		<!-- Opciones de Tienda y Métodos de Pago -->
		<div class="opciones-tienda">
			<h3>Opciones de Tienda</h3>
			<form @submit.prevent="guardarOpcionesTienda">
				<div class="input-group">
					<label for="nombreTienda">Nombre de la Tienda</label>
					<input
						type="text"
						v-model="configuracion.NombreTienda"
						id="nombreTienda"
						placeholder="Nombre de tu tienda"
					/>
				</div>
				<div class="input-group">
					<label for="logoTienda">Logo de la Tienda</label>
					<input type="file" @change="subirLogoTienda" />
				</div>
				<div class="input-group">
					<label for="metodosPago">Métodos de Pago</label>
					<select v-model="configuracion.MetodosPago" id="metodosPago">
						<option value="tarjeta">Tarjeta de Crédito</option>
						<option value="paypal">PayPal</option>
						<option value="transferencia">Transferencia Bancaria</option>
					</select>
				</div>
				<button type="submit">Guardar Configuración</button>
			</form>
		</div>

		<!-- Configuración de Envíos -->
		<div class="configuracion-envios">
			<h3>Configuración de Envíos</h3>
			<form @submit.prevent="guardarConfiguracionEnvios">
				<div class="input-group">
					<label for="costoEnvio">Costo de Envío</label>
					<input
						type="number"
						v-model="configuracion.CostoEnvio"
						id="costoEnvio"
						placeholder="Costo de envío (MXN)"
					/>
				</div>
				<div class="input-group">
					<label for="tiempoEnvio">Tiempo Estimado de Envío</label>
					<input
						type="text"
						v-model="configuracion.TiempoEnvio"
						id="tiempoEnvio"
						placeholder="Tiempo estimado de envío"
					/>
				</div>
				<button type="submit">Guardar Configuración de Envíos</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			vendedor: {
				Nombre: "Carlos Ruiz",
				Email: "vendedor@tienda.com",
				FechaRegistro: "2023-05-01",
			},
			configuracion: {
				NombreTienda: "Tienda de Carlos",
				MetodosPago: "tarjeta",
				CostoEnvio: 100,
				TiempoEnvio: "3-5 días hábiles",
			},
		};
	},
	methods: {
		guardarConfiguracionVendedor() {
			// Guardar configuración del perfil del vendedor (esto debe conectar con el backend)
			console.log("Perfil del vendedor guardado", this.vendedor);
		},
		guardarOpcionesTienda() {
			// Guardar configuración de la tienda (esto debe conectar con el backend)
			console.log("Configuración de la tienda guardada", this.configuracion);
		},
		guardarConfiguracionEnvios() {
			// Guardar configuración de envíos (esto debe conectar con el backend)
			console.log("Configuración de envíos guardada", this.configuracion);
		},
		subirLogoTienda(event) {
			// Subir logo de la tienda (esto debe conectar con el backend)
			const file = event.target.files[0];
			console.log("Logo subido", file);
		},
	},
};
</script>
