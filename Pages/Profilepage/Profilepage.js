const profileImg = document.getElementById('profile-img');
const imageInput = document.getElementById('image-input');
const nameInput = document.getElementById('name-input');
const idInput = document.getElementById('id-input');
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');

const API_URL = 'http://localhost:3000/profile/1'; // فرض بر اینکه یک پروفایل با id=1 داریم

// حالت ویرایش یا نمایش
let editing = false;

// تابع بارگذاری پروفایل از سرور
async function loadProfile() {
  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      profileImg.src = data.image || 'https://via.placeholder.com/150';
      nameInput.value = data.name || '';
      idInput.value = data.userId || '';

      // غیر فعال کردن ورودی‌ها در حالت نمایش
      setEditing(false);
    } else {
      // اگر پروفایل موجود نبود، مقدارهای پیش‌فرض بگذار
      profileImg.src = 'https://via.placeholder.com/150';
      nameInput.value = '';
      idInput.value = '';
      setEditing(false);
    }
  } catch (err) {
    console.error('خطا در بارگذاری پروفایل:', err);
  }
}

// فعال یا غیرفعال کردن ورودی‌ها
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

// تبدیل فایل عکس به base64 برای ارسال به سرور
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// ذخیره پروفایل در سرور
async function saveProfile() {
  try {
    let imageBase64 = profileImg.src;

    // اگر فایل عکس جدید انتخاب شده است
    if (imageInput.files.length > 0) {
      imageBase64 = await toBase64(imageInput.files[0]);
    }

    const dataToSave = {
      id: 1,
      image: imageBase64,
      name: nameInput.value,
      userId: idInput.value
    };

    // ارسال درخواست PATCH برای به روز رسانی پروفایل
    const res = await fetch(API_URL, {
      method: 'PUT', // اگر پروفایل از قبل نیست باید POST بزنی، اما ما فرض کردیم هست
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
    });

    if (res.ok) {
      alert('پروفایل با موفقیت ذخیره شد!');
      setEditing(false);
      loadProfile();
      imageInput.value = ''; // پاک کردن ورودی فایل
    } else {
      alert('خطا در ذخیره پروفایل');
    }
  } catch (err) {
    console.error(err);
    alert('خطا در ذخیره پروفایل');
  }
}

// رویدادهای دکمه‌ها
editBtn.addEventListener('click', () => setEditing(true));
saveBtn.addEventListener('click', saveProfile);

// بارگذاری اولیه
loadProfile();