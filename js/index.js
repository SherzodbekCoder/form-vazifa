import { createRow, valedate } from "./function.js";

const tbody = document.querySelector("#tbody");
const form = document.getElementById('form');
const name = document.getElementById('name');
const status = document.getElementById('status');
const description = document.getElementById('description');
const price = document.getElementById('price');
const btn = document.getElementById('btn');



btn && btn.addEventListener('click', function (e) {
    e.preventDefault();

    const isValid = valedate(name, price, description, status);
    if (isValid) {
        btn.setAttribute('disabled', true);
        btn.innerHTML = "Yuborilmoqda..."
        const phone = {
            name: name.value,
            status: status.value,
            description: description.value,
            price: price.value,
            categoriy_id: 2,
        }

        fetch(`https://auth-rg69.onrender.com/api/products`, {
            method: "POST",
            headers: {
                "Content-type": 'aplication/json'
            },
            body: JSON.stringify(phone)
        })
            .then(res => res.json())
            .then(data => {
                btn.removeAttribute('disabled')
                btn.innerHTML = "Saqlash"

                if (data.id) {
                    // window.location.reload();
                    let row = createRow(data, tbody.childElementCount);
                    tbody.innerHTML += row
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

})





const API = "https://auth-rg69.onrender.com/api/products";


document.addEventListener('DOMContentLoaded', function () {


    fetch(`${API}/all`, {
        method: "GET"
    })
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
        })
        .then(data => {
            if (data.length) {
                data.forEach((phone, index) => {
                    let row = createRow(phone, index);
                    tbody.innerHTML += row;
                });

                const deleteButtons = document.querySelectorAll('i.fa-trash-can');

                if (deleteButtons.length) {
                    deleteButtons.forEach(del => {
                        del.addEventListener('click', function () {
                            let isDelete = confirm(`Rostdan ham ushbu malumotni ochirmoqchimisz?`);
                            if (isDelete) {
                                let id = this.parentNode.getAttribute('data-id');
                                this.parentNode.innerHTML = "O'chirilmoqda...";
                                if (id) {
                                    fetch(`${API}/${id}`, {
                                        method: "DELETE"
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
                                                window.location.reload();
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                }
                            }
                        })
                    })
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
})


export { createRow, valedate }