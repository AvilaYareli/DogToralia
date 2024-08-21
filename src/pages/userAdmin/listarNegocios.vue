<template>
    <Breadcrumbs title="Negocios Registrados"/>
    <div class="col-xl-8 col-lg-6 col-md-12 box-col-50 cols-xl-50">
    <div class="row">
      <div v-for="(negocio, index) in negocio" :key="negocio.id" class="col-12 mb-4">
        <div class="card p-3">
          <div class="row no-gutters">
            <div class="col-md-8">
              <!-- Aquí subimos la información -->
              <div class="d-flex align-items-start mb-3">
                <!-- Imagen del negocio -->
                <img :src="getFotoUrl(negocio.profile_photo)" class="rounded-circle mr-3" alt="Imagen del negocio" width="70" height="70">
                
                <!-- Información del negocio -->
                <div>
                  <h5 class="card-title mb-1">{{ negocio.name }}</h5>
                  
                  <!-- Estrellas -->
                  <div class="pro-review">
                    <div class="d-flex align-items-center">
                      <rate :length="5" :value="2" :showcount="false" />
                      <span class="ml-2">(250 reviews)</span>
                    </div>
                  </div>

                  <!-- Ubicación -->
                  <p class="card-text"><i class="fa fa-map-marker-alt"></i> {{ negocio.location }}</p>
                </div>
              </div>

              <!-- Detalles adicionales -->
              <div class="col-12">
                <p class="card-text"><i class="fa fa-phone"></i> {{ negocio.phone_number }}</p>
                <p class="card-text"><i class="fa fa-envelope"></i> {{ negocio.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

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
    getFotoUrl(profile_photo) {
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}${profile_photo}`;
    },
    async listarNegocios() {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };

        const response = await fetch("http://127.0.0.1:8000/api/business/all", requestOptions);
        const result = await response.json();
        this.negocio = result.businesses.data;
        // this.negocio.forEach(neg => {
        //   neg.horarios = [
        //     { day: 'Lunes', time: '15:30'},
        //     { day: 'Martes', time: '16:30' },
        //     { day: 'Miercoles', time: '18:30' },
        //     { day: 'Jueves', time: '15:30' },
        //     { day: 'Viernes', time: '16:30' },
        //     { day: 'Sabado', time: '18:30' },
        //   ];
        // });

      } catch (err) {
        console.log('Error al obtener los negocios:', err);
        this.error = 'Error al obtener los detalles de los negocios';    
      }
    },
  },
};
</script>

<style scoped>
.h-100 {
  height: 100vh;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1.25rem;
}

.rounded-circle {
  border-radius: 50%;
  object-fit: cover;
}

.text-muted {
  font-size: 0.85rem;
}

.text-info {
  color: #17a2b8;
  font-size: 0.85rem;
}

.text-primary {
  color: #007bff;
}

.text-center {
  text-align: center;
}

h6 {
  font-size: 1rem;
  font-weight: 600;
}

.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mt-3 {
  margin-top: 1rem;
}
.pro-review {
  margin-top: 5px;
}

.card-title {
  margin-bottom: 0;
}

.card p {
  margin-top: 5px;
  margin-bottom: 5px;
}

.d-flex.align-items-center span {
  font-size: 14px;
}
</style>
