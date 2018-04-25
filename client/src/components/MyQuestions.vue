<template>
  <div>
    <navbar></navbar>
    <div class="container-fluid">
      <h3>My Questions</h3>
    </div>
    <div class="jumbotron">
      <div class="list-group" v-for="(question, i) in listUserQuestions" :key="i">
        <div class="list-group-item list-group-item-action list-group-item-dark">{{question.title}} <span class="removeTag" @click="deleteQuestion(question)"><i class="far fa-trash-alt"></i></span><span class="editTag" data-toggle="modal" data-target="#editModal" @click="getEditQuestion(question)"><i class="far fa-edit"></i></span></div>
      </div>
    </div>
      <!-- modal form question -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title" class="col-form-label">Title:</label>
                <input type="text" class="form-control" placeholder="question title.." v-model="editQuestion.title">
              </div>
              <div class="form-group">
                <label for="title" class="col-form-label">Description:</label>
                <textarea class="form-control" rows="8" v-model="editQuestion.description" placeholder="question description..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal"  @click="updateQuestion">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import Navbar from '@/components/Navbar'
import { mapState } from 'vuex'
export default {
  name: 'MyQuestions',
  components: {
    Navbar
  },
  data () {
    return {
      editQuestion: {}
    }
  },
  created: function () {
    this.$store.dispatch('getUserQuestion')
  },
  computed: {
    // myQuestions: function () {
    //   return this.$store.getters.getMyQuestions
    // },
    ...mapState([
      'listUserQuestions'
    ])
  },
  methods: {
    getEditQuestion: function (question) {
      this.editQuestion = question
    },
    deleteQuestion: function (question) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove this question!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Removed!',
            'Your question has been removed',
            'success'
          )
          this.$store.dispatch('removeQuestion', question)
        }
      })
    },
    updateQuestion: function () {
      this.$store.dispatch('updateQuestion', this.editQuestion)
    }
  }
}
</script>

<style scoped>
.jumbotron {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: rgba(135, 206, 235, 0.7)
}

.list-group-item {
  text-align: left !important;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

.icon {
  cursor: pointer;
}
.removeTag{
  position: absolute;
  right: 40px;
  cursor: pointer;
}
.editTag{
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.container-fluid{
  background: rgba(135, 206, 235, 0.7);
  text-align: center;
}
</style>
