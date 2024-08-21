<template>
  <Breadcrumbs title="My perfil"/>
  <form class="card" @submit.prevent="editarperfil">
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
            <img class="img-fluid profile-photo" :src="profilePhotoPreview || getFotoUrl(dataadmin.profile_photo)" alt="Foto de perfil">
          </div>
          <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
          <button @click.prevent="triggerFileInput" class="btn btn-light">Modificar foto</button>
        </div>
        <div class="col-sm-9 col-md-9">
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Nombre</label>
                <input v-model="dataadmin.name" class="form-control" @input="filterName">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Apellido</label>
                <input v-model="dataadmin.last_name" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Correo</label>
                <input v-model="dataadmin.email" class="form-control" @input="filterApe" disabled>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Número de teléfono</label>
                <input v-model="dataadmin.phone_number" class="form-control" @input="filterNumbers" maxlength="10">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div class="card-footer d-flex justify-content-end">
      <button @click.prevent="editarperfil" class="btn btn-primary">Actualizar cambios</button>

    </div>
  </form>

  <!-- modal -->

</template>
<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import { mapActions } from 'vuex';

export default {
  setup() {
    const toast = useToast();
    const store = useStore(); // Acceder a la tienda Vuex
    const dataadmin = ref({
      name: '',
      last_name: '',
      email: '',
      phone_number: '',
      profile_photo: ''
    });
    const profilePhotoPreview = ref(null);
    const profilePhotoFile = ref(null); // para almacenar el archivo de la foto de perfil
    const menuVisible = ref(false);

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
      const token = localStorage.getItem('token');
        // const newToken = await store.dispatch('refreshToken'); // Llamada a la acción para refrescar el token
        // const token = newToken || localStorage.getItem('token');
        if (!token) {
            this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
            this.$router.push('/auth/login');
            return;
          }
      try {
       
        const response = await fetch('http://127.0.0.1:8000/api/business_owner/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        const result = await response.json();
        dataadmin.value = result.user;
      } catch (err) {
        console.error('Error:', err);
        toast.error('Error al obtener los detalles del usuario');
      }
    };

    const editarperfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
            this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
            this.$router.push('/auth/login');
            return;
          }

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', dataadmin.value.name);
      formData.append('last_name', dataadmin.value.last_name);
      formData.append('phone_number', dataadmin.value.phone_number);
      if (profilePhotoFile.value) {
        formData.append('profile_photo', profilePhotoFile.value); // agregar el archivo de la foto de perfil
      }

      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/business_owner/update',
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

    // Cargar la información del usuario al crear el componente
    mostrarInfo();

    return {
      dataadmin,
      profilePhotoPreview,
      menuVisible,
      triggerFileInput,
      onFileChange,
      getFotoUrl,
      editarperfil,
      showMenu,
      hideMenu,
    };
  },
  methods: {
    ...mapActions(['deleteAccount', 'logout']), // Usado en la opción methods para la API de opciones
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