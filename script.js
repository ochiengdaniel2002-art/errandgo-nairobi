/* =========================================================
   ERRANDGO — ENHANCED SCRIPT
   "Your Errand. Our Mission."
========================================================= */

const ERRANDGO_CONFIG = {
    whatsappNumber: "254740987815",
    businessName: "ErrandGo",
    tagline: "Your Errand. Our Mission.",
    maxMenuWidth: 768
};

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        function openMenu() {
            navLinks.classList.add("open");
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
            document.body.classList.add("menu-open");
        }

        function closeMenu() {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            document.body.classList.remove("menu-open");
        }

        menuToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (navLinks.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function (e) {
            if (!navLinks.classList.contains("open")) return;
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > ERRANDGO_CONFIG.maxMenuWidth) {
                closeMenu();
            }
        });
    }

    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", function () {
            navbar.classList.toggle("scrolled", window.scrollY > 10);
        });
    }

    /* =====================================================
       SCROLL-TRIGGERED FADE-IN ANIMATIONS
    ===================================================== */

    const fadeElements = document.querySelectorAll(".fade-in");
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* =====================================================
       SERVICE QUERY PARAMETERS
    ===================================================== */

    const serviceMap = {
        shopping: "Shopping & Grocery Runs",
        delivery: "Pickups & Deliveries",
        personal: "Personal Errands",
        document: "Document Runs",
        business: "Business Errands",
        other: "Something Else"
    };

    const serviceSelect = document.getElementById("serviceType");
    if (serviceSelect) {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedService = urlParams.get("service");
        if (selectedService && serviceMap[selectedService]) {
            serviceSelect.value = serviceMap[selectedService];
        }
    }

    /* =====================================================
       REQUEST FORM
    ===================================================== */

    const errandForm = document.getElementById("errandForm");

    if (errandForm) {

        const dateInput = document.getElementById("preferredDate");
        if (dateInput) {
            const today = new Date().toISOString().split("T")[0];
            dateInput.setAttribute("min", today);
        }

        errandForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("customerName");
            const phoneInput = document.getElementById("customerPhone");
            const serviceInput = document.getElementById("serviceType");
            const pickupInput = document.getElementById("pickupLocation");
            const destinationInput = document.getElementById("destination");
            const timeInput = document.getElementById("preferredTime");
            const detailsInput = document.getElementById("errandDetails");
            const budgetInput = document.getElementById("budget");

            const name = nameInput ? nameInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const service = serviceInput ? serviceInput.value.trim() : "";
            const pickup = pickupInput ? pickupInput.value.trim() : "";
            const destination = destinationInput ? destinationInput.value.trim() : "";
            const date = dateInput ? dateInput.value : "";
            const time = timeInput ? timeInput.value : "";
            const details = detailsInput ? detailsInput.value.trim() : "";
            const budget = budgetInput ? budgetInput.value.trim() : "";

            if (!name || !phone || !service || !pickup || !date || !time || !details) {
                alert("Please fill in all required fields.");
                return;
            }

            const cleanPhone = phone.replace(/[\s\-()]/g, "");
            const phonePattern = /^\+?[0-9]{9,15}$/;
            if (!phonePattern.test(cleanPhone)) {
                alert("Please enter a valid phone number.");
                if (phoneInput) phoneInput.focus();
                return;
            }

            const selectedDate = new Date(date + "T00:00:00");
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
            if (selectedDate < todayDate) {
                alert("Please select today or a future date.");
                if (dateInput) dateInput.focus();
                return;
            }

            const formattedDate = selectedDate.toLocaleDateString("en-KE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            const formattedTime = new Date("1970-01-01T" + time).toLocaleTimeString("en-KE", {
                hour: "numeric",
                minute: "2-digit"
            });

            const destinationText = destination || "Not applicable / Same location";
            const budgetText = budget
                ? "KES " + Number(budget).toLocaleString("en-KE")
                : "Not specified";

            const message =
                "*NEW ERRAND REQUEST*\n\n" +
                "\uD83D\uDC64 *Customer:* " + name + "\n\n" +
                "\uD83D\uDCDE *Phone:* " + phone + "\n\n" +
                "\uD83D\uDEF5 *Service:* " + service + "\n\n" +
                "\uD83D\uDCCD *Pickup Location:* " + pickup + "\n\n" +
                "\uD83D\uDCCD *Destination:* " + destinationText + "\n\n" +
                "\uD83D\uDCC5 *Preferred Date:* " + formattedDate + "\n\n" +
                "\uD83D\uDD50 *Preferred Time:* " + formattedTime + "\n\n" +
                "\uD83D\uDCDD *Errand Details:*\n" + details + "\n\n" +
                "\uD83D\uDCB0 *Estimated Budget:* " + budgetText + "\n\n" +
                "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n" +
                "*" + ERRANDGO_CONFIG.businessName + "*\n" +
                "_" + ERRANDGO_CONFIG.tagline + "_\n\n" +
                "Sent via " + ERRANDGO_CONFIG.businessName + " Website";

            const whatsappURL = "https://wa.me/" + ERRANDGO_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
            window.open(whatsappURL, "_blank", "noopener,noreferrer");
        });
    }

    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =====================================================
       SMOOTH SCROLL FOR SAME-PAGE LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

});
