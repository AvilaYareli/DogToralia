<template>
  <!-- <div class="col-xl-8 col-lg-7"> -->
    <Breadcrumbs title="My perfil"/>
  <div>
  <form class="card" @submit.prevent="editarperfil">
    <div>
    <div class="card-header pb-0 d-flex justify-content-between">
      <h3 class="mb-1 f-20 txt-primary">Mi información personal</h3>
      <!-- Menú desplegable -->
      <div class="menu-container" @mouseover="showMenu" @mouseleave="hideMenu">
        <button class="btn btn-link">
          <i class="icon-more-alt"></i>
        </button>
        <div v-if="menuVisible" class="menu-options">
          <a @click="eliminarCuenta" class="menu-item">
            <i class="fa fa-trash-o"></i> Eliminar cuenta
          </a>
        </div>
      </div>
      <!-- fin de menu -->
    </div> 
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center">
          <div class="mb-3">
            <img class="img-fluid profile-photo" :src="profilePhotoPreview || getFotoUrl(datauser.profile_photo)" alt="Foto de perfil">
          </div>
          <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
          <button @click.prevent="triggerFileInput" class="btn btn-light">Modificar foto</button>
        </div>
        <div class="col-sm-9 col-md-9">
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Nombre</label>
                <input v-model="datauser.name" class="form-control" @input="filterName">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Apellido</label>
                <input v-model="datauser.last_name" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Correo</label>
                <input v-model="datauser.email" class="form-control" @input="filterApe" disabled>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Número de teléfono</label>
                <input v-model="datauser.phone_number" class="form-control" @input="filterNumbers" maxlength="10">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-3">
      <!-- <button class="btn btn-outline-secondary me-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalfat" data-whatever="@mdo">Añadir dirección</button> -->
      <button @click.prevent="editarperfil" class="btn btn-primary ms-2">Actualizar cambios</button>
    </div>
    </div>
    
  </div>
  </form>
</div>
<!-- <servicios v-if="negocio.id" :negocio-id="negocio.id"/> -->
<geo/>

  
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { mapActions } from 'vuex';
  import geo from "@/pages/user/geolocalizacion.vue"

export default {
  components:{
        geo,
    },
  setup() {
    const toast = useToast();
    const datauser = ref({
      name: '',
      last_name: '',
      email: '',
      phone_number: '',
      profile_photo: ''
    });
    
    const profilePhotoPreview = ref(null);
    const profilePhotoFile = ref(null); // para almacenar el archivo de la foto de perfil
    const menuVisible = ref(false);
    const lat = ref('');
    const lon = ref('');

    const triggerFileInput = () => {
      document.querySelector('input[type="file"]').click();
    };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        profilePhotoFile.value = file; // almacenar el archivo seleccionado
        const reader = new FileReader();
        reader.onload = e => {
          profilePhotoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const getFotoUrl = (profile_photo) => {
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}${profile_photo}`;
    };

    const mostrarInfo = async () => {
      try {
        const token = localStorage.getItem('token');
                // // Refrescar el token antes de realizar la acción
                // const newToken = await this.refreshToken();
                // // Usar el nuevo token para realizar la acción
                // const token = newToken || localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/pet_owner/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        datauser.value = result.user;
      } catch (err) {
        console.error('Error:', err);
        toast.error('Error al obtener los detalles del usuario');
      }
    };

    const editarperfil = async () => {
      const token = localStorage.getItem('token');
          //  // Refrescar el token antes de realizar la acción
          //  const newToken = await this.refreshToken();
          // // Usar el nuevo token para realizar la acción
          // const token = newToken || localStorage.getItem('token');
      if (!token) {
        toast.warning('No se encontró ningún token, redireccionando para iniciar sesión');
        return;
      }

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', datauser.value.name);
      formData.append('last_name', datauser.value.last_name);
      formData.append('phone_number', datauser.value.phone_number);
      if (profilePhotoFile.value) {
        formData.append('profile_photo', profilePhotoFile.value); // agregar el archivo de la foto de perfil
      }

      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/pet_owner/update',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === 'error') {
          toast.error(response.data.message);
        } else {
          toast.success('Datos actualizados correctamente');
         
          await mostrarInfo(); // refrescar la información del usuario
        }
      } catch (error) {
        console.error('Error al actualizar el perfil', error);
        toast.error('Hubo un problema al actualizar el perfil');
      }
    };

    const showMenu = () => {
      menuVisible.value = true;
    };

    const hideMenu = () => {
      menuVisible.value = false;
    };

    const direccion = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.warning('No se encontró ningún token, redireccionando para iniciar sesión');
        return;
      }

      const formData = new FormData();
      formData.append('lat', lat.value);
      formData.append('lon', lon.value);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/pet-owner/set-address', {
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
  

    // Cargar la información del usuario al crear el componente
    mostrarInfo();

    return {
      datauser,
      profilePhotoPreview,
      menuVisible,
      triggerFileInput,
      onFileChange,
      getFotoUrl,
      editarperfil,
      showMenu,
      hideMenu,
      lat,
      lon,
      direccion
    };

  },
  methods: {
  ...mapActions(['deleteAccount', 'logout']),
  
  async eliminarCuenta() {
    const result = await Swal.fire({
      title: '¿Está seguro de eliminar tu cuenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const message = await this.deleteAccount();
        
        await Swal.fire({
          title: 'Cuenta eliminada',
          text: message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        
        this.$router.push({ path: '/' }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: error.message || 'Error al eliminar la cuenta',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.error('Error al eliminar la cuenta:', error);
      }
    }
  },
},
};

</script>

<style>
.profile-photo {
  width: 450px; 
  height: 450px; 
  object-fit: cover; 
}

.menu-options {
  position: absolute;
  right: 0;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  z-index: 100;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;
  cursor: pointer;
}

.menu-item i {
  margin-right: 10px;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.btn-link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>