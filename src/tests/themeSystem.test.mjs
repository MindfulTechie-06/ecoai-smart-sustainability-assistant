import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('ECHO AI — Dual Theme System Comprehensive Verification', () => {
  const rootDir = 'c:\\Users\\LENOVO\\Desktop\\ECHO_AI';

  test('1. Anti-Flash Inline Script in index.html', () => {
    const htmlPath = path.join(rootDir, 'index.html');
    assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
    const content = fs.readFileSync(htmlPath, 'utf-8');

    // Anti-flash script validation
    assert.ok(content.includes('localStorage.getItem(\'echo_theme\')'), 'Must read echo_theme from localStorage in head');
    assert.ok(content.includes('root.classList.add(\'dark\')'), 'Must add dark class when theme is dark');
    assert.ok(content.includes('root.setAttribute(\'data-theme\', \'dark\')'), 'Must set data-theme attribute');
    assert.ok(content.includes('root.setAttribute(\'data-theme\', \'light\')'), 'Must set data-theme light attribute');
    assert.ok(content.includes('bg-[#F5F8F6]'), 'Body must use Day Mode background token #F5F8F6');
    assert.ok(content.includes('dark:bg-[#081710]'), 'Body must use Night Mode background token #081710');
    assert.ok(content.includes('text-[#14251D]'), 'Body must use Day Mode primary text #14251D');
    assert.ok(content.includes('dark:text-[#F2F8F4]'), 'Body must use Night Mode primary text #F2F8F4');
  });

  test('2. CSS Design Tokens in src/index.css', () => {
    const cssPath = path.join(rootDir, 'src/index.css');
    assert.ok(fs.existsSync(cssPath), 'src/index.css must exist');
    const css = fs.readFileSync(cssPath, 'utf-8');

    // Day Mode Tokens
    assert.ok(css.includes('--bg-main: #F5F8F6'), 'Day Mode main background token');
    assert.ok(css.includes('--bg-secondary: #EDF3EF'), 'Day Mode secondary background token');
    assert.ok(css.includes('--bg-card: #FFFFFF'), 'Day Mode card background token');
    assert.ok(css.includes('--text-primary: #14251D'), 'Day Mode primary text token');
    assert.ok(css.includes('--text-secondary: #64766B'), 'Day Mode secondary text token');
    assert.ok(css.includes('--text-muted: #87968C'), 'Day Mode muted text token');
    assert.ok(css.includes('--border-color: #DCE8E0'), 'Day Mode border color token');
    assert.ok(css.includes('--brand-primary: #075B43'), 'Day Mode brand primary token');
    assert.ok(css.includes('--brand-emerald: #0C956B'), 'Day Mode brand emerald token');
    assert.ok(css.includes('--brand-mint: #C8F2DE'), 'Day Mode brand mint token');
    assert.ok(css.includes('--brand-soft: #E5F5EC'), 'Day Mode brand soft token');

    // Night Mode Tokens
    assert.ok(css.includes('--bg-main: #081710'), 'Night Mode main background token');
    assert.ok(css.includes('--bg-secondary: #0C1D15'), 'Night Mode secondary background token');
    assert.ok(css.includes('--bg-card: #12271D'), 'Night Mode card background token');
    assert.ok(css.includes('--bg-card-elevated: #173329'), 'Night Mode elevated card token');
    assert.ok(css.includes('--text-primary: #F2F8F4'), 'Night Mode primary text token');
    assert.ok(css.includes('--text-secondary: #9AB9A8'), 'Night Mode secondary text token');
    assert.ok(css.includes('--text-muted: #6E8D7D'), 'Night Mode muted text token');
    assert.ok(css.includes('--border-color: #244538'), 'Night Mode border token');
    assert.ok(css.includes('--brand-primary: #20B982'), 'Night Mode primary accent token');
    assert.ok(css.includes('--brand-emerald: #8BE7BD'), 'Night Mode secondary accent token');

    // Smooth transitions
    assert.ok(css.includes('transition: background-color 0.3s'), 'Must have smooth background transition');
    assert.ok(css.includes('prefers-reduced-motion'), 'Must respect prefers-reduced-motion');
  });

  test('3. ThemeContext Implementation & API', () => {
    const ctxPath = path.join(rootDir, 'src/context/ThemeContext.jsx');
    assert.ok(fs.existsSync(ctxPath), 'ThemeContext.jsx must exist');
    const code = fs.readFileSync(ctxPath, 'utf-8');

    assert.ok(code.includes('createContext'), 'Must create context');
    assert.ok(code.includes('ThemeProvider'), 'Must export ThemeProvider');
    assert.ok(code.includes('useTheme'), 'Must export useTheme hook');
    assert.ok(code.includes('chartTheme'), 'Must provide chartTheme dictionary');
    assert.ok(code.includes('localStorage.getItem(\'echo_theme\')'), 'Must read persistence');
    assert.ok(code.includes('localStorage.setItem(\'echo_theme\', theme)'), 'Must write persistence');
    assert.ok(code.includes('root.classList.add(\'dark\')'), 'Must sync dark class to DOM');
    assert.ok(code.includes('root.setAttribute(\'data-theme\', \'dark\')'), 'Must sync data-theme to DOM');

    // Day Mode Default validation
    assert.ok(code.includes("return 'light'"), "Default for first-time visitors must be 'light' (Day Mode)");
  });

  test('4. ThemeToggle Component Features', () => {
    const togglePath = path.join(rootDir, 'src/components/ThemeToggle.jsx');
    assert.ok(fs.existsSync(togglePath), 'ThemeToggle.jsx must exist');
    const code = fs.readFileSync(togglePath, 'utf-8');

    // Options validation
    assert.ok(code.includes('Day Mode'), 'Must provide Day Mode option');
    assert.ok(code.includes('Night Mode'), 'Must provide Night Mode option');
    assert.ok(code.includes('role="radiogroup"'), 'Must have accessible radiogroup role');
    assert.ok(code.includes('aria-checked='), 'Must indicate checked state for screen readers');
    assert.ok(code.includes('Switch to Day Mode'), 'Must have accessible title/label');
    assert.ok(code.includes('Switch to Night Mode'), 'Must have accessible title/label');
    assert.ok(code.includes('Sun'), 'Must have Sun icon');
    assert.ok(code.includes('Moon'), 'Must have Moon icon');
    assert.ok(code.includes('layout'), 'Must have animated sliding indicator via Framer Motion');
  });

  test('5. Recharts & SVG Data Visualizations Theme Adaptation', () => {
    // Digital Twin chart
    const dtPath = path.join(rootDir, 'src/components/DigitalTwin.jsx');
    const dtCode = fs.readFileSync(dtPath, 'utf-8');
    assert.ok(dtCode.includes('useTheme()'), 'DigitalTwin must consume useTheme');
    assert.ok(dtCode.includes('chartTheme.grid'), 'DigitalTwin must use chartTheme.grid for CartesianGrid');
    assert.ok(dtCode.includes('chartTheme.axis'), 'DigitalTwin must use chartTheme.axis for XAxis/YAxis');
    assert.ok(dtCode.includes('chartTheme.tooltipBg'), 'DigitalTwin must use chartTheme.tooltipBg for Tooltip');
    assert.ok(dtCode.includes('chartTheme.baseline'), 'DigitalTwin must use chartTheme.baseline for Baseline bar');
    assert.ok(dtCode.includes('chartTheme.proposed'), 'DigitalTwin must use chartTheme.proposed for Proposed bar');

    // Data Ingestion charts
    const diPath = path.join(rootDir, 'src/components/DataIngestionSection.jsx');
    const diCode = fs.readFileSync(diPath, 'utf-8');
    assert.ok(diCode.includes('useTheme()'), 'DataIngestion must consume useTheme');
    assert.ok(diCode.includes('chartTheme.grid'), 'DataIngestion must use chartTheme.grid');
    assert.ok(diCode.includes('chartTheme.energy'), 'DataIngestion must use chartTheme.energy');
    assert.ok(diCode.includes('chartTheme.renewable'), 'DataIngestion must use chartTheme.renewable');
    assert.ok(diCode.includes('chartTheme.water'), 'DataIngestion must use chartTheme.water');
    assert.ok(diCode.includes('chartTheme.waste'), 'DataIngestion must use chartTheme.waste');

    // Trajectory SVG
    const dashPath = path.join(rootDir, 'src/components/DashboardSection.jsx');
    const dashCode = fs.readFileSync(dashPath, 'utf-8');
    assert.ok(dashCode.includes('useTheme()'), 'DashboardSection must consume useTheme');
    assert.ok(dashCode.includes('stroke={chartTheme.grid}'), 'DashboardSection must adapt trajectory grid lines');
    assert.ok(dashCode.includes('stopColor={chartTheme.accentPrimary}'), 'DashboardSection must adapt trajectory gradient');
    assert.ok(dashCode.includes('stroke={chartTheme.target}'), 'DashboardSection must adapt SBTi target ceiling line');

    // Executive Dashboard Donut
    const execPath = path.join(rootDir, 'src/components/ExecutiveDashboard.jsx');
    const execCode = fs.readFileSync(execPath, 'utf-8');
    assert.ok(execCode.includes('useTheme()'), 'ExecutiveDashboard must consume useTheme');
    assert.ok(execCode.includes('stroke={chartTheme.grid}'), 'ExecutiveDashboard must adapt donut track circle');
    assert.ok(execCode.includes('stroke={chartTheme.scope1}'), 'ExecutiveDashboard must adapt donut Scope 1 slice');
  });

  test('6. Application Shell & Global Consistency', () => {
    // App.jsx
    const appPath = path.join(rootDir, 'src/App.jsx');
    const appCode = fs.readFileSync(appPath, 'utf-8');
    assert.ok(appCode.includes('useTheme()'), 'App.jsx must consume useTheme');
    assert.ok(appCode.includes('bg-[#F5F8F6] dark:bg-[#081710]'), 'App.jsx root background classes');
    assert.ok(appCode.includes('text-[#14251D] dark:text-[#F2F8F4]'), 'App.jsx root text classes');

    // Sidebar.jsx
    const sidePath = path.join(rootDir, 'src/components/Sidebar.jsx');
    const sideCode = fs.readFileSync(sidePath, 'utf-8');
    assert.ok(sideCode.includes('bg-white dark:bg-[#081710]'), 'Sidebar must adapt in Day and Night mode');
    assert.ok(sideCode.includes('border-[#DCE8E0] dark:border-[#244538]'), 'Sidebar border tokens');
    assert.ok(sideCode.includes('variant="full"'), 'Sidebar must use full ThemeToggle variant');

    // DashboardHeader.jsx
    const headPath = path.join(rootDir, 'src/components/DashboardHeader.jsx');
    const headCode = fs.readFileSync(headPath, 'utf-8');
    assert.ok(headCode.includes('bg-white/95 dark:bg-[#0C1D15]/95'), 'Header surface tokens');
    assert.ok(headCode.includes('variant="compact"'), 'Header must use compact ThemeToggle variant');

    // Main.jsx
    const mainPath = path.join(rootDir, 'src/main.jsx');
    const mainCode = fs.readFileSync(mainPath, 'utf-8');
    assert.ok(mainCode.includes('<ThemeProvider>'), 'main.jsx must wrap App with ThemeProvider');
  });
});

