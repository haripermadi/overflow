<template>
  <div>
    <navbar></navbar>
    <div class="jumbotron">
      <div class="headtitle">
        <h1 class="display-4"><i class="fab fa-github"></i> CatsVerFlow</h1>
        <p class="lead">Learn and share how to take care your cats.</p>
      </div>
    </div>
    <div class="container">
      <h2>List of Questions</h2>
      <hr>
      <div v-if="listQuestions.length === 0">
        loading...
      </div>
      <div v-else>
        <div class="list-group" v-for="(question, i) in listQuestions" :key="i">
          <router-link :to="{name: 'DetailQuestion', params: {id:question._id}}" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{question.title}}</h5>
              <small>{{timeConvert(question.createdAt)}}</small>
            </div>
            <div v-if="question.userId === null">
              loading...
            </div>
            <div v-else>
              <small>asked by : {{question.userId.name}}</small>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import moment from 'moment'
// import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
      data: ['aaaa']
    }
  },
  created: function () {
    this.fetch()
  },
  computed: {
    listQuestions: function () {
      // alert(this.$store.state.listQuestions)
      return this.$store.state.listQuestions
    },
    token: function () {
      return this.$store.getters.getActiveUser.token
    }
  },
  methods: {
    fetch () {
      this.$store.dispatch('showAllQuestions')
    },
    timeConvert: function (data) {
      return moment(data).startOf('hour').fromNow()
    },
    test: function () {
      alert('data===', this.$store.state.listQuestions[0].title)
      this.data = this.$store.state.listQuestions
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
.display-4 {
  color: #006266;
  font-weight: bold;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.headtitle{
  background: rgba(196, 229, 56, 0.5);
  margin: 0 auto;
}

.list-group{
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
