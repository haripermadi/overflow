<template>
  <div>
    <navbar></navbar>
    <div class="jumbotron">
      <h1 class="display-4">CatsVerFlow</h1>
      <p class="lead">Learn and share how to take care your cats.</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <button v-if="token !== ''" type="button" class="btn btn-primary" data-toggle="modal" data-target="#questionModal">Post new Question</button>
        </div>
        <div class="col-md-9">
          <h2>List of Questions</h2>
          <div class="list-group" v-for="(question, i) in listQuestions" :key="i">
            <router-link :to="{name: 'DetailQuestion', params: {id:question._id}}" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{question.title}}</h5>
                <small>{{timeConvert(question.createdAt)}}</small>
              </div>
              <small>asked by : {{question.userId.name}}</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- modal form question -->
    <div class="modal fade" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">What's your question?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title" class="col-form-label">Title:</label>
                <input type="text" class="form-control" placeholder="question title.." v-model="title">
              </div>
              <div class="form-group">
                <label for="title" class="col-form-label">Description:</label>
                <textarea class="form-control" rows="8" v-model="description" placeholder="question description..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="buttonPost">Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import moment from 'moment'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
      title: '',
      description: ''
    }
  },
  created: function () {
    this.$store.dispatch('showAllQuestions')
  },
  computed: {
    listQuestions: function () {
      return this.$store.getters.getAllQuestions
    },
    token: function () {
      return this.$store.getters.getActiveUser.token
    }
  },
  methods: {
    buttonPost: function () {
      let input = {
        title: this.title,
        description: this.description
      }
      this.$store.dispatch('addQuestion', input)
    },
    timeConvert: function (data) {
      return moment(data).startOf('hour').fromNow()
    }
  }
  // updated: function () {
  //   this.$store.dispatch('showAllQuestions')
  // }
}
</script>

<style scoped>
.jumbotron {
  background-image: url('https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-repeat: no-repeat;
  height: 450px;
  text-align: center;
}
</style>
