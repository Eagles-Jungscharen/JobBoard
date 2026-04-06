---
applyTo: "**"
---

# Copilot Instructions – JobBoard

## Projektübersicht

React-App (Vite + TypeScript) für die Eagles Jungscharen zur Anzeige offener Stellen.
Deployment: Azure Static Web Apps via GitHub Actions.

## Stack

- **React 19** mit **TypeScript** — kein JavaScript
- **FluentUI React Components V9** (`@fluentui/react-components`) für alle UI-Elemente
- **FluentUI React Icons** (`@fluentui/react-icons`) für Icons
- **React Router v6** für clientseitiges Routing
- **TanStack Query v5** (`@tanstack/react-query`) für alle API-Aufrufe
- **DOMPurify** zum Sanitieren von HTML-Strings aus dem API

## Projektstruktur

```
src/
├── api/           # Nur API-Logik, keine UI
├── pages/         # Eine Datei pro Route
├── types/         # Interfaces und Typen
├── App.tsx        # FluentProvider + BrowserRouter + Routes
└── main.tsx       # QueryClientProvider + ReactDOM
```

## Coding-Konventionen

- Komponenten als **named exports** (nicht default), ausser `App` und `main`
- **FluentUI `makeStyles`** für alle Styles — kein CSS-Modul, kein Inline-Style, kein Tailwind
- **`tokens`** aus FluentUI für Abstände und Farben verwenden (nie Hardcoded px/rem)
- HTML-Felder (`jobDescription`, `expectation`) immer mit `DOMPurify.sanitize()` bereinigen bevor sie mit `dangerouslySetInnerHTML` gerendert werden
- API-URL ausschliesslich über `import.meta.env.VITE_API_URL` — nie hardcoden
- Fehler- und Ladezustände von TanStack Query immer behandeln (`isLoading`, `isError`)

## Datenmodell

```typescript
interface Job {
  id: string;
  title: string;
  ressort: string;
  ressortLeader: string;
  team: string;
  teamLeader: string;
  jobDescription: string; // HTML-String
  expectation: string;    // HTML-String
}
```

## Routen

| Pfad | Seite | Beschreibung |
|---|---|---|
| `/` | `OverviewPage` | Karten-Grid aller offenen Stellen |
| `/jobs/:id` | `DetailPage` | Detailansicht, Navigation per `job.id` |

## Environment

- `.env.local` — lokale Entwicklung (nicht in Git)
- `.env.example` — Vorlage, committed
- GitHub Secret `VITE_API_URL` — für den Build in GitHub Actions

## Was zu vermeiden ist

- Keine Index-basierte Navigation (immer `job.id`)
- Keine direkten `fetch`-Aufrufe ausserhalb von `src/api/`
- Keine `any`-Typen
- Kein Raw-HTML ohne `DOMPurify.sanitize()`
