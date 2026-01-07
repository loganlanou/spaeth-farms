// Cart management with Alpine.js
// This provides a global cart() function for Alpine.js x-data

function cart() {
  return {
    items: [],
    open: false,

    init() {
      this.loadCart();
    },

    loadCart() {
      const stored = localStorage.getItem('cart');
      this.items = stored ? JSON.parse(stored) : [];
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },

    get cartCount() {
      return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    get total() {
      return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    get cartSubtotal() {
      return this.total / 100;
    },

    get amountToFreeShipping() {
      return Math.max(0, 199 - this.cartSubtotal);
    },

    addItem(product, quantity = 1) {
      const existing = this.items.find(item => item.slug === product.slug);
      if (existing) {
        existing.qty += quantity;
      } else {
        this.items.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          weight: product.weight || '',
          qty: quantity
        });
      }
      this.saveCart();
    },

    updateQty(slug, qty) {
      if (qty <= 0) {
        this.removeItem(slug);
        return;
      }
      const item = this.items.find(i => i.slug === slug);
      if (item) {
        item.qty = qty;
        this.saveCart();
      }
    },

    updateCartQuantity(slug, qty) {
      this.updateQty(slug, qty);
    },

    removeItem(slug) {
      this.items = this.items.filter(i => i.slug !== slug);
      this.saveCart();
    },

    removeFromCart(slug) {
      this.removeItem(slug);
    },

    clearCart() {
      this.items = [];
      this.saveCart();
    }
  };
}

// Global function for adding to cart from product cards
function addToCart(product, quantity = 1) {
  const cartEl = document.querySelector('[x-data]');
  if (cartEl) {
    Alpine.$data(cartEl).addItem(product, quantity);
    Alpine.$data(cartEl).open = true;
  }
}
