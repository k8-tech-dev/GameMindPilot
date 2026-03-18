#!/usr/bin/env node
import { Command } from 'commander';
import { logger } from './utils/logger';
import { configManager } from './utils/config';
import * as dotenv from 'dotenv';

dotenv.config();
configManager.init();

const program = new Command();

program
  .name('gmpilot')
  .description('GameMindPilot CLI - Your AI Game Development Assistant')
  .version('2.9.4');

import { loginCommand } from './commands/login';
import { chatCommand } from './commands/chat';
import { initCommand } from './commands/init';
import { utilityCommands } from './commands/utility';

// Core Commands
// Helper to wrap actions with telemetry
const withTelemetry = (commandName: string, action: Function) => {
  return async (...args: any[]) => {
    // Hidden ping
    // telemetry.track(commandName); 
    return action(...args);
  };
};

program
  .command('login')
  .description('Login to GameMindPilot or configure API keys')
  .action(loginCommand);

program
  .command('init')
  .description('Initialize a new GameMindPilot project')
  .action(initCommand);

program
  .command('update')
  .description('Update GameMindPilot CLI to the latest version')
  .action(utilityCommands.update);

program
  .command('setup-global')
  .description('Instructions to install gmpilot globally')
  .action(utilityCommands.globalInstall);

program
  .command('chat')
  .description('Start an interactive AI chat (BYOK supported)')
  .action(chatCommand);

import { analysisCommands } from './commands/analysis';

// Analysis Features
program
  .command('archetypes')
  .description('Cluster playtesters into behavioral cohorts')
  .action(analysisCommands.archetypes)

program
  .command('security-scan')
  .description('AI-powered DevSecOps vulnerability scan')
  .action(analysisCommands.securityScan);

program
  .command('ab-test')
  .description('Forecast monetization A/B variants')
  .action(analysisCommands.abTest);

program
  .command('heap-scan')
  .description('Visualize memory leaks & hotspots')
  .action(analysisCommands.heapScan);

program
  .command('l10n-audit')
  .description('Audit dialogue localization quality')
  .action(() => logger.info('Localization audit coming soon...'));

import { simCommands } from './commands/simulation';
import { assetCommands } from './commands/assets';

// Simulation & Automation
program
  .command('montecarlo')
  .description('10k-player economy simulations')
  .option('-p, --players <number>', 'Number of players to simulate', '10000')
  .action((options) => simCommands.montecarlo(parseInt(options.players)));

program
  .command('pulse')
  .description('Get high-level project health metrics')
  .action(simCommands.pulse);

program
  .command('heal')
  .description('Autonomous self-healing engine audit')
  .action(simCommands.heal);

// Assets & Boilerplate
const assets = program
  .command('assets')
  .description('Unified game asset generation suite');

assets
  .command('item')
  .alias('enemy')
  .description('Procedural asset generation (item/enemy)')
  .action(assetCommands.item);

assets
  .command('sprite <description>')
  .description('AI-powered frame-by-frame sprite generation')
  .action((desc) => assetCommands.sprite(desc));

assets
  .command('material <prompt>')
  .description('Generate engine-ready PBR material maps from text')
  .action((prompt) => assetCommands.material(prompt));

assets
  .command('vfx')
  .description('Generate particle system parameters')
  .action(assetCommands.vfx);

program
  .command('script')
  .description('Generate code for Unity, Unreal, Godot')
  .option('-e, --engine <type>', 'Target engine (unity, unreal, godot)', 'unity')
  .action((options) => assetCommands.script(options.engine));

program
  .command('blueprint')
  .description('Generate complete game system boilerplate')
  .action(assetCommands.blueprint);

program
  .command('item')
  .alias('enemy')
  .description('Procedural asset generation (item/enemy) [Legacy]')
  .action(assetCommands.item);

import { designCommands } from './commands/design';

// Game Design
program
  .command('idea')
  .description('Generate unique game concepts')
  .action(designCommands.idea);

program
  .command('dialogue')
  .description('Generate NPC dialogues and choices')
  .option('-c, --context <text>', 'Specific context for the dialogue')
  .action((options) => designCommands.dialogue(options.context));

