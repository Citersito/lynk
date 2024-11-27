<template>
	<h1 class="center">Mi Pagina</h1>
	<div id="miPagina">
		<h2>Configuración del Sitio</h2>
		<form @submit.prevent="guardarConfiguracion">
			<div class="input-group">
				<label for="colorPrimario">Color Primario</label>
				<input type="color" v-model="configuracion.ColorPrimario" />
			</div>
			<div class="input-group">
				<label for="colorSecundario">Color Secundario</label>
				<input type="color" v-model="configuracion.ColorSecundario" />
			</div>
			<div class="file-input">
				<label for="logo">Logo</label>
				<input type="file" @change="subirLogo" />
			</div>
			<div class="input-group">
				<label for="tipografia">Tipo de Fuente</label>
				<select v-model="configuracion.TipoDeFuente" id="tipografia">
					<option value="Lexend, sans-serif">Lexend</option>
					<option value="Arial, sans-serif">Arial</option>
					<option value="Verdana, Geneva, sans-serif">Verdana</option>
					<option value="Courier New, Courier, monospace">Courier New</option>
					<option value="Georgia, serif">Georgia</option>
					<option value="Tahoma, Geneva, sans-serif">Tahoma</option>
				</select>
			</div>
			<div>
				<p>
					Última actualización: {{ configuracion.FechaUltimaActualizacion }}
				</p>
			</div>
			<button type="submit">Guardar Configuración</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			configuracion: {
				ColorPrimario: "#42a5f5",
				ColorSecundario: "#f44336",
				Logo: null,
				FechaUltimaActualizacion: "2024-11-26",
				Dominio: "www.ejemplo.com",
				TipoDeFuente: "Arial, sans-serif", // Establecemos Arial como fuente predeterminada
			},
		};
	},
	methods: {
		guardarConfiguracion() {
			// Guardar la configuración del sitio (esto debe conectar con el backend)
			console.log("Configuración guardada", this.configuracion);
			this.aplicarConfiguracion();
		},
		subirLogo(event) {
			// Subir logo (esto debe conectar con el backend)
			const file = event.target.files[0];
			this.configuracion.Logo = file;
			console.log("Logo subido", file);
		},
		aplicarConfiguracion() {
			// Aplicar la tipografía seleccionada a la página
			document.body.style.fontFamily = this.configuracion.TipoDeFuente;
		},
	},
};
</script>
