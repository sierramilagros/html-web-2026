// Espera a que el DOM se procese de forma completa
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // --- 1. LÓGICA DEL CARRUSEL DE IMÁGENES ---
    // ==========================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const carouselInner = document.getElementById('carouselInner');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateSlidePosition() {
        if (carouselInner) {
            carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    function nextSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlidePosition();
        }
    }

    function prevSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlidePosition();
        }
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    // Intervalo de cambio automático (6 segundos)
    setInterval(nextSlide, 6000);


    // =======================================================
    // --- 2. MENÚ DE HAMBURGUESA PARA DISPOSITIVOS MÓVILES --
    // =======================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbarMenu = document.getElementById('navbarMenu');

    if (mobileMenuBtn && navbarMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navbarMenu.classList.contains('active')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }


    // ==========================================================
    // --- 3. GALERÍA DINÁMICA: FAUNA NATIVA DE ARGENTINA -------
    // ==========================================================
    const renderAnimals = () => {
        const container = document.getElementById('animalsContainer');
        if (!container) return;

        // Base de datos local corregida con las descripciones reales de cada especie
        const mockApiFauna = [
            {
                nombre: "Yaguareté",
                estado: "Crítico",
                img: "Imagenes/yaguarete.jpg",
                detalles: "El felino más grande de América. Es un predador tope fundamental para el equilibrio del ecosistema, hoy protegido bajo un estricto monitoreo satelital en el norte argentino."
            },
            {
                nombre: "Carpincho",
                estado: "Protegido",
                img: "Imagenes/tuco_tuco.jpg", // Recordá cambiar este nombre si renombrás el archivo a carpincho.jpg
                detalles: "El roedor más grande del mundo. Es un mamífero semiacuático clave para la dinámica de los humedales y pastizales inundables, donde vive en grupos sociales estables y libres."
            },
            {
                nombre: "Chinchilla Cordillerana",
                estado: "Vulnerable",
                img: "Imagenes/chinchilla.jpg",
                detalles: "Pequeño roedor adaptado a las duras condiciones de la alta montaña andina. Su pelaje denso la hizo blanco de la caza en el pasado, por lo que hoy custodiamos celosamente sus últimas colonias salvajes."
            },
            {
                nombre: "Oso Hormiguero",
                estado: "En Peligro",
                img: "Imagenes/oso_Hormiguero.jpg",
                detalles: "También conocido como Yurumí. Con su característico hocico alargado y potente lengua, es un especialista en consumir hormigas y termitas, clave para el control de insectos en los montes."
            }
        ];

        // Mapeamos los objetos para transformarlos en bloques HTML dinámicos
        container.innerHTML = mockApiFauna.map(animal => `
            <div class="animal-card">
                <img src="${animal.img}" alt="${animal.nombre}">
                <div class="animal-info">
                    <div class="animal-header">
                        <h3>${animal.nombre}</h3>
                        <span class="tag">${animal.estado}</span>
                    </div>
                    <p>${animal.detalles}</p>
                </div>
            </div>
        `).join('');
    };

    // Activación única de la galería al iniciar
    renderAnimals();

    // Activación única de la galería al iniciar
    renderAnimals();


    // ==========================================
    // --- 4. CONTROLADOR DEL FORMULARIO -------
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("¡Mensaje recibido con éxito! Gracias por sumarte a Huellas Salvajes.");
            contactForm.reset();
        });
    }


    // ==========================================
    // --- 5. INTERACTIVIDAD DE LOS FAQ -------
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;

            if (item.classList.contains('active')) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    }); 

    // ==========================================================
    // --- 6. DESPLEGABLE DE ANIMALES RESCATADOS (NATIVOS) ------
    // ==========================================================
    const btnVerRescatados = document.getElementById('btnVerRescatados');
    const listaRescatados = document.getElementById('listaRescatados');

    if (btnVerRescatados && listaRescatados) {
        btnVerRescatados.addEventListener('click', () => {
            listaRescatados.classList.toggle('active');

            // Cambiamos el icono según esté abierto o cerrado
            const icon = btnVerRescatados.querySelector('i');
            if (listaRescatados.classList.contains('active')) {
                listaRescatados.style.maxHeight = listaRescatados.scrollHeight + "px";
                if (icon) icon.className = 'fa-solid fa-chevron-up';
            } else {
                listaRescatados.style.maxHeight = null;
                if (icon) icon.className = 'fa-solid fa-chevron-down';
            }
        });
    }

}); 