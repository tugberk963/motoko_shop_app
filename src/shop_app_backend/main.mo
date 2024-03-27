import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor {
  type Product = {
    product_id : Text;
    product_name : Text;
    product_img : Text;
    product_price : Text;
  };

  let ProductsMap = HashMap.HashMap<Text, Product>(0, Text.equal, Text.hash);
  let CartMap = HashMap.HashMap<Text, Product>(0, Text.equal, Text.hash);

  public func add_product(id : Text, name : Text, price : Text, img_url: Text) : async Bool {
    if (id != "" and name != "" and price != "") {
      ProductsMap.put(id, { product_id = id; product_name = name; product_price = price; product_img  = img_url });
      true;
    } else {
      false;
    };
  };

  public func remove_product(id : Text) : async Bool {
    if (id != "" and ProductsMap.get(id) != null) {
      ProductsMap.delete(id);
      true;
    } else {
      false;
    };
  };

  public func add_to_cart(id : Text, name: Text, price: Text, img_url: Text) : async Bool {
    if (id != "" and ProductsMap.get(id) != null) {
      CartMap.put(id, { product_id = id; product_name = name; product_price = price; product_img = img_url});
      ProductsMap.delete(id);
      true;
    } else {
      false;
    };
  };

  public func remove_from_cart(id : Text, name: Text, price: Text, img_url: Text) : async Bool {
    if (id != "" and CartMap.get(id) != null) {
      CartMap.delete(id);
      ProductsMap.put(id, {product_id = id; product_name = name; product_price = price; product_img = img_url});
      true;
    } else {
      false;
    };
  };

  public query func get_products() : async [Product] {
    Iter.toArray(ProductsMap.vals());
  };

  public query func get_cart_items() : async [Product] {
    Iter.toArray(CartMap.vals());
  };
};