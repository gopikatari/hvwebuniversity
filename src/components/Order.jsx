import React from "react";

function Order(props) {
  console.log("Order Rendered=>", props);
  return (
    <React.Fragment>
      <div className="card my-2 shadow">
        <div className="card-body">
          <h4>
            <i className="fa fa-arrow-right"></i> {props.productName}
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
