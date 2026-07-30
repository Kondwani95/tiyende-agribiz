const sampleStock = [
  { name: "Maize", icon: "🌽", status: "available", quantity: "Ask for quantity", unit: "50 kg bags", grade: "Quality grain" },
  { name: "Groundnuts", icon: "🥜", status: "available", quantity: "Ask for quantity", unit: "kg / bags", grade: "Selected nuts" },
  { name: "Beans", icon: "🫘", status: "low_stock", quantity: "Limited", unit: "kg / bags", grade: "Cleaned beans" },
  { name: "Soybeans", icon: "🌱", status: "available", quantity: "Ask for quantity", unit: "50 kg bags", grade: "Quality grain" },
  { name: "Rice", icon: "🍚", status: "available", quantity: "Ask for quantity", unit: "kg / bags", grade: "Cleaned rice" },
  { name: "Sunflower", icon: "🌻", status: "unavailable", quantity: "Out of stock", unit: "50 kg bags", grade: "Oil seed" }
];

let allStock = sampleStock;
const grid = document.querySelector("#stock-grid");
const message = document.querySelector("#stock-message");
const search = document.querySelector("#stock-search");
const icons = { maize: "🌽", groundnuts: "🥜", beans: "🫘", soybeans: "🌱", soyabeans: "🌱", rice: "🍚", sunflower: "🌻" };

function safe(value) {
  const el = document.createElement("span");
  el.textContent = value ?? "";
  return el.innerHTML;
}

function statusLabel(status) {
  return ({ available: "Available", low_stock: "Low stock", unavailable: "Unavailable" })[status] || "Contact us";
}

function render(items) {
  grid.innerHTML = items.map(item => {
    const status = ["available", "low_stock", "unavailable"].includes(item.status) ? item.status : "available";
    const icon = item.icon || icons[String(item.name).toLowerCase()] || "🌾";
    const whatsapp = `https://wa.me/265991645725?text=${encodeURIComponent(`Hello Tiyende Agribiz, I would like to ask about ${item.name}.`)}`;
    return `<article class="stock-card"><div class="stock-top"><span class="produce-icon" aria-hidden="true">${icon}</span><span class="badge ${status}">${statusLabel(status)}</span></div><h3>${safe(item.name)}</h3><div class="stock-meta"><span>${safe(item.quantity || "Ask for quantity")}</span><span>${safe(item.unit || "")}</span></div><span>${safe(item.grade || "Farm produce")}</span><a class="enquire" href="${whatsapp}" target="_blank" rel="noopener">Enquire about ${safe(item.name)} →</a></article>`;
  }).join("");
  message.hidden = items.length !== 0;
  message.textContent = items.length ? "" : "No produce matches your search.";
}

async function loadStock() {
  const config = window.TIYENDE_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) return render(sampleStock);
  try {
    const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    const { data, error } = await client.from("stock").select("name,status,quantity,unit,grade,icon").order("display_order");
    if (error) throw error;
    allStock = data?.length ? data : sampleStock;
  } catch (error) {
    console.warn("Using sample stock because Supabase could not be reached.", error);
  }
  render(allStock);
}

search.addEventListener("input", event => render(allStock.filter(item => item.name.toLowerCase().includes(event.target.value.trim().toLowerCase()))));
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => { const open = nav.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
nav.addEventListener("click", () => { nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); });
document.querySelector("#year").textContent = new Date().getFullYear();
loadStock();
