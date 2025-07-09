# README

<a name="readme-top"></a>

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

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI) v7](https://mui.com/)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [React Router v7](https://reactrouter.com/)
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

---
