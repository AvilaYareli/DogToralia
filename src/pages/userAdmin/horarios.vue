
  <template><div class="col-md-4">
    <div class="mt-3">
    <h6>Horarios disponibles:</h6>
    <div class="d-flex justify-content-between">
      <div v-for="(horario, idx) in negocio.horarios" :key="idx" class="text-center">
        <p>{{ horario.day }}</p>
        <p class="text-primary">{{ horario.time }}</p>
      </div>
    </div>
  </div>
  </div> </template>
  <script>
  import axios from 'axios';

export default {
  data() {
    return {
      negocio: [],
      error: null,
    };
  },
  created() {
    this.listarNegocios();
  },
  methods: {
    async listarNegocios() {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };

        const response = await fetch("http://127.0.0.1:8000/api/business/all", requestOptions);
        const result = await response.json();
        this.negocio = result.businesses.data;
        
        // Simular horarios para cada negocio
        this.negocio.forEach(neg => {
          neg.horarios = [
            { day: 'Lunes', time: '15:30'},
            { day: 'Martes', time: '16:30' },
            { day: 'Miercoles', time: '18:30' },
            { day: 'Jueves', time: '15:30' },
            { day: 'Viernes', time: '16:30' },
            { day: 'Sabado', time: '18:30' },
          ];
        });

      } catch (err) {
        console.log('Error al obtener los negocios:', err);
        this.error = 'Error al obtener los detalles de los negocios';    
      }
    },
  },
};
</script>