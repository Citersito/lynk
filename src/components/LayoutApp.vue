<template>
	<div class="layout">
		<NavbarApp />
		<!-- <TestConection /> -->
		<div id="content">
			<router-view />
		</div>
	</div>
</template>

<script>
import NavbarApp from "./NavbarApp.vue";
import ProductoInfo from "./producto/ProductoInfo.vue";
import TestConection from "./testConection.vue";

export default {
	components: {
		NavbarApp,
		TestConection,
		ProductoInfo,
	},
};
</script>
