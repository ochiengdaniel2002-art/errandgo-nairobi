/* =========================================================
   ERRANDGO — ENHANCED SCRIPT
   "Your Errand. Our Mission."
========================================================= */

const ERRANDGO_CONFIG = {
    whatsappNumber: "254181903225",
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
   REQUEST / BOOKING FORM
===================================================== */

const errandForm = document.getElementById("errandRequestForm");

if (errandForm) {

    const serviceSelect = document.getElementById("service");
    const dateInput = document.getElementById("preferredDate");

    /* =================================================
       SET MINIMUM DATE TO TODAY
    ================================================= */

    if (dateInput) {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }

    /* =================================================
       SERVICE QUERY PARAMETERS
       Example:
       request.html?service=shopping
    ================================================= */

    if (serviceSelect) {

        const urlParams =
            new URLSearchParams(window.location.search);

        const selectedService =
            urlParams.get("service");

        const serviceMap = {
            shopping: "Shopping & Grocery Runs",
            delivery: "Pickups & Deliveries",
            personal: "Personal Errands",
            document: "Document Runs",
            business: "Business Errands",
            other: "Other"
        };

        if (
            selectedService &&
            serviceMap[selectedService]
        ) {
            serviceSelect.value =
                serviceMap[selectedService];
        }
    }

    /* =================================================
       FORM SUBMISSION
    ================================================= */

    errandForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName =
            document.getElementById("fullName")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const selectedService =
            document.getElementById("service")?.value || "";

        const pickup =
            document.getElementById("pickupLocation")?.value.trim() || "";

        const destination =
            document.getElementById("destination")?.value.trim() || "";

        const locationDetails =
            document.getElementById("locationDetails")?.value.trim() || "";

        const preferredDate =
            document.getElementById("preferredDate")?.value || "";

        const preferredTime =
            document.getElementById("preferredTime")?.value || "";

        const description =
            document.getElementById("description")?.value.trim() || "";

        const budget =
            document.getElementById("budget")?.value || "";

        const urgency =
            document.getElementById("urgency")?.value || "";

        const instructions =
            document.getElementById("instructions")?.value.trim() || "";

        if (
            !fullName ||
            !phone ||
            !selectedService ||
            !pickup ||
            !preferredDate ||
            !preferredTime ||
            !description
        ) {
            alert("Please complete all required fields.");
            return;
        }

        /* =================================================
           PHONE VALIDATION
        ================================================= */

        const cleanPhone =
            phone.replace(/[\s\-()]/g, "");

        const phonePattern =
            /^\+?[0-9]{9,15}$/;

        if (!phonePattern.test(cleanPhone)) {
            alert("Please enter a valid phone number.");
            document.getElementById("phone")?.focus();
            return;
        }

        /* =================================================
           DATE VALIDATION
        ================================================= */

        const selectedDate =
            new Date(preferredDate + "T00:00:00");

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if (selectedDate < todayDate) {
            alert("Please select today or a future date.");
            dateInput?.focus();
            return;
        }

        /* =================================================
           FORMAT DATE
        ================================================= */

        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-KE",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

        /* =================================================
           FORMAT TIME
        ================================================= */

        let formattedTime = preferredTime;

        if (preferredTime) {
            const timeDate =
                new Date("1970-01-01T" + preferredTime);

            formattedTime =
                timeDate.toLocaleTimeString(
                    "en-KE",
                    {
                        hour: "numeric",
                        minute: "2-digit"
                    }
                );
        }

        /* =================================================
           WHATSAPP MESSAGE
        ================================================= */

        const message =
`Hello ErrandGo! 👋

I'd like to make an errand request.

━━━━━━━━━━━━━━━━━━
📋 REQUEST DETAILS
━━━━━━━━━━━━━━━━━━

Service:
${selectedService}

Priority:
${urgency || "Standard"}

Preferred Date:
${formattedDate}

Preferred Time:
${formattedTime}

━━━━━━━━━━━━━━━━━━
👤 CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━

Name:
${fullName}

Phone:
${phone}

Email:
${email || "Not provided"}

━━━━━━━━━━━━━━━━━━
📍 LOCATION DETAILS
━━━━━━━━━━━━━━━━━━

Pickup / Starting Location:
${pickup}

Destination:
${destination || "Not applicable"}

Location Details:
${locationDetails || "None provided"}

━━━━━━━━━━━━━━━━━━
📝 ERRAND DETAILS
━━━━━━━━━━━━━━━━━━

What needs to be done:
${description}

Estimated Budget:
${budget || "Not specified"}

Additional Instructions:
${instructions || "None provided"}

━━━━━━━━━━━━━━━━━━

Please confirm availability and the service fee.

Thank you,
${fullName}

Sent via the ErrandGo website.`;

        /* =================================================
           OPEN WHATSAPP
        ================================================= */

        const whatsappURL =
            "https://wa.me/" +
            ERRANDGO_CONFIG.whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        const whatsappWindow =
            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        if (!whatsappWindow) {
            alert(
                "Your browser blocked the WhatsApp window. " +
                "Please allow pop-ups for ErrandGo and try again."
            );
        }
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

/* =========================================================
   FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqQuestions =
        document.querySelectorAll(".faq-question");


    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const currentItem =
                question.closest(".faq-item");

            const isAlreadyOpen =
                currentItem.classList.contains("active");


            /* Close all FAQs */

            document.querySelectorAll(".faq-item")
                .forEach(function (item) {

                    item.classList.remove("active");

                    const button =
                        item.querySelector(".faq-question");

                    if (button) {
                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                });


            /* Open selected FAQ */

            if (!isAlreadyOpen) {

                currentItem.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});
