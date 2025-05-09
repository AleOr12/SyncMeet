# SyncMeet (Render Edition)

SyncMeet es una herramienta en tiempo real para encontrar horarios disponibles entre varios participantes.

## 🚀 Despliegue en Render

1. Crea una cuenta en https://render.com
2. Crea un nuevo Web Service
3. Conecta este repositorio (súbelo primero a GitHub)
4. Configura:
   - Root Directory: `syncmeet-render`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Runtime: Node.js
5. ¡Haz clic en Deploy y listo!

## 🔧 Ejecución local

```bash
cd syncmeet-render
npm install
node server.js
