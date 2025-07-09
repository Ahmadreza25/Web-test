
const API_URL = 'http://localhost:3000/profile/1';
const imgEl = document.getElementById('img-profile')
const nameEl = document.getElementById('name')
const idEl = document.getElementById('userid')
const imgH = document.getElementById('h-img-profile')
const nameH = document.getElementById('h-name')
const idH = document.getElementById('h-userid') 

window.addEventListener('DOMContentLoaded' , async () => {
    try{
        const res = await fetch(API_URL)
        const user = await res.json()

        imgEl.src = user.image;
        imgH.src = user.image;
        nameEl.textContent = user.name;
        nameH.textContent = user.name;
        idEl.textContent = user.userId;
        idH.textContent = user.userId;

  } catch (err) {
    console.error('Error loading profile:', err);
  }
})


document.getElementById('btn-profile').addEventListener('click' , e => {
    e.preventDefault()
    window.location.href = '../Profilepage/Profilepage.html'
})

document.getElementById('btn-article').addEventListener('click' , e => {
    e.preventDefault()
    window.location.href = '../AddArticle/AddArticle.html'
})