<template>
    <div class="header-wrapper row m-0">
           <div class="header-logo-wrapper col-auto p-0">
               <sidebar/>
           </div>
            <div class="left-header col horizontal-wrapper ps-0">
              
           </div>
            <div class="nav-right col-6 pull-right right-header p-0">
            <ul class="nav-menus">
                  <li> 
                    <searchView/>
                  </li>  
 
                  <li class="serchinput">
                    <searchInput/>
                  </li>

                  <li>
                    <modeView/> 
                  </li>

                  <li class="maximize">
                    <maximizeView/>
                  </li>
                  <li v-if="!isAuthenticated">
        <button @click="pageUser">Registrarse</button>
      </li>

      <li v-if="!isAuthenticated">
        <button @click="pageLog">Login</button>
      </li>

      <li class="profile-nav onhover-dropdown" v-if="isAuthenticated && isPetOwner">
        <profileView />
      </li>

      <li class="profile-nav onhover-dropdown" v-if="isAuthenticated && isBusinessOwner">
        <profileAdminView />
      </li>
      
      <li class="profile-nav onhover-dropdown" v-if="isAuthenticated && isStaff">
        <profileStaff />
      </li>
            </ul>
            </div>
    </div>
</template>
<script>

import searchInput from "./searchInput.vue"
import sidebar from "./sidebarView.vue"
import searchView from "./searchView.vue"
import modeView from "./modeView.vue"
import maximizeView from "./maximizeView.vue"
import profileView from "./profileView.vue"
import profileAdminView from "./profileAdminView.vue"
import profileStaff from "./profileStaff.vue"
// 
import { mapGetters } from "vuex";


export default {
 
  name: 'indexView',
    components:{
        sidebar,
        searchView,
        modeView,
        maximizeView,
        profileView,
        profileAdminView,
        searchInput,
        profileStaff
    },

computed: {
  ...mapGetters(['isAuthenticated', 'isPetOwner', 'isBusinessOwner','isStaff']),
 
},

 methods: {
     collapseFilter() {
        this.filtered = !this.filtered;
      },
      // boton para entrar a la pagina de Sesión
      pageUser(){
        this.$router.replace('/Sesion');
      },

        // boton para entrar a la pagina de login****
      pageLog(){
              this.$router.replace('/auth/login');        
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