/* FADE AWAY CONSULTING — comportements d'interface (aucune dépendance) */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Menu mobile
     --------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  var links  = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open", !open);
    });

    // Fermeture au clic sur un lien
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      }
    });

    // Fermeture à la touche Échap
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
        toggle.focus();
      }
    });

    // Réinitialisation au passage en desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      }
    });
  }

  /* ---------------------------------------------------------------------
     Bordure de l'en-tête au défilement
     --------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Apparition progressive des blocs
     --------------------------------------------------------------------- */
  var revealables = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!revealables.length) {
    /* rien à faire */
  } else if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealables.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Formulaire de contact
     Tant qu'aucun service d'envoi n'est configuré (voir contact.html),
     le formulaire bascule automatiquement sur un brouillon d'e-mail.
     --------------------------------------------------------------------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status   = form.querySelector(".form__status");
    var endpoint = form.getAttribute("action") || "";
    var mailto   = form.getAttribute("data-mailto") || "";
    var configured = endpoint.indexOf("VOTRE_IDENTIFIANT") === -1 && endpoint.indexOf("http") === 0;

    var say = function (message) {
      if (!status) return;
      status.textContent = message;
      status.classList.add("is-visible");
    };

    form.addEventListener("submit", function (e) {
      // Piège à robots : si le champ caché est rempli, on abandonne en silence.
      var honey = form.querySelector('[name="_gotcha"]');
      if (honey && honey.value) { e.preventDefault(); return; }

      if (configured) { return; } // envoi normal vers le service configuré

      e.preventDefault();

      var val = function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        return field ? field.value.trim() : "";
      };

      var corps = [
        "Nom : "      + val("nom"),
        "Société : "  + val("societe"),
        "E-mail : "   + val("email"),
        "Téléphone : " + val("telephone"),
        "Besoin : "   + val("sujet"),
        "",
        val("message")
      ].join("\n");

      var href = "mailto:" + mailto +
        "?subject=" + encodeURIComponent("Demande de contact — " + (val("societe") || val("nom"))) +
        "&body=" + encodeURIComponent(corps);

      window.location.href = href;
      say("Votre logiciel de messagerie s'ouvre avec le message pré-rempli. " +
          "S'il ne s'ouvre pas, écrivez-nous directement à " + mailto + ".");
    });
  }

  /* ---------------------------------------------------------------------
     Année courante dans le pied de page
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
