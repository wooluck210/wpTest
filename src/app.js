import './style.css';
// import rabbit from './rabbit.png';
import bg from './background.png'

// console.log(pw)
let env
if(process.env.NODE_ENV === 'development') {
  env = dev
} else {
  env = pro
}
console.log(env)

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `<img src="${bg}"/>`;
})