<template>
<breadcrumbs title="Detalle Mi personal" main="Mi personal" mainPath="/mi-personal/:id'" />
<!-- <Breadcrumbs main="Mis Negocios "  title="Detalle Mi personal"/> -->
  <form class="card" @submit.prevent="updatedatos">
    <div class="card-header pb-0">
      <h3 class="h3 txt-success">Actualizar información</h3>
      <div class="card-options">
        <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
        <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
      </div>
    </div>
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center">
          <div class="avatar mb-3">
            <img class="img-fluid" :src="getFotoUrl(databusi.profile_photo)" alt="Foto de perfil">
          </div>
          <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
          <button @click.prevent="triggerFileInput" class="btn btn-light">Subir Imagen</button>
        </div>
        <div class="col-sm-9 col-md-9">
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Nombre</label>
                <input v-model="databusi.name" class="form-control" @input="filterName">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Apellido</label>
                <input v-model="databusi.last_name" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Correo</label>
                <input v-model="databusi.email" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Número de teléfono</label>
                <input v-model="databusi.phone_number" class="form-control" @input="filterNumbers" maxlength="10">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <!-- <router-link class="btn btn-success active" to="/mi-personal/:id'">Regresar</router-link> -->
      <button class="btn btn-primary" type="submit" @click="editarperfil">Guardar cambios</button>
    </div>
  </form>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      databusi: {},
      perId: this.$route.params.id,
      errorMessage: '',
      okMessage: '',
    };
  },

  watch: {
    '$route.params.id': function(newId) {
      this.perId = newId;
      this.mostrarInfo();
    }
  },
  
  created() {
    this.mostrarInfo();
  },
  methods: {
    // ...mapActions(['refreshToken']),

    triggerFileInput() {
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
    getFotoUrl(profile_photo) {
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}${profile_photo}`;
    },
    async mostrarInfo(){
      const token = localStorage.getItem('token');
        //   const newToken = await this.refreshToken();
        //   const token = newToken || localStorage.getItem('token');
        if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }
      try {
     
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        const response = await fetch(`http://127.0.0.1:8000/api/staff/${this.perId}`, requestOptions);
        const result = await response.text();
        const datos = JSON.parse(result);
        this.databusi = datos.staff;
      } catch (err) {
        this.errorMessage = 'Error al obtener los detalles del miembro del personal';
        console.error(err);
      }
    },
    async editarperfil(){
      const toast = useToast();
      const token = localStorage.getItem('token');
        // // Refrescar el token antes de realizar la acción
        // const newToken = await this.refreshToken();
        // // Usar el nuevo token para realizar la acción
        //      const token = newToken || localStorage.getItem('token');
        if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }
      try {
      
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
          "name": this.databusi.name,
          "last_name": this.databusi.last_name,
          "email": this.databusi.email,
          "phone_number": this.databusi.phone_number
        });

        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        const response = await fetch(`http://127.0.0.1:8000/api/staff/${this.perId}`, requestOptions);
        const result = await response.json();

        if (result.status === "error") {
          toast.error(`${result.message}: ${result.error}`);
        } else {
          toast.success('Datos actualizados correctamente');
          this.databusi = {
            name: '',
            last_name: '',
            email: '',
            phone_number: ''
          };
          this.mostrarInfo();
        }
      } catch (err) {
        toast.error('Error al actualizar los datos');
        console.error(err);
      }
    }
  }
}
</script>

<style>
.avatar {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>