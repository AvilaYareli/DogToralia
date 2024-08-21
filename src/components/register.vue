<template>
  <div class="container-fluid p-0"> 
    <div class="row m-0">
      <div class="col-12 p-0">    
        <div class="login-card">
          <div>
            <div> <div class="user" @click="menu">
              <a class="logo text-center" ><router-link to="/"> <img class="img-fluid for-light" src="../assets/images/imagenes/logb.png" alt="looginpage"></router-link></a>
              </div>
            </div>
            <div class="login-main"> 
              <form class="theme-form" @submit.prevent="">
                <h4 class="text-center">Registrate</h4>
                <p class="text-center">Ingrese sus datos personales para crear una cuenta</p>
                <div class="form-group"> 
                  <label class="col-form-label pt-0">Nombre</label>                   
                      <input v-model="nombre" class="form-control" @input="filterName"> 
                </div>
                <div class="form-group">
                  <label class="col-form-label pt-0">Apellido</label>                     
                      <input v-model="apellido" class="form-control" @input="filterApe">
                </div>
                <div class="form-group">
                  <label class="col-form-label pt-0">Telefono</label>                      
                      <input v-model="telefono" class="form-control"  @input="filterNumbers"  maxlength="10">
                </div>
                <div class="form-group">
                  <label class="col-form-label">Correo electrónico</label>
                  <input  v-model="correo" @input="limpiarError" class="form-control" type="text"  placeholder="correo@gmail.com">
                </div>
                <div class="form-group">
                  <label class="col-form-label">Password</label>
                  <div class="form-input position-relative">
                    <input v-model="password" @input="limpiarError" :type="type" class="form-control" name="login[password]"
                      placeholder="*********">
                    <div class="show-hide"><span class="show" @click="showPassword"> </span></div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Confirmar Password</label>
                  <div class="form-input position-relative">
                    <input v-model="passwordConfirmar"  @input="limpiarError" :type="type" class="form-control" name="login[password]"
                      placeholder="*********">
                    <div class="show-hide"><span class="show" @click="showPassword"> </span></div>
                  </div>
                </div>                 
                <div class="form-group">                   
                  <button class="btn btn-primary btn-block w-100 mt-3" type="submit"  @click="registrarCuenta">Registrar cuenta</button>
                </div>                  
                <p class="mt-4 mb-0 text-center">Iniciar sesión en Dogtoralia?<router-link class="ms-2" to="/auth/login">Iniciar sesión </router-link></p>
              </form>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                <h4 class="alert-heading" style="font-size: 16px;">Advertencia!</h4>      
                <p class="alert-heading" >{{ errorMessage }}</p>           
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>   
import { mapActions } from 'vuex';
// 
export default {
data() {
  return {
    type: 'password',
    nombre: '',      
    apellido: '',
    telefono: '',
    correo: '',
    password: '',
    passwordConfirmar: '',
    errorMessage: '',
    okMessage: '',
  };

},
methods: {
  ...mapActions(['register']),
  showPassword(){
    this.type = this.type === 'password' ? 'text' : 'password';
  },
  menu(){
        this.$router.replace('/');
      },
      filterNumbers(event){
        this.errorMessage = '';
         // Remover cualquier carácter que no sea un número
      const onlyNumbers = event.target.value.replace(/\D/g, '');
      this.telefono = onlyNumbers;
      },
      filterName(event){
        this.errorMessage = '';
           // Remover cualquier carácter que no sea una letra
      const onlylettters = event.target.value.replace(/[^a-zA-Z]/g, '');
      this.nombre = onlylettters;
      
      },
      filterApe(event){
        this.errorMessage = '';
           // Remover cualquier carácter que no sea una letra
      const onlylettters = event.target.value.replace(/[^a-zA-Z]/g, '');
       this.apellido = onlylettters;
      },
      // validacion de errrores de formulario
      limpiarError() {
        this.errorMessage = '';
      },
      validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    },
    validarCampos({ nombre, apellido, correo, password, passwordConfirmar, telefono }) {
      if (!nombre || !apellido || !correo || !password || !passwordConfirmar || !telefono) {
        return 'Todos los campos son obligatorios.';
      }
      if (!this.validarCorreo(correo)) {
        
        return 'Correo electrónico no válido. Debe tener un formato como nombre@dominio.com';
      }
      if (password !== passwordConfirmar) {
      
        return 'Las contraseñas no coinciden.';
      }
      if (password.length < 8) {
       
        return 'La contraseña debe tener al menos 8 caracteres.';
      }
        if (telefono.length !== 10)  {
         return 'Revisa tu número de teléfono';
      } 
      return '';
    },
    

  async registrarCuenta() {
    try {
        // Validar los campos
        const error = this.validarCampos({
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          password: this.password,
          passwordConfirmar: this.passwordConfirmar,
          telefono: this.telefono
        });

        if (error) {
          this.errorMessage = error;
          return;
        }

        const userData = {
          name: this.nombre,
          last_name: this.apellido,
          email: this.correo,
          password: this.password,
          password_confirmation: this.passwordConfirmar,
          phone_number: this.telefono.toString()
        };

        await this.register({ userType: 'pet_owner', userData });
        this.$router.push('/petOwner');
        this.$store.dispatch('menu/initializeMenu');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
      
},
};
</script>
<style>
.logo img {
  width: 300px;
  height: auto;
}
</style>