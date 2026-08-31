# CRK-ICC — Prototype numérique V0.1

Prototype fonctionnel du **Centre de Ressources sur les Industries Culturelles et Créatives (CRK-ICC)**.

## Stack technique

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (base-ui)
- **Prisma 6** + **Neon** (PostgreSQL serverless)
- Données de démo disponibles en mode sans base de données

## Prérequis

- Node.js 20+
- Compte [Vercel](https://vercel.com) (déploiement)
- Base de données [Neon](https://neon.tech) (PostgreSQL)

## Installation locale

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Sans `DATABASE_URL`, l'application utilise des données de démo intégrées. Pour activer la base de données, renseigner la variable d'environnement :

```bash
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
```

## Base de données (Neon)

1. Créer un projet sur [Neon](https://neon.tech).
2. Copier la **connection string** (PostgreSQL).
3. Créer le fichier `.env` à partir de `.env.example` et y coller la connection string.
4. Appliquer le schéma et insérer les données de démo :

```bash
npx prisma migrate deploy
npm run seed
```

> En local, vous pouvez aussi utiliser `npx prisma migrate dev` pour créer la première migration.

## Déploiement sur Vercel

### Étape 1 — Créer le projet Vercel

```bash
npx vercel
```

Ou importer le dépôt Git via l'interface Vercel.

### Étape 2 — Configurer les variables d'environnement

Dans l'onglet **Settings > Environment Variables** du projet Vercel, ajouter :

- `DATABASE_URL` = la connection string Neon (avec `?sslmode=require`)
- `ADMIN_PASSWORD` = mot de passe pour l'espace admin (optionnel, défaut : `crk-icc-demo`)

### Étape 3 — Mettre à jour la commande de build

Vercel exécute automatiquement `prisma generate` via le script `postinstall`. Vérifiez que la commande de build est simplement :

```bash
next build
```

Si vous migrez la base au moment du build (optionnel), vous pouvez utiliser :

```bash
prisma migrate deploy && next build
```

### Étape 4 — Déployer

```bash
npx vercel --prod
```

## Structure du projet

- `app/` — pages et routes API Next.js
- `components/` — composants React réutilisables
- `lib/` — Prisma client, accès aux données (DB + mock)
- `prisma/` — schéma, seed et données de démo

## Fonctionnalités V0.1

- Page d'accueil avec recherche, thématiques, ressources récentes, contributeurs et activités
- Fonds documentaire avec recherche et filtres
- Fiches ressources avec métadonnées et citation
- Profils contributeurs
- Calendrier des activités
- Formulaire "Proposer une ressource"
- Dossiers thématiques
- Back-office administrateur simple (`/admin`)

## Notes

- Les données affichées par défaut sont des **données de démonstration**. Remplacez-les par des ressources réelles avant la présentation officielle.
- Le workflow de validation des ressources proposées est opérationnel dès que la base Neon est connectée.
- Le multilinguisme, les favoris, les comptes utilisateurs et les statistiques détaillées sont prévus dans les évolutions futures.
