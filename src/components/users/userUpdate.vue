<template>
  <div class="col-xl-8 col-lg-7">
    <form @submit.prevent="updatedatos">
      <div class="card-header pb-0"> 
        <h4 class="card-title mb-0">Editar Perfil</h4>
      </div>
      <div class="card-body">
        <div class="row align-items-center"> 
          <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center">
            <div class="avatar mb-3">
              <img class="img-fluid" :src="profilePhotoPreview" alt="Foto de perfil">
            </div>
            <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
            <button @click.prevent="triggerFileInput" class="btn btn-light">Subir Imagen</button>
          </div>
          <div class="col-sm-9 col-md-9">
            <div class="row">
              <div class="col-sm-6 col-md-6">
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
                  <input v-model="telefono" class="form-control" @input="filterNumbers" maxlength="10">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="btn btn-primary" type="submit">Actualizar Datos</button>
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
      telefono: '',
      foto: null,
      profilePhotoPreview: '',
      errorMessage: '',
      okMessage: '',
    };
  },
  methods: {
    filterName(event) {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z]/g, '');
      this.nombre = onlyLettersAndSpaces;
    },
    filterApe(event) {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z]/g, '');
      this.apellido = onlyLettersAndSpaces;
    },
    filterNumbers(event) {
      this.errorMessage = '';
      const onlyNumbers = event.target.value.replace(/\D/g, '');
      this.telefono = onlyNumbers;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.foto = file; // Configurar la foto seleccionada
        const reader = new FileReader();
        reader.onload = e => {
          this.profilePhotoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async updatedatos() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }
    
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', this.nombre);
      formData.append('last_name', this.apellido);
      formData.append('phone_number', this.telefono);
      if (this.foto) {
        formData.append('profile_photo', this.foto); 
      }

      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/pet_owner/update', formData,
          {
            headers: {
            'Content-Type': 'multipart/form-data',
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
          this.telefono = '';
          this.foto = null;
          this.profilePhotoPreview = '';
        }
      } catch (error) {
        console.error('Error al actualizar el perfil', error);
        this.errorMessage = 'Hubo un problema al actualizar el perfil';
      }
    },
  },
};
</script>

<style>
.avatar img {
  width: 100px;
  height: 100px;
}

.row.align-items-center {
  display: flex;
  align-items: center;
}
</style>