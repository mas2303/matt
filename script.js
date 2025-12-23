// Gestion du formulaire de contact avec Formspree
document.addEventListener('DOMContentLoaded', function() {
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

