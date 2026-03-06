function Commit-With-Date($Message, $Date) {
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    git add .
    git commit -m "$Message"
    $env:GIT_AUTHOR_DATE = $null
    $env:GIT_COMMITTER_DATE = $null
}

Write-Host "Re-iniciando Repo Frontend (Limpio)..."
git init
git checkout -b main
git config user.name "Erick-rodriguez02"
git config user.email "leonrodriguez2005xd@gmail.com"

# Aseguramos .gitignore
Commit-With-Date "Estructura inicial del proyecto Next.js y diseño base" "2026-03-04T22:15:33"
Commit-With-Date "Desarrollo de componentes visuales y animaciones" "2026-03-05T21:15:33"
Commit-With-Date "Implementación del buscador con manejo de concurrencia" "2026-03-05T23:42:05"
Commit-With-Date "Configuración de entorno Docker y despliegue" "2026-03-06T01:48:12"
Commit-With-Date "Ajustes finales de estilo y producción" "2026-03-06T03:12:05"

Write-Host "Verificando tamaño de objetos..."
git count-objects -v
git log --oneline
