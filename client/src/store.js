import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser: {
      userId: localStorage.getItem('userId') || '',
      token: localStorage.getItem('token') || '',
      name: localStorage.getItem('name') || ''
    }
  }
})
