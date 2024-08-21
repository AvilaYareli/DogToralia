<template>
  <breadcrumbs title="Nuevo Negocio" main="Mis Negocios " mainPath="/listar-Minegocio" />
   <!-- <Breadcrumbs main="Mis Negocios " title="Nuevo Negocio"/> -->
    <form class="card" @submit.prevent="Nuevo">
      <div class="card-header pb-0">
        <h4 class="card-title mb-0">Registrar un Nuevo Negocio</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 col-md-3"> 
            <div class="mb-3">
              <label class="form-label f-w-500">Nombre del Negocio:</label>
              <input v-model="nombre" class="form-control" @input="filterName">
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-3">
              <label class="form-label f-w-500">Teléfono:</label>
              <input v-model="telefono" class="form-control" @input="filterNumbers" maxlength="10">
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-3">
              <label class="form-label f-w-500">Correo electrónico:</label>
              <input v-model="correo" @input="limpiarError" class="form-control" type="text" placeholder="correo@gmail.com">
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <div class="mb-3">
                <label class="form-label f-w-500">Descripción:</label>
                <textarea v-model="descripcion" @input="limpiarError" class="form-control" rows="5" placeholder="Agrega la descripción del negocio"></textarea>
              </div>
            </div>
            <div class="col-md-4 d-flex flex-column align-items-center">
              <div class=" mb-3">
                <img class="img-fluid profile-photo" :src="profilePhotoPreview" alt="Foto de perfil">
              </div>
              <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
              <button @click.prevent="subirImagen" class="btn btn-light">Subir Imagen</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="card-footer d-flex justify-content-between"> -->
      <div class="card-footer d-flex justify-content-end">
        <!-- <router-link class="btn btn-success active left" to="/listar-Minegocio">Regresar</router-link> -->
        <button class="btn btn-secondary" type="submit">Registrar Negocio</button>
      </div>
    </form>
  <!-- </div> -->
</template> 

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      nombre: '',
      telefono: '',
      correo: '',
      descripcion: '',
      profilePhotoPreview: '',
    };
  },
  methods: {
    // ...mapActions(['refreshToken']),
    subirImagen() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.profilePhotoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    filterNumbers(event) {
      const onlyNumbers = event.target.value.replace(/\D/g, '');
      this.telefono = onlyNumbers;
    },
    filterName(event) {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      this.nombre = onlyLettersAndSpaces;
    },
    limpiarError() {
      this.errorMessage = '';
    },
    validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    },
    validarCampos({ nombre, correo, telefono, descripcion }) {
      if (!nombre || !correo || !telefono || !descripcion) {
        return 'Todos los campos son obligatorios.';
      }
      if (!this.validarCorreo(correo)) {
        return 'Correo electrónico no válido. Debe tener un formato como nombre@dominio.com';
      }
      if (telefono.length !== 10) {
        return 'Revisa tu número de teléfono';
      }
      return '';
    },
    async Nuevo() {
      const toast = useToast(); // Definir toast aquí
      const token = localStorage.getItem('token');
      //        const newToken = await this.refreshToken();
      //        const token = newToken || localStorage.getItem('token');
      if (!token) {
        toast.warning('No se encontró ningún token, redireccionando para iniciar sesión');
        this.$router.push('/auth/login');
        return;
      }

      const error = this.validarCampos({
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo,
        descripcion: this.descripcion,
      });

      if (error) {
        toast.warning(error);
        return;
      }

      const formData = new FormData();
      formData.append('name', this.nombre);
      formData.append('phone_number', this.telefono);
      formData.append('email', this.correo);
      formData.append('description', this.descripcion);

      if (this.$refs.fileInput.files.length > 0) {
        formData.append('profile_photo', this.$refs.fileInput.files[0]);
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/business/register",
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          toast.success('Tu negocio ha sido registrado correctamente.');
          this.nombre = '';
          this.telefono = '';
          this.correo = '';
          this.descripcion = '';
          this.profilePhotoPreview = '';
          this.$refs.fileInput.value = '';
        } else {
          toast.error(response.data.message || 'Hubo un error en el registro.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Hubo un error en el registro.');
      }
    }
  }
};
</script>

<style>
.profile-photo {
  width: 450px; 
  height: 450px; 
  object-fit: cover; 
}
</style>