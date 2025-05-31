import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, updateHeading } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const rootElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, rootElement);

updateHeading(category);
productList.init();
