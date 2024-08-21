<template>
    <div class="container-fluid h-100 d-flex flex-column ">
      <div class="card flex-grow-1">
        <div class="card-body ">
          <h1 class="text-center">Detalles del Dueño de Mascotas</h1>
          <div class="d-flex flex-column align-items-start">
            
              <label class="col-form-label pt-0">Ingrese el ID del dueño de mascotas</label>
              <input v-model="petOwnerId" class="form-control" @input="filterNumbers" style="max-width: 300px;">
            </div>
          
              <button class="btn btn-secondary" type="submit" @click="buscarPOwner">Buscar</button>
            
          </div>
          
          <div class="mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <!-- Añade más campos según los datos que recibas -->
                </tr>
              </thead>

              
              <tbody>
                <tr v-if="petOwnerDetails" >
                  <td>{{ petOwnerDetails.id }}</td>
                  <td>{{ petOwnerDetails.name }}</td>
                  <td>{{ petOwnerDetails.email }}</td>
                  <td>{{ petOwnerDetails.telefono }}</td>
                  <!-- Añade más campos según los datos que recibas -->
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
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
        limpiarError() {
        this.errorMessage = '';
      },
      filterNumbers(event){
        this.errorMessage = '';
         // Remover cualquier carácter que no sea un número
      const onlyNumbers = event.target.value.replace(/\D/g, '');
      this.petOwnerId = onlyNumbers;
      },
      async buscarPOwner() {
        // this.errorMessage = '';
        if (!this.petOwnerId) {
          this.error = 'Por favor, ingrese un ID válido';
          return;
        }
  
        try {
          const response = await axios.get(`https://devs-devitm.com/api/pet_owner/${this.petOwnerId}`);
          this.petOwnerDetails = response.data;
          this.error = null;
        } catch (err) {
          this.error = 'Error al obtener los detalles del dueño de mascotas';
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





  </style>