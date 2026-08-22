# Site web — FADE AWAY CONSULTING

Site vitrine statique du cabinet **Fade Away Consulting** (conseil en direction
financière, gestion et conformité), hébergé gratuitement sur GitHub Pages.

Aucun outil de construction, aucune dépendance : uniquement du HTML, du CSS et
un petit fichier JavaScript. Vous pouvez modifier n'importe quelle page
directement depuis l'interface de GitHub.

---

## 1. Mettre le site en ligne

1. Dans le dépôt, ouvrez **Settings** → **Pages**.
2. Dans *Build and deployment* → *Source*, choisissez **Deploy from a branch**.
3. Sélectionnez la branche à publier (`main` après fusion) et le dossier `/ (root)`.
4. Cliquez sur **Save**. Le site est en ligne au bout de deux à trois minutes à
   l'adresse `https://<votre-compte>.github.io/<nom-du-depot>/`.

### Utiliser votre propre nom de domaine

1. Créez un fichier `CNAME` à la racine, contenant uniquement votre domaine
   (par exemple `fadeawayconsulting.fr`).
2. Chez votre registrar, créez un enregistrement `CNAME` pour `www` pointant
   vers `<votre-compte>.github.io`, et quatre enregistrements `A` pour le
   domaine nu vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`.
3. Dans **Settings** → **Pages**, renseignez le domaine et cochez
   *Enforce HTTPS*.
4. Remplacez ensuite toutes les occurrences de
   `https://fadeaway-c.github.io/github-pages` par votre domaine dans les
   fichiers `*.html` (balises `canonical` et `og:image`), `robots.txt` et
   `sitemap.xml`.

---

## 2. À personnaliser avant publication

Tout le contenu à compléter est signalé par des `[crochets]` dans les fichiers
ou par un commentaire `À PERSONNALISER`. Points obligatoires :

| Fichier | À renseigner |
|---|---|
| `mentions-legales.html` | Forme juridique, capital, siège, SIREN/SIRET, RCS, TVA, directeur de la publication. **Mentions obligatoires en France (LCEN).** |
| `contact.html` | Adresse postale, téléphone, e-mail réels. |
| `a-propos.html` | Le bloc « Qui vous accompagne » : parcours, formation, expérience. |
| `index.html` | Le bandeau de chiffres : n'affichez que des engagements que vous tenez. |
| Toutes les pages | L'e-mail `contact@fadeawayconsulting.fr` et le numéro `+33 (0)6 00 00 00 00` sont des exemples. |

Pour remplacer une coordonnée partout d'un coup :

```bash
grep -rl "contact@fadeawayconsulting.fr" . --include="*.html" \
  | xargs sed -i "s/contact@fadeawayconsulting.fr/votre@adresse.fr/g"
```

---

## 3. Activer le formulaire de contact

GitHub Pages ne sert que des fichiers statiques : il ne peut pas envoyer d'e-mail
par lui-même. Deux options :

- **Sans rien faire** — le formulaire ouvre le logiciel de messagerie du
  visiteur avec le message pré-rempli. Cela fonctionne déjà.
- **Avec envoi automatique** — créez un formulaire gratuit sur
  [Formspree](https://formspree.io) (ou Formsubmit, Basin, Tally), puis
  remplacez `VOTRE_IDENTIFIANT` dans l'attribut `action` du formulaire de
  `contact.html`. Le champ anti-robots `_gotcha` est déjà en place.

---

## 4. Structure des fichiers

```
index.html              Accueil
services.html           Les quatre expertises + modalités d'intervention
a-propos.html           Le cabinet, le fondateur, les engagements
contact.html            Coordonnées et formulaire
mentions-legales.html   Mentions légales + RGPD (non indexée)
404.html                Page d'erreur (autonome, styles intégrés)
robots.txt, sitemap.xml Référencement
.nojekyll               Désactive Jekyll : les fichiers sont servis tels quels
assets/css/style.css    Feuille de style unique et commentée
assets/js/main.js       Menu mobile, apparitions, formulaire
assets/img/             Logo, favicon, image de partage social
```

L'en-tête et le pied de page sont recopiés à l'identique dans chaque page
(c'est la contrepartie d'un site sans outil de construction). Si vous modifiez
un lien du menu, répercutez-le dans les cinq fichiers HTML.

### Changer les couleurs ou les polices

Tout est centralisé en haut de `assets/css/style.css`, dans le bloc `:root` :
`--gold` pour la couleur d'accent, `--ink` pour les fonds sombres,
`--font-title` et `--font-body` pour les polices.

---

## 5. Prévisualiser en local

```bash
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

---

## 6. Licence

Le fichier `LICENSE` (MIT) provient du modèle de dépôt d'origine et autorise la
réutilisation libre du contenu — ce qui **contredit la clause de propriété
intellectuelle des mentions légales**. Supprimez-le, ou remplacez-le par une
mention de réservation de droits, avant de rendre le dépôt public.
