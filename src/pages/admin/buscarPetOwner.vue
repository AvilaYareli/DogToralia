<template>
    <div class="container-fluid h-100 d-flex flex-column">
      <div class="card flex-grow-1">
        <div class="card-body">
          <h1 class="text-center">Detalles del Dueño de Mascotas</h1>
          <div class="d-flex flex-column align-items-start mb-4">
            <div class="d-flex align-items-end mb-3">
              <div class="form-group me-2">
                <label class="col-form-label pt-0">Ingrese el ID del dueño de mascotas</label>
                <input v-model="petOwnerId" class="form-control" @input="filterNumbers" style="max-width: 300px;">
              </div>
              <div class="form-group">
                <button class="btn btn-secondary" type="submit" @click="buscarPOwner">Buscar</button>
              </div>
            </div>
  
            <div class="w-100">
              <table class="table table-striped">
              <!-- <table class="table table-hover table-striped"> -->
                <thead class="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="petOwnerDetails">
                    <td>{{ petOwnerDetails.id }}</td>
                    <td>{{ petOwnerDetails.name }}</td>
                    <td>{{ petOwnerDetails.last_name }}</td>
                    <td>{{ petOwnerDetails.email }}</td>
                    <td>{{ petOwnerDetails.phone_number }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
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
        petOwnerId: '',
        petOwnerDetails: null,
        error: null
      };
    },
    methods: {
      filterNumbers(event) {
        const onlyNumbers = event.target.value.replace(/\D/g, '');
        this.petOwnerId = onlyNumbers;
      },
      async buscarPOwner() {
        if (!this.petOwnerId) {
          this.error = 'Por favor, ingrese un ID válido';
          return;
        }
  
        try {
          const token = localStorage.getItem('token');  
          const response = await axios.get(`https://devs-devitm.com/api/pet_owner/${this.petOwnerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
          });
          this.petOwnerDetails = response.data.user;
          this.error = null;
        } catch (err) {
          // Captura y muestra el error detallado en la consola
          console.error('¿Cual es el error?', err);
          
          // Establece el mensaje de error basado en la respuesta de la API, si está disponible
          if (err.response && err.response.data && err.response.data.message) {
            this.error = err.response.data.message;
          } else {
            this.error = 'Error al obtener los detalles del dueño de mascotas';
          }
          
          this.petOwnerDetails = null;
        }
      }
    }
  };
  </script>
  
  <style scoped>

.h-100 {
  height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
  justify-content: center;
}

/* .table-hover tbody tr:hover {
  background-color: #f8f9fa;
} */

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f2f2f2;
}

.table-dark th {
  background-color: #5c61f2;
  color: white;
  border-right: 5px solid #ffffff;
  padding: 8px 20px;
  text-align: center;
}
.table-dark td {
 
  padding: 8px 20px;
 
}


.table-dark th:last-child {
  border-right: none;
}

  </style>