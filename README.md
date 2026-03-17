# 🎮 GameMindPilot (gmpilot)

**AI-powered CLI Companion for Game Developers & Designers.**

GameMindPilot is a comprehensive command-line tool designed to accelerate game development workflows. From procedural concept generation to performance auditing and economy simulations, gmpilot brings the power of state-of-the-art AI (Gemini, OpenAI, Claude, Ollama) directly to your terminal.

## 🚀 Key Features

- **BYOK (Bring Your Own Key):** Connect directly to Google Gemini, OpenAI, Claude, or local Ollama instances.
- **Dynamic Model Selection:** Automatically fetch and select from supported models for each provider.
- **Game Design & Narrative:** Generate concepts, dialogue trees, quests, and level layouts.
- **Advanced Simulation:** Monte Carlo economy simulations and behavioral playtester cohort analysis.
- **Performance & Analysis:** Identify memory leaks, optimize mesh complexity, and audit localization.
- **DevSecOps:** AI-powered security vulnerability scanning for game code.
- **Live Chat:** Interactive AI terminal for rapid prototyping and brainstorming.

## 📦 Installation

Install globally using npm:

```bash
npm install -g gamemindpilot
```

## 🛠️ Getting Started

1. **Initialize a Project:**
   ```bash
   gmpilot init
   ```

2. **Configure AI Provider:**
   ```bash
   gmpilot login
   ```
   *Follow the prompts to enter your API key and select your preferred model.*

3. **Start Brainstorming:**
   ```bash
   gmpilot idea --prompt "A space western RPG with time-loop mechanics"
   ```

## 📖 Command Reference

### Core Commands
- `login`: Configure your AI provider and API keys.
- `init`: Setup GameMindPilot in the current directory.
- `chat`: Open an interactive AI chat session.
- `setup-global`: View global installation instructions.

### Game Design
- `idea`: Generate unique game concepts and core loops.
- `dialogue`: Create NPC dialogue trees and choices.
- `quest`: Generate side quests and objectives.
- `level`: Prototyping level layouts and puzzles.

### Engineering & DevTools
- `script`: Generate boilerplate code for Unity, Unreal, or Godot.
- `blueprint`: Generate complete system architecture.
### Engineering & DevTools
- `script`: Generate boilerplate code for Unity, Unreal, or Godot.
- `blueprint`: Generate complete system architecture.
- `shader-gen`: Generate HLSL/GLSL shader templates.
- `vfx-gen`: Generate particle system parameters.
- `ui-layout`: AI-generated UI layout prototypes.
- `ui-theme-gen`: Generate UI Design System tokens.
- `sprite-anim`: Generate sprite animation metadata.
- `generate-sprite`: AI-powered frame-by-frame sprite generation.
- `save-logic`: Generate save/load system boilerplate.
- `net-sync`: Generate multiplayer synchronization boilerplate.
- `telemetry-gen`: Generate telemetry event logging code.
- `security-scan`: Scan for security vulnerabilities in scripts.

### Intelligence & Optimization
- `asset-optimize`: 📦 Automated asset compression and atlas generation.
- `review`: 🔍 AI project-wide code quality and design pattern review.
- `dev-stream`: 🌊 Start live coding assistance stream.
- `engine-setup`: ⚙️ Automate project settings for genres/platforms.
- `mobile-perf`: 📱 Simulate performance on low-end mobile hardware.
- `watch`: 👁️ Autonomous Reality Sync (background monitoring).
- `persona-playtest`: Simulate specific player personalities.
- `material-forge`: Generate engine-ready PBR material maps.
- `ensemble-brain`: Orchestrate multi-model AI brainstorming.
- `doctor`: CLI and Project self-diagnostic health check.
- `web-view`: 🛸 Launch the Local Browser Dashboard.
- `vitals-track`: Track long-term project progress metrics.
- `plugin-publish`: Publish your custom extension to the community hub.
- `team-invite`: Invite a team member to shared workspace.
- `monitor`: Launch TUI Project Monitor Dashboard.
- `cloud-sync`: Sync project configs and RAG with team cloud.
- `add-extension`: Install community GameMindPilot extensions.

### Pipeline, Legal, UX & DevOps
- `interactive`: (Default) Launch the Smart Dashboard menu.
- `search`: AI-powered command search (Natural Language).
- `alias`: Setup custom short aliases for long commands.
- `setup-completion`: Setup shell auto-completion.
- `git-auto`: AI-powered Git commit/PR description generator.
- `legal-gen`: Generate EULA and Store Policy templates.
- `ci-cd-setup`: Generate GitHub Actions for automated auditing.
- `live-sync`: Start Engine Bridge for live editor connectivity.
- `steam-sync`: Sync metadata with Steamworks.
- `workshop-sync`: Generate Steam Workshop and modding manifests.
- `discord-gen`: Generate Discord bot boilerplate.
- `l10n-sync`: AI-powered localization syncing.
- `l10n-review`: Collaborative AI translation review bridge.
- `marketing-kit`: Generate store assets and taglines.
- `gdd-export`: Export complete professional GDD from project intel.

### Analysis & Optimization
- `montecarlo`: Run 10k-player economy simulations.
- `monetization-sim`: Simulate economy and monetization balance.
- `path-audit`: Analyze navmesh and pathfinding hotspots.
- `balance-check`: AI-powered game balance analysis.
- `heap-scan`: Analyze memory usage and find hotspots.
- `poly-optimize`: Analyze 3D mesh complexity.
- `mobile-audit`: Mobile-specific performance audit.
- `mobile-power-scan`: Mobile battery and thermal efficiency audit.
- `lod-audit`: Asset LOD verification and audit.
- `benchmark-run`: Execute automated performance benchmarks.
- `asset-bundler`: Analyze assets for bundling optimization.
- `collider-gen`: Generate optimized physics colliders.
- `collision-audit`: Audit collision layer matrix.
- `pulse`: Get high-level project health metrics.
- `run-test-bots`: Launch automated headless playtest bots.
- `live-qa`: Start real-time AI playtester interaction.

## ⚙️ Configuration

GameMindPilot stores configuration locally in `~/.gmpilot/config.json`. You can update your settings anytime using `gmpilot login`.

## 📄 License

MIT © 2026 GameMindPilot
