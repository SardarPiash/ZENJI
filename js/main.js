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
        alert("You're on the list");
        input.value = "";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initReveal();
  initNewsletter();
  initHome();
});
