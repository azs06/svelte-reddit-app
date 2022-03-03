import App from './App.svelte'

let app = null;
const events = {};

function initApplication(target, config={}){
  const app = new App({
    target,
    props: {
      ...config
    }
  })
  return app
}

function getElement(id){
  const el = document.createElement('div')
  el.setAttribute('id', id);
  //el.setAttribute('style', 'display: none;');
  return el;
}

function initSkipper(config={}){
  const el = getElement('sv-app');
  document.body.appendChild(el);
  app = initApplication(el, config);
  initEvents(app);
  return app;
}

function initEvents(app){
  events.mountedOff = app.$on('mounted', () => {
    document.dispatchEvent(new Event('load'));
  })
  events.destroyedOff = app.$on('destroyed', () => {
    document.dispatchEvent(new Event('close'));
    cleanEvents();
  })
}

function cleanEvents(){
  Object.keys(events).forEach(key => {
    events[key]();
  })
}

initSkipper();

window.initSkipper = initSkipper;

export default app
