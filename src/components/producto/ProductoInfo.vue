<template>
	<div class="producto">
		<div class="producto__img">
			<img src="https://via.placeholder.com/50" alt="Producto" />
		</div>
		<div class="producto__info">
			<h3 class="producto__nombre">Nombre del Producto</h3>
			<p class="producto__precio">Precio: $100.00</p>
			<p class="producto__stock">Stock: 10</p>
			<p class="producto__categoria">Categoría: Electrónica</p>
			<p class="producto__estado activo">Estado: Activo</p>
		</div>
		<div class="producto__acciones">
			<button class="producto__boton editar">✏️</button>
			<button class="producto__boton eliminar">🗑️</button>
		</div>
	</div>
</template>
<script>
export default {};
</script>
