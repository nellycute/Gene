@echo off
rem ==================================================================
rem  BUKA RUANG GENETIKA
rem  Klik dua kali berkas ini, atau ikon "Ruang Genetika" di Desktop.
rem  Website dinyalakan di komputer ini, lalu browser terbuka sendiri.
rem  Jendela "Ruang Genetika" di taskbar = mesin websitenya. Selama
rem  website dipakai, jangan ditutup. Selesai? Tutup saja jendela itu.
rem ==================================================================
title Membuka Ruang Genetika
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%APPDATA%\npm;%PATH%"

echo.
echo   Membuka Ruang Genetika... tunggu sebentar.
echo   Browser akan terbuka sendiri begitu website siap.
echo.

rem Mesin website sudah menyala (misalnya dari Claude, atau ikon ini sudah
rem diklik sebelumnya)? Jangan dinyalakan dua kali - cukup tunggu siap.
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if %errorlevel%==0 goto tunggu

start "Ruang Genetika - biarkan terbuka selama website dipakai" /min cmd /k "npm run dev"

:tunggu
rem Halaman pertama perlu disiapkan dulu; biasanya kurang dari satu menit.
for /l %%i in (1,1,90) do (
  curl -s -o nul -m 5 http://localhost:3000/ && goto buka
  ping -n 3 127.0.0.1 >nul
)

echo   Website belum mau menyala. Buka jendela "Ruang Genetika" di taskbar,
echo   lalu kirim foto layarnya ke Claude.
pause
exit /b 1

:buka
start "" http://localhost:3000/
exit /b 0
