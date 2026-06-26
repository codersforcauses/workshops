#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
npm install
npx remotion browser ensure
npx remotion render src/index.tsx MigrationExplainer out/django-migrations-explained.mp4 --concurrency=1 --gl=angle
echo "Video rendered to out/django-migrations-explained.mp4"
echo "Copy to docs:"
mkdir -p ../docs/2026-winter/videos/
cp out/django-migrations-explained.mp4 ../docs/2026-winter/videos/
echo "Done! Video at docs/2026-winter/videos/django-migrations-explained.mp4"
