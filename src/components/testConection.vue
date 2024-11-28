<template>
	<div>
		<h1>Test de Conexión</h1>
		<button @click="testConnection">Probar Conexión</button>
		<p v-if="response">{{ response }}</p>
	</div>
</template>

<script>
import apiClient from "@/services/api";

export default {
	data() {
		return {
			response: null,
		};
	},
	methods: {
		testConnection() {
			apiClient
				.get("/api/usuarios/")
				.then((response) => {
					this.response = "Conexión exitosa: " + response.data;
				})
				.catch((error) => {
					this.response = "Error en la conexión: " + error.message;
				});
		},
	},
};
</script>
