const PRODUCTS = [
  {
    id: "blue-flame-tee",
    name: "Blue Flame Tee",
    price: 39.99,
    salePrice: 33.99,
    tags: ["sale", "new", "featured"],
    image: "assets/products/blue-flame-1.webp",
    hover: "assets/products/blue-flame-2.webp",
    description: "Cold flame graphic on heavyweight cotton. Limited ORIGIN stock.",
  },
  {
    id: "bushido-tee",
    name: "Bushido Tee",
    price: 39.99,
    salePrice: null,
    tags: ["new"],
    image: "assets/products/bushido-1.webp",
    hover: "assets/products/bushido-2.webp",
    description: "Code of the warrior — clean type, street fit.",
  },
  {
    id: "demon-blood-tee",
    name: "Demon Blood Tee",
    price: 39.99,
    salePrice: 33.99,
    tags: ["sale", "featured"],
    image: "assets/products/demon-blood-1.webp",
    hover: "assets/products/demon-blood-2.webp",
    description: "Ember red artwork for late nights.",
  },
  {
    id: "domain-expansion-tee",
    name: "Domain Expansion Tee",
    price: 39.99,
    salePrice: null,
    tags: ["new", "featured"],
    image: "assets/products/domain-expansion-1.webp",
    hover: "assets/products/domain-expansion-2.webp",
    description: "Wide graphic field. Works oversized.",
  },
  {
    id: "free-soul-tee",
    name: "Free Soul Tee",
    price: 39.99,
    salePrice: null,
    tags: ["new"],
    image: "assets/products/free-soul-1.webp",
    hover: "assets/products/free-soul-2.webp",
    description: "Soft contrast print. Easy everyday piece.",
  },
  {
    id: "limitless-tee",
    name: "Limitless Tee",
    price: 39.99,
    salePrice: null,
    tags: ["new"],
    image: "assets/products/limitless-1.webp",
    hover: "assets/products/limitless-2.webp",
    description: "Infinity line motif for people who keep going.",
  },
  {
    id: "paradise-spirit-tee",
    name: "Paradise Spirit Tee",
    price: 39.99,
    salePrice: null,
    tags: ["new"],
    image: "assets/products/paradise-spirit-1.webp",
    hover: "assets/products/paradise-spirit-2.webp",
    description: "Sun-washed spirit mark on charcoal cotton.",
  },
  {
    id: "warrior-spirit-tee",
    name: "Warrior Spirit Tee",
    price: 39.99,
    salePrice: 33.99,
    tags: ["sale", "featured"],
    image: "assets/products/warrior-spirit-1.webp",
    hover: "assets/products/warrior-spirit-2.webp",
    description: "Battle-ready graphic. On sale while stock lasts.",
  },
  {
    id: "water-breathing-tee",
    name: "Water Breathing Tee",
    price: 39.99,
    salePrice: null,
    tags: ["new"],
    image: "assets/products/water-breathing-1.webp",
    hover: "assets/products/water-breathing-2.webp",
    description: "Flow-form print with cold blue accents.",
  },
  {
    id: "will-of-the-sun-tee",
    name: "Will of the Sun Tee",
    price: 39.99,
    salePrice: 33.99,
    tags: ["sale", "featured"],
    image: "assets/products/will-of-the-sun-1.webp",
    hover: "assets/products/will-of-the-sun-2.webp",
    description: "Solar emblem with ember highlights.",
  },
];

function money(n) {
  return "A$" + n.toFixed(2);
}

function priceHTML(product) {
  if (product.salePrice != null) {
    return (
      '<span class="price--sale">' +
      money(product.salePrice) +
      '</span><span class="price--was">' +
      money(product.price) +
      "</span>"
    );
  }
  return "<span>" + money(product.price) + "</span>";
}

