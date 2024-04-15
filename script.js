
const incomeForm = document.getElementById("incomeForm");
const grossIncomeInput = document.getElementById("grossIncome");
const extraIncome = document.getElementById("extraIncome");
const ageGroup = document.getElementById("ageGroup");
const deductions = document.getElementById("deductions");
const grossIncomeError = document.getElementById("grossIncomeError");
const extraIncomeError = document.getElementById("extraIncomeError");
const deductionsError = document.getElementById("deductionsError");

incomeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (grossIncomeInput.value === "") {
    grossIncomeError.classList.remove("d-none");
    grossIncomeInput.classList.add("is-invalid");
  } else {
    grossIncomeError.classList.add("d-none");
    grossIncomeInput.classList.remove("is-invalid");
  }

  if (ageGroup.value === "") {
    ageGroup.classList.add("is-invalid");
  } else {
    ageGroup.classList.remove("is-invalid");
  }

  if (grossIncomeInput.value !== "" && ageGroup.value !== "") {
    let grossIncome = parseFloat(grossIncomeInput.value);
    let extraIncomeValue =
      extraIncome.value === "" ? 0 : parseFloat(extraIncome.value);
    let deductionsValue =
      deductions.value === "" ? 0 : parseFloat(deductions.value);
    let ageGroupValue = ageGroup.value;
    let taxRate = 0;

    // Tax calculation logic
    let totalIncome = grossIncome + extraIncomeValue - deductionsValue;
    if (totalIncome <= 800000) {
      // No tax if income is under or equal to 800,000
      taxRate = 0;
    } else {
      // Calculate tax rate based on age group
      if (ageGroupValue === "18-24") {
        taxRate = totalIncome <= 8000000 ? 0.1 : 0.3;
      } else if (ageGroupValue === "25-34") {
        taxRate = totalIncome <= 8000000 ? 0.2 : 0.4;
      } else if (ageGroupValue === "35-44") {
        taxRate = totalIncome <= 8000000 ? 0.3 : 0.5;
      } else if (ageGroupValue === "45-64") {
        taxRate = totalIncome <= 8000000 ? 0.4 : 0.6;
      } else if (ageGroupValue === "65+") {
        taxRate = totalIncome <= 8000000 ? 0.05 : 0.2;
      }
    }

    // Calculate tax amount
    let taxAmount = totalIncome * taxRate;

    // Calculate net income after tax
    let netIncome = totalIncome - taxAmount;

    // Construct the output message
    let output = `<h4 class="text-center">Your Overall income will be</h4>
        <h5 class="text-center">${netIncome}</h5>
        <p class="text-center">after tax deductions</p>`;

    // Set the modal body content
    document.querySelector("#resultModal .modal-body").innerHTML = output;
    // Show the modal
    $("#resultModal").modal("show");
  }
});

grossIncomeInput.addEventListener("input", function () {
  grossIncomeError.classList.add("d-none");
  grossIncomeInput.classList.remove("is-invalid");
});

ageGroup.addEventListener("change", function () {
  ageGroup.classList.remove("is-invalid");
});

extraIncome.addEventListener("input", function () {
  extraIncomeError.classList.add("d-none");
});

deductions.addEventListener("input", function () {
  deductionsError.classList.add("d-none");
});

document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
