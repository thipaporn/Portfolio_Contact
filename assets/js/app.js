const myForm = document.querySelector('#my-form')
const name = document.querySelector('#name');
const phone = document.querySelector('#phone');
const gender = document.querySelector('#gender');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');

myForm.addEventListener('submit', onSupmit);

function onSupmit(e) {
    e.preventDefault();
    if (name.value === '' || phone.value === '' || gender.value === '' || email.value === '' || subject.value === '' || message.value === ''){
        alert('Please enter all field');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    }else{
        
    }
}