import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser: {
      userId: localStorage.getItem('userId') || '',
      token: localStorage.getItem('token') || '',
      name: localStorage.getItem('name') || ''
    },
    listQuestions: [],
    listUserQuestions: [],
    questionById: {},
    listAnswers: []
  },
  getters: {
    getActiveUser: function (state) {
      return state.activeUser
    },
    getAllQuestions: function (state) {
      return state.listQuestions
    },
    getQuestionById: function (state) {
      return state.questionById
    },
    getMyQuestions: function (state) {
      return state.listUserQuestions
    },
    getAnswers: function (state) {
      return state.listAnswers
    }
  },
  mutations: {
    showAllQuestions: function (state, payload) {
      state.listQuestions = payload
    },
    showUserQuestions: function (state, payload) {
      state.listUserQuestions = payload
    },
    addQuestion: function (state, payload) {
      state.listQuestions.unshift(payload)
    },
    getQuestionById: function (state, payload) {
      state.questionById = payload
    },
    showAllAnswer: function (state, payload) {
      state.listAnswers = payload
    },
    createAnswer: function (state, payload) {
      state.listAnswers.unshift(payload)
    }
  },
  actions: {
    signUp: function (context, payload) {
      console.log('signup payloda', payload)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('respon signup', response)
        swal(
          'Welcome!',
          'Sign Up success!',
          'success'
        )
        localStorage.setItem('userId', response.data.data.id)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('name', response.data.data.name)
        location.reload()
      }).catch(error => {
        console.log(error.message)
      })
    },
    signIn: function (context, payload) {
      console.log('masuk signin', payload)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('signin', response)
        swal(
          'Welcome!',
          'Login success!',
          'success'
        )
        localStorage.setItem('userId', response.data.data.id)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('name', response.data.data.name)
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    },
    logOut: function (context, payload) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log me out!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Log out!',
            'Your have been logged out',
            'success'
          )
          // localStorage.clear()
          context.state.activeUser.token = ''
          context.state.activeUser.name = ''
          context.state.activeUser.userId = ''
          // location.reload()
        }
      })
    },
    showAllQuestions: function (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/question'
      }).then(response => {
        context.commit('showAllQuestions', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    addQuestion: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/question',
        headers: {
          token: context.state.activeUser.token
        },
        data: payload
      }).then(response => {
        swal(
          'Post question success!',
          'Your question has been post!',
          'success'
        )
        context.commit('addQuestion', response.data.newQuestion)
      }).catch(error => {
        console.log(error)
      })
    },
    removeQuestion: function (context, payload) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/question/${payload._id}`,
        headers: {
          token: context.state.activeUser.token
        }
      }).then(response => {
        console.log(response)
        swal(
          'Remove question success!',
          'Your question has been removed!',
          'success'
        )
        context.dispatch('showAllQuestions')
      }).catch(error => {
        console.log(error)
      })
    },
    updateQuestion: function (context, payload) {
      console.log('id question update==', payload)
      axios({
        method: 'put',
        url: `http://localhost:3000/question/${payload._id}`,
        headers: {
          token: context.state.activeUser.token
        },
        data: payload
      }).then(response => {
        console.log(response)
        swal(
          'Edit question success!',
          'Your question has been updated!',
          'success'
        )
        context.dispatch('showAllQuestions')
      }).catch(error => {
        console.log(error)
      })
    },
    getUserQuestion: function (context) {
      console.log('getuserquestion===', context.state.activeUser.userId)
      axios({
        method: 'get',
        url: `http://localhost:3000/question/userquestion/${context.state.activeUser.userId}`
      }).then(response => {
        context.commit('showUserQuestions', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getQuestionById: function (context, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/question/${payload}`
      }).then(response => {
        context.commit('getQuestionById', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    showAllAnswer: function (context, payload) {
      console.log('actiongetanswer==', context.state)
      axios({
        method: 'get',
        url: `http://localhost:3000/answer/${payload}`
      }).then(response => {
        context.commit('showAllAnswer', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    createAnswer: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/answer',
        headers: {
          token: context.state.activeUser.token
        },
        data: payload
      }).then(response => {
        swal(
          'Post answer success!',
          'Your answer has been post!',
          'success'
        )
        context.commit('createAnswer', response.data.newAnswer)
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
