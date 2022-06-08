import React, { useState } from "react";

function Product(props) {
  console.log(props.Product);
  const [prod] = useState(props.Product);

  return (
    <>
      <div className="col-lg-6">
        <div className="card m-1">
          <div className="card-body">
            <h5>
              <i className="fa fa-arrow-right"></i> {prod.productName}
            </h5>
            <div>Rs:{prod.price.toFixed(2)}</div>
            <div className="mt-2 text-muted">
              #{prod.brand.brandName} <span>#{prod.category.categoryName}</span>
            </div>

            <div>
              {[...Array(prod.rating).keys()].map(n => (
                <i key={n} className="fa fa-star text-warning"></i>
              ))}
              {[...Array(5 - prod.rating).keys()].map(n => (
                <i key={n} className="fa fa-star-o text-secondary"></i>
              ))}
            </div>

            <div className="float-right">
              {prod.isOrdered ? (
                <span className="text-primary">Added to Cart!!</span>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => props.addToCartClick(prod)}
                >
                  <i className="fa fa-cart-plus mr-2"></i>Add to Cart!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Product);
