import React from "react";

function Order(props) {
  console.log("Order Rendered=>", props);
  return (
    <React.Fragment>
      <div className="card my-2 shadow">
        <div className="card-body">
          <h4>
            <i className="fa fa-arrow-right"></i> {props.productName}
            {props.isPaymentCompleted == false ? (
              <div className="float-right">
                <button
                  className="btn btn-sm btn-info mx-2"
                  onClick={() =>
                    props.onBuyClick(
                      props.orderId,
                      props.userId,
                      props.productId,
                      props.quantity
                    )
                  }
                >
                  {" "}
                  <i className="fa fa-truck"></i> Buy Now
                </button>
                <button
                  className="btn btn-sm btn-danger mx-2"
                  onClick={() => {
                    props.onDeleteNow(props.orderId);
                  }}
                >
                  {" "}
                  <i className="fa fa-trash-o"></i> Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </h4>
          <table className="table table-sm table-borderless mt-1">
            <tbody>
              <tr>
                <td style={{ width: "120px" }}>Quantity</td>
                <td>{props.quantity}</td>
              </tr>
              <tr>
                <td style={{ width: "100px" }}>Price</td>
                <td>Rs: {props.price}</td>
              </tr>
              <tr>
                <td style={{ width: "100px" }}>Payment done</td>
                <td>{props.isPaymentCompleted ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(Order);
