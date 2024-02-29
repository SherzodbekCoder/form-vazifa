
function createRow(phone, index) {
    return `
    <tr>
        <td>${index}</td>
        <td>${phone.name}</td>
        <td>${phone.price}$</td>
        <td>${phone.status}</td>
        <td>${phone.description}</td>
        <td>${phone.createAt}</td>
        <td>${phone.updateAt}</td>
        <td data-id = ${phone}>
            <i class="fa-regular fa-pen-to-square"></i>
            <i class="fa-regular fa-trash-can"></i>
        </td>
                </tr>
    
    `;
}


function valedate(name, price, description, status) {
    return true;
};




export { createRow, valedate }