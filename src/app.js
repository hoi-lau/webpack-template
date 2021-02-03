import Vue from 'vue'
import HelloWorld from './components/vue/index.vue'

function render() {
  const app = document.getElementById('app')
  const node = document.createElement('div')

  node.textContent = BASE_URL + BASE_URL_DEV
  console.log(BASE_URL_DEV)
  app.appendChild(node)
  // new Vue({
  //   el: app,
  //   render(h) {
  //     return h(HelloWorld)
  //   }
  // })
}

const App = {
  render
}

export default App
