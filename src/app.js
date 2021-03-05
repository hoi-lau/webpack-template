import Vue from 'vue'
import HelloWorld from './components/vue/index.vue'

const arr = []
function render() {
  const app = document.getElementById('app')
  const node = document.createElement('div')
  arr.push(Date.now())
  node.textContent = BASE_URL + BASE_URL_DEV + arr.includes(100)
  console.log(BASE_URL_DEV)
  a = 'hello'
  app.appendChild(
    new Vue({
      el: app,
      render(h) {
        return h(HelloWorld)
      }
    })
  )
}

const App = {
  render
}

export default App
