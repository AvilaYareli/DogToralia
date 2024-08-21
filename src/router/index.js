
import { createRouter, createWebHistory } from 'vue-router'
import BodyView from "@/layout/BodyView.vue"
import indexDashbord from "@/pages/indexDashbord.vue"
import Sesion from "@/pages/sesionVue.vue"

import login from "@/auth/login.vue"
import Register from "../components/register.vue"
import registerBusi from "../components/registerBusi.vue"
import ForgetPassword from "../components/forgetpassword.vue"

import indexBusines from "@/pages/indexBusines.vue"
import indexPet from "@/pages/indexPet.vue"

import userEdit from "@/pages/user/userEdit.vue"
import adminEdit from "@/pages/admin/adminEdit.vue"

// Rutas de petOwner
import nuevaMascota from "@/pages/user/nuevaMascota.vue"
import misMascotas from "@/pages/user/misMascotas.vue"
import detalleMimascota from "@/pages/user/detalleMimascota.vue"
import editarMimascota from "@/pages/user/editarMimascota.vue"
// import pruebaImagen from "@/pages/user/pruebaImagen.vue"

//businessOwner
import nuevoPersonal from "@/pages/admin/nuevoPersonal.vue"
import buscarDueño from "@/pages/admin/buscarDueño.vue"
import buscarPetOwner from "@/pages/admin/buscarPetOwner.vue"
import nuevoNegocio from "@/pages/admin/nuevoNegocio.vue"
import miNegocio from "@/pages/admin/miNegocio.vue"
import listarMnegocio from "@/pages/admin/listarMnegocio.vue"
import detalleMinegocio from "@/pages/admin/detalleMinegocio.vue"
// import menuNegocio from "@/pages/admin/servicio/menuNegocio.vue"
// servicio
import menuNegocio from "@/pages/admin/servicio/menuNegocio.vue"
import nuevoServicio from "@/pages/admin/servicio/nuevoServicio.vue"
import verServicio from "@/pages/admin/servicio/verServicio.vue"
//personal and staff
import personal from "@/pages/admin/personal/personal.vue"
import editPersonal from "@/pages/admin/personal/editPersonal.vue"
// horarios 
import horariosN from "@/pages/admin/horarios/horariosN.vue"
//busOwner and petOwner
import listarNegocios from '@/pages/userAdmin/listarNegocios.vue'
import verDetalle from '@/pages/userAdmin/verDetalle.vue'


