<template>
	<div class="modal" v-if="isVisible">
		<div class="modal-content">
			<span class="close" @click="closeModal">&times;</span>
			<h2>Editar Producto</h2>
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
				<button type="submit">Guardar Cambios</button>
				<button type="button" @click="closeModal">Cerrar</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	props: ["isVisible", "product"],
	data() {
		return {
			productName: this.product.name || "",
			productDescription: this.product.description || "",
			productPrice: this.product.price || "",
			productCategory: this.product.category || "",
		};
	},
	methods: {
		closeModal() {
			this.$emit("close");
		},
		submitForm() {
			this.$emit("edit-product", {
				id: this.product.id,
				name: this.productName,
				description: this.productDescription,
				price: this.productPrice,
				category: this.productCategory,
			});
			this.closeModal();
		},
	},
	watch: {
		product(newProduct) {
			this.productName = newProduct.name || "";
			this.productDescription = newProduct.description || "";
			this.productPrice = newProduct.price || "";
			this.productCategory = newProduct.category || "";
		},
	},
};
</script>

<style>
.modal {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(
		0,
		0,
		0,
		0.7
	); /* Fondo más oscuro para mejor contraste */
	z-index: 1000; /* Asegura que el modal esté por encima de otros elementos */
}

.modal-content {
	background-color: #ffffff;
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para darle profundidad */
	position: relative;
	max-width: 500px;
	width: 100%;
	animation: fadeIn 0.3s ease-in-out; /* Animación de entrada */
}

.close {
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: 1.5rem;
	cursor: pointer;
	color: #333;
}

h2 {
	margin-bottom: 20px;
	font-size: 1.8rem;
	color: #333;
	text-align: center;
}

form {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

input,
textarea {
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 1rem;
	width: 100%;
	box-sizing: border-box;
}

button[type="submit"] {
	background-color: #4caf50;
	color: white;
	border: none;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 5px;
	font-size: 1rem;
	transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
	background-color: #45a049;
}

button[type="button"] {
	background-color: #f44336;
	color: white;
	border: none;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 5px;
	font-size: 1rem;
	transition: background-color 0.3s ease;
}

button[type="button"]:hover {
	background-color: #d32f2f;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: scale(0.9);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
