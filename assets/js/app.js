class Information {
    constructor(name, gender, phone, email, subject, message) {
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
}

class UI {
    static displayInfor() {
        const infor = Store.getInfor();
        infor.forEach((Infor) => UI.addInforToList(Infor));
    }
    static addInforToList(Infor) {
        const list = document.querySelector('#infor-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${Infor.name}</td>
        <td>${Infor.gender}</td>
        <td>${Infor.phone}</td>
        <td>${Infor.email}</td>
        <td>${Infor.subject}</td>
        <td>${Infor.message}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
        `;
        list.appendChild(row);
    }
    static deleteInfor(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#my-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearFields() {
        document.querySelector('#name').value = "";
        document.querySelector('#gender').value = "";
        document.querySelector('#phone').value = "";
        document.querySelector('#email').value = "";
        document.querySelector('#subject').value = "";
        document.querySelector('#message').value = "";
    }
}

class Store {
    static getInfor() {
        let infor;
        if (localStorage.getItem(infor) === null) {
            infor = [];
        } else {
            infor = JSON.parse(localStorage.getItem('infor'));
        }
        return infor;
    }
    static addInfor(infor) {
        const informa = Store.getInfor();
        informa.push(infor);
        localStorage.setItem('informa', JSON.stringify(informa));
    }
    static removeInfor(isbn) {
        const informa = Store.getInfor();

        informa.forEach((infor, index) => {
            if (infor.isbn === isbn) {
                Informa.splice(index, 1);
            }
        });
        localStorage.setItem('infotma', JSON.stringify(informa));
    }
}
document.addEventListener('DOMContentLoaded', UI.displayInfor);

document.querySelector('#my-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const gender = document.querySelector('#gender').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    if (name === "" || phone === "" || gender === "" || email === "" || subject === "" || message === "") {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        if (gender === "male" || gender === "Male" || gender === "female" || gender === "Female") {
            const infor = new Information(name, gender, phone, email, subject, message);

            UI.addInforToList(infor);

            Store.addInfor(infor);

            UI.showAlert('Contact Added', 'success');

            UI.clearFields();
        }else{
            UI.showAlert('Please fill in Gender => "Male" or "Female"','danger');
        }
    }
});

document.querySelector('#infor-list').addEventListener('click', (e) => {
    UI.deleteInfor(e.target);

    Store.removeInfor(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Contact Removed', 'success');
});