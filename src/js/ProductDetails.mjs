import { setLocalStorage, getLocalStorage } from "./utils.mjs";
export class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }
    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        const existingItem = cartItems.find(item => item.Id == product.Id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        }
        else {
            const itemWithQuantity = { ...product, quantity: 1 }
            cartItems.push(itemWithQuantity);
        }

        setLocalStorage("so-cart", cartItems);
    }
    renderProductDetails() {
        document.querySelector("main").innerHTML = productDetailsTemplate(this.product);

    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById('addToCart')
            .addEventListener('click', () => {
                this.addProductToCart(this.product)
                window.alert(`${this.product.NameWithoutBrand} added.`)
            });

    }
}
function productDetailsTemplate(item) {
    return `<section class="product-detail">
        <h3>${item.Brand.Name}</h3>
        <h2 class="divider">${item.NameWithoutBrand}</h2>
        <img class="divider"
                src="${item.Image}"
                alt="${item.NameWithoutBrand}" />
        <p class="product-card__price">$${item.FinalPrice}</p>
        <p class="product__color">${item.Colors[0].ColorName}</p>
        <p class="product__description">${item.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id=${item.Id}>Add to Cart</button>
        </div>
        </section>`;
}