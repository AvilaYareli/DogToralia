<template>
  <breadcrumbs title="Nueva mascota" main="Mis Mascotas" mainPath="/mis-mascotas" />
  <div class="container mt-4">
    <form class="card" @submit.prevent="Regismascota">
      <div class="card-header pb-0">
        <h4 class="card-title mb-0">Registrar mascota</h4>
      </div>
      <div class="card-body">
        <div class="row align-items-center">
          <!-- Imagen -->
          <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center"> 
            <div>
              <img class="img-fluid" :src="PhotoPreview" />
            </div>
            <input ref="fileInput" type="file" @change="onFileChange" class="d-none" />
            <button @click.prevent="subirImagen" class="btn btn-light">Subir Imagen</button>
          </div>
          <!-- Campos de entrada -->
          <div class="col-sm-9 col-md-9">
            <div class="row">
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Nombre</label>
                  <input v-model="nombre" class="form-control" @input="filterName">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Especie</label>
                  <input v-model="especie" class="form-control" @input="filterEspe">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Raza</label>
                  <input v-model="raza" class="form-control" @input="filterRaza">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Color</label>
                  <input v-model="color" class="form-control" @input="filterColor">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Fecha de nacimiento</label>
                  <input class="datepicker-here form-control" v-model="fecha" type="date" data-language="en">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Género</label>
                  <div class="d-flex">
                    <div class="form-check form-check-inline radio radio-primary">
                      <input class="form-check-input" id="radioinline1" type="radio" name="genero" value="Hembra" v-model="genero">
                      <label class="form-check-label mb-0" for="radioinline1">Hembra</label>
                    </div>
                    <div class="form-check form-check-inline radio radio-primary">
                      <input class="form-check-input" id="radioinline2" type="radio" name="genero" value="Macho" v-model="genero">
                      <label class="form-check-label mb-0" for="radioinline2">Macho</label>
                    </div>
                  </div> 
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <!-- <router-link class="btn btn-success active left" to="/mis-mascotas">Regresar</router-link> -->
        <button class="btn btn-primary" type="submit">Registrar Mascota</button>
      </div>
    </form>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const toast = useToast();

    const nombre = ref('');
    const especie = ref('');
    const raza = ref('');
    const fecha = ref('');
    const color = ref('');
    const genero = ref('');
    const PhotoPreview = ref('');
    const fileInput = ref(null); // Crear la referencia para el input de archivo
    const errorMessage = ref('');
    const okMessage = ref('');

    const limpiarError = () => {
      errorMessage.value = '';
    };

    const filterName = (event) => {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      nombre.value = onlyLettersAndSpaces;
      errorMessage.value = '';
    };

    const filterEspe = (event) => {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      especie.value = onlyLettersAndSpaces;
      errorMessage.value = '';
    };

    const filterRaza = (event) => {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      raza.value = onlyLettersAndSpaces;
      errorMessage.value = '';
    };

    const filterColor = (event) => {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      color.value = onlyLettersAndSpaces;
      errorMessage.value = '';
    };

    const validarCampos = ({ nombre, especie, raza, color, genero, fecha }) => {
      if (!nombre || !especie || !raza || !color || !genero || !fecha) {
        return 'Todos los campos son obligatorios.';
      }
      return '';
    };

    const formatearFecha = (fecha) => {
      const [year, month, day] = fecha.split('-');
      return `${day}-${month}-${year}`;
    };

    const subirImagen = () => {
      fileInput.value.click(); // Usar la referencia de fileInput
    };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          PhotoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const Regismascota = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        errorMessage.value = 'No se encontró ningún token, redireccionando para iniciar sesión';
        toast.warning(errorMessage.value); // Mostrar advertencia
        // Redireccionar usando el router de Vue 3
        // `this.$router` no está disponible aquí, usa `router` importado si es necesario
        return;
      }

      try {
        const error = validarCampos({
          nombre: nombre.value,
          especie: especie.value,
          raza: raza.value,
          fecha: fecha.value,
          color: color.value,
          genero: genero.value,
        });

        if (error) {
          errorMessage.value = error;
          toast.warning(error); // Mostrar advertencia
          return;
        }

        const formData = new FormData();
        formData.append('name', nombre.value);
        formData.append('species', especie.value);
        formData.append('breed', raza.value);
        formData.append('birth_date', formatearFecha(fecha.value));
        formData.append('color', color.value);
        formData.append('gender', genero.value);

        if (fileInput.value.files.length > 0) {
          formData.append('image', fileInput.value.files[0]);
        }
        const response = await fetch("http://127.0.0.1:8000/api/pets", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        const result = await response.json();
        if (result.status == "success") {
          okMessage.value = "Tu mascota ha sido registrada correctamente.";
          toast.success(okMessage.value); // Mostrar éxito
          // Limpiar campos
          nombre.value = '';
          especie.value = '';
          raza.value = '';
          fecha.value = '';
          color.value = '';
          genero.value = '';
          PhotoPreview='';
        } else {
          errorMessage.value = result.message || 'Hubo un error en el registro.';
          toast.error(errorMessage.value); // Mostrar error
        }
      } catch (error) {
        console.error('Error en el registro', error);
        errorMessage.value = 'Hubo un problema al registrar la nueva mascota';
        toast.error(errorMessage.value); // Mostrar error
      }
    };

    return {
      nombre,
      especie,
      raza,
      fecha,
      color,
      genero,
      PhotoPreview,
      fileInput,
      errorMessage,
      okMessage,
      limpiarError,
      filterName,
      filterEspe,
      filterRaza,
      filterColor,
      formatearFecha,
      subirImagen,
      onFileChange,
      Regismascota,
    };
  },
};
</script>
<style>
.avatar img {
  width: 100px; /* Puedes ajustar el tamaño según tus necesidades */
  height: 100px;
  object-fit: cover; /* Esto se asegura de que la imagen ocupe todo el contenedor sin distorsionarse */
  border-radius: 0; 
}
</style>