// Initialisation du carrousel Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.carousel-swiper', {
        // Configuration de base
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        loopAdditionalSlides: 2,
        speed: 600,
        grabCursor: true,
        
        // Défilement automatique rapide et fluide
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        
        // Effet de transition fluide
        effect: 'slide',
        
        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination (points indicateurs)
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                centeredSlides: true,
            },
            480: {
                slidesPerView: 1.3,
                spaceBetween: 12,
                centeredSlides: true,
            },
            640: {
                slidesPerView: 1.8,
                spaceBetween: 15,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 16,
                centeredSlides: true,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
            },
        },
    });
    
    // Gestion du formulaire de contact avec Formspree
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Désactiver le bouton et afficher le chargement
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            
            // Récupérer les données du formulaire
            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Succès
                    formStatus.textContent = '✅ Message envoyé avec succès ! Nous vous répondrons bientôt.';
                    formStatus.className = 'form-status success';
                    form.reset();
                } else {
                    // Erreur
                    const data = await response.json();
                    if (data.errors) {
                        formStatus.textContent = '❌ Erreur : ' + data.errors.map(error => error.message).join(', ');
                    } else {
                        formStatus.textContent = '❌ Une erreur est survenue. Veuillez réessayer.';
                    }
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                // Erreur réseau
                formStatus.textContent = '❌ Erreur de connexion. Vérifiez votre connexion internet.';
                formStatus.className = 'form-status error';
            } finally {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer ma demande';
            }
        });
    }
});

