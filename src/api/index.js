import categoriesData from './categories.json';
import productsData from './products.json';

function getInt(price) {
  if (typeof price !== 'string') {
    return price;
  }
  return parseInt(price.replace(/[^0-9.-]+/g, ''));
}

function priceInRange(price, range) {
  const { max, min } = range;
  const formattedPrice = getInt(price);
  if (
    (min && getInt(min) > formattedPrice) ||
    (max && getInt(max) < formattedPrice)
  ) {
    return false;
  }

  return true;
}

const api = {
  // This will asume the list is so big that request are made to the server instead of using the browser to do this queries
  async getProducts(params = {}) {
    const {
      filters: { stock, range, availability, category } = {},
      sortBy,
      sortOrder
    } = params;
    let { products } = productsData;

    products = products.filter(product => {
      const inCategory = category ? product.sublevel_id === category : true;
      const inRange = range ? priceInRange(product.price, range) : true;
      const hasStock = stock ? product.quantity === getInt(stock) : true;
      const isAvailable =
        availability === 'all' ? true : availability === product.available;

      return inCategory && inRange && hasStock && isAvailable;
    });

    if (sortBy) {
      products.sort((a, b) => {
        return getInt(a[sortBy]) > getInt(b[sortBy])
          ? 1 * sortOrder
          : -1 * sortOrder;
      });
    }
    return products;
  },
  async getCategories() {
    const { categories } = categoriesData;
    return categories;
  }
};

export default api;
