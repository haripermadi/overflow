import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import DetailQuestion from '@/components/DetailQuestion'
import MyQuestions from '@/components/MyQuestions'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'DetailQuestion',
      component: DetailQuestion
    },
    {
      path: '/myquestions',
      name: 'MyQuestions',
      component: MyQuestions
    }
  ]
})