function productCardHTML(product) {
  var badge = "";
  if (product.salePrice != null) {
    badge = '<span class="product-card__badge">Sale 15% off</span>';
  } else if (product.tags.indexOf("new") !== -1) {
    badge = '<span class="product-card__badge product-card__badge--new">New</span>';
  }

  return (
    '<article class="product-card" data-tags="' +
    product.tags.join(" ") +
    '" data-id="' +
    product.id +
    '">' +
    '<a class="product-card__media" href="product.html?id=' +
    product.id +
    '">' +
    badge +
    '<img class="img-main" src="' +
    product.image +
    '" alt="' +
    product.name +
    '" loading="lazy">' +
    '<img class="img-alt" src="' +
    product.hover +
    '" alt="" loading="lazy">' +
    "</a>" +
    '<div class="product-card__body">' +
    '<p class="product-card__collection">THE_ORIGIN_DROP</p>' +
    '<h3 class="product-card__name"><a href="product.html?id=' +
    product.id +
    '">' +
    product.name +
    "</a></h3>" +
    '<div class="product-card__price">' +
    priceHTML(product) +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

function observeReveals(nodes) {
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (n) {
      n.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach(function (n, i) {
    n.style.transitionDelay = Math.min(i * 0.05, 0.35) + "s";
    io.observe(n);
  });
}

function renderProductGrid(selector, products) {
  var el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = products.map(productCardHTML).join("");
  observeReveals(el.querySelectorAll(".product-card"));
}

function initHome() {
  var featured = PRODUCTS.filter(function (p) {
    return p.tags.indexOf("featured") !== -1;
  }).slice(0, 4);
  renderProductGrid("[data-featured-grid]", featured);
  renderProductGrid("[data-latest-grid]", PRODUCTS);
}

function initMobileNav() {
  var toggle = document.querySelector("[data-menu-toggle]");
  if (!toggle) return;
  toggle.addEventListener("click", function () {
    document.body.classList.toggle("nav-open");
  });
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
    });
  });
}

function initReveal() {
  observeReveals(document.querySelectorAll(".reveal"));
}

function initNewsletter() {
  document.querySelectorAll("[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type='email']");
      if (input && input.value.trim()) {
        showToast("You're on the list");
        input.value = "";
      }
    });
  });
}


var CART_KEY = "zenji_cart";
var SIZES = ["S", "M", "L", "XL", "XXL"];

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  renderCartDrawer();
}

function cartQty() {
  return getCart().reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);
}

function updateCartCount() {
  var count = cartQty();
  document.querySelectorAll("[data-cart-count]").forEach(function (el) {
    el.textContent = String(count);
  });
}

function showToast(message) {
  var toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function () {
    toast.classList.remove("is-show");
  }, 2000);
}

function addToCart(id, size) {
  var product = PRODUCTS.find(function (p) {
    return p.id === id;
  });
  if (!product || !size) return;

  var cart = getCart();
  var existing = cart.find(function (i) {
    return i.id === id && i.size === size;
  });

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: id,
      size: size,
      qty: 1,
      name: product.name,
      price: product.salePrice != null ? product.salePrice : product.price,
      image: product.image,
    });
  }

  saveCart(cart);
  showToast(product.name + " added");
}

function removeFromCart(id, size) {
  saveCart(
    getCart().filter(function (i) {
      return !(i.id === id && i.size === size);
    })
  );
}

function ensureCartDrawer() {
  if (document.querySelector(".cart-drawer")) return;

  var overlay = document.createElement("div");
  overlay.className = "cart-drawer-overlay";
  overlay.setAttribute("data-cart-close", "");

  var drawer = document.createElement("aside");
  drawer.className = "cart-drawer";
  drawer.innerHTML =
    '<div class="cart-drawer__head">' +
    "<h2>Cart</h2>" +
    '<button type="button" class="cart-close" data-cart-close aria-label="Close">×</button>' +
    "</div>" +
    '<div class="cart-drawer__body" data-cart-body></div>' +
    '<div class="cart-drawer__foot">' +
    '<div class="cart-total"><span>Total</span><span data-cart-total>A$0.00</span></div>' +
    '<button type="button" class="btn btn--primary btn--full" data-checkout>Checkout</button>' +
    '<p class="cart-note">Stored in this browser. Free AU shipping over A$100.</p>' +
    "</div>";

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-cart-open]")) openCart();
    if (e.target.closest("[data-cart-close]")) closeCart();
    if (e.target.closest("[data-checkout]")) {
      if (!getCart().length) {
        showToast("Cart is empty");
        return;
      }
      showToast("Thanks — demo checkout only");
      saveCart([]);
      closeCart();
    }
  });
}

function openCart() {
  ensureCartDrawer();
  renderCartDrawer();
  document.querySelector(".cart-drawer").classList.add("is-open");
  document.querySelector(".cart-drawer-overlay").classList.add("is-open");
}

function closeCart() {
  var d = document.querySelector(".cart-drawer");
  var o = document.querySelector(".cart-drawer-overlay");
  if (d) d.classList.remove("is-open");
  if (o) o.classList.remove("is-open");
}

