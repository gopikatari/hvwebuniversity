import React, { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "../UserContext";
import Order from "./Order";
import { OrderService, ProductService } from "./../services/Service";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showOrderDeleted, setShowOrderDeleted] = useState(false);
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);
  const _userContext = useContext(UserContext);

  let getDataAsync = useCallback(async () => {
    let res = await fetch(
      `http://localhost:5000/orders?userId=${_userContext.user.currentUserID}`,
      {
        method: "GET",
      }
    );

    if (res.ok) {
      const orders = await res.json();
      //
      //get Products
      // let productsResponse = await fetch("http://localhost:5000/products", {
      //   method: "GET",
      // });

      let productsResponse = await ProductService.fetchProducts();

      if (productsResponse.ok) {
        let products = await productsResponse.json();

        orders.forEach(order => {
          // order.product = products.find(
          //   product => product.id === order.productId
          // );

          order.product = ProductService.getProductByProuctId(
            products,
            order.productId
          );
        });
      }
      console.log(orders);
      setOrders(orders);
    }
  }, [_userContext.user.currentUserID]);
  useEffect(() => {
    document.title = "Dashboard";
    getDataAsync();
  }, [_userContext.user.currentUserID, getDataAsync]);

  //props handlers

  const onBuyNowClick = useCallback(
    async (orderID, userId, productId, quantity) => {
      if (window.confirm(`Are you sure you want to purchase ??`)) {
        let updatedOrder = {
          id: orderID,
          userId: userId,
          productId: productId,
          quantity: quantity,
          isPaymentCompleted: true,
        };

        let response = await fetch(`http://localhost:5000/orders/${orderID}`, {
          method: "PUT",
          body: JSON.stringify(updatedOrder),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          let data = await response.json();
          console.log(data);

          setShowOrderPlaced(true);
          await getDataAsync();
        }
      }
    },
    [getDataAsync]
  );
  const onDeleteNowClick = useCallback(
    async orderID => {
      if (window.confirm(`Are you sure you want to delete ?`)) {
        let response = await fetch(`http://localhost:5000/orders/${orderID}`, {
          method: "DELETE",
        });

        if (response.ok) {
          let body = await response.json();

          setShowOrderDeleted(true);
          getDataAsync();
        }
      }
    },
    [getDataAsync]
  );
  return (
    <>
      <div className="row">
        <div className="col-12 py-3 header">
          <h4>
            <i className="fa fa-dashboard fa-1x m-2"></i>Dashboard {""}
            <button className="btn btn-sm btn-info" onClick={getDataAsync}>
              <i className="fa fa-refresh mr-1"></i>
              Refresh
            </button>
          </h4>
        </div>

        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6">
              <h4 className="border-bottom text-info my-2 py-2 border-info">
                <i className="fa fa-history"></i> Previous Orders..{" "}
                <span className="badge badge-info">
                  {OrderService.getPreviousOrders(orders).length}
                </span>
              </h4>

              {OrderService.getPreviousOrders(orders).length == 0 ? (
                <div className="text-danger">No Orders</div>
              ) : (
                ""
              )}

              {OrderService.getPreviousOrders(orders).map(order => (
                <Order
                  key={order.id}
                  productId={order.productId}
                  quantity={order.quantity}
                  isPaymentCompleted={order.isPaymentCompleted}
                  userId={order.userId}
                  orderId={order.id}
                  price={order.product.price}
                  productName={order.product.productName}
                  onBuyNow={onBuyNowClick}
                  onDeleteNow={onDeleteNowClick}
                />
              ))}
            </div>
            <div className="col-lg-6">
              <h4 className="border-bottom text-primary my-2 py-2 border-primary">
                <i className="fa fa-shopping-cart"></i> Cart{" "}
                <span className="badge badge-primary">
                  {OrderService.getCartItems(orders).length}
                </span>
              </h4>
              {showOrderPlaced ? (
                <div className="col-12">
                  <div
                    className="alert alert-success alert-dismissible mt-1"
                    role="alert"
                  >
                    Your order has been Placed
                    <button
                      className="close"
                      type="button"
                      data-dismiss="alert"
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}

              {showOrderDeleted ? (
                <div className="col-12">
                  <div
                    className="alert alert-danger alert-dismissible mt-1"
                    role="alert"
                  >
                    Your order has been deleted
                    <button
                      className="close"
                      type="button"
                      data-dismiss="alert"
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              {OrderService.getCartItems(orders).length == 0 ? (
                <div className="text-danger">No Orders Present in the cart</div>
              ) : (
                ""
              )}

              {OrderService.getCartItems(orders).map(order => (
                <Order
                  key={order.id}
                  productId={order.productId}
                  quantity={order.quantity}
                  isPaymentCompleted={order.isPaymentCompleted}
                  userId={order.userId}
                  orderId={order.id}
                  price={order.product.price}
                  productName={order.product.productName}
                  onBuyClick={onBuyNowClick}
                  onDeleteNow={onDeleteNowClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
