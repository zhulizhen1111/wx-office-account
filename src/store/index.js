/**
*@author: fugy
*@date: 2018.10.12
*@info: 朵朵报修的store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import author from './modules/author';
import projects from './modules/projects'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        author,
        projects
    }
});

export default store
