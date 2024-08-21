<template>
             <div>
              <a class="logo">
                <div class="user" @click="menu">
                <img class="img-fluid" src="../assets/images/imagenes/logb.png" alt="login page" />
                </div>
              </a>
            </div>
    <div class="sesion-container">
      <h1>
        ¿Que tipo de perfil quieres registrar?
      </h1>
      <div class="users-container">
        <div class="user" @click="petOwners">
          <img src="@/assets/images/imagenes/dueño.jpeg" alt="Usuario 1" />
          <p>Dueños de Mascotas</p> 
        </div>
        <div class="user" @click="busOwners">
          <img src="@/assets/images/imagenes/neg.jpeg" alt="Usuario 2" />
          <p>Dueños de negocio</p>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'Sesion',

    methods: {
      petOwners(){
        this.$router.replace('/auth/register');
      },
      busOwners(){
        this.$router.replace('/auth/registerBusi');
      },
      menu(){
        this.$router.replace('/');
      },

      }
     
  }
  </script>
  
  <style scoped>
  .sesion-container {
    text-align: center;
    margin-top: 50px;
  }
  
  .users-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .user {
    cursor: pointer;
    text-align: center;
    transition: transform 0.3s;
  }
  
  .user img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  
  .user p {
    margin-top: 10px;
    font-weight: bold;
  }
  
  .user:hover {
    transform: scale(1.1);
  }
  .logo img {
  width: 300px;
  height: auto;
}
  </style>