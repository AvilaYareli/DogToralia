<template>
     <!-- <Breadcrumbs main="Mis Negocios " title="Ver Negocio"/> -->
     <breadcrumbs title="Ver Negocio" main="Mis Negocios" mainPath="/listar-Minegocio" />

  <div class="card">
    <div class="card-header pb-0">
      <div class="d-flex">
        <div class="flex-grow-1">
          <h4>Información del negocio {{ userId }}</h4>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="contact-form">
        <form class="theme-form">
          <div class="form-icon"><i class="fa fa-briefcase"></i></div>
          <div class="row">
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label f-w-500">Nombre del Negocio:</label>
                <input v-model="business.name" class="form-control" @input="filterName">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Teléfono:</label>
                <input v-model="business.phone_number" class="form-control" @input="filterNumbers" maxlength="10">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Correo electrónico:</label>
                <input v-model="business.email" @input="limpiarError" class="form-control" type="text" placeholder="correo@gmail.com" disabled>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label f-w-500">Descripción:</label>
                <textarea v-model="business.description" @input="limpiarError" class="form-control" rows="5" placeholder="Agrega la descripción del negocio"></textarea>
              </div>
            </div>
            <div class="col-md-4 d-flex flex-column align-items-center">
              <div class="mb-3">
                <img class="custom-img-fluid" :src="profilePhotoPreview || getFotoUrl(business.profile_photo)" alt="Foto de perfil">
              </div>
              <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
              <button @click.prevent="triggerFileInput" class="btn btn-light">Subir Imagen</button>
            </div>
          </div>
        </form>
        <div class="d-flex justify-content-end">
          <!-- <div class="text-sm-end"><router-link class="btn btn-success active" to="/listar-Minegocio">Regresar</router-link></div> -->
          <!-- <button class="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalfat" data-whatever="@mdo">Añadir dirección</button> -->

          <button class="btn btn-primary" type="submit" @click="editarNegocio"> Actualizar cambios</button>
        </div>
      </div>
    </div>
  </div>
  <geo v-if="userId" :userId="userId"/>


</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
import geo from "@/pages/admin/geoNeg.vue"
export default {
  components:{
        geo,
    },
  data() {
    return {
      business: {},
      userId: this.$route.params.id,
      profilePhotoPreview: '',
      foto: null,
      errorMessage: '',
      okMessage: '',
      lat:'',
      lon:'',

    };
  },
  watch: {
    '$route.params.id': function(newId) {
      this.userId = newId;
      this.verDetalles();
    }
  },
  created() {
    this.verDetalles();
  },
  methods: {
    // ...mapActions(['refreshToken']),
    getFotoUrl(profile_photo) {
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}${profile_photo}`;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.foto = file;
        const reader = new FileReader();
        reader.onload = e => {
          this.profilePhotoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async verDetalles() {
      try {
        const token = localStorage.getItem('token');
            //  const newToken = await this.refreshToken();
            //  const token = newToken || localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders, 
          redirect: "follow"
        };
        const response = await fetch(`http://127.0.0.1:8000/api/business/${this.userId}`, requestOptions);
        const result = await response.text();
        const datos = JSON.parse(result);
        this.business = datos.business;
      } catch (err) {
        this.errorMessage = 'Error al obtener los detalles del miembro del personal';
        console.error(err);
      }

    },
    async editarNegocio() {
      const toast = useToast();
      
      const token = localStorage.getItem('token');
      // const newToken = await this.refreshToken();
      // const token = newToken || localStorage.getItem('token');
      if (!token) {
        toast.error('No se encontró ningún token, redireccionando para iniciar sesión');
        this.$router.push('/auth/login');
        return;
      }

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', this.business.name);
      formData.append('email', this.business.email);
      formData.append('phone_number', this.business.phone_number);
      formData.append('description', this.business.description);
      if (this.foto) {
        formData.append('profile_photo', this.foto);
      }

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/business/${this.userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        // const toast = useToast();
        if (response.data.status === 'error') {
          toast.error(response.data.message);
        } else  {
          toast.success('Datos actualizados correctamente');
          this.foto = null; // Resetear el estado de la nueva foto
          this.verDetalles();
        } 
        // else {
        //   this.$toast.error('Respuesta inesperada del servidor');
        // }
      } catch (error) {
        console.error('Error al actualizar el perfil', error);
        toast.error(error.response?.data?.message || 'Hubo un problema al actualizar los datos');
        // toast.error( 'Hubo un problema al actualizar los datos');
      }
    },
    async direccion() {
      const toast = useToast();
      const token = localStorage.getItem('token');
      if (!token) {
        toast.warning('No se encontró ningún token, redireccionando para iniciar sesión');
        return;
      }

      const formData = new FormData();
      formData.append('lat',this.lat);
      formData.append('lon', this.lon);

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/business/set-address/${this.userId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        });
       
        if (!response.ok) {
          const result = await response.json();
          toast.error(result.message || 'Error al registrar la dirección');
        } else {
          const result = await response.json();
          toast.success('Dirección registrada correctamente');
        }
      } catch (error) {
        toast.warning('Revisa los datos que ingresaste');
        console.error('Error:', error);
      }

    }

  },
};
</script>

<style>
/* .profile-photo {
  width: auto;
  height: 250x;
  border-radius: 50%;
  object-fit: cover;
  padding: 30px; /* Añadir padding alrededor de la imagen */
  /* box-sizing: border-box; 
} */
.custom-img-fluid {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  padding: 10px;
  box-sizing: border-box;
  
  /* Ajustes personalizados */
  max-height: 200px; /* Ajusta este valor según tus necesidades */
  min-height: 100px; /* Ajusta este valor según tus necesidades */
  max-width: 300px; /* Ajusta este valor según tus necesidades */
  min-width: 100px; /* Ajusta este valor según tus necesidades */
}
</style>