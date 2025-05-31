// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//Getting query string parameters
export function getParam(param)
{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate (templateFn, parentElement, list, position="afterbegin", clear=true)
{
  if(clear)
  {
    parentElement.innerHTML = "";
  }
  const htmls = list.map(item => templateFn(item)).join("");
  parentElement.insertAdjacentHTML(position, htmls)
}

function renderWithTemplate (template, parentElement, data, callback)
{
  if(callback)
  {
    callback(data)
  }
  parentElement.innerHTML = template;
}

async function loadTemplate(url)
{
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}, ${response.statusText}`);
  }
  const data = await response.text(); 
  return data;
}
export async function loadHeaderFooter()
{
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const header = qs("#header");
  const footer = qs("footer");
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
  updateCartCount();
}

function updateCartCount()
{
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = qs(".cart-count");
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if(cartItems.length > 0)
  {
    cartFooter.textContent = cartCount
    cartFooter.style.display = "block";
  }
  else {
    cartFooter.style.display = "none";
  }
  
}