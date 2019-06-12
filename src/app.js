import Router from './router'

export default class App {
  constructor(config) {
    this.router = new Router(config.routes)
    this.components = config.components || []

    window.App = this
  }

  get ctrl() {
    return this.router.ctrl
  }

  start() {
    const event = (typeof Turbolinks !== 'undefined') ? 'turbolinks:load' : 'DOMContentLoaded'

    document.addEventListener(event, () => {
      this.router.dispatch()
      this.components.forEach(component => new(component))

      this.ctrl.findAll('[onclick]').forEach(element => {
        const onclick = element.onclick
        element.onclick = null

        element.addEventListener('click', (event) => {
          event.preventDefault()

          this.currentElement = element
          this.currentEvent   = event

          onclick.call()
        })
      })
    })
  }
}