program
  .command('quest')
  .description('Generate side quests and objectives')
  .action(designCommands.quest);

program
  .command('level')
  .description('Generate level layouts and puzzles')
  .option('-t, --theme <type>', 'Level theme (e.g., sci-fi, jungle, dungeon)', 'dungeon')
  .action((options) => designCommands.level(options.theme));

import { advancedCommands } from './commands/advanced';

// Advanced Tools
program
  .command('world-builder')
  .description('AI-powered World Builder framework')
  .action(advancedCommands.worldBuilder);

program
  .command('quest-graph')
  .description('Quest dependency and branching visualizer')
  .action(advancedCommands.questGraph);

program
  .command('behavior-trees')
  .description('AI behavior tree architect')
  .action(advancedCommands.behaviorTrees);

program
  .command('storyboarder')
  .description('Cinematic scene storyboarder')
  .action(advancedCommands.storyboarder);

// Analytics & Reports
program
  .command('heatmaps')
  .description('Visualize player death/action heatmaps')
  .action(() => logger.info('Heatmap visualization requires integrated telemetry data...'));

program
  .command('playtest-reports')
  .description('Generate automated playtest summaries')
  .action(() => logger.info('Analyzing playtest data logs...'));

program
  .command('docs-gen')
  .description('Generate project documentation and README')
  .action(utilityCommands.docsGen);

// Expansion Pack 2 & 3
program
  .command('shader-gen')
  .description('Generate HLSL/GLSL shader templates')
  .action(utilityCommands.shaderGen);

program
  .command('sprite-anim')
  .description('Generate sprite animation metadata')
  .action(utilityCommands.spriteAnim);

program
  .command('save-logic')
  .description('Generate save/load system boilerplate')
  .action(utilityCommands.saveLogic);

program
  .command('path-audit')
  .description('Analyze navmesh and pathfinding hotspots')
  .action(utilityCommands.pathAudit);

program
  .command('l10n-sync')
  .description('AI-powered localization syncing')
  .action(utilityCommands.l10nSync);

program
  .command('sound-gen')
  .description('Generate sound effect prompts and descriptions')
  .action(utilityCommands.soundGen);

program
  .command('voice-script')
  .description('Generate NPC voice-over scripts with emotional tags')
  .action(utilityCommands.voiceScript);

program
  .command('balance-check')
  .description('AI-powered game balance analysis')
  .action(utilityCommands.balanceCheck);

program
  .command('marketing-kit')
  .description('Generate marketing kit (App Store, Social Media)')
  .action(utilityCommands.marketingKit);

program
  .command('collision-audit')
  .description('Audit collision layer matrix and physics layers')
  .action(utilityCommands.collisionAudit);

program
  .command('ui-layout')
  .description('AI-generated UI layout prototypes')
  .action(utilityCommands.uiLayout);

program
  .command('steam-sync')
  .description('Sync project metadata with Steamworks (Simulation)')
  .action(utilityCommands.steamSync);

program
  .command('discord-gen')
  .description('Generate Discord bot boilerplate for testing')
  .action(utilityCommands.discordGen);

program
  .command('telemetry-gen')
  .description('Generate telemetry event logging code')
  .action(utilityCommands.telemetryGen);

program
  .command('cutscene-gen')
  .description('Generate cinematic cutscene scripts and timelines')
  .action(utilityCommands.cutsceneGen);

program
  .command('mobile-audit')
  .description('Mobile-specific performance audit')
  .action(utilityCommands.mobileAudit);

program
  .command('lod-audit')
  .description('Asset LOD verification and audit')
  .action(utilityCommands.lodAudit);

// Expansion Wave 5
program
  .command('add-extension [package]')
  .description('Install a community GameMindPilot extension')
  .action((pkg) => utilityCommands.addExtension(pkg));

program
  .command('brainstorm <prompt>')
  .description('Multi-agent brainstorming session')
  .option('-a, --agents <list>', 'Comma-separated personas', 'Designer, Economist')
  .action((prompt, options) => utilityCommands.brainstorm(prompt, options.agents));

