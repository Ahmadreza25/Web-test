const profileImg = document.getElementById('profile-img');
const imageInput = document.getElementById('image-input');
const nameInput = document.getElementById('name-input');
const idInput = document.getElementById('id-input');
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');

const API_URL = 'http://localhost:3000/profile/1';

let editing = false;


async function loadProfile() {
  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      profileImg.src = data.image || 'https://via.placeholder.com/150';
      nameInput.value = data.name || '';
      idInput.value = data.userId || '';

      setEditing(false);
    } else {
      profileImg.src = 'https://via.placeholder.com/150';
      nameInput.value = '';
      idInput.value = '';
      setEditing(false);
    }
  } catch (err) {
    console.error('Error loading profile:', err);
  }
}

function setEditing(state) {
  editing = state;
  nameInput.disabled = !state;
  idInput.disabled = !state;
  imageInput.disabled = !state;

  if (state) {
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
  } else {
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
  }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


async function saveProfile() {
  try {
    let imageBase64 = profileImg.src;

    if (imageInput.files.length > 0) {
      imageBase64 = await toBase64(imageInput.files[0]);
    }

    const dataToSave = {
      id: 1,
      image: imageBase64,
      name: nameInput.value,
      userId: idInput.value
    };

    const res = await fetch(API_URL, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
    });

    if (res.ok) {
      alert('Profile saved successfully!');
      setEditing(false);
      loadProfile();
      imageInput.value = ''; 
    } else {
      alert('Error saving profile');
    }
  } catch (err) {
    console.error(err);
    alert('Error saving profile');
  }
}

editBtn.addEventListener('click', () => setEditing(true));
saveBtn.addEventListener('click', saveProfile);

loadProfile();