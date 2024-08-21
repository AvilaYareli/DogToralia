<!-- <template>
  <div class="product-wrapper-grid " :class="listViewEnable ? 'list-view' : ''">
    <div class="row">
      <div
        :class="[col2 ? 'col-md-6' : col3 ? 'col-lg-4 col-md-6' : col4 ? 'col-xl-3 col-md-6' : col6 ? 'col-xl-2 col-lg-4 col-md-6' : list ? 'col-xl-12' : 'col-xl-3 col-md-6',]"
        v-for="(product, index) in filterProduct" :key="index">
        <div class="card">
          <div class="product-box">
            <div class="product-img">
              <div class="ribbon ribbon-danger" v-if="product.sale">Sale</div>
              <div class="ribbon ribbon-success ribbon-right" v-if="product.off">50%</div>
              <img class="img-fluid" :src="getImgUrl(product.images[0])" alt />
              <div class="product-hover">
                <ul>
                  <router-link :to="'/ecommerce/cart'">
                    <li @click="addToCart(product)">
                      <i class="icon-shopping-cart"> </i>
                    </li>
                  </router-link>
                  <a data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <li @click="quickView(product)">
                      <i class="icon-eye"> </i>
                    </li>
                  </a>
                </ul>
              </div>
            </div>
            <div class="modal fade" id="exampleModal" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="product-box row">
                      <div class="product-img col-lg-6"><img class="img-fluid" v-if="quickViewProduct.images"
                          :src="getImgUrl(quickViewProduct.images[0])" alt /></div>
                      <div class="product-details col-lg-6">
                        <h4 @click.prevent="this.$router.push('/ecommerce/details/' + quickViewProduct.sku)"
                          data-bs-dismiss="modal">{{ quickViewProduct.name }}</h4>
                        <div class="product-price">
                          ${{ quickViewProduct.price }}
                          <del>${{ quickViewProduct.salePrice }} </del>
                        </div>
                        <div class="product-view">
                          <h6 class="f-w-600">Product Details</h6>
                          <p class="mb-0"> Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
                            doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo. </p>
                        </div>
                        <div class="product-size">
                          <ul>
                            <li> <button class="btn btn-outline-light" type="button" data-bs-original-title=""
                                title="">M</button></li>
                            <li> <button class="btn btn-outline-light" type="button" data-bs-original-title=""
                                title="">L</button></li>
                            <li> <button class="btn btn-outline-light" type="button" data-bs-original-title=""
                                title="">Xl</button> </li>
                          </ul>
                        </div>
                        <div class="product-qnty">
                          <h6 class="f-w-600">Quantity</h6>
                          <fieldset class="qty-box">
                            <div class="input-group bootstrap-touchspin">
                              <button class="btn btn-primary btn-square bootstrap-touchspin-down"
                                v-on:click="decrement(item)" type="button"><i class="fa fa-minus"></i></button>
                              <input class="touchspin text-center form-control" v-model="counter" name="item.quantity"
                                type="text">
                              <button class="btn btn-primary btn-square bootstrap-touchspin-up"
                                v-on:click="increment(item)" type="button">
                                <i class="fa fa-plus"></i></button>
                            </div>
                          </fieldset>
                          <div class="addcart-btn mt-3">
                            <router-link to="/ecommerce/cart">
                              <button class="btn btn-primary m-r-10" type="button"
                                data-original-title="btn btn-info-gradien" title
                                @click="addToCart(quickViewProduct, counter)" data-bs-dismiss="modal">
                                Add To Cart
                              </button>
                            </router-link>
                            <a href="javascript:void(0)" class="btn btn-primary cart-btn-transform"
                              @click.prevent="this.$router.push('/ecommerce/checkout')" data-bs-dismiss="modal">Buy
                              Now</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button class="btn-close" type="button" data-bs-dismiss="modal"></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-details">
              <router-link :to="'/ecommerce/details/' + product.sku">
                <h4>{{ product.name }}</h4>
              </router-link>
              <p>{{ product.shortDescription }}</p>
              <div class="product-price">
                ${{ product.price }}
                <del>${{ product.salePrice }}</del>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
