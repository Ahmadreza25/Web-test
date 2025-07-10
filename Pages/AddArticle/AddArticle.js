const imgArticle = document.getElementById('img-article')
const inputImage = document.getElementById('image-article')
const inputname = document.getElementById('name-article')
const inputSubject = document.getElementById('name-subject')
const dataTime = document.getElementById('data-time')
const divText = document.getElementById('div-text') 
const btnWriting = document.getElementById('btn-writing')
const btnSave = document.getElementById('btn-save')

const API_URL = 'http://localhost:3000/articles/1';

let editing = false

async function loadArticle () {
    try{
        const res = await fetch(API_URL)
        if(res.ok){
            const data = await res.json()
            imgArticle.src = data.image || ''
            inputname.value = data.title || ''
            inputSubject.value = data.name || ''
            dataTime.value = data.time || ''
            divText.textContent = data.text || ''
            setEditing(false)
        }else{
            imgArticle.src = ''
            inputname.value = ''
            inputSubject.value = ''
            dataTime.value =''
            divText.textContent = ''
            setEditing(false)
        }
    }catch(err){
        console.error('Erro and load Article' , err)
    }
}


function setEditing (state) {
    editing = state
    divText.contentEditable = state ? "true" : "false";
    inputname.disabled = !state
    inputSubject.disabled = !state
    inputImage.disabled = !state
    dataTime.disabled = !state
    if(state) {
        btnWriting.style.display = 'none'
        btnSave.style.display = 'inline-block'
    }else{
        btnWriting.style.display = 'inline-block'
        btnSave.style.display = 'none'
    }
}

function toBase64 (file) {

    return new Promise ((resolve , reject) => {
        const reader = new FileReader ()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

async function saveArticle () {
    try{
        let imageBase64 = imgArticle.src

        if(inputImage.files.length > 0){
            imageBase64 = await toBase64(inputImage.files[0])
        }

        const dataToSave = {
            id:1,
            image:imageBase64,
            title:inputname.value,
            name:inputSubject.value,
            time:dataTime.value,
            text:divText.textContent
        }

        const res = await fetch(API_URL , {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })

        if(res.ok){
            alert('Article saved successfully!')
            setEditing(false)
            loadArticle()
            inputImage.value = ''
        }else{
            alert('error save')
        }
    }catch(err){
        console.error(err);
        alert('Error Article')
    }
}

btnWriting.addEventListener('click' , () => setEditing(true))
btnSave.addEventListener('click' , saveArticle)


loadArticle()




const textarea = document.getElementById('expanding-textarea');

textarea.addEventListener('input', () => {
  textarea.style.height = 'auto'; // بازنشانی ارتفاع
  textarea.style.height = textarea.scrollHeight + 'px'; // تعیین ارتفاع جدید
});
