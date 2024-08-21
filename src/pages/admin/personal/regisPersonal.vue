<template>
  <div class="card">
    <!-- <div class="card-header">
      <router-link class="btn btn-success active left" to="/listar-Minegocio">Regresar</router-link>
    </div> -->
    <form class="card" @submit.prevent="Nuevo">
      <div class="card-header pb-0">
        <h3 class="h3 txt-secondary">Registrar Nuevo Personal</h3>
      </div>
      <div class="card-body"> 
        <div class="row align-items-center">
          <!-- Imagen -->
          <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center"> 
            <div class="mb-3">
              <img class="img-fluid profile-photo" :src="profilePhotoPreview" alt="Foto de perfil">
            </div>
            <input ref="fileInput" type="file" @change="onFileChange" class="d-none">
            <button @click.prevent="subirImagen" class="btn btn-light">Subir Imagen</button>
          </div> 
          <!-- Nombre --> 
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Nombre</label>
              <input v-model="nombre" class="form-control" @input="filterName">
            </div>
          </div>
          <!-- Apellido -->
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Apellido</label>
              <input v-model="apellido" class="form-control" @input="filterApe">
            </div>
          </div>
          <!-- Teléfono -->
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Teléfono</label>
              <input v-model="telefono" class="form-control" @input="filterNumbers" maxlength="10">
            </div>
          </div>
          <!-- Correo -->
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Correo</label>
              <input v-model="correo" @input="limpiarError" class="form-control" type="text" placeholder="correo@gmail.com">
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
                  <label class="col-form-label">Password</label>
                  <div class="form-input position-relative">
                    <input v-model="password" @input="limpiarError" :type="type" class="form-control" name="login[password]"
                      placeholder="*********">
                    <div class="show-hide"><span class="show" @click="showPassword"> </span></div>
                  </div>
                </div>
            <div class="col-sm-6 col-md-3">
                  <label class="col-form-label">Confirmar Password</label>
                  <div class="form-input position-relative">
                    <input v-model="passwordConfirmar"  @input="limpiarError" :type="type" class="form-control" name="login[password]"
                      placeholder="*********">
                    <div class="show-hide"><span class="show" @click="showPassword"> </span></div>
                  </div>
                </div>  
        
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <button class="btn btn-secondary" type="submit">Registrar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      nombre: '',      
      apellido: '',
      telefono: '',
      correo: '',
      password: '',
      passwordConfirmar: '',
      errorMessage: '',
      okMessage: '',
      profilePhotoPreview: '',
      busiId: this.$route.params.id,
      type: 'password',
    };
  },
  setup() {
    const toast = useToast();
    return { toast }; 
  },
  watch: {
    '$route.params.id': function(newId) {
      this.busiId = newId;
    }
  },
  methods: {
    // ...mapActions(['refreshToken']),
    
    showPassword(){
    this.type = this.type === 'password' ? 'text' : 'password';
  },
    limpiarError() {
      this.errorMessage = '';
    },
    filterName(event) {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      this.nombre = onlyLettersAndSpaces;
      this.errorMessage = '';
    },
    filterApe(event) {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      this.apellido = onlyLettersAndSpaces;
      this.errorMessage = '';
    },
    validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    },
    filterNumbers(event) {
      this.errorMessage = '';
      const onlyNumbers = event.target.value.replace(/\D/g, '');
      this.telefono = onlyNumbers;
    },
    validarCampos({ nombre, apellido, correo, telefono, password, passwordConfirmar }) {
      if (!nombre || !apellido || !correo || !telefono || !password || !passwordConfirmar) {
        return 'Todos los campos son obligatorios.';
      }
      if (password !== passwordConfirmar) {
        return 'Las contraseñas no coinciden.';
      }
      if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres.';
      }
      if (telefono.length !== 10) {
        return 'Revisa tu número de teléfono';
      }
      return '';
    },
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
    async Nuevo() {
      const token = localStorage.getItem('token');
          // const newToken = await this.refreshToken();
          // const token = newToken || localStorage.getItem('token');
      
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }

      try { 
        const error = this.validarCampos({
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          password: this.password,
          passwordConfirmar: this.passwordConfirmar,
          telefono: this.telefono.toString(),
        });

        if (error) {
          this.toast.warning(error);
          return;
        }

        const formData = new FormData();
        formData.append('name', this.nombre);
        formData.append('last_name', this.apellido); 
        formData.append('phone_number', this.telefono);
        formData.append('email', this.correo);
        formData.append('password', this.password);
        formData.append('password_confirmation', this.passwordConfirmar);
        if (this.$refs.fileInput.files.length > 0) {
          formData.append('profile_photo', this.$refs.fileInput.files[0]);
        }

        const response = await fetch(`http://127.0.0.1:8000/api/staff/register/${this.busiId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        const result = await response.json();
        if (result.status === "success") {
          this.okMessage = "Nuevo miembro del personal registrado correctamente.";
          this.toast.success('Miembro del personal registrado correctamente.');
          this.nombre = '';
          this.apellido = '';
          this.correo = '';
          this.password = '';
          this.passwordConfirmar = '';
          this.telefono = '';
        } else {
          this.errorMessage = result.message || 'Hubo un error en el registro.';
          this.toast.error(this.errorMessage);
        }
      } catch (error) {
        console.error('Error en el registro', error);
        this.errorMessage = 'Hubo un problema al registrar la nueva mascota';
        this.toast.error('Hubo un error en el registro.');
      }
    },
  },
};
</script>

<style>
.profile-photo {
  width: 150px; 
  height: 150px; 
  object-fit: cover; 
  border-radius: 0; 
}
</style>