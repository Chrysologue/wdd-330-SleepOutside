import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter} from "./utils.mjs";

const rootElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, rootElement);
productList.init();
loadHeaderFooter()