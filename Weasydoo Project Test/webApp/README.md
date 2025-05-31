## App Design Brief 
🛍️ Fake Store Project

Une application e-commerce simple développée avec **Next.js**, permettant de consulter, rechercher, filtrer, ajouter et supprimer des produits. Elle utilise [FakeStoreAPI](https://fakestoreapi.com/) comme source de données.

___________________________________________

## ⚙️ Configuration et exécution locale

# 1. Cloner le dépôt
git clone https://github.com/Fik0u/fake-store-project.git

# 2. Se déplacer dans le dossier du projet
cd fake-store-app

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev

# 5. Ouvrir le navigateur
Choisir le port http://localhost:3000
__________________________________________

## 📦 Fonctionnalités principales

🛒 Liste de produits : Affichés depuis l’API GET /products

🔍 Recherche : Par titre 

🗂️ Filtrage par catégorie : GET /products/categories

➕ Ajout d’un produit et mise à jour : Formulaire avec POST /products

🗑️ Suppression	: Accessible uniquement aux admins

🔐 Auth fictive via contexte : Démo de droits utilisateur vs admin
____________________________________________

## 🚧 Processus de développement

Création du projet avec create-next-app;

Intégration de la page Home (/) avec produits dynamiques;

Création du formulaire /add pour ajouter un produit;

Intégration du système de recherche & filtre par catégorie;

Mise en place d’un contexte AuthContext;

Affichage conditionnel des boutons (Edit/Delete) selon le rôle;

Ajout du style (couleurs, effets, responsive);

Favicon & nettoyage final.
