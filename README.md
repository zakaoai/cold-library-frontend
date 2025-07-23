<!-- Readme Template: See: https://github.com/othneildrew/Best-README-Template -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
*** for badge : https://ileriayo.github.io/markdown-badges/
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="images/logo.png" alt="Logo" width="80" height="80">
  <h3 align="center">Cold Library Frontend</h3>
  <p align="center">
    Application de gestion et de suivi d'animes, avec intégration MyAnimeList, gestion de torrents, et fonctionnalités avancées de bibliothèque.
    <br />
    <a href="#a-propos-du-projet"><strong>En savoir plus »</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#a-propos-du-projet">À propos du projet</a>
      <ul>
        <li><a href="#fonctionnalités">Fonctionnalités</a></li>
        <li><a href="#construit-avec">Construit avec</a></li>
      </ul>
    </li>
    <li>
      <a href="#pour-bien-démarrer">Pour bien démarrer</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#utilisation">Utilisation</a></li>
    <li><a href="#tests">Tests</a></li>
    <li><a href="#contribution">Contribution</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## À propos du projet

**Cold Library Frontend** est une application web moderne permettant de gérer, suivre et explorer une bibliothèque d'animes. Elle propose une interface riche pour :

- Consulter et filtrer sa collection d'animes
- Suivre les épisodes vus et à venir
- Gérer les téléchargements torrents associés
- Rechercher et ajouter des animes via MyAnimeList
- Gérer les demandes et requêtes utilisateurs
- Visualiser l'activité et les logs d'administration

L'application est conçue pour offrir une expérience utilisateur fluide, responsive et personnalisable.

### Fonctionnalités

- **Bibliothèque d'animes** : affichage sous forme de cartes ou tableaux, filtres par genre, type, etc.
- **Recherche avancée** : intégration MyAnimeList, suggestions, filtres dynamiques.
- **Gestion des torrents** : suivi des épisodes, actions sur les torrents, édition des informations.
- **Demandes utilisateurs** : création, suivi et gestion des requêtes (ajout, déplacement, etc.).
- **Profil utilisateur** : édition du profil, synchronisation MyAnimeList.
- **Logs & administration** : visualisation des logs, gestion avancée pour les admins.
- **Notifications** : feedback utilisateur via notistack.
- **Responsive** : interface adaptée desktop et mobile.

### Construit avec

- [![React 19][React.js]][React-url]
- [![Vite 7][Vite.js]][Vite-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![MUI v7][MUI]][MUI-url]
- [![React Query][React Query]][React Query-url]
- [![React Router v7][React Router]][React Router-url]
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [MSW (Mock Service Worker)](https://mswjs.io/)
- [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Pour bien démarrer

### Prérequis

- **Node.js** >= 18.x
- **Yarn** >= 4.x (ou npm)
- Accès à l’API backend Cold Library (pour les fonctionnalités connectées)

### Installation

1. **Cloner le dépôt**

   ```sh
   git clone https://github.com/zakaoai/cold-library-frontend.git
   cd cold-library-frontend
   ```

2. **Installer les dépendances**
   ```sh
   yarn install
   ```
   ou
   ```sh
   npm install
   ```

## Utilisation

### Démarrer en mode développement

```sh
yarn dev
```

ou

```sh
npm run dev
```

L’application sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché par Vite).

### Build pour la production

```sh
yarn build
```

ou

```sh
npm run build
```

### Linter le projet

```sh
yarn lint
```

## Tests

- **Lancer les tests unitaires**
  ```sh
  yarn test:watch
  ```
- **Lancer les tests avec couverture**
  ```sh
  yarn test:coverage
  ```
- **Interface graphique de tests**
  ```sh
  yarn test:ui
  ```

## Contribution

Les contributions sont les bienvenues !
Merci de créer une branche dédiée, de proposer une Pull Request et de détailler vos changements.

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/ma-feature`)
3. Committez vos modifications (`git commit -m 'Ajout de ma feature'`)
4. Pushez la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

## Contact

Pour toute question ou suggestion, contactez le mainteneur du projet via [https://github.com/zakaoai/cold-library-frontend](https://github.com/zakaoai/cold-library-frontend).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p style='text-align: right;'>(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/zakaoai/cold-library-frontend.svg?style=for-the-badge
[contributors-url]: https://github.com/zakaoai/cold-library-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/zakaoai/cold-library-frontend.svg?style=for-the-badge
[forks-url]: https://github.com/zakaoai/cold-library-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/zakaoai/cold-library-frontend.svg?style=for-the-badge
[stars-url]: https://github.com/zakaoai/cold-library-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/zakaoai/cold-library-frontend.a-svg?style=for-the-badge
[issues-url]: https://github.com/zakaoai/cold-library-frontend/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: ../images/screenshot.png
[Vite.js]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[MUI]: https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[React Router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React Router-url]: https://reactrouter.com/en/main
[React Query]: https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white
[React Query-url]: https://tanstack.com/query/v3/
