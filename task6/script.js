document.addEventListener("DOMContentLoaded", function() {
const quantityInput = document.getElementById("quantity");
const prodTypeRadios = document.querySelectorAll("input[name='prodType']");
const optionsGroup = document.getElementById("optionsGroup");
const optionsSelect = document.getElementById("options");
const propertyGroup = document.getElementById("propertyGroup");
const propertyCheckbox = document.getElementById("property");
const totalPriceElement = document.getElementById("totalPrice");

const basePrices = {
t1: 500,
t2: 1000,
t3: 1500
};

quantityInput.addEventListener("input", calculateTotal);
optionsSelect.addEventListener("change", calculateTotal);
propertyCheckbox.addEventListener("change", calculateTotal);
prodTypeRadios.forEach((radio) => {
radio.addEventListener("change", function() {
    updateFormVisibility();
    calculateTotal();
});
});

updateFormVisibility();
calculateTotal();

function updateFormVisibility() {
const selectedType = document.querySelector("input[name='prodType']:checked").value;

optionsSelect.selectedIndex = 0;
propertyCheckbox.checked = false;
optionsGroup.style.display = "none";
propertyGroup.style.display = "none";

switch(selectedType) {
    case "t2":
        optionsGroup.style.display = "block";
        break;
    case "t3":
        propertyGroup.style.display = "block";
        break;
}
}

function calculateTotal() {
const quantity = parseInt(quantityInput.value) || 0;
const selectedType = document.querySelector("input[name='prodType']:checked").value;

let total = basePrices[selectedType] * quantity;

if (selectedType === "t2") {
    const optionPrice = parseInt(optionsSelect.value);
    total += optionPrice * quantity;
}

if (selectedType === "t3" && propertyCheckbox.checked) {
    total += 300 * quantity;
}

totalPriceElement.textContent = total;
}
});