/* =========================================
   KAREN JAIMES UGC — SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            // Ignorar enlaces que solamente tienen "#"
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            // Si no existe el destino, no hacemos nada
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


    /* =====================================
       ANIMACIONES AL HACER SCROLL
    ===================================== */

    const animatedElements = document.querySelectorAll(
        ".service-card, .portfolio-card, .process-item, .about-point"
    );

    // Comprobar si el navegador soporta IntersectionObserver
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(
                            entry.target
                        );

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

        // Para navegadores antiguos
        animatedElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================
       CONTROL DE IMÁGENES
       
       Si una imagen todavía no existe,
       evitamos mostrar el típico ícono
       de imagen rota.
    ===================================== */

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


    /* =====================================
       AÑO AUTOMÁTICO
       
       Si el HTML tiene:
       
       <span id="current-year"></span>
       
       automáticamente colocará el año actual.
    ===================================== */

    const currentYear = document.getElementById(
        "current-year"
    );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================
       MENSAJE DE COMPROBACIÓN
       
       Sirve para verificar desde la consola
       del navegador que JavaScript está
       funcionando correctamente.
    ===================================== */

    console.log(
        "Karen Jaimes UGC Portfolio cargado correctamente."
    );

});
