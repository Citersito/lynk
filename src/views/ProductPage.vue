<template>
	<div id="app">
		<h1 class="center">Productos</h1>
		<ProductoInfo />
		<button class="btn-primary" @click="showAddProductModal = true">
			Agregar Producto
		</button>
		<ProductoAdd
			:isVisible="showAddProductModal"
			v-if="showAddProductModal"
			@close="showAddProductModal = false"
			@add-product="addProduct"
		/>
	</div>
</template>

<script>
import ProductoInfo from "@/components/producto/ProductoInfo.vue";
import ProductoAdd from "@/components/producto/ProductoAdd.vue";

export default {
	components: {
		ProductoInfo,
		ProductoAdd,
	},
	data() {
		return {
			showAddProductModal: false,
		};
	},
	methods: {
		addProduct(product) {
			console.log("Producto agregado:", product);
			// Lógica para agregar el producto a la lista
		},
	},
};
</script>
