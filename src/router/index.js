import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "@/views/ProductPage.vue";
import LayoutApp from "@/components/LayoutApp.vue";
import PedidosPage from "@/views/PedidosPage.vue";

const routes = [
	{ path: "/", component: LayoutApp },
	{ path: "/productos", component: ProductPage },
	{ path: "/pedidos", component: PedidosPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
