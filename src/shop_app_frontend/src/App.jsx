import React, { useEffect, useState } from 'react';
import { shop_app_backend } from 'declarations/shop_app_backend';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    shop_app_backend.get_products().then((products) => {
      setProducts(products);
      console.log("Products", products);
    });

    shop_app_backend.get_cart_items().then((cartItems) => {
      setCartItems(cartItems);
      console.log("cartItems", cartItems);
    });
  }, []);

  function addProduct(event) {
    event.preventDefault();
  
    const productId = event.target.elements.productId.value;
    const productName = event.target.elements.productName.value;
    const productPrice = event.target.elements.productPrice.value;
    const productImgUrl = event.target.elements.productImgUrl.value;
  
    if (shop_app_backend.add_product(productId, productName, productPrice, productImgUrl)) {
      alert("Ürün eklendi.");
      shop_app_backend.get_products().then((products) => {
        setProducts(products);
      });
    } else {
      alert("Ürün ekleme başarısız oldu.");
    }
  }

  function removeProduct(event){
    event.preventDefault();
    const productId = event.target.elements.productId.value;
    if (shop_app_backend.remove_product(productId)) {
      alert("Ürün kaldırıldı.");
      shop_app_backend.get_products().then((products) => {
        setProducts(products);
      });
    } else {
      alert("Ürün kaldırma başarısız oldu.");
    }
  }

  function addCart(id, name, price, img){
    if (shop_app_backend.add_to_cart(id, name, price, img)) {
      alert("Ürün sepete eklendi.");
      shop_app_backend.get_products().then((products) => {
        setProducts(products);
      });
      shop_app_backend.get_cart_items().then((items) => {
        setProducts(items);
      });
    } else {
      alert("Sepete ekleme başarısız oldu.");
    }
  }

  function removeFromCart(id, name, price, img){
    if (shop_app_backend.remove_from_cart(id, name, price, img)) {
      alert("Ürün sepetten kaldırıldı.");
      shop_app_backend.get_products().then((products) => {
        setProducts(products);
      });
      shop_app_backend.get_cart_items().then((items) => {
        setProducts(items);
      });
    } else {
      alert("Sepetten kaldırma başarısız oldu.");
    }
  }

  return (
    <main>
      <div className="container">
        <div className="manageProducts">
          <form onSubmit={addProduct}>
            <label htmlFor="productId">Ürün ID girin: </label>
            <input id="productId" type="text" name="productId" />
            <label htmlFor="productName">Ürün ismi girin: </label>
            <input id="productName" type="text" name="productName" />
            <label htmlFor="productPrice">Ürün fiyat girin: </label>
            <input id="productPrice" type="text" name="productPrice" />
            <label htmlFor="productImgUrl">Ürün Resim URL'si: </label>
            <input id="productImgUrl" type="text" name="productImgUrl" />
            <button type="submit">Ürün ekle.</button>
          </form>
          <form onSubmit={removeProduct}>
            <label htmlFor="productId">Ürün ID girin: </label>
            <input id="productId" type="text" name="productId" />
            <button type="submit">Ürün kaldır.</button>
          </form>
        </div>
        <div className="listProducts">
          {products.map(product => (
            <div className="product" key={product.product_id}>
              <span className="productName"><b>Ürün İsmi:</b> {product.product_name}</span>
              <span className="productPrice"><b>Fiyat: </b> {product.product_price}</span>
              <img src={product.product_img} alt={product.product_name} />
              <button onClick={() => addCart(product.product_id, product.product_name, product.product_price, product.product_img)}>
                Sepete Ekle.
              </button>
            </div>
          ))}
        </div>
        <div className="listCart">
          {cartItems.map(cartItem => (
            <div className="cartItem" key={cartItem.product_id}>
              <span className="productName">Ürün İsmi: {cartItem.product_name}</span>
              <span className="productPrice">Ürün Fiyatı: {cartItem.product_price}</span>
              <img src={cartItem.product_img} alt={cartItem.product_name} />
              <button onClick={() => removeFromCart(cartItem.product_id, cartItem.product_name, cartItem.product_price, cartItem.product_img)}>Sepetten Kaldır.</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
