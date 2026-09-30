/* =========================================
   KAREN JAIMES UGC — SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       SCROLL ANIMATIONS
    ========================================= */

    const animatedElements = document.querySelectorAll(
        ".service-card, .portfolio-card, .process-item, .about-point"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach(function (element) {

            element.classList.add("animate");

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =========================================
       LIGHTBOX PORTFOLIO
    ========================================= */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    const portfolioLinks = Array.from(
        document.querySelectorAll(".portfolio-lightbox")
    );

    let currentImage = 0;


    function openLightbox(index) {

        if (!portfolioLinks.length) {
            return;
        }

        currentImage = index;

        const image = portfolioLinks[currentImage].querySelector("img");

        if (!image) {
            return;
        }

        lightboxImage.src = portfolioLinks[currentImage].href;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.classList.add("lightbox-open");

    }


    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove("lightbox-open");

        setTimeout(function () {
            lightboxImage.src = "";
        }, 300);

    }


    function showNextImage() {

        currentImage++;

        if (currentImage >= portfolioLinks.length) {
            currentImage = 0;
        }

        openLightbox(currentImage);

    }


    function showPreviousImage() {

        currentImage--;

        if (currentImage < 0) {
            currentImage = portfolioLinks.length - 1;
        }

        openLightbox(currentImage);

    }


    portfolioLinks.forEach(function (link, index) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            openLightbox(index);

        });

    });


    if (closeButton) {

        closeButton.addEventListener("click", function () {

            closeLightbox();

        });

    }


    if (nextButton) {

        nextButton.addEventListener("click", function (event) {

            event.stopPropagation();

            showNextImage();

        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", function (event) {

            event.stopPropagation();

            showPreviousImage();

        });

    }


    /* Cerrar haciendo clic fuera de la imagen */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* Navegación con teclado */

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

    });


    /* =========================================
       IMAGE ERROR HANDLING
    ========================================= */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            this.style.display = "none";

            const parent = this.parentElement;

            if (parent) {
                parent.classList.add("image-missing");
            }

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    console.log(
        "Karen Jaimes UGC Portfolio cargado correctamente."
    );

});
