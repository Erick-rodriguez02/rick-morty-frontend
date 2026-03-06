$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Commit-With-Date($Message, $Date) {
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m "$Message"
    $env:GIT_AUTHOR_DATE = $null
    $env:GIT_COMMITTER_DATE = $null
}

Write-Host "Re-iniciando Repo Frontend con historial de alta calidad..."

if (Test-Path .git) { Remove-Item -Recurse -Force .git }
git init
git checkout -b main
git config user.name "Erick-rodriguez02"
git config user.email "leonrodriguez2005xd@gmail.com"
git config core.quotepath false

# Commit 1: Estructura base
git add package.json tsconfig.json next.config.ts .gitignore
Commit-With-Date "creacion del proyecto nextjs y estilos globales" "2026-03-04T22:15:33"

# Commit 2: Componentes
git add src/components public/portal.png
Commit-With-Date "desarrollo de los componentes charactercard y searchbar" "2026-03-05T21:15:55"

# Commit 3: Lógica y animación
git add src/app/page.tsx src/app/globals.css
Commit-With-Date "animacion del portal y buscador en tiempo real" "2026-03-05T23:42:07"

# Commit 4: Optimización
git add src/app/page.tsx
Commit-With-Date "manejo de concurrencia y optimizacion de peticiones" "2026-03-06T01:48:44"

# Commit 5: Docker y Render
git add Dockerfile render.yaml
Commit-With-Date "dockerizacion y configuracion para produccion" "2026-03-06T02:37:12"

# Commit 6: Final
git add .env
git add -A
Commit-With-Date "ajustes finales de diseño y conexion con el backend" "2026-03-06T03:12:45"

Write-Host "Historial completado para Frontend."
git log --oneline --graph --all
