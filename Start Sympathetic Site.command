#!/bin/bash
# Double-click this file in Finder to install dependencies and start the local site.
cd "$(dirname "$0")" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

if ! command -v npm >/dev/null 2>&1; then
  echo ""
  echo "Node.js/npm was not found. Install Node from https://nodejs.org (LTS), then double-click this file again."
  echo ""
  read -r -p "Press Enter to close."
  exit 1
fi

echo ""
echo "Installing packages (only slow the first time)..."
npm install || { echo "npm install failed."; read -r -p "Press Enter to close."; exit 1; }

echo ""
echo "Starting the site. KEEP THIS WINDOW OPEN."
echo "When you see a line like:  Local:   http://localhost:5174/"
echo "(Vite may pick another port if 5174 is busy—use whatever URL your terminal prints.)"
echo "Hold Command (⌘) and click that link, or copy it into your system browser."
echo "If a new Journal post does not appear, stop this (Ctrl+C) and run again to restart the dev server."
echo ""
npm run dev

read -r -p "Press Enter to close."