program
  .command('monitor')
  .description('Launch TUI Project Monitor Dashboard')
  .action(utilityCommands.monitor);

program
  .command('scan-project')
  .description('Index project for codebase-aware AI queries')
  .action(utilityCommands.scanProject);

program
  .command('ask <query>')
  .description('Ask the AI about your specific project code')
  .action((query) => utilityCommands.ask(query));

program
  .command('live-sync')
  .description('Start Engine Bridge for live editor connectivity')
  .action(utilityCommands.liveSync);

program
  .command('run-test-bots')
  .description('Launch automated playtest bots')
  .option('-c, --count <number>', 'Number of bots to run', '10')
  .action((options) => utilityCommands.runTestBots(parseInt(options.count)));

program
  .command('l10n-review')
  .description('Collaborative AI translation review bridge')
  .action(utilityCommands.l10nReview);

// Expansion Wave 6
program
  .command('legal-gen')
  .description('Generate EULA and Store Policy templates')
  .action(utilityCommands.legalGen);

program
  .command('net-sync')
  .description('Generate multiplayer synchronization boilerplate')
  .option('-p, --players <number>', 'Maximum players', '2')
  .action((options) => utilityCommands.netSync(parseInt(options.players)));

program
  .command('asset-bundler')
  .description('Analyze assets for bundling optimization')
  .action(utilityCommands.assetBundler);

program
  .command('collider-gen')
  .description('Generate optimized physics colliders')
  .action(utilityCommands.colliderGen);

program
  .command('git-auto [type]')
  .description('AI-powered Git commit/PR generation')
  .action((type) => utilityCommands.gitAuto(type || 'commit'));

program
  .command('ui-theme-gen')
  .description('Generate UI Design System tokens')
  .option('-s, --style <theme>', 'UI theme (e.g., modern, retro, cyberpunk)', 'modern')
  .action((options) => utilityCommands.uiThemeGen(options.style));

program
  .command('mobile-power-scan')
  .description('Mobile battery and thermal audit')
  .action(utilityCommands.mobilePowerScan);

// Expansion Wave 7
program
  .command('gdd-export')
  .description('Export complete professional GDD from project intel')
  .action(utilityCommands.gddExport);

program
  .command('cloud-sync')
  .description('Sync project configs and RAG with team cloud')
  .option('-t, --team <name>', 'Team/Studio name')
  .action((options) => utilityCommands.cloudSync(options.team));

program
  .command('ci-cd-setup')
  .description('Generate GitHub Actions for automated auditing')
  .action(utilityCommands.ciCdSetup);

program
  .command('benchmark-run')
  .description('Execute automated performance benchmarks')
  .action(utilityCommands.benchmarkRun);

program
  .command('workshop-sync')
  .description('Generate Steam Workshop and modding manifests')
  .action(utilityCommands.workshopSync);

program
  .command('monetization-sim')
  .description('Simulate economy and monetization balance')
  .action(utilityCommands.monetizationSim);

program
  .command('live-qa')
  .description('Start real-time AI playtester interaction')
  .action(utilityCommands.liveQa);

// Expansion Wave 8 (Smart UX)
program
  .command('search <query>')
  .description('AI-powered command search (Natural Language)')
  .action((query) => utilityCommands.findCommand(query));

program
  .command('alias')
  .description('Setup custom short aliases for long commands')
  .action(utilityCommands.setupAlias);

program
  .command('setup-completion')
  .description('Setup shell auto-completion helper')
  .action(utilityCommands.setupCompletion);

// Expansion Wave 9 (Visual Command Center)
program
  .command('web-view')
  .description('Launch local browser-based project dashboard')
  .action(utilityCommands.webView);

program
  .command('plugin-publish')
  .description('Publish your custom extension to the community hub')
  .action(utilityCommands.pluginPublish);

program
  .command('vitals-track')
  .description('Track long-term project progress metrics')
  .action(utilityCommands.vitalsTrack);

program
  .command('team-invite <email>')
  .description('Invite a team member to your shared cloud workspace')
  .action((email) => utilityCommands.teamInvite(email));

