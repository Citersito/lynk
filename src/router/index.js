import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "@/views/ProductPage.vue";
import PedidosPage from "@/views/PedidosPage.vue";
import MyPage from "@/views/MyPage.vue";
import ConfigPage from "@/views/ConfigPage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
	{ path: "/home", component: HomePage },
	{ path: "/productos", component: ProductPage },
	{ path: "/pedidos", component: PedidosPage },
	{ path: "/mi-pagina", component: MyPage },
	{ path: "/configuracion", component: ConfigPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