<!-- <script> -->
<!-- import productMixin from "@/mixins/commen/productMixin"
export default {
  mixins: [productMixin],
};
</script> -->

<template>
  <div class="col-xl-8 col-lg-7">
    <form class="card" @submit.prevent="RegisPersonal">
      <div class="card-header pb-0">
        <h4 class="card-title mb-0">Registrar un nuevo miembro del personal{{persoId }}</h4>
        <div class="card-options">
          <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
          <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Nombre</label>
              <input v-model="nombre" class="form-control" @input="filterName">
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-3">
              <label class="form-label f-w-500">Apellido</label>
              <input v-model="apellido" class="form-control" @input="filterApe">
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-3">
              <label class="form-label f-w-500">Telefono</label>
              <input v-model="telefono" class="form-control" @input="filterNumbers" maxlength="10">
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-3">
              <label class="form-label f-w-500">Correo electrónico</label>
              <input v-model="correo" @input="limpiarError" class="form-control" type="text" placeholder="correo@gmail.com">
            </div>
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
              <input v-model="passwordConfirmar" @input="limpiarError" :type="type" class="form-control" name="login[password]"
                placeholder="*********">
              <div class="show-hide"><span class="show" @click="showPassword"> </span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="btn btn-primary" type="submit">Registrar Personal</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

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
      persoId: this.$route.params.id,
    };
  },
  watch: {
    '$route.params.id': function(newId) {
      this.persoId = newId;
      this.verDetalles();
    }
  },
  methods: {
    // ...mapActions(['refreshToken']),

    showPassword() {
      this.type = this.type === 'password' ? 'text' : 'password';
    },
    filterNumbers(event) {
      this.errorMessage = '';
      const onlyNumbers = event.target.value.replace(/\D/g, '');
      this.telefono = onlyNumbers;
    },
    filterName(event) {
      this.errorMessage = '';
      const onlylettters = event.target.value.replace(/[^a-zA-Z]/g, '');
      this.nombre = onlylettters;
    },
    filterApe(event) {
      this.errorMessage = '';
      const onlylettters = event.target.value.replace(/[^a-zA-Z]/g, '');
      this.apellido = onlylettters;
    },
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
      if (telefono.length !== 10) {
        return 'Revisa tu número de teléfono';
      }
      return '';
    },
    async RegisPersonal() {
      const toast = useToast();
      //        const newToken = await this.refreshToken();
      //        const token = newToken || localStorage.getItem('token');
      //        if (!token) {
      //   toast.warning('No se encontró ningún token, redireccionando para iniciar sesión');
      //   this.$router.push('/auth/login');
      //   return;
      // }
      try {
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
          toast.warning(error); 
        } else {
          const formData = {
            name: this.nombre,
            last_name: this.apellido,
            email: this.correo,
            password: this.password,
            password_confirmation: this.passwordConfirmar,
            phone_number: this.telefono.toString()
          };

          const response = await axios.post(`https://devs-devitm.com/api/staff/register${this.persoId}`, formData);
          const resultado = response.data;

          if (resultado.status === 'error') {
            this.errorMessage = resultado.message;
            toast.error(resultado.message);
          } else {
            this.okMessage = "Usuario registrado correctamente";
            toast.success('Usuario registrado correctamente.');
            localStorage.setItem('token', resultado.authorization.token);
            localStorage.setItem('userType', 'staff');
            this.userType = 'staff';
            this.nombre = '';
            this.apellido = '';
            this.telefono = '';
            this.correo = '';
            this.password = '';
            this.passwordConfirmar = '';
          }
        }
      } catch (error) {
        console.log('error', error);
        this.errorMessage = 'Hubo un error en el registro';
        toast.error('Hubo un error en el registro.');
      }
    },
  },
};
</script>
  
  <style >
  
  </style> 