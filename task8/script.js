
document.addEventListener("DOMContentLoaded", function() {
    const openFormBtn = document.getElementById("openFormBtn");
    const closeFormBtn = document.getElementById("closeFormBtn");
    const popupForm = document.getElementById("popupForm");
    const feedbackForm = document.getElementById("feedbackForm");
    const submitBtn = document.getElementById("submitBtn");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    
    const STORAGE_KEY = "feedbackFormData";
    
    openFormBtn.addEventListener("click", function() {
        popupForm.classList.add("active");
        history.pushState({ formOpen: true }, "", "#feedback-form");
        restoreFormData();
    });
    
    function closeForm() {
        popupForm.classList.remove("active");
        history.pushState(null, "", window.location.pathname);
        hideMessages();
    }
    
    closeFormBtn.addEventListener("click", closeForm);
    
    window.addEventListener("popstate", function(event) {
        if (popupForm.classList.contains("active")) {
            closeForm();
        }
    });

    function saveFormData() {
        const formData = {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            organization: document.getElementById("organization").value,
            message: document.getElementById("message").value,
            consent: document.getElementById("consent").checked
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    
    function restoreFormData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById("fullName").value = formData.fullName || "";
            document.getElementById("email").value = formData.email || "";
            document.getElementById("phone").value = formData.phone || "";
            document.getElementById("organization").value = formData.organization || "";
            document.getElementById("message").value = formData.message || "";
            document.getElementById("consent").checked = formData.consent || false;
        }
    }

    function clearFormData() {
        localStorage.removeItem(STORAGE_KEY);
        feedbackForm.reset();
    }

    const formInputs = feedbackForm.querySelectorAll("input, textarea");
    formInputs.forEach(input => {
        input.addEventListener("input", saveFormData);
    });

    function showSuccess() {
        successMessage.style.display = "block";
        errorMessage.style.display = "none";
    }

    function showError() {
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
    }

    function hideMessages() {
        successMessage.style.display = "none";
        errorMessage.style.display = "none";
    }

    feedbackForm.addEventListener("submit", function(e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = "Отправка...";

        const formData = new FormData(feedbackForm);
        const data = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            organization: formData.get("organization"),
            message: formData.get("message"),
            consent: formData.get("consent") === "on"
        };

        fetch("https://formcarry.com/s/5VOmg8SubDp", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                showSuccess();
                clearFormData();
                setTimeout(() => {
                    closeForm();
                }, 3000);
            } else {
                throw new Error("Ошибка сети");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            showError();
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Отправить";
        });
    });
    
    if (window.location.hash === "#feedback-form") {
        popupForm.classList.add("active");
        restoreFormData();
    }
});
