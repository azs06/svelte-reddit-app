import App from './App.svelte'

let app = null;
function initApplication(target, config={}){
  const app = new App({
    target,
    props: {
      ...config
    }
  })
  return app
}

function initSkipper(config={}){
  const el = document.createElement('div')
  el.setAttribute('id', 'sv-app');
  //el.setAttribute('style', 'display: none;');
  document.body.appendChild(el)
  app = initApplication(el, config);
}

initSkipper();

window.initSkipper = initSkipper;

export default app