function renderCartDrawer() {
  var body = document.querySelector("[data-cart-body]");
  var totalEl = document.querySelector("[data-cart-total]");
  if (!body) return;

  var cart = getCart();
  if (!cart.length) {
    body.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    if (totalEl) totalEl.textContent = money(0);
    return;
  }

  var total = 0;
  body.innerHTML = cart
    .map(function (item) {
      total += item.price * item.qty;
      return (
        '<div class="cart-item">' +
        '<img src="' +
        item.image +
        '" alt="">' +
        "<div>" +
        '<div class="cart-item__name">' +
        item.name +
        "</div>" +
        '<div class="cart-item__meta">Size ' +
        item.size +
        " · Qty " +
        item.qty +
        "</div>" +
        '<button type="button" class="cart-item__remove" data-remove-id="' +
        item.id +
        '" data-remove-size="' +
        item.size +
        '">Remove</button>' +
        "</div>" +
        "<div>" +
        money(item.price * item.qty) +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  if (totalEl) totalEl.textContent = money(total);

  body.querySelectorAll("[data-remove-id]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeFromCart(btn.getAttribute("data-remove-id"), btn.getAttribute("data-remove-size"));
    });
  });
}

function initShop() {
  var grid = document.querySelector("[data-shop-grid]");
  var countEl = document.querySelector("[data-shop-count]");
  if (!grid) return;

  var filter = "all";

  function apply() {
    var list =
      filter === "all"
        ? PRODUCTS
        : PRODUCTS.filter(function (p) {
            if (filter === "sale") return p.salePrice != null;
            return p.tags.indexOf(filter) !== -1;
          });
    renderProductGrid("[data-shop-grid]", list);
    if (countEl) countEl.textContent = list.length + " pieces";
  }

  document.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      apply();
    });
  });

  apply();
}

function initProductPage() {
  var root = document.querySelector("[data-pdp]");
  if (!root) return;

  var params = new URLSearchParams(location.search);
  var id = params.get("id") || "blue-flame-tee";
  var product =
    PRODUCTS.find(function (p) {
      return p.id === id;
    }) || PRODUCTS[0];

  var gallery = [product.image, product.hover];
  if (product.id === "blue-flame-tee") {
    gallery.push(
      "assets/products/blue-flame-3.webp",
      "assets/products/blue-flame-4.webp",
      "assets/products/blue-flame-5.webp"
    );
  }

  var mainImg = root.querySelector("[data-pdp-main]");
  var thumbs = root.querySelector("[data-pdp-thumbs]");
  var title = root.querySelector("[data-pdp-title]");
  var price = root.querySelector("[data-pdp-price]");
  var desc = root.querySelector("[data-pdp-desc]");
  var sizeGrid = root.querySelector("[data-size-grid]");

  document.title = product.name + " — ZENJI";
  if (title) title.textContent = product.name;
  if (desc) desc.textContent = product.description;
  if (price) price.innerHTML = priceHTML(product);
  if (mainImg) {
    mainImg.src = gallery[0];
    mainImg.alt = product.name;
  }

  if (thumbs) {
    thumbs.innerHTML = gallery
      .map(function (src, i) {
        return (
          '<button type="button" class="' +
          (i === 0 ? "is-active" : "") +
          '" data-thumb="' +
          src +
          '"><img src="' +
          src +
          '" alt=""></button>'
        );
      })
      .join("");

    thumbs.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        thumbs.querySelectorAll("button").forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        if (mainImg) mainImg.src = btn.getAttribute("data-thumb");
      });
    });
  }

  var selectedSize = "M";
  if (sizeGrid) {
    sizeGrid.innerHTML = SIZES.map(function (s) {
      return (
        '<button type="button" class="size-btn' +
        (s === selectedSize ? " is-active" : "") +
        '" data-size="' +
        s +
        '">' +
        s +
        "</button>"
      );
    }).join("");

    sizeGrid.querySelectorAll("[data-size]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectedSize = btn.getAttribute("data-size");
        sizeGrid.querySelectorAll(".size-btn").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
      });
    });
  }

  var addBtn = root.querySelector("[data-add-cart]");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      addToCart(product.id, selectedSize);
      openCart();
    });
  }

  var related = PRODUCTS.filter(function (p) {
    return p.id !== product.id;
  }).slice(0, 4);
  renderProductGrid("[data-related-grid]", related);
}

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initReveal();
  initNewsletter();
  ensureCartDrawer();
  updateCartCount();
  initHome();
  initShop();
  initProductPage();
});
