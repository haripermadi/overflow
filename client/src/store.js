import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

const serverurl = 'http://server-catsflow.haripermadi.com'
// const serverurl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    activeUser: {
      userId: localStorage.getItem('userId') || '',
      token: localStorage.getItem('token') || '',
      name: localStorage.getItem('name') || ''
    },
    listQuestions: [{
      _id: '',
      title: '',
      description: '',
      userId: {
        _id: '',
        name: '',
        email: ''
      },
      upvotes: [],
      downvotes: []
    }],
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
      console.log(payload)
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
        url: `${serverurl}/users/signup`,
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
        url: `${serverurl}/users/signin`,
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
          localStorage.clear()
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
        url: `${serverurl}/question`
      }).then(response => {
        context.commit('showAllQuestions', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    addQuestion: function (context, payload) {
      axios({
        method: 'post',
        url: `${serverurl}/question`,
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
        url: `${serverurl}/question/${payload._id}`,
        headers: {
          token: context.state.activeUser.token
        }
      }).then(response => {
        console.log(response)
        context.dispatch('getUserQuestion')
      }).catch(error => {
        console.log(error)
      })
    },
    updateQuestion: function (context, payload) {
      console.log('id question update==', payload)
      axios({
        method: 'put',
        url: `${serverurl}/question/${payload._id}`,
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
        url: `${serverurl}/question/userquestion/${context.state.activeUser.userId}`
      }).then(response => {
        context.commit('showUserQuestions', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getQuestionById: function (context, payload) {
      axios({
        method: 'get',
        url: `${serverurl}/question/${payload}`
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
        url: `${serverurl}/answer/${payload}`
      }).then(response => {
        context.commit('showAllAnswer', response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    createAnswer: function (context, payload) {
      axios({
        method: 'post',
        url: `${serverurl}/answer`,
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
    },
    removeAnswer: function (context, payload) {
      axios({
        method: 'delete',
        url: `${serverurl}/answer/${payload._id}`,
        headers: {
          token: context.state.activeUser.token
        }
      }).then(response => {
        console.log(response)
        swal(
          'Remove answer success!',
          'Your answer has been removed!',
          'success'
        )
        context.dispatch('showAllAnswer', payload.questionId[0])
      }).catch(error => {
        console.log(error)
      })
    },
    upVoteQuestion: function (context, payload) {
      console.log('store-upvote==', payload)
      axios({
        method: 'post',
        url: `${serverurl}/question/upvote`,
        headers: {
          token: context.state.activeUser.token
        },
        data: {
          questionId: payload
        }
      }).then(response => {
        console.log('response upvote==', response)
        swal(
          'Voted!',
          'Vote success!',
          'success'
        )
        context.dispatch('getQuestionById', payload)
      }).catch(error => {
        console.log(error)
      })
    },
    downVoteQuestion: function (context, payload) {
      axios({
        method: 'post',
        url: `${serverurl}/question/downvote`,
        headers: {
          token: context.state.activeUser.token
        },
        data: {
          questionId: payload
        }
      }).then(response => {
        console.log('response upvote==', response)
        swal(
          'Voted!',
          'You just downvote this success!',
          'success'
        )
        context.dispatch('getQuestionById', payload)
      }).catch(error => {
        console.log(error)
      })
    },
    upVoteAnswer: function (context, payload) {
      axios({
        method: 'post',
        url: `${serverurl}/answer/upvote`,
        headers: {
          token: context.state.activeUser.token
        },
        data: {
          answerId: payload
        }
      }).then(response => {
        console.log('response upvote==', response)
        location.reload()
        swal(
          'Voted!',
          'Vote success!',
          'success'
        )
      }).catch(error => {
        console.log(error)
      })
    },
    downVoteAnswer: function (context, payload) {
      axios({
        method: 'post',
        url: `${serverurl}/answer/downvote`,
        headers: {
          token: context.state.activeUser.token
        },
        data: {
          answerId: payload
        }
      }).then(response => {
        console.log('response upvote==', response)
        location.reload()
        swal(
          'Voted!',
          'You just downvote this success!',
          'success'
        )
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
