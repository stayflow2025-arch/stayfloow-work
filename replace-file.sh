#!/bin/bash

# --- Script PRO de remplacement de fichier Stayflow ---

TARGET="$1"

# Vérification du paramètre
if [ -z "$TARGET" ]; then
  echo "❌  Usage: ./replace-file.sh <chemin-du-fichier>"
  exit 1
fi

# Vérifier que le dossier existe
DIR=$(dirname "$TARGET")
if [ ! -d "$DIR" ]; then
  echo "❌  Le dossier n'existe pas : $DIR"
  exit 1
fi

# Sauvegarde automatique
if [ -f "$TARGET" ]; then
  cp "$TARGET" "$TARGET.backup"
  echo "📦  Sauvegarde créée : $TARGET.backup"
else
  echo "ℹ️  Le fichier n'existe pas encore, il sera créé."
fi

echo ""
echo "📝  Remplacement du fichier : $TARGET"
echo "👉  Colle ton nouveau contenu maintenant"
echo "👉  Puis termine avec : EOF"
echo "--------------------------------------------------"

# Capture du nouveau contenu
CONTENT=$(cat << 'END_OF_FILE'
END_OF_FILE
)

# Vérifier si le contenu est vide
if [ -z "$CONTENT" ]; then
  echo "❌  Aucun contenu détecté. Le fichier n'a pas été modifié."
  exit 1
fi

# Écrire le contenu dans le fichier
echo "$CONTENT" > "$TARGET"

echo "--------------------------------------------------"
echo "✅  Fichier remplacé avec succès : $TARGET"
echo "✨  Ancienne version sauvegardée dans : $TARGET.backup"
