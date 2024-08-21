<template>
    <div>
         <div class="logo-wrapper">
             <logoView/>
            
              <div class="back-btn" @click="toggle_sidebar">
                  <i data-feather="grid"><vue-feather type="grid"></vue-feather></i>
                </div>
              <div class="toggle-sidebar icon-box-sidebar" @click="toggle_sidebar"> <vue-feather class="status_toggle middle sidebar-toggle" type="grid"></vue-feather></div>
        </div>
       
          <div v-if="isAuthenticated && isPetOwner">
      <userData />
    </div>

    <div v-if="isAuthenticated && isBusinessOwner">
      <adminData />
    </div>

       <div class="logo-icon-wrapper"><router-link to="/">
                <div class="icon-box-sidebar" ><i data-feather="grid"> <vue-feather type="grid"></vue-feather></i></div></router-link>
            </div>
                <navView/>
     </div>
</template>
<script>
 import { mapState } from 'vuex';
import logoView from "./logoView.vue"
import navView from "./navView.vue" 
import adminData from "./adminData.vue" 
import userData from "./userData.vue" 
// 
import { mapGetters } from 'vuex';
export default {
    components:{
        logoView,
        navView,
        adminData,
        userData,
    },
   
    computed: {
      ...mapGetters(['isAuthenticated', 'isPetOwner', 'isBusinessOwner']),
      ...mapState({
        menuItems: (state) => state.menu.data,
        activeoverlay: (state) => state.menu.activeoverlay,
      
      }),
    }, 
    methods: {
      toggle_sidebar() {
        this.$store.dispatch('menu/opensidebar');
        this.$store.state.menu.activeoverlay = false;
      },
    },
    
}
</script>