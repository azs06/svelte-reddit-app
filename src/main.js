import App from './App.svelte'

function initApplication(target){
  const app = new App({
    target,
  })
  return app
}

const el = document.createElement('div')
el.setAttribute('id', 'sv-app');
//el.setAttribute('style', 'display: none;');
document.body.appendChild(el)
const app = initApplication(el);

export default app
