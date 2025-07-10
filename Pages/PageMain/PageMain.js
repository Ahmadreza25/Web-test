const API_URL_A= 'http://localhost:3000/articles/1';
const API_URL = 'http://localhost:3000/profile/1';
const imgEl = document.getElementById('img-profile')
const nameEl = document.getElementById('name')
const idEl = document.getElementById('userid')
const imgH = document.getElementById('h-img-profile')
const nameH = document.getElementById('h-name')
const idH = document.getElementById('h-userid') 
const nameArticle = document.getElementById('name-article')
const nameAuthor = document.getElementById('name-author')
const dataTime = document.getElementById('data-time')
const profilearticle = document.getElementById('image-article')
const container = document.getElementById('article-display');

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
window.addEventListener('DOMContentLoaded' ,async () => {
  try{
    const res = await fetch(API_URL_A)
    const user = await res.json()

    nameArticle.textContent = user.name
    nameAuthor.textContent = user.title
    dataTime.textContent = user.time
    profilearticle.src = user.image
  }catch (err){

  }
})

async function loadArticles() {
  try {
      const res = await fetch('http://localhost:3000/articles');
      if (res.ok) {
          const articles = await res.json();

          if (articles.length === 0) {
              container.textContent = 'مقاله‌ای برای نمایش وجود ندارد';
              return;
          }

          // فقط آخرین مقاله را نمایش بده
          const latest = articles[articles.length - 1];

          const articleElem = document.createElement('div');

          articleElem.innerHTML = `
          <div class="w-[350px] h-[150px] m-1 flex items-center justify-between ">
            <div class="w-[80px] h-[80px] rounded-[100%] bg-slate-100">
                <img src="${latest.image}" alt="" class="rounded-[50%]">
            </div>
            <div class="w-[260px]">
                <p class="w-[230px]">
                Name of the article : ${latest.name}
                </p>
                <p>
                Date of registration : ${latest.time}
                </p>
                <span>write names : ${latest.title}</span>
            </div>
          </div>
          `;
          container.appendChild(articleElem);
      } else {
          container.textContent = 'خطا در بارگذاری مقالات';
      }
  } catch (err) {
      console.error(err);
      container.textContent = 'خطا در بارگذاری مقالات';
  }
}


loadArticles();



document.getElementById('btn-profile').addEventListener('click' , e => {
    e.preventDefault()
    window.location.href = '../Profilepage/Profilepage.html'
})

document.getElementById('btn-article').addEventListener('click' , e => {
    e.preventDefault()
    window.location.href = '../AddArticle/AddArticle.html'
})