import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'recommend'
  },
  {
    name: 'recommend',
    path: '/recommend',
    component: Recommend
  },
  {
    name: 'singer',
    path: '/singer',
    component: Singer
  },
  {
    name: 'rank',
    path: '/rank',
    component: Rank
  },
  {
    name: 'search',
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
