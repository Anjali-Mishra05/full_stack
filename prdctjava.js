let products = [
    { id: 1, name: "Laptop", price: 1200, description: "Powerful laptop for professionals." },
    { id: 2, name: "Smartphone", price: 800, description: "Latest smartphone with OLED display." },
    { id: 3, name: "Tablet", price: 500, description: "Lightweight and portable tablet." },
    { id: 4, name: "Smartwatch", price: 250, description: "Track your fitness and notifications." },
    { id: 5, name: "Headphones", price: 150, description: "Noise-canceling headphones." },
    { id: 6, name: "Gaming Console", price: 400, description: "Next-gen gaming experience." },
    { id: 7, name: "Wireless Keyboard", price: 80, description: "Ergonomic design with long battery life." },
    { id: 8, name: "Bluetooth Speaker", price: 120, description: "High-quality sound with deep bass." },
    { id: 9, name: "Monitor", price: 300, description: "4K Ultra HD display for professionals." },
    { id: 10, name: "External Hard Drive", price: 200, description: "1TB SSD for fast data transfer." },
    { id: 11, name: "Router", price: 90, description: "High-speed internet router with dual-band." },
    { id: 12, name: "Webcam", price: 60, description: "HD webcam for online meetings and streaming." },
    { id: 13, name: "Fitness Tracker", price: 130, description: "Track your steps, heart rate, and sleep." },
    { id: 14, name: "VR Headset", price: 500, description: "Immersive virtual reality gaming experience." },
    { id: 15, name: "Microphone", price: 110, description: "Professional-grade condenser microphone." },
    { id: 16, name: "Projector", price: 700, description: "Home theater experience with full HD projection." },
    { id: 17, name: "E-Reader", price: 250, description: "E-ink display with adjustable brightness." },
    { id: 18, name: "Camera", price: 900, description: "DSLR camera with 4K video recording." },
    { id: 19, name: "Electric Toothbrush", price: 80, description: "Smart electric toothbrush with AI feedback." },
    { id: 20, name: "Drone", price: 1000, description: "4K drone with advanced stabilization." }
];

function displayProducts(productArray) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (productArray.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    productArray.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <strong style="color:green">$${product.price}</strong>
        `;
        productList.appendChild(productDiv);
    });
}

displayProducts(products);

function filterProducts() {
    const minPriceInput = document.getElementById("minPrice").value.trim();
    const minPrice = parseFloat(minPriceInput); // Convert to number

    if (isNaN(minPrice) || minPrice < 0) {
        alert("Please enter a valid minimum price.");
        return;
    }

    const filteredProducts = products.filter(product => product.price <=minPrice);
    displayProducts(filteredProducts);
}

document.getElementById("filterButton").addEventListener("click", filterProducts);
