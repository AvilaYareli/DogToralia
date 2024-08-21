<template>
  <div class="container-fluid">
    <div class="page-title">
      <div class="row">
        <div class="col-sm-6">
          <h3>{{ title }}</h3>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/"><vue-feather type="home"></vue-feather></router-link>
            </li>
            <li class="breadcrumb-item" v-if="main">
              <router-link :to="mainPath">{{ main }}</router-link>
            </li>
            <li class="breadcrumb-item active" v-if="title">{{ title }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'home'
    },
    main: {
      default: ''
    },
    mainPath: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- primera prueba -->
<!-- <template>
  <div class="container-fluid">        
         <div class="page-title">
           <div class="row">
             <div class=" col-sm-6">
               <h3>{{ title }}</h3>
             </div>
             <div class=" col-sm-6">
               <ol class="breadcrumb">
                 <li class="breadcrumb-item"> <router-link to="/"><vue-feather type="home"></vue-feather></router-link></li>
                 <li class="breadcrumb-item" v-if="main">{{main}}</li>
                 <li class="breadcrumb-item active" v-if="title">{{title}}</li>
               </ol>
             </div>
           </div>
         </div>
  </div>  
</template>
<script>
export default {
  props: {
   title: {
      default: 'home'
   },
   main: {
     default: ''
   }
 }
}
</script> -->

<!-- default -->

<!-- <template>
     <div class="container-fluid">        
            <div class="page-title">
              <div class="row">
                <div class=" col-sm-6">
                  <h3>{{ title }}</h3>
                </div>
                <div class=" col-sm-6">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"> <router-link to="/"><vue-feather type="home"></vue-feather></router-link></li>
                    <li class="breadcrumb-item" v-if="main">{{main}}</li>
                    <li class="breadcrumb-item active" v-if="title">{{title}}</li>
                  </ol>
                </div>
              </div>
            </div>
     </div>
</template>
<script>
export default {
     props: {
      title: {
         default: 'home'
      },
      main: {
        default: ''
      }
    }
}
</script> -->