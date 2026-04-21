# Changelog

All notable changes to **NPS UI** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] — 2026-04-14

### 🎉 Initial Release

#### Added

- **NpsButton** — Button component built on top of Ant Design `Button`
  - Support all native Ant Design Button props
  - Custom `rounded` prop: `"default" | "md" | "lg" | "full"`
  - Full TypeScript support with exported `NpsButtonProps`
  - Compatible with Ant Design `ConfigProvider` theme tokens
- **NpsConfigProvider** — Optional provider wrapper for compatibility with Ant Design `ConfigProvider`
- Monorepo workspace setup (`packages/ui` + `apps/docs`)
- Documentation site with Getting Started guide and component demos
- Published to npm as `@namphuongso/nps-ui`

#### Package

- Dual CJS/ESM build output via Vite
- TypeScript declarations via `vite-plugin-dts`
- CSS side-effects properly declared for tree-shaking safety

[0.1.0]: https://github.com/namphuongso/nps-ui/releases/tag/v0.1.0
