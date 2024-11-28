<template>
  <div v-for="orden in ordenesConNombres" :key="orden.OrdenID" class="pedido">
    <div class="pedido-info">
      <h3 class="pedido-id">ID del Pedido: {{ orden.OrdenID }}</h3>
      <p class="pedido-cliente">
        Cliente: {{ orden.nombreUsuario || "Cargando..." }}
      </p>
      <p class="pedido-total">Total: ${{ orden.Total }}</p>
      <p class="pedido-fecha">
        Fecha de Pedido: {{ formatFecha(orden.FechaCreacion) }}
      </p>
    </div>
    <div class="pedido-acciones">
      <button class="pedido-ver">Ver pedido</button>
      <button class="pedido-estatus">Cambiar Estatus</button>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api.js";

export default {
  data() {
    return {
      ordenes: [],
      ordenesConNombres: [],
    };
  },
  methods: {
    // Método para obtener las ordenes desde el backend
    async obtenerOrdenes() {
      try {
        const response = await apiClient.get("/api/ordenes");
        this.ordenes = response.data;

        // Fetch user names for each order
        await this.fetchUserNames();
      } catch (error) {
        console.error(
          "Error al obtener los pedidos:",
          error instanceof Error ? error.message : error
        );
      }
    },

    // Método para obtener el nombre de usuario para cada orden
    async fetchUserNames() {
      // Create a copy of ordenes to modify
      this.ordenesConNombres = await Promise.all(
        this.ordenes.map(async (orden) => {
          try {
            const userResponse = await apiClient.get(
              `/api/usuarios/${orden.UsuarioID}`
            );
            return {
              ...orden,
              nombreUsuario: userResponse.data.Nombre,
            };
          } catch (error) {
            console.error(
              `Error al obtener nombre de usuario para ID ${orden.UsuarioID}:`,
              error instanceof Error ? error.message : error
            );
            return {
              ...orden,
              nombreUsuario: "Error al cargar",
            };
          }
        })
      );
    },

    // Método para formatear la fecha
    formatFecha(fechaOriginal) {
      const fecha = new Date(fechaOriginal);
      return fecha.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  async mounted() {
    await this.obtenerOrdenes();
  },
};
</script>
