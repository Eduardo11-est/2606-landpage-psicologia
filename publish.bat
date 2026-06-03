@echo off
:: Script para conectar o repositorio local ao remoto e enviar os arquivos
chcp 65001 > nul

echo ============================================================
echo   Publicação automática no GitHub - Landing Page Psicologia
echo ============================================================
echo.

:: 1. Tentar adicionar o repositório remoto origin
echo [1/3] Vinculando ao repositório remoto...
git remote add origin https://github.com/Eduardo11-est/2606-landpage-psicologia.git 2>nul
if %errorlevel% neq 0 (
    echo [!] Repositório remoto "origin" já estava cadastrado ou ocorreu um erro. Atualizando URL...
    git remote set-url origin https://github.com/Eduardo11-est/2606-landpage-psicologia.git
) else (
    echo [OK] Repositório remoto vinculado com sucesso!
)
echo.

:: 2. Garantir branch main
echo [2/3] Configurando branch principal como "main"...
git branch -M main
echo [OK] Branch configurada!
echo.

:: 3. Fazer o push dos arquivos
echo [3/3] Enviando arquivos para a branch "main" no GitHub...
echo (Isso pode exigir autenticação do GitHub no seu terminal)
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ============================================================
    echo   [SUCESSO] Código enviado com sucesso para o GitHub!
    echo ============================================================
) else (
    echo.
    echo ============================================================
    echo   [AVISO/ERRO] Não foi possível concluir o push automático.
    echo   Por favor, verifique sua conexão ou credenciais do GitHub
    echo   e execute manualmente: git push -u origin main
    echo ============================================================
)

echo.
pause
