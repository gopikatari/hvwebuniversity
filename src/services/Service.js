function getDataById(collection, id) {
  return collection.find(item => item.id === id);
}
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

const BrandsService = {
  getBrands: async () => {
    let brandsData = await fetch("http://localhost:5000/brands", {
      method: "GET",
    });

    if (brandsData.ok) {
      let brands = await brandsData.json();
      brands.forEach(item => {
        item.isChecked = true;
      });
      return brands;
    }
  },
  getBrandByBrandId: (brands, id) => getDataById(brands, id),
};

const CategoryService = {
  getCategories: async () => {
    let categoryData = await fetch("http://localhost:5000/categories", {
      method: "GET",
    });
    if (categoryData.ok) {
      let categories = await categoryData.json();
      categories.forEach(category => {
        category.isChecked = true;
      });
      return categories;
    }
  },
  getCategoriesByCategoryId: (categories, id) => getDataById(categories, id),
};

const productService = {
  getProducts: async () => {
    let productsData = await fetch("http://localhost:5000/products", {
      method: "GET",
    });
    let products = await productsData.json();
    let brands = await BrandsService.getBrands();
    let categories = await CategoryService.getCategories();

    if (productsData.ok) {
      products.forEach(product => {
        product.brand = getDataById(brands, product.brand);
        product.category = getDataById(categories, product.categoryId);
        product.isOrdered = false;
      });
      return products;
    }
  },
  getProductsByProductId: (Products, id) => getDataById(Products, id),
};
const HandleCheckedState = (collection, id) => {
  return collection.map(item => {
    if (item.id === id) {
      item.isChecked = !item.isChecked;
    }
    return item;
  });
};

export {
  OrderService,
  ProductService,
  BrandsService,
  CategoryService,
  productService,
  HandleCheckedState,
};
