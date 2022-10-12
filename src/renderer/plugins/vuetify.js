import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import colors from 'vuetify/lib/util/colors'

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const opts = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: {
          base: '#401288',
          darken1: colors.purple.darken2,
        },
        secondary: '#b0bec5',
        anchor: '#8c9eff',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    }
  },
  icons: {
    iconfont: 'mdi mdiSvg md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
}

export default new Vuetify(opts)