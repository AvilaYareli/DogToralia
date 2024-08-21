<template>
  
  <div class="col-xl-4 col-lg-5">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between">
        <h4 class="card-title mb-0">Mi perfil</h4>
        <!-- Menú desplegable -->
        <div class="menu-container">
          <button @click="toggleMenu" class="btn btn-link">
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
        <form>
          <div class="row mb-2">
            <div class="profile-title">
              <div class="d-lg-flex d-block align-items-center">
                <div>
                  <img class="img-fluid" alt="" :src="fotoUrl">
                </div>
                <div class="flex-grow-1">
                  <h3 class="mb-1 f-20 txt-primary">{{ nombre }} {{ apellido }}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3"> 
            <label class="form-label f-w-500">Correo</label>
            <p class="form-control">{{ correo }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label f-w-500">Número de teléfono</label>
            <p class="form-control">{{ telefono }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import Swal from 'sweetalert2';
export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      foto:'',
      menuVisible: false,
      
    }; 
  },
  computed: {
    fotoUrl() {
      // Base URL del servidor donde se almacenan las imágenes
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}/${this.foto}`;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró ningún token, redireccionando para iniciar sesión');
      this.$router.push('/login');
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    // fetch("https://devs-devitm.com/api/pet_owner/me", requestOptions)
    fetch("http://127.0.0.1:8000/api/pet_owner/me", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {

        // this.nombre = data.name;
        this.nombre = data.user.name;
        this.apellido = data.user.last_name;
        this.correo = data.user.email;
        this.telefono = data.user.phone_number;
        this.foto = data.user.profile_photo;
      })
      .catch(error => console.error('Error al obtener datos:', error));
      // console.log("Nombre:",data.nombre);
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  async eliminarCuenta() {
    Swal.fire({
        title: '¿Está seguro de eliminar tu cuenta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/pet_owner/delete', {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${this.$store.state.token}` // Asegúrate de tener el token en el store de Vuex
              }
            });

            if (response.ok) {
              Swal.fire({
                title: 'Cuenta eliminada',
                text: 'Tu cuenta ha sido eliminada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then(() => {
                // Lógica para redirigir al usuario o cerrar sesión
                // this.$store.dispatch('logout'); // Por ejemplo, una acción de logout
                this.$router.push("/"); // Redirigir al login u otra página
              });
            } else {
              const errorData = await response.json();
              Swal.fire({
                title: 'Error',
                text: errorData.message || 'Error al eliminar la cuenta',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al intentar eliminar la cuenta',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
            console.error('Error al eliminar la cuenta:', error);
          }
        }
      });
    }
  }
};
</script>
<style>
.avatar img {
  width: auto;
  height: 160px;
 
}
</style>