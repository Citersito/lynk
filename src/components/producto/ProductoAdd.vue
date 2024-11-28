<template>
	<div class="modal" v-if="isVisible">
		<div class="modal-content">
			<span class="close" @click="closeModal">&times;</span>
			<h2>Agregar Producto</h2>
			<form @submit.prevent="submitForm">
				<input
					type="text"
					v-model="productName"
					placeholder="Nombre del Producto"
					required
				/>
				<textarea
					v-model="productDescription"
					placeholder="Descripción del Producto"
					required
				></textarea>
				<input
					type="number"
					v-model="productPrice"
					placeholder="Precio"
					required
				/>
				<input
					type="text"
					v-model="productCategory"
					placeholder="Categoría"
					required
				/>
				<button type="submit">Agregar</button>
				<button type="button" @click="closeModal">Cerrar</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	props: ["isVisible"],
	data() {
		return {
			productName: "",
			productDescription: "",
			productPrice: "",
			productCategory: "",
		};
	},
	methods: {
		closeModal() {
			this.$emit("close");
		},
		submitForm() {
			this.$emit("add-product", {
				name: this.productName,
				description: this.productDescription,
				price: this.productPrice,
				category: this.productCategory,
			});
			this.closeModal();
		},
	},
};
</script>
