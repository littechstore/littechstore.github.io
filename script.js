const products = [
  { name: "Pochette étanche pour téléphone", price: 5000, category: "Accessoires" },
  { name: "Collier pour chien", price: 5000, category: "Animaux" },
  { name: "Beurre de cacahouète", price: 6000, category: "Alimentation" },
  { name: "Maillot équipe Sénégal", price: 9000, category: "Vêtements" },
  { name: "Maillot clubs", price: 5000, category: "Vêtements" },
  { name: "Tente de camping", price: 10000, category: "Camping & Outdoor" },
  { name: "Mini machine à laver", price: 15000, category: "Électroménager" },
  { name: "Baskets Nike", price: 20000, category: "Chaussures" },
  { name: "Baskets Jordan", price: 25000, category: "Chaussures" },
  { name: "Baskets Timberland", price: 30000, category: "Chaussures" },
  { name: "Matelas gonflable 1 place - Souple", price: 20000, category: "Camping & Outdoor" },
  { name: "Ventilateur solaire", price: 45000, category: "Électroménager" },
  { name: "Cartouche Nintendo Switch", price: 30000, category: "Jeux vidéo" },
  { name: "Ordinateur portable Lenovo", price: 80000, category: "Informatique" },
  { name: "Apple Watch", price: 150000, category: "Technologie" }
];

const cart = [];

function formatPrice(p) {
  return p.toLocaleString() + ' FCFA';
}

function renderCategories() {
  const categories = ["Tous", ...new Set(products.map(p => p.category))];
  const container = document.getElementById("category-buttons");
  container.innerHTML = '';
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.onclick = () => renderProducts(category);
    container.appendChild(btn);
  });
  container.firstChild.classList.add("active");
}

function renderProducts(selectedCategory = "Tous") {
  const grid = document.getElementById("product-grid");
  const categoryBtns = document.querySelectorAll(".category-buttons button");
  categoryBtns.forEach(btn => btn.classList.remove("active"));
  [...categoryBtns].find(btn => btn.textContent === selectedCategory).classList.add("active");

  const filtered = selectedCategory === "Tous"
    ? products
    : products.filter(p => p.category === selectedCategory);

  grid.innerHTML = '';
  filtered.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";
    const productPage = `produits/produit-${index}.html`;
    card.innerHTML = `
      <a href="${productPage}" style="text-decoration: none; color: inherit;">
        <img src="images/produit-${index}.jpg" alt="${product.name}" style="width:100%; border-radius:8px; margin-bottom: 0.5rem;">
        <h3>${product.name}</h3>
      </a>
      <p><small>${product.category}</small></p>
      <p><strong>${formatPrice(product.price)}</strong></p>
      <button onclick="addToCart(products[${index}])">Ajouter au panier</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart");
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total");

  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name}</span><span>${formatPrice(item.price)}</span>`;
    cartItems.appendChild(li);
  });

  const sum = cart.reduce((acc, p) => acc + p.price, 0);
  total.textContent = "Total : " + formatPrice(sum);
  cartDiv.classList.remove("hidden");
}

document.getElementById("checkout").addEventListener("click", () => {
  alert("Commande passée avec succès ! Vous paierez à la livraison.");
  cart.length = 0;
  updateCart();
  document.getElementById("cart").classList.add("hidden");
});

renderCategories();
renderProducts();
