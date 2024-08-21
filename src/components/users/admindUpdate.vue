<template>
    <div class="col-xl-8 col-lg-7">
      <form class="card" @submit.prevent="updatedatos">
        <!--  -->
        <div class="card-header pb-0">
          <h4 class="card-title mb-0">Editar Perfil</h4>
        </div>
        <!--  -->
        <div class="card-body"> 
          <div class="row">
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label f-w-500">Nombre</label>
                <input v-model="nombre" class="form-control" @input="filterName">  
              </div>
            </div> 
            <div class="col-sm-6 col-md-6">
              <div class="mb-3">
                <label class="form-label f-w-500">Apellido</label>
                <input v-model="apellido" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
            <div class="mb-3">
                <label class="form-label f-w-500">Número de teléfono</label>
                <input v-model="telefono" class="form-control"  @input="filterNumbers"  maxlength="10">
              </div>
            </div>
          
             
          </div>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-primary" type="submit" @click="updatedatos">Actualizar Datos</button>
          <!-- <button class="btn btn-secondary" type="button" @click="limpiar">Limpiar</button> -->
        </div>
      </form>
  
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        <h4 class="alert-heading" style="font-size: 16px;">Advertencia!</h4>
        <p class="alert-heading">{{ errorMessage }}</p>
      </div>
  
      <div v-if="okMessage" class="alert alert-success" role="alert">
        <h4 class="alert-heading" style="font-size: 16px;">Éxito!</h4>
        <p class="alert-heading">Has actualizado tus datos.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nombre: '',
        apellido: '',
        telefono:'',
        errorMessage: '',
        okMessage: '',
      };
    },
    methods: {
      filterName(event) {
        const onlyLetters = event.target.value.replace(/[^a-zA-Z]/g, '');
        this.nombre = onlyLetters;
      },
      filterApe(event) {
        const onlyLetters = event.target.value.replace(/[^a-zA-Z]/g, '');
        this.apellido = onlyLetters;
      }, 
      filterNumbers(event){
        this.errorMessage = '';
         // Remover cualquier carácter que no sea un número
      const onlyNumbers = event.target.value.replace(/\D/g, '');
      this.telefono = onlyNumbers;
      },
      async updatedatos() {
        const token = localStorage.getItem('token');
        if (!token) {
          this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
          this.$router.push('/auth/login');
          return;
        }
  
        try {
          const response = await axios.put(
            'https://devs-devitm.com/api/business_owner/update',
            {
              name: this.nombre,
              last_name: this.apellido,
              phone_number:this.telefono,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );
  
          if (response.data.status === 'error') {
            this.errorMessage = response.data.message;
          } else {
            this.okMessage = 'Datos actualizados correctamente';
            this.errorMessage = '';
            this.nombre = '';
            this.apellido = '';
            this.telefono='';
          }
        } catch (error) {
          console.error('Error al actualizar el perfil', error);
          this.errorMessage = 'Hubo un problema al actualizar el perfil';
        }
      },
     
    },
  };
  </script>
  
  <style >
  
  </style>