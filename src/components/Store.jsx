import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  BrandsService,
  CategoryService,
  HandleCheckedState,
  productService,
} from "../services/Service";
import Product from "../components/Product";
import UserContext from "../UserContext";

function Store() {
  //state
  let [Brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);

  const _userContext = useContext(UserContext);

  //state

  useEffect(() => {
    (async () => {
      let brands = await BrandsService.getBrands();
      setBrands(brands);

      let catgories = await CategoryService.getCategories();
      setCategories(catgories);

      let products = await productService.getProducts();
      setProducts(products);
    })();
  }, []);

  const handleBrandsChecked = brandId => {
    const updatedBrands = HandleCheckedState(Brands, brandId);
    setBrands(updatedBrands);
  };
  const handlecategorysChecked = categoryId => {
    const updatedCategories = HandleCheckedState(categories, categoryId);
    setCategories(updatedCategories);
  };

  const AddtoCartHandler = useCallback(
    _product => {
      (async () => {
        let newOrder = {
          userId: _userContext.user.currentUserID,
          productId: _product.id,
          quantity: 1,
          isPaymentCompleted: false,
        };

        let orderResponse = await fetch("http://localhost:5000/orders", {
          method: "POST",
          body: JSON.stringify(newOrder),
          header: { "Content-Type": "application/json" },
        });

        if (orderResponse.ok) {
          //let order = await orderResponse.json();

          let prods = products.map(p => {
            if (p.id === _product.id) p.isOrdered = true;

            return p;
          });
          setProducts(prods);
        } else {
          console.log("error==>" + orderResponse);
        }
      })();
    },
    [_userContext.user.currentUserID, products]
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 py-3 header">
          <h4>
            <i className="fa fa-shopping-bag fa-1x m-2"></i>Store {""}
          </h4>
        </div>

        <div className="row my-3">
          <div className="col-lg-3">
            <h4>Brands</h4>
            <ul className="list-group list-group-flush">
              {Brands.map(brand => (
                <li className="list-group-item" key={brand.id}>
                  <div className=" form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`chk_${brand.id}`}
                      checked={brand.isChecked}
                      onChange={() => handleBrandsChecked(brand.id)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor={`chk_${brand.id}`}
                      id={`chk_${brand.id}`}
                    >
                      {brand.brandName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>

            <h4 className="mt-2">Categories</h4>
            <ul className="list-group list-group-flush">
              {categories.map(category => (
                <li className="list-group-item" key={category.id}>
                  <div className=" form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`chkCategory_${category.id}`}
                      checked={category.isChecked}
                      onChange={() => handlecategorysChecked(category.id)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor={`chkCategory_${category.id}`}
                      id={`chkCategory_${category.id}`}
                    >
                      {category.categoryName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-9 py-2">
            {products.length > 0 ? (
              <>
                <div className="row">
                  {products.map(product => (
                    <Product
                      key={product.id}
                      Product={product}
                      addToCartClick={AddtoCartHandler}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>Loading.....</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Store;
