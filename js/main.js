
// DARK MODE AVEC LOCALSTORAGE

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  if (darkModeToggle) {
    darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    }
  });
}

// ============================
// NAVBAR + BOUTON RETOUR EN HAUT

const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================
// COMPTEURS + FADE-IN + FILTRAGE + FORMULAIRE
// ============================
document.addEventListener("DOMContentLoaded", () => {

  // --- COMPTEURS ANIMÉS ---
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString("fr-FR");

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString("fr-FR");
      }
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  // --- FADE-IN ---
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- FILTRAGE DES FREELANCES ---
  const boutonsFiltres = document.querySelectorAll("[data-filtre]");
  boutonsFiltres.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filtre = btn.getAttribute("data-filtre");

      boutonsFiltres.forEach((b) => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline-primary");
      });
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-primary");

      const cartes = document.querySelectorAll("[data-categorie]");
      cartes.forEach(function (carte) {
        if (filtre === "tous" || carte.getAttribute("data-categorie") === filtre) {
          carte.style.display = "block";
        } else {
          carte.style.display = "none";
        }
      });
    });
  });

  // --- VALIDATION FORMULAIRE DE CONTACT ---
  const btnEnvoyer = document.querySelector('.btn-primary[type="button"]');

  if (btnEnvoyer) {
    btnEnvoyer.addEventListener("click", function () {
      validerFormulaire();
    });
  }

  function validerFormulaire() {
    let valide = true;

    // Nom
    const nom = document.querySelector('input[placeholder="Dupont"]');
    supprimerErreur(nom);
    if (!nom || nom.value.trim() === "") {
      afficherErreur(nom, "Le nom est requis.");
      valide = false;
    }

    // Prénom
    const prenom = document.querySelector('input[placeholder="Lucas"]');
    supprimerErreur(prenom);
    if (!prenom || prenom.value.trim() === "") {
      afficherErreur(prenom, "Le prénom est requis.");
      valide = false;
    }

    // Sujet
    const sujet = document.querySelector("select.form-select");
    supprimerErreur(sujet);
    if (!sujet || sujet.value === "") {
      afficherErreur(sujet, "Veuillez choisir un sujet.");
      valide = false;
    }

    // Message (min 20 caractères)
    const message = document.querySelector("textarea.form-control");
    supprimerErreur(message);
    if (!message || message.value.trim().length < 20) {
      afficherErreur(message, "Le message doit contenir au moins 20 caractères.");
      valide = false;
    }

    // RGPD
    const rgpd = document.getElementById("rgpd");
    supprimerErreur(rgpd);
    if (!rgpd || !rgpd.checked) {
      afficherErreur(rgpd, "Vous devez accepter la politique de confidentialité.");
      valide = false;
    }

    if (valide) {
      afficherSucces();
    }
  }

  function afficherErreur(champ, texte) {
    if (!champ) return;
    champ.classList.add("is-invalid");
    const div = document.createElement("div");
    div.className = "invalid-feedback";
    div.textContent = texte;
    champ.parentNode.appendChild(div);
  }

  function supprimerErreur(champ) {
    if (!champ) return;
    champ.classList.remove("is-invalid");
    const ancien = champ.parentNode.querySelector(".invalid-feedback");
    if (ancien) ancien.remove();
  }

  function afficherSucces() {
    const ancienMsg = document.getElementById("msg-succes");
    if (ancienMsg) ancienMsg.remove();

    const msg = document.createElement("div");
    msg.id = "msg-succes";
    msg.className = "alert alert-success mt-3";
    msg.textContent = "✅ Votre message a bien été envoyé ! Nous vous répondrons sous 24h.";

    const btn = document.querySelector('.btn-primary[type="button"]');
    if (btn) btn.parentNode.appendChild(msg);
  }

});