// Expansion Wave 10 (Deep Automation & Mastery)
program
  .command('watch')
  .description('Autonomous Reality Sync (background file monitoring)')
  .action(utilityCommands.watch);

program
  .command('persona-playtest')
  .description('Simulate specific player personalities (e.g., speedrunner)')
  .option('-t, --type <persona>', 'Persona type (speedrunner, completionist, casual)', 'balanced')
  .action((options) => utilityCommands.personaPlaytest(options.type));

program
  .command('ensemble-brain <prompt>')
  .description('Orchestrate multi-model AI brainstorming (Gemini + GPT + Claude)')
  .action((prompt) => utilityCommands.ensembleBrain(prompt));

program
  .command('doctor')
  .description('CLI and Project self-diagnostic health check')
  .action(utilityCommands.doctor);

// Expansion Wave 11 (Intelligence & Optimization)
program
  .command('asset-optimize')
  .description('Automated compression and atlas generation for project assets')
  .action(utilityCommands.assetOptimize);

program
  .command('review')
  .description('AI project-wide code quality and design pattern review')
  .action(utilityCommands.review);

program
  .command('dev-stream')
  .description('Start live coding assistance stream')
  .action(utilityCommands.devStream);

program
  .command('engine-setup')
  .description('Automate project settings for specific genres or platforms')
  .option('-g, --genre <type>', 'Game genre (RPG, FPS, Racing)', 'RPG')
  .action((options) => utilityCommands.engineSetup(options.genre));

program
  .command('mobile-perf')
  .description('Simulate performance on low-end mobile hardware')
  .action(utilityCommands.mobilePerf);

program
  .command('telemetry-toggle <status>')
  .description('Enable or disable anonymous usage tracking (on/off)')
  .action((status) => utilityCommands.toggleTelemetry(status === 'on'));

program
  .command('setup-analytics <key>')
  .description('Set your private Analytics API Key (e.g., from PostHog)')
  .action((key) => utilityCommands.setAnalyticsKey(key));

program
  .command('start')
  .description('Launch the Guided Onboarding Flow (The Hero\'s Journey)')
  .action(utilityCommands.start);

program
  .command('demo')
  .description('Showcase high-quality AI outputs from Hero Features')
  .action(utilityCommands.demo);

// Expansion Wave 12 (Infrastructure & Modding)
program
  .command('workshop-mod')
  .description('Generate a player-centric modding kit for your community')
  .action(utilityCommands.workshopMod);

program
  .command('server-gen')
  .description('Deploy multiplayer/backend infrastructure to the cloud')
  .option('-p, --provider <name>', 'Cloud provider (AWS, Azure, Firebase)', 'AWS')
  .action((options) => utilityCommands.serverGen(options.provider));

program
  .command('l10n-context <language>')
  .description('Deep, emotion-aware AI translation with character context')
  .action((language) => utilityCommands.l10nContext(language));

// Expansion Wave 13 (The Final Frontiers)
program
  .command('ai-director')
  .description('Generate real-time procedural difficulty and event director scripts')
  .action(utilityCommands.aiDirector);

program
  .command('cinematic-ai <prompt>')
  .description('Generate cinematic camera paths and lighting from dialogue/scripts')
  .action((prompt) => utilityCommands.cinematicAi(prompt));

program
  .command('ship-audit')
  .description('Comprehensive 100-point project audit for Store Readiness')
  .action(utilityCommands.shipAudit);

program
  .command('sound-env <mood>')
  .description('Generate procedural AI ambient soundscapes')
  .action((mood) => utilityCommands.soundEnv(mood));

program
  .command('eco-chaos')
  .description('Extreme stress-test for virtual game economies')
  .action(utilityCommands.ecoChaos);

// Default action: Dashboard
if (!process.argv.slice(2).length || (process.argv[2] && !program.commands.map(c => c.name()).includes(process.argv[2]) && !process.argv[2].startsWith('-'))) {
  utilityCommands.interactiveDashboard();
} else {
  program.parse(process.argv);
}
