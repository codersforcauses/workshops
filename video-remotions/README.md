# Workshop Video Animations

Animated explainer videos for CFC workshop content, built with [Remotion](https://www.remotion.dev/).

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Chrome/Chromium** (Remotion auto-downloads one, or uses system Chrome)

## Quick Start

```bash
# Install dependencies
npm install

# Preview in Remotion Studio (browser-based editor)
npm start

# Render to MP4
npm run render
```

The rendered video is output to `out/` and automatically ignored by git.

## Project Structure

```
video-remotions/
├── src/
│   ├── index.tsx                          # Remotion entrypoint
│   ├── Root.tsx                           # Composition registry
│   └── MigrationExplainer/                # Django migrations video
│       ├── index.tsx                      # Main composition (sequences + timing)
│       ├── data/
│       │   └── states.ts                  # Step durations & frame offsets
│       ├── hooks/
│       │   └── useTypingAnimation.ts      # Shared typing effect hook
│       ├── components/                    # Reusable animation components
│       │   ├── TerminalTyping.tsx          #   Terminal with typing effect
│       │   ├── CodeEditor.tsx             #   Code editor with syntax + cursor
│       │   ├── DatabaseTable.tsx          #   Spreadsheet-style DB view
│       │   ├── DeploymentPipeline.tsx     #   CI/CD pipeline flow
│       │   ├── DockerMigration.tsx        #   Docker container + DB update
│       │   ├── NarrationBar.tsx           #   Bottom explanation bar
│       │   └── EnvironmentColumn.tsx      #   DEV/PROD column wrapper
│       └── steps/                         # Per-step scene implementations
│           ├── Step1_InitialState.tsx
│           ├── Step2_MakeMigrations.tsx
│           ├── Step3_Migrate.tsx
│           ├── Step4_DeployProd.tsx
│           ├── Step5_ProdMigrate.tsx
│           ├── Step6_AddField.tsx
│           ├── Step7_MakeMigrations2.tsx
│           ├── Step8_Migrate2.tsx
│           ├── Step9_DeployProd2.tsx
│           └── Step10_ProdMigrate2.tsx
├── render.sh                              # Render + copy to docs script
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Adding a New Video

1. **Create a folder** under `src/` for your new video (e.g., `src/ReactLifecycle/`)
2. **Create components** — reuse existing ones from `MigrationExplainer/components/`:
   - `TerminalTyping` — shows commands being typed character-by-character
   - `CodeEditor` — code with line numbers, cursor, new-line typing animation
   - `DatabaseTable` — spreadsheet-style table visualization
   - `DeploymentPipeline` — horizontal CI/CD pipeline flow
   - `DockerMigration` — Docker container running commands
   - `NarrationBar` — bottom explanation bar for each step
   - `EnvironmentColumn` — DEV/PROD column wrapper
   - `useTypingAnimation` — hook for character-by-character text reveal
3. **Register your composition** in `Root.tsx`:
   ```tsx
   <Composition
     id="YourVideoName"
     component={YourComponent}
     durationInFrames={totalFrames}
     fps={30}
     width={1920}
     height={1080}
   />
   ```
4. **Add a render script** or extend `package.json`:
   ```json
   "render:your-video": "npx remotion render src/index.tsx YourVideoName out/your-video.mp4"
   ```
5. **Copy output** to the relevant `docs/<year>/videos/` folder

## Animation Rules

All animations **must** be frame-driven using Remotion's APIs:

- ✅ `useCurrentFrame()` + `interpolate()` for linear animations
- ✅ `spring()` for physics-based motion
- ✅ `<Sequence>` for timing sections (resets `useCurrentFrame()` to 0)
- ❌ No CSS `transition` or `@keyframes`
- ❌ No `setTimeout` or `requestAnimationFrame`

## Rendering Tips

- If Chrome Headless Shell fails, use system Chrome:
  ```bash
  npx remotion render src/index.tsx MigrationExplainer out/video.mp4 \
    --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --concurrency=1 --gl=angle
  ```
- Target video size: **< 10MB** (embedded in mkdocs)
- Resolution: **1920×1080** at **30fps**

## Current Videos

| Video | Composition ID | Duration | Used In |
|-------|---------------|----------|---------|
| Django Migrations Explainer | `MigrationExplainer` | ~97s (2910 frames) | `docs/2026-winter/introduction-to-backend-development-with-django.md` |
