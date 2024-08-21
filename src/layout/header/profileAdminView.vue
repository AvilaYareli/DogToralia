<template>
    <div class="account-user"><vue-feather type="user"></vue-feather></div>
               <ul class="profile-dropdown onhover-show-div">
                 <li><router-link to="/busedit"><vue-feather type="user"></vue-feather><span>Cuenta</span></router-link></li>
                 <li><a @click="cerrarSesion" > <vue-feather type="log-in"></vue-feather><span>Cerrar Sesion</span></a> </li>
                 <!-- <li><a @click="logout" > <vue-feather type="log-in"></vue-feather><span>Cerrar Sesion</span></a> </li> -->
                 
               </ul>
</template>
<script>
import {mapActions} from 'vuex';
export default {
   components:{
      
   },
    methods: { 
      ...mapActions(['logout']),
     cerrarSesion(){
      this.logout().then(() => {
        // Verifica si la ruta actual tiene un parámetro :id o es dinámica
        if (this.$route.params.id || this.$route.path.includes(':id')) {
          console.log('Ruta con ID detectada:', this.$route.path);
          this.$router.replace({ path: '/' }).then(() => {
            window.location.reload();
          });
        } else {
          this.$router.push({ path: '/' }).then(() => {
            window.location.reload();
          });
        }
      }).catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
    
      // this.logout().then(() => {
      //     // Redireccionar a la página de inicio y recargar para limpiar la interfaz
      //     if (this.$route.path === '/busedit'||this.$route.path === "/nuevo-personal"||
      //     this.$route.path ==="/buscar-dmascota"|| this.$route.path ==="/nuevo-negocio"||this.$route.path ==="/verDetalle/id"||this.$route.path ==="/listar-negocios"||
      //     this.$route.path === "/listar-Minegocio"||this.$route.path ==="/menu-Negocio" ||this.$route.path ==="/mi-personal/:id'") {
      //       console.log('hhhhhhhh',this.$route.path)
      //       this.$router.push({ path: '/' }).then(() => {
      //         window.location.reload();
      //       });
      //     } else {
      //       this.$router.push({ path: '/' });
      //       window.location.reload();
      //     }
      //   }).catch(error => {
      //     console.error('Error al cerrar sesión:', error);
      //   });


              },
     
   },
}
</script>
<style scoped>
    /* Estilos para los botones de texto */
    .nav-menus button {
        background: none;
        border: none;
        cursor: pointer;
        color: #333; /* Color por defecto */
        padding: 5px 10px;
        /* text-decoration: underline; Subrayado por defecto */
    }
    .nav-menus button.active {
        color: blue; /* Color cuando está seleccionado */
        text-decoration: none; /* Sin subrayado cuando está seleccionado */
    }
</style>
