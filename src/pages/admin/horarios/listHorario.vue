<template>
    <div>
      
      <!-- Verificar si los datos están cargando -->
      <div v-if="loading" class="text-center">
        <p>Cargando horario...</p>
      </div>
  
      <!-- Mostrar el horario -->
      <div v-else>
        <!-- <h1 class="text-center h1 txt-info">Horario </h1> -->
        
        <div class="schedule-container">
          <div v-for="day in schedule" :key="day.id" class="schedule-day">
            <h3>{{ day.day_of_week }}</h3>
            <ul>
              <li v-for="slot in day.time_slots" :key="slot.start_time">
                {{ slot.start_time }} - {{ slot.end_time }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        schedule: [],
        loading: true,
        busiId: this.$route.params.id,
      };
    },
    watch: {
    '$route.params.id': function(newId) {
      this.busiId = newId;
    }
  },
    methods: {
      async horarios() {
        const token = localStorage.getItem('token');
            // const newToken = await this.refreshToken();
            //  const token = newToken || localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      } 
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/business/schedule/${this.busiId}`);
          if (response.data.status === 'success') {
            this.schedule = response.data.schedule;
          }
        } catch (error) {
          console.error("Error fetching schedule:", error);
        } finally {
          this.loading = false;
        }
      }
    },
    mounted() {
      this.horarios();
    }
  };
  </script>
  
  <style scoped>
  .schedule-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
  }
  
  .schedule-day {
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin: 10px;
    width: calc(33.33% - 20px); /* Ajustar para que quepan 3 elementos en una fila */
  }
  
  .schedule-day h3 {
    color: #007bff;
    font-size: 18px;
  }
  
  .schedule-day ul {
    list-style-type: none;
    padding: 0;
  }
  
  .schedule-day li {
    background-color: #e9ecef;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 5px;
  }
  </style>