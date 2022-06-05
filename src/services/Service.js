const OrderService = {
  getPreviousOrders: orders => {
    return orders.filter(order => order.isPaymentCompleted === true);
  },

  getCartItems: orders => {
    return orders.filter(order => order.isPaymentCompleted === false);
  },
};

const ProductService = {
  getProductByProuctId: (Products, productID) => {
    return Products.find(product => product.id === productID);
  },
  fetchProducts: () => {
    return fetch("http://localhost:5000/products", { method: "GET" });
  },
};

export { OrderService, ProductService };
