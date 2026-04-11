# 🚀 Guide Git - ISHEECOLE

Ce guide récapitule la méthode la plus fiable pour envoyer votre code sur GitHub en utilisant votre connexion **SSH** (déjà configurée sur ce Mac).

## 1. Routine de mise à jour (À faire à chaque fois)

Pour envoyer vos modifications quotidiennes, utilisez ces 3 étapes :

```bash
# 1. Ajouter tous les fichiers modifiés
git add .

# 2. Créer un message pour expliquer vos changements
git commit -m "Description de ce que vous avez fait"

# 3. Envoyer sur GitHub
git push
```

---

## 2. En cas de problème de "Permission Denied" (403)

Si Git vous demande un mot de passe ou refuse l'accès, c'est qu'il essaie de passer par HTTPS (Tokens). Pour corriger cela et forcer l'usage de votre **clé SSH** :

```bash
# Redéfinir l'adresse du dépôt en mode SSH
git remote set-url origin git@github.com:sofianelamine772-design/ISHEECOLE.git

# Faire un push forcé pour aligner les branches (si nécessaire)
git push -f -u origin main
```

---

## 3. Pourquoi SSH ?
- **Plus de mot de passe** : Votre Mac et GitHub se reconnaissent automatiquement grâce à une clé cryptographique.
- **Sécurité** : C'est la méthode préférée des développeurs professionnels.
- **Fiabilité** : Évite les conflits de comptes GitHub multiples sur un même Mac.

---

## 💡 Astuce message de commit
Essayez d'être précis dans vos messages, par exemple :
- `git commit -m "Ajout de l'onglet Facturation"`
- `git commit -m "Changement des couleurs du bleu vers le vert"`
