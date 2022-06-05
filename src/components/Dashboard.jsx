import React, { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "../UserContext";
import Order from "./Order";
import { OrderService, ProductService } from "./../services/Service";

const Dashboard = () => {
  testFunctions();
  const [orders, setOrders] = useState([]);
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
                  orderId={order.orderId}
                  price={order.product.price}
                  productName={order.product.productName}
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
                  orderId={order.orderId}
                  price={order.product.price}
                  productName={order.product.productName}
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
