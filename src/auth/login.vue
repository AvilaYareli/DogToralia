
<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <div class="col-12 p-0">
        <div class="login-card">
          <div>
            <div>
              <a class="logo">
                <div class="user" @click="menu">
                <img class="img-fluid" src="../assets/images/imagenes/logb.png" alt="login page" />
                </div>
              </a>
            </div>
            <div class="login-main">
              <form class="theme-form" @submit.prevent="">
                <h4 class="text-center">DOGTORALIA</h4>
                <p class="text-center">Ingrese su correo electrónico y contraseña para iniciar sesión</p>
                <div class="form-group">
                  <label class="col-form-label">Correo electrónico</label>
                  <input v-model="email" class="form-control" type="email" placeholder="@gmail.com">
                </div>
                <div class="form-group">
                  <label class="col-form-label">Password</label>
                  <div class="form-input position-relative">
                    <input v-model="password" :type="type" class="form-control" name="login[password]"
                      placeholder="*********">
                    <div class="show-hide"><span class="show" @click="showPassword"> </span></div>
                  </div>
                </div>
                <div class="form-group mb-0">
                  <div class="checkbox p-0">
                    <input id="checkbox1" type="checkbox">
                    <label class="text-muted" for="checkbox1">Recordar password</label>
                  </div><a class="link"><router-link to="/components/forgetpassword">Olvidaste tu
                      password?</router-link></a>
                  <div class="text-end mt-3">
                    <button class="btn btn-primary btn-block w-100" type="submit"  @click="doLogin">Iniciar sesión </button>
                  </div>
                </div>

                <p class="mt-4 mb-0 text-center">No tengo cuenta?<router-link class="ms-2" to="/auth/register">Crear
                    cuenta</router-link></p>
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
  <!-- jjjjjjj -->
  
  <div class="modal fade" id="exampleModalfat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel2">¿Deseas guardar el mismo horario para los demas dias?</h5>
                              <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <form>
                                <div class="mb-3">
                                  <label class="col-form-label" for="recipient-name">Latitud</label>
                                  <input class="form-control" v-model="lat" type="text" >
                                </div>
                                <div class="mb-3">
                                  <label class="col-form-label" for="recipient-name"> Longitud:</label>
                                  <input class="form-control" v-model="lon" type="text">
                                </div>
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button class="btn btn-primary" @click.prevent="direccion" type="button">Añadir</button>
                            </div>
                          </div>
                        </div>
                      </div> 
</template>

<script>
   import axios from 'axios';
   import { mapActions } from 'vuex'; 

export default {
  data() {
    return {
      type: 'password',
      email: '',
      password: '',
      errorMessage: '',
    };
    
  },
  methods: {
    showPassword(){
      this.type = this.type === 'password' ? 'text' : 'password';
    },
    menu(){
        this.$router.replace('/');
      },
      ...mapActions(['login']),
    async doLogin() {
      try {
        const userType = await this.login({ email: this.email, password: this.password });
        if (userType === 'pet_owner') {
          this.$router.push('/petOwner');
          this.$store.dispatch('menu/initializeMenu');
        } else if (userType === 'business_owner') {
          // this.$router.push('/busOwner');
          this.$router.push('/listar-Minegocio');
          this.$store.dispatch('menu/initializeMenu');
        }else if (userType === 'staff') {
          this.$router.push('/busOwner');
          this.$store.dispatch('menu/initializeMenu');
        }
      } catch (error) {
        console.error('Error en el login:', error);
        this.errorMessage = error.message || 'Error desconocido al iniciar sesión.';
      }
    },
    
    
    //

    ...mapActions(['updateUserData']),
    updateMenuBasedOnUser() {
      const userType = localStorage.getItem('userType') || 'user'; // o admin
      this.updateUserData(userType);
   
  },
  },
  mounted() {
    this.updateMenuBasedOnUser();
  }
};
</script>
<style>
.logo img {
  width: 300px;
  height: auto;
}
</style>