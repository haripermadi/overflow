<template>
  <div>
    <navbar></navbar>
    <div class="jumbotron" id="title">
      <h2>{{activeQuestion.title}}</h2>
    </div>
    <hr>
    <div class="row container" id="qbody">
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-success" @click="upVoteQ(activeQuestion._id)"><span>{{activeQuestion.upvotes.length}}  </span><i class="far fa-thumbs-up"></i></button>
          </div>
          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-warning" @click="downVoteQ(activeQuestion._id)"><span>{{activeQuestion.downvotes.length}}  </span><i class="far fa-thumbs-down"></i></button>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        {{activeQuestion.description}}
      <hr>
        <div class="text-muted">
          asked by: {{activeQuestion.userId.name}} | posted on: {{timeConvert(activeQuestion.createdAt)}}
        </div>
      </div>
    </div>
    <hr>
    <div class="jumbotron" id="answerTag">
      <form>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Your Answer</label>
          <textarea class="form-control" rows="5" v-model="content"></textarea>
        </div>
        <button type="button" class="btn btn-primary" @click="postAnswer">Post</button>
      </form>
    </div>
    <hr>
    <div v-if="listAnswers.length === 'undefined'">
      loading...
    </div>
    <div v-else>
      <p>{{listAnswers.length}} Answer</p>
    </div>
    <div class="card" v-for="(answer, i) in listAnswers" :key="i">
      <div class="card-body">
        <h5 class="card-title">{{answer.content}}</h5>          
        <button v-if="activeUser.userId === answer.userId._id" type="button" class="btn btn-danger" @click="removeAnswer(answer)">Remove</button>
      </div>
      <div class="card-footer text-muted row">
        <div class="col-md-2">
        <button type="button" class="btn btn-success" @click="upVoteAns(answer._id)"><span>{{answer.upvotes.length}}  </span><i class="far fa-thumbs-up"></i></button>
        <button type="button" class="btn btn-warning" @click="downVoteAns(answer._id)"><span>{{answer.downvotes.length}}  </span><i class="far fa-thumbs-down"></i></button>
        </div>
        <div class="col-md-10" id="ansauthr" v-if="answer.userId.name === null">
          answer by : loading... | posted on: {{timeConvert(answer.createdAt)}}
        </div>            
        <div class="col-md-10" id="ansauthr" v-else>
          answer by : {{answer.userId.name}} | posted on: {{timeConvert(answer.createdAt)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import moment from 'moment'
import swal from 'sweetalert2'
export default {
  name: 'DetailQuestion',
  components: {
    Navbar
  },
  data () {
    return {
      content: ''
    }
  },
  created: function () {
    console.log('id question===', this.$route.params.id)
    this.getQuestion()
    this.getAnswersList()
  },
  computed: {
    activeQuestion: function () {
      return this.$store.getters.getQuestionById
    },
    listAnswers: function () {
      return this.$store.getters.getAnswers
    },
    activeUser: function () {
      return this.$store.getters.getActiveUser
    }
  },
  methods: {
    getQuestion: function () {
      this.$store.dispatch('getQuestionById', this.$route.params.id)
    },
    getAnswersList: function () {
      this.$store.dispatch('showAllAnswer', this.$route.params.id)
    },
    timeConvert: function (data) {
      return moment(data).startOf('hour').fromNow()
    },
    postAnswer: function () {
      let input = {
        content: this.content,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('createAnswer', input).then(() => {
        this.content = ''
      })
    },
    removeAnswer: function (answer) {
      console.log('answerdata==', answer.questionId[0])
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove this answer!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Removed!',
            'Your answer has been removed',
            'success'
          )
          this.$store.dispatch('removeAnswer', answer)
        }
      })
    },
    upVoteQ: function (id) {
      console.log('current quest==', id)
      this.$store.dispatch('upVoteQuestion', id)
    },
    downVoteQ: function (id) {
      this.$store.dispatch('downVoteQuestion', id)
    },
    upVoteAns: function (id) {
      this.$store.dispatch('upVoteAnswer', id)
    },
    downVoteAns: function (id) {
      console.log('current answ==', id)
      this.$store.dispatch('downVoteAnswer', id)
    }
  }
  // updated: function () {
  //   this.getAnswersList()
  // }
}
</script>

<style scoped>
.jumbotron {
  text-align: center;
  background-color: #f1f1f2;
}
#title {
  max-height: 100px;
  padding-top: 30px;
  padding-bottom: 30px;
}
#answerTag{
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 30px;
  text-align: center;
}
#qbody button {
  /* float: right; */
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.col-md-6{
  display: table;
}

.text-muted {
  text-align: right;
}
.card {
  margin: 0 auto;
  max-width: 1100px;

}
.card-footer {
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 0px;
  margin-left: 0px;
}
.card-footer button {
  float: left;
  margin-right: 10px;
}
#ansauthr {
  vertical-align: middle;
}
p{
  text-align: center;
}
.btn-danger {
  float: right;
}
</style>
