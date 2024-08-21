<template>
   <breadcrumbs title="Detalle de mi Mascota" main="Mis Mascotas" mainPath="/mis-mascotas"/>
   <!-- <div class="container mt-4"> -->
    <form class="card" @submit.prevent="Regismascota">
      <div class="card-header pb-0">
        <h4 class="card-title mb-0">Información de mi mascota</h4>
      </div>
      <div class="card-body">
        <div class="row align-items-center">
          <!-- Imagen -->
          <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center"> 
            <div>
              <img class="img-fluid profile-photo" :src="profilePhotoPreview || getFotoUrl(datapet.filePath)" alt="Foto de perfil">
            </div>
            <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
            <button @click.prevent="triggerFileInput" class="btn btn-light">Cambiar foto</button>
          </div>
          <!-- Campos de entrada -->
          <div class="col-sm-9 col-md-9">
            <div class="row">
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Nombre</label>
                  <input v-model="datapet.name" class="form-control" @input="filterName">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Especie</label>
                  <input v-model="datapet.species" class="form-control" @input="filterEspe">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Raza</label>
                  <input v-model="datapet.breed" class="form-control" @input="filterRaza">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Color</label>
                  <input v-model="datapet.color" class="form-control" @input="filterColor">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Fecha de nacimiento</label>
                  <input class="datepicker-here form-control" v-model="fechaFormateada" type="date" data-language="en">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Género</label>
                  <div class="d-flex">
                    <div class="form-check form-check-inline radio radio-primary">
                      <input class="form-check-input" id="radioinline1" type="radio" name="genero" value="Hembra" v-model="datapet.gender" :checked="datapet.gender == 'Hembra'">
                      <label class="form-check-label mb-0" for="radioinline1">Hembra</label>
                    </div>
                    <div class="form-check form-check-inline radio radio-primary">
                      <input class="form-check-input" id="radioinline2" type="radio" name="genero" value="Macho" v-model="datapet.gender" :checked="datapet.gender == 'Macho'">
                      <label class="form-check-label mb-0" for="radioinline2">Macho</label>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <!-- <router-link class="btn btn-success active left" to="/mis-mascotas">Regresar</router-link> -->
        <!-- <button class="btn btn-primary" type="submit">Registrar Mascota</button> -->
        <button class="btn btn-primary" type="submit" @click="editarMascota">Actualizar cambios</button>

      </div>
    </form>
  <!-- </div> -->
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      datapet: {},
      petId: this.$route.params.id,
      showModal: false,
      foto: null,
      profilePhotoPreview: null,
      fechaFormateada: ''
    };
  },
  watch: {
    '$route.params.id': function(newId) {
      this.petId = newId;
      this.verDetalles(); // Llama a verDetalles cuando cambia el ID
    }
  },
  created() {
    this.verDetalles();
  },
  methods: {
    // ...mapActions(['refreshToken']),
    // formatearfecha
    formatearFechaParaMostrar(fecha) {
      if (!fecha) return '';
      const [day, month, year] = fecha.split('-');
      return `${year}-${month}-${day}`;
    },
    formatearFechaParaGuardar(fecha) {
      const [year, month, day] = fecha.split('-');
      return `${day}-${month}-${year}`;
    },
    // fecha
    
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
    // mostrar foto
    getFotoUrl(filePath) {
      const baseUrl = 'http://127.0.0.1:8000/';
      return `${baseUrl}${filePath}`;
    },
    // mostrar
    async verDetalles() {
      try {
        const token = localStorage.getItem('token');
            // // Refrescar el token antes de realizar la acción
            // const newToken = await this.refreshToken();
            // // Usar el nuevo token para realizar la acción
            //  const token = newToken || localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        fetch(`http://127.0.0.1:8000/api/pets/${this.petId}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            let datos = JSON.parse(result);
            this.datapet = datos;
            this.fechaFormateada = this.formatearFechaParaMostrar(this.datapet.birth_date);
          });
      } catch (err) {
        console.error('¿Cuál es el error?', err);
        this.errorMessage = 'Error al obtener los detalles de la mascota';
      }
    },
    // modifica la fecha 
    actualizarFecha(event) {
      const fecha = event.target.value;
      this.fechaFormateada = fecha;
      this.datapet.birth_date = this.formatearFechaParaGuardar(fecha);
    },
    async editarMascota() {
      const toast = useToast();
      const token = localStorage.getItem('token');
            // // Refrescar el token antes de realizar la acción
            // const newToken = await this.refreshToken();
            // // Usar el nuevo token para realizar la acción
            //  const token = newToken || localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', this.datapet.name);
      formData.append('species', this.datapet.species);
      formData.append('breed', this.datapet.breed);
      formData.append('birth_date', this.datapet.birth_date);
      formData.append('color', this.datapet.color);
      formData.append('gender', this.datapet.gender);
      if (this.foto) {
        formData.append('image', this.foto);
      }
   
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/pets/${this.petId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        const toast = useToast();
        if (response.data.status === 'error') {
          toast.error(response.data.message);
        } else {
          toast.success('Datos actualizados correctamente');
          this.foto = null; // Resetear el estado de la nueva foto datauser
          this.verDetalles();
        }
      } catch (error) {
        console.error('Error al actualizar el perfil', error);
        toast.error('Hubo un problema al actualizar los datos');
      }
    },
  }
};
</script>

<style>
.avatar img {
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>