const routes = [
 {
  path:"/",
  component:BodyView,
  children:[
    {
      path:"",
      name:"dashboard",
      component:indexDashbord,
      meta: {
       title: 'Tivo Starter-kit - Premium Vue User Template',
     }
    },
    
  
  ]
},

{
 path:"/busOwner",
 component:BodyView,
 children:[
   {
     path:'',
     name:'indexBusines ',
     component:indexBusines,
     meta: { requiresAuth: true }
    },
   ]
},
   {
     path:"/petOwner",
     component:BodyView,
     children:[
       {
         path:'',
         name:'indexPet ',
         component:indexPet,
         meta: { requiresAuth: true }
        },
       ]
       },
   {
     path:"/petedit", 
     component:BodyView,
     children:[
         {
            
           path:'',
           name:'userEdit',
           component:userEdit,
           meta: { requiresAuth: true }
         },
       ]
   },
   {
    path:"/busedit",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'adminEdit ',
          component:adminEdit,
          meta: { requiresAuth: true }
        },
      ]
  },
  // PETOWNER
  {
    path:"/nueva-mascota",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'nuevaMascota',
          component:nuevaMascota,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/detalle-Mimascota/:id'",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'detalleMimascota',
          component:detalleMimascota,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/editar-Mimascota/:id'",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'editarMimascota',
          component:editarMimascota,
          meta: { requiresAuth: true }
        },
      ]
  },
  // {
  //   path:"/mis-mascotas",
  //   component:BodyView,
  //   children:[
  //     {
          
  //         path:'',
  //         name:'misMascotas',
  //         component:misMascotas,
  //         meta: { requiresAuth: true }
  //       },
       
        

  //     ]
  // },
  {
    path:"/mis-mascotas",
    component:BodyView,
    children:[
      {
          path:'',
          name:'misMascotas',
          component:misMascotas,
          meta: { requiresAuth: true }
        },        

      ]
  },

  // ========================================================================
  // {
  //   path:"/prueba-imagen",
  //   component:BodyView,
  //   children:[
  //     {
  //         //este perfil pertenece a administrador+++
  //         path:'',
  //         name:'pruebaImagen',
  //         component:pruebaImagen,
  //         meta: { requiresAuth: true }
  //       },
  //     ]
  // },
    // ========================================================================
  //Pagina sin autenticacion 
  {
    path:"/listar-negocios",
    component:BodyView,
    children:[
      {
          //este perfil pertenece a administrador
          path:'',
          name:'listarNegocios',
          component:listarNegocios,
          meta: { requiresAuth: true }
        },
      
      ]
  },
  {
    path:"/verDetalle/:id",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'verDetalle',
          component:verDetalle,
          meta: { requiresAuth: true }
        },
      ]
  },

  //*****BUSSowner*****
  // servicio
  {
    path:"/menu-Negocio",
    component:BodyView,
    children:[
      {
         
          path:'',
          name:'menuNegocio',
          component:menuNegocio,
          meta: { requiresAuth: true }
        },
      ]
  },
  // negocio
  {
    path:"/detalle-minegocio/:id'",
    component:BodyView,
    children:[
      {
         
          path:'',
          name:'detalleMinegocio',
          component:detalleMinegocio,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/nuevo-personal",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'nuevoPersonal',
          component:nuevoPersonal,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/mis-negocios",
    component:BodyView,
    children:[
      {
         
          path:'',
          name:'miNegocio',
          component:miNegocio,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/listar-Minegocio",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'listarMnegocio',
          component:listarMnegocio,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/buscar-dmascota",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'buscarPetOwner',
          component:buscarPetOwner,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/nuevo-negocio",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'nuevoNegocio',
          component:nuevoNegocio,
          meta: { requiresAuth: true }
        },
      ]
  },
  {
    path:"/buscar-dueño",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'buscarDueño',
          component:buscarDueño,
          meta: { requiresAuth: true }
        },
      ]
  },
  // horarios hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
  {
    path:"/administrar-horarios/:id'",
    component:BodyView,
    children:[
      {
          
          path:'',
          name:'horariosN',
          component:horariosN,
          meta: { requiresAuth: true }
        },
      ]
  },
//personal and staff
{
  path:"/mi-personal/:id'",
  component:BodyView,
  children:[
    {
        
        path:'',
        name:'personal',
        component:personal,
        meta: { requiresAuth: true }
      },
    ]
},
{
  path:"/editar-personal/:id'",
  component:BodyView,
  children:[
    {
        
        path:'',
        name:'editPersonal',
        component:editPersonal,
        meta: { requiresAuth: true }
      },
    ]
},
// servicios entrar como dueño
{
  path:"/nuevo-servicio/:id'",
  component:BodyView,
  children:[
    {
        
        path:'',
        name:'nuevoServicio',
        component:nuevoServicio,
        meta: { requiresAuth: true }
      },
    ]
},
{
  path:"/ver-servicio/:id'",
  component:BodyView,
  children:[
    {
        
        path:'',
        name:'verServicio',
        component:verServicio,
        meta: { requiresAuth: true }
      },
    ]
},
  ///general
  {
    path: '/auth/registerBusi',
    name: 'registerBusi',
    component: registerBusi
  },
 
  {
    path: '/Sesion',
    name: 'Sesion',
    component: Sesion
  },
  {
    path: '/components/forgetpassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register
  },
  {
    path:"/auth/login",
    name:"login",
    component:login,
    meta:{
      title:'login-Tivo Starter-kit'
    }
  },
 
  ]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to,) => {
  if (typeof (to.meta.title) === 'string') {
    document.title = to.meta.title;
  }
   
  });

export default router