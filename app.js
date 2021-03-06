class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

class UI {
    addProduct(product) {
        let productList = document.getElementById('product-list');
        let element = document.createElement('div');
        element.innerHTML =
            `
        <div class="card text-center mb-4 ">
            <div class="card-body">
                <strong>Product</strong>:${product.name}
                <strong>Price</strong>:${product.price}
                <strong>Description</strong>:${product.description}
                <a class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(target) {
        if (target.name === 'delete') {
            target.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product deleted successfully!', 'danger col-sm-12 text-center mt-3');
        }
    }

    showMessage(message, cssClass) {
        let div = document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(message));
        let app = document.querySelector('#app');
        app.parentElement.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

/* Eventos capturados */

document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('product-name').value;
    let price = document.getElementById('product-price').value;
    let description = document.getElementById('product-description').value;

    let product = new Product(name, price, description);
    let ui = new UI();
    if (name === '' || price === '' || description === '') {
        ui.showMessage('Complete all fields please','info col-md-12 text-center mt-3')
    } else {  
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Producto added sucessfully!', 'success col-md-12 text-center mt-3');
    }
});

document.getElementById('product-list').addEventListener('click', function (e) {
    let ui = new UI();
    ui.deleteProduct(e.target);
});