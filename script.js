const products = {
  chicken: {
    tag: "Best Seller",
    title: "Chicken Protein Bowl",
    price: "Rp25.000",
    image: "images/chicken-protein-bowl.png",
    description:
      "Salad dengan ayam panggang, telur, selada, tomat, timun, jagung, wortel, dan dressing wijen ringan.",
    nutrition: { calories: 430, protein: 32, carbs: 38, fat: 14 },
    message: "Halo GreenBite Salad, saya ingin memesan Chicken Protein Bowl."
  },

  egg: {
    tag: "High Protein",
    title: "Egg Protein Bowl",
    price: "Rp20.000",
    image: "images/egg-protein-bowl.png",
    description:
      "Salad dengan telur rebus, selada, tomat, timun, jagung, wortel, dan dressing ringan.",
    nutrition: { calories: 320, protein: 18, carbs: 30, fat: 15 },
    message: "Halo GreenBite Salad, saya ingin memesan Egg Protein Bowl."
  },

  tuna: {
    tag: "Omega Choice",
    title: "Tuna Salad",
    price: "Rp28.000",
    image: "images/tuna-salad.png",
    description:
      "Salad tuna dengan sayuran segar, jagung, wortel, tomat, dan dressing lemon.",
    nutrition: { calories: 390, protein: 29, carbs: 32, fat: 13 },
    message: "Halo GreenBite Salad, saya ingin memesan Tuna Salad."
  },

  tofu: {
    tag: "Plant Protein",
    title: "Tofu Green Delight",
    price: "Rp23.000",
    image: "images/tofu-green-delight.png",
    description:
      "Salad tahu panggang dengan sayuran segar, jagung, tomat, dan dressing yogurt.",
    nutrition: { calories: 350, protein: 20, carbs: 36, fat: 12 },
    message: "Halo GreenBite Salad, saya ingin memesan Tofu Green Delight."
  },

  tempe: {
    tag: "Local Protein",
    title: "Tempe Protein Bowl",
    price: "Rp22.000",
    image: "images/tempe-protein-bowl.png",
    description:
      "Salad tempe panggang dengan sayuran segar, jagung, tomat, dan dressing ringan.",
    nutrition: { calories: 370, protein: 21, carbs: 40, fat: 16 },
    message: "Halo GreenBite Salad, saya ingin memesan Tempe Protein Bowl."
  }
};

const toppings = {
  egg: { calories: 75, protein: 6, carbs: 1, fat: 5 },
  corn: { calories: 65, protein: 2, carbs: 14, fat: 1 },
  dressing: { calories: 90, protein: 1, carbs: 4, fat: 8 },
  avocado: { calories: 120, protein: 2, carbs: 6, fat: 11 }
};

const whatsappNumber = "6283196703484";

const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalVisual = document.getElementById("modalVisual");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCal = document.getElementById("modalCal");
const modalProtein = document.getElementById("modalProtein");
const modalCarbs = document.getElementById("modalCarbs");
const modalFat = document.getElementById("modalFat");
const modalOrder = document.getElementById("modalOrder");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("show"));
});

function rupiahMessage(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function openModal(productKey) {
  const item = products[productKey];
  if (!item) return;

  modalTag.textContent = item.tag;
  modalTitle.textContent = item.title;
  modalDesc.textContent = `${item.description} Harga: ${item.price}.`;
  modalCal.textContent = item.nutrition.calories;
  modalProtein.textContent = `${item.nutrition.protein}g`;
  modalCarbs.textContent = `${item.nutrition.carbs}g`;
  modalFat.textContent = `${item.nutrition.fat}g`;
modalOrder.href = rupiahMessage(item.message);

modalVisual.className = "modal-visual";

const productImage = document.createElement("img");
productImage.src = item.image;
productImage.alt = item.title;

modalVisual.replaceChildren(productImage);

modal.classList.add("show");
modal.setAttribute("aria-hidden", "false");
document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.product));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

const form = document.getElementById("nutritionForm");
const calories = document.getElementById("calories");
const protein = document.getElementById("protein");
const carbs = document.getElementById("carbs");
const fat = document.getElementById("fat");

function calculateNutrition() {
  const selected = document.getElementById("base").value;
  const portion = Math.max(1, Number(document.getElementById("portion").value) || 1);
  const baseNutrition = { ...products[selected].nutrition };

  document.querySelectorAll("fieldset input[type='checkbox']:checked").forEach((input) => {
    const extra = toppings[input.value];
    if (!extra) return;
    baseNutrition.calories += extra.calories;
    baseNutrition.protein += extra.protein;
    baseNutrition.carbs += extra.carbs;
    baseNutrition.fat += extra.fat;
  });

  calories.textContent = Math.round(baseNutrition.calories * portion);
  protein.textContent = `${Math.round(baseNutrition.protein * portion)}g`;
  carbs.textContent = `${Math.round(baseNutrition.carbs * portion)}g`;
  fat.textContent = `${Math.round(baseNutrition.fat * portion)}g`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateNutrition();
});

document.getElementById("base").addEventListener("change", calculateNutrition);
document.getElementById("portion").addEventListener("input", calculateNutrition);
document.querySelectorAll("fieldset input[type='checkbox']").forEach((input) => {
  input.addEventListener("change", calculateNutrition);
});

calculateNutrition();

const dailyCalorieBtn = document.getElementById("dailyCalorieBtn");
const dailyCalories = document.getElementById("dailyCalories");
const dailyBmi = document.getElementById("dailyBmi");
const dailyProtein = document.getElementById("dailyProtein");
const dailyStatus = document.getElementById("dailyStatus");

function getBmiStatus(bmi) {
  if (bmi < 18.5) return "Kurus";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Berlebih";
  return "Obesitas";
}

function calculateDailyNeeds() {
  const gender = document.getElementById("gender").value;
  const age = Number(document.getElementById("age").value);
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);
  const activity = Number(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  if (!age || !weight || !height) {
    dailyCalories.textContent = "0";
    dailyBmi.textContent = "0";
    dailyProtein.textContent = "0g";
    dailyStatus.textContent = "Isi data";
    return;
  }

  let bmr;

  if (gender === "male") {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  let totalCalories = bmr * activity;

  if (goal === "lose") {
    totalCalories -= 300;
  } else if (goal === "gain") {
    totalCalories += 300;
  }

  const heightMeter = height / 100;
  const bmi = weight / (heightMeter * heightMeter);
  const proteinNeed = weight * 1.2;

  dailyCalories.textContent = Math.round(totalCalories);
  dailyBmi.textContent = bmi.toFixed(1);
  dailyProtein.textContent = `${Math.round(proteinNeed)}g`;
  dailyStatus.textContent = getBmiStatus(bmi);
}

dailyCalorieBtn.addEventListener("click", calculateDailyNeeds);


const nutritionTabs = document.querySelectorAll(".nutrition-tab");
const nutritionPanels = document.querySelectorAll(".nutrition-panel");

nutritionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetPanel = tab.dataset.tab;

    nutritionTabs.forEach((item) => {
      item.classList.remove("active");
    });

    nutritionPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    tab.classList.add("active");
    document.getElementById(targetPanel).classList.add("active");
  });
});