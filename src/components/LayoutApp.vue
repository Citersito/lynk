<template>
	<div class="layout">
		<NavbarApp />
		<div id="content">
			<router-view />
		</div>
	</div>
</template>

<script>
import NavbarApp from "./NavbarApp.vue";

export default {
	components: {
		NavbarApp,
	},
};
</script>
