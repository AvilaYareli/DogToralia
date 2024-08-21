import { createStore } from 'vuex'
import menu from "./modules/menu"
import layout from "./modules/layout"

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    userType: localStorage.getItem('userType') || null, // 'pet_owner' o 'business_owner o staff'
  },
   
  mutations: {
    SET_AUTH(state, { token, userType }) {
      state.token = token;
      state.userType = userType;
     },
    CLEAR_AUTH(state) {
      state.token = null;
      state.userType = null;
      },
      REFRESH_TOKEN(state, newToken) {
        state.token = newToken;
      },
  },
  actions: {
    // REGISTRO 
    async register({ commit }, { userType, userData }) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(userData);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        let url = '';
        if (userType === 'pet_owner') {
          url = "http://127.0.0.1:8000/api/pet_owner/register";
        } else if (userType === 'business_owner') {
          url = "http://127.0.0.1:8000/api/business_owner/register";
        }

        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const data = JSON.parse(result);

        if (data.status === 'error') {
          throw new Error(data.message);
        } else {
          localStorage.setItem('token', data.authorization.token);
          localStorage.setItem('userType', userType);
          commit('SET_AUTH', { token: data.authorization.token, userType });
        }
      } catch (error) {
        // throw new Error('Hubo un error en el registro: ' + error.message);
        throw new Error('El correo que deseas utilizar, ya esta ocupado.' );
      }
    },
    //LOGIN 
    login({ commit }, { email, password }) {
      return new Promise(async (resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({ email, password });
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        try {
          // Intentar iniciar sesión como petOwner
          let response = await fetch("http://127.0.0.1:8000/api/pet_owner/login", requestOptions);
          let result = await response.text();
          let data = JSON.parse(result);
          if (data.status !== 'error') {
            // Inicio de sesión exitoso como petOwner
            localStorage.setItem('token', data.authorization.token);
            localStorage.setItem('userType', 'pet_owner');
            commit('SET_AUTH', { token: data.authorization.token, userType: 'pet_owner' });
            resolve('pet_owner');
            return;
          }
          // Intentar iniciar sesión como businessOwner
          response = await fetch("http://127.0.0.1:8000/api/business_owner/login", requestOptions);
          result = await response.text();
          data = JSON.parse(result);
          if (data.status !== 'error') {
            // Inicio de sesión exitoso como businessOwner
            localStorage.setItem('token', data.authorization.token);
            localStorage.setItem('userType', 'business_owner');
            
            commit('SET_AUTH', { token: data.authorization.token, userType: 'business_owner' });
            resolve('business_owner');
            // resolve('/menu-Negocio');
            return;
          }
           // Intentar iniciar sesión como staff
           response = await fetch("http://127.0.0.1:8000/api/staff/login", requestOptions);
           result = await response.text();
           data = JSON.parse(result);

           if (data.status !== 'error') {
           
            localStorage.setItem('token', data.authorization.token);
            localStorage.setItem('userType', 'staff');
            
            commit('SET_AUTH', { token: data.authorization.token, userType: 'staff' });
            resolve('staff');
            return;
          }
          // Si las solicitudes fallan
          reject(new Error(data.message || 'Correo o contraseña incorrectos.'));
        } catch (error) {
          reject(new Error('Error al intentar iniciar sesión. Por favor, revisa tus datos.'));
        }
      });
    },
    // CERRAR SESION 
    logout({ state, commit }) {
      return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        let tokenBearer = "Bearer " + localStorage.getItem("token");
        myHeaders.append("Authorization", tokenBearer.toString());

        let url = '';
        if (state.userType === 'pet_owner') {
          url = "http://127.0.0.1:8000/api/pet_owner/logout";
        } else if (state.userType === 'business_owner') {
          url = "http://127.0.0.1:8000/api/business_owner/logout";
        }

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow',
        };

        fetch(url, requestOptions)
        .then(response => {
          if (!response.ok) {
            // Si el token es inválido o ha expirado, forzar la redirección a la página de inicio de sesión
            throw new Error('Token inválido o caducado');
          }
          return response.text();
        })
        .then(result => {
          let resultado = JSON.parse(result);
          if (resultado.status === "success") {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            commit('CLEAR_AUTH');
            resolve();
          } else {
            // Manejo de otros errores
            throw new Error('Error al cerrar sesión');
          }
        })
        .catch(error => {
          // Siempre limpiar la autenticación y redirigir al login en caso de error
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          commit('CLEAR_AUTH');
          // Redirigir a la página de inicio de sesión
          window.location.href = '/auth/login';
          reject(error);
        });
      });

    },

  async deleteAccount({ commit, state }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró ningún token, redireccionando para iniciar sesión');
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      let url = '';
      if (state.userType === 'pet_owner') {
        url = "http://127.0.0.1:8000/api/pet_owner/delete";
      } else if (state.userType === 'business_owner') {
        url = "http://127.0.0.1:8000/api/business_owner/delete";
      }

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la cuenta');
      }

      const result = await response.json();

      if (result.status === 'success') {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        commit('CLEAR_AUTH');
        return result.message;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw new Error('Error al intentar eliminar la cuenta: ' + error.message);
    }
  },
 
  async refreshToken({ commit, state, dispatch }) {
    try {
      const myHeaders = new Headers();
      const tokenBearer = `Bearer ${state.token}`;
      myHeaders.append("Authorization", tokenBearer);
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };
  
      let url = '';
      if (state.userType === 'pet_owner') {
        url = "http://127.0.0.1:8000/api/pet_owner/refresh";
      } else if (state.userType === 'business_owner') {
        url = "http://127.0.0.1:8000/api/business_owner/refresh";
      } else if (state.userType === 'staff') {
        url = "http://127.0.0.1:8000/api/staff/refresh";
      }
  
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al refrescar el token');
      }
  
      const result = await response.json();
  
      if (result && result.authorization && result.authorization.token) {
        const newToken = result.authorization.token;
        localStorage.setItem('token', newToken);
        commit('REFRESH_TOKEN', newToken);
        return newToken;
      } else {
        throw new Error('Token no recibido o respuesta inválida');
      }
  
    } catch (error) {
      console.error('Error al intentar refrescar el token:', error.message);
  
      // Maneja casos de token en lista negra
      if (error.message.includes('blacklisted')) {
        // Redirigir al usuario al login
        await dispatch('logout'); // Asegúrate de tener un método logout que limpie el estado
        window.location.href = '/auth/login'; // O usa vue-router si prefieres programatic navigation
      }
  
      throw new Error('Error al intentar refrescar el token: ' + error.message);
    }
  }
  
  },
  
  getters: {
    isAuthenticated: state => !!state.token,
    isPetOwner: state => state.userType === 'pet_owner',
    isStaff: state => state.userType === 'staff',
    isBusinessOwner: state => state.userType === 'business_owner',
  },
  modules: {
    menu,
    layout
  }
})