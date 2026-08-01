const sampleStock = [
  { name: "Maize", status: "available", quantity: "Ask for quantity", unit: "50 kg bags", grade: "Quality grain" },
  { name: "Groundnuts", status: "available", quantity: "Ask for quantity", unit: "kg / bags", grade: "Selected nuts" },
  { name: "Beans", status: "low_stock", quantity: "Limited", unit: "kg / bags", grade: "Cleaned beans" },
  { name: "Soybeans", status: "available", quantity: "Ask for quantity", unit: "50 kg bags", grade: "Quality grain" },
  { name: "Rice", status: "available", quantity: "Ask for quantity", unit: "kg / bags", grade: "Cleaned rice" },
  { name: "Sunflower", status: "unavailable", quantity: "Out of stock", unit: "50 kg bags", grade: "Oil seed" }
];

const productMarks = { maize: "MZ", groundnuts: "GN", beans: "BN", soybeans: "SB", soyabeans: "SB", rice: "RC", sunflower: "SF" };
let allStock = sampleStock;
let activeFilter = "all";
const grid = document.querySelector("#stock-grid");
const message = document.querySelector("#stock-message");
const search = document.querySelector("#stock-search");
const summary = document.querySelector("#stock-summary");
const filterButtons = [...document.querySelectorAll(".filter-pill")];

function safe(value) {
  const el = document.createElement("span");
  el.textContent = value ?? "";
  return el.innerHTML;
}

function statusLabel(status) {
  return ({ available: "Available", low_stock: "Low stock", unavailable: "Unavailable" })[status] || "Contact us";
}

function visibleStock() {
  const term = search.value.trim().toLowerCase();
  return allStock.filter(item => (activeFilter === "all" || item.status === activeFilter) && String(item.name).toLowerCase().includes(term));
}

function render() {
  const items = visibleStock();
  grid.innerHTML = items.map(item => {
    const status = ["available", "low_stock", "unavailable"].includes(item.status) ? item.status : "available";
    const mark = productMarks[String(item.name).toLowerCase()] || String(item.name).slice(0, 2).toUpperCase();
    const whatsapp = `https://wa.me/265991645725?text=${encodeURIComponent(`Hello Tiyende Agribiz, I would like to ask about ${item.name}.`)}`;
    return `<article class="stock-card"><div class="stock-top"><span class="produce-mark ${status}" aria-hidden="true">${safe(mark)}</span><span class="badge ${status}">${statusLabel(status)}</span></div><h3>${safe(item.name)}</h3><div class="stock-meta"><span>${safe(item.quantity || "Ask for quantity")}</span><span>${safe(item.unit || "")}</span></div><span>${safe(item.grade || "Farm produce")}</span><a class="enquire" href="${whatsapp}" target="_blank" rel="noopener">Enquire about ${safe(item.name)} <span aria-hidden="true">→</span></a></article>`;
  }).join("");
  const availableCount = allStock.filter(item => item.status === "available").length;
  summary.textContent = `${availableCount} of ${allStock.length} products available now · Updated from our live stock list`;
  message.hidden = items.length !== 0;
  message.textContent = items.length ? "" : "No produce matches your search or filter.";
}

async function loadStock() {
  grid.innerHTML = Array.from({ length: 3 }, () => '<div class="stock-card stock-card-loading" aria-hidden="true"><span></span><span></span><span></span></div>').join("");
  const config = window.TIYENDE_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) return render();
  try {
    const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    const { data, error } = await client.from("stock").select("name,status,quantity,unit,grade").order("display_order");
    if (error) throw error;
    allStock = data?.length ? data : sampleStock;
  } catch (error) {
    console.warn("Using the saved stock list because live stock could not be reached.", error);
  }
  render();
}

search.addEventListener("input", render);
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  render();
}));
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => { const open = nav.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
nav.addEventListener("click", () => { nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); });
document.querySelector("#year").textContent = new Date().getFullYear();
loadStock();
