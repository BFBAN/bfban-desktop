<template>
  <div>
    <v-toolbar
        color="primary accent-4"
        cards
        dark
        flat>
      <v-btn icon :to="{name: 'index'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular">
        登录
      </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container>
      <form>
        <v-text-field
            v-model="signin.username"
            label="Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="signin.password"
            label="password"
            required
        ></v-text-field>

        <v-text-field :counter="4" aria-valuemax="4" v-model="signin.captcha">
          <template v-slot:append>
            <Captcha ref="captcha" :seconds="15"></Captcha>
          </template>
        </v-text-field>

        <br>

        <v-btn
            class="mr-4"
            block
            elevation="0"
            :loading="spinShow"
            @click="onSignin">
          {{ $t('basic.button.submit') }}
        </v-btn>
      </form>
    </v-container>
  </div>
</template>

<script>
import Vuex from "vuex";

import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
const { mapActions, mapMutations } = Vuex;
import {api, http} from '/src/renderer/assets/js/index'

import Captcha from "../components/Captcha";

export default {
  name: "Signin",
  mixins: [validationMixin],
  components: {Captcha},
  data () {
    return {
      signin: {
        username: '',
        password: '',
        captcha: '',
      },
      spinShow: false,
    }
  },
  methods: {
    ...mapActions({
      'signinUser': 'signin'
    }),
    ...mapMutations([
      'SIGNIN'
    ]),
    onSignin () {
      const that = this;
      const {username, password, captcha} = this.signin;

      this.spinShow = true;

      http.post(api["account_signin"], {
        data: {
          data: {
            username,
            password,
          },
          encryptCaptcha: this.$refs.captcha.hash,
          captcha,
        },
      }).then(res => {
        const d = res.data;

        if (d.error == 1) {
          that.signin.password = '';
          that.signin.captcha = '';
          that.signinBackMsg = d.message;

        } else {
          that.signinUser(d.data).then(() => {
            const backurl = this.$route.query.backurl;

            // redirect rurl or home
            if (backurl) {
              this.$router.push({ path: backurl });
            } else {
              this.$router.go('-1');
            }
          })
        }
      }).finally(res => {
        that.spinShow = false;

        if (that.$refs.captcha)
          that.$refs.captcha.refreshCaptcha();
      });
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
  computed: {
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
  }
}
</script>

<style scoped>

</style>