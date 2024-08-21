<template>
    <breadcrumbs title="Detalles Mis Mascotas" main="Mis Mascotas" mainPath="/mis-mascotas"/>
  <div class="card"> 
    <div class="card-header pb-0">
      <h4>Información de mi mascota</h4>
    </div> 
    <div class="card-body">
      <div class="contact-form">
        <form class="theme-form">
          <div class="form-icon"><i class="icofont icofont-animal-paw"></i></div>
          <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center">
            <div class="mb-3">
              <img class="img-fluid profile-photo" :src="profilePhotoPreview || getFotoUrl(datapet.filePath)" alt="Foto de perfil">
            </div>
            <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
            <button @click.prevent="triggerFileInput" class="btn btn-light">Cambiar foto</button>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label f-w-500">Nombre</label>
                <input v-model="datapet.name" class="form-control" @input="filterName">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Especie</label>
                <input v-model="datapet.species" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Raza</label>
                <input v-model="datapet.breed" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Fecha de nacimiento</label>
                <input class="form-control" v-model="fechaFormateada" type="date" @change="actualizarFecha">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Color</label>
                <input v-model="datapet.color" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Género</label>
                <div class="col">
                  <div class="m-t-15 m-checkbox-inline custom-radio-ml">
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
        </form>
      </div>
      <div class="d-flex justify-content-between">
            <!-- <router-link class="btn btn-success active" to="/mis-mascotas">Regresar</router-link> -->
            <button class="btn btn-primary" type="submit" @click="editarMascota">Actualizar cambios</button>
          </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      // if (!fecha) return '';
      // const [year, month, day] = fecha.split('-');
      // return `${day}/${month}/${year}`;
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
        //      const token = newToken || localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        console.log('ID de la mascota:', this.petId);
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
            console.log('dato:', this.datapet);
          });
      } catch (err) {
        console.error('¿Cuál es el error?', err);

        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message;
        } else {
          this.error = 'Error al obtener los detalles del dueño de mascotas';
        }

        this.datapet = null;
      }
    },
    // modifica la fecha 
    actualizarFecha(event) {
      const fecha = event.target.value;
      this.fechaFormateada = fecha;
      this.datapet.birth_date = this.formatearFechaParaGuardar(fecha);
    },
    async editarMascota() {
      const token = localStorage.getItem('token');
        // // Refrescar el token antes de realizar la acción
        //     const newToken = await this.refreshToken();
        // // Usar el nuevo token para realizar la acción
        //      const token = newToken || localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', this. datapet.name);
      formData.append('species', this. datapet.species);
      formData.append('breed', this. datapet.breed);
      formData.append('birth_date', this. datapet.birth_date);
      formData.append('color', this. datapet.color);
      formData.append('gender', this. datapet.gender);
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
        if (response.data.status === 'error') {
          this.errorMessage = response.data.message;
        } else {
          this.okMessage = 'Datos actualizados correctamente';
          this.errorMessage = '';
          this.newProfilePhoto = null; // Resetear el estado de la nueva foto datauser
          console.log('Actualización exitosa, llamando a verDetalles...');
          this.verDetalles();
        }
      } catch (error) {
        console.error('Error al actualizar el perfil', error);
        this.errorMessage = 'Hubo un problema al actualizar el perfil';
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