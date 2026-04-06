# JobBoard

Stellenbörse für die Eagles Jungscharen. Zeigt offene Stellen aus einem externen API und ermöglicht die Detailansicht jeder Stelle.

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Framework | React 19 + TypeScript |
| UI | FluentUI React Components V9 |
| Routing | React Router v6 |
| Data Fetching | TanStack Query v5 |
| Build | Vite |
| Hosting | Azure Static Web Apps |

## Lokale Entwicklung

### Voraussetzungen

- Node.js ≥ 18
- npm ≥ 9

### Setup

```bash
# Repository klonen
git clone <repo-url>
cd JobBoard

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen konfigurieren
cp .env.example .env.local
# .env.local öffnen und VITE_API_URL setzen

# Entwicklungsserver starten
npm run dev
```

Die App ist danach unter http://localhost:5173 erreichbar.

### Verfügbare Befehle

| Befehl | Beschreibung |
|---|---|
| `npm run dev` | Entwicklungsserver starten |
| `npm run build` | Produktions-Build erstellen |
| `npm run preview` | Produktions-Build lokal testen |

## Umgebungsvariablen

| Variable | Beschreibung | Pflicht |
|---|---|---|
| `VITE_API_URL` | URL des Jobs-API-Endpoints | Ja |

Für die lokale Entwicklung wird `.env.local` verwendet (wird nicht ins Git eingecheckt).
Die Vorlage liegt in `.env.example`.

## Deployment auf Azure Static Web Apps

### Einmalige Einrichtung

1. Azure Static Web App im Azure Portal erstellen
2. GitHub-Repository verknüpfen
3. Folgende GitHub Secrets setzen:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN` — von Azure SWA-Ressource kopieren
   - `VITE_API_URL` — URL des Jobs-API

### CI/CD

Jeder Push auf `main` löst automatisch einen Build und ein Deployment aus.
Pull Requests erhalten automatisch eine Vorschau-URL.

## Projektstruktur

```
src/
├── api/
│   └── jobsApi.ts        # API-Calls
├── pages/
│   ├── OverviewPage.tsx  # Übersicht aller offenen Stellen
│   └── DetailPage.tsx    # Detailansicht einer Stelle
├── types/
│   └── job.ts            # TypeScript-Interface für Job
├── App.tsx               # Routing + FluentUI Provider
└── main.tsx              # Einstiegspunkt + QueryClientProvider
```

## Job-Datenmodell

```typescript
interface Job {
  id: string;             // Eindeutiger Bezeichner
  title: string;
  ressort: string;
  ressortLeader: string;
  team: string;
  teamLeader: string;
  jobDescription: string; // HTML-String (wird mit DOMPurify sanitiert)
  expectation: string;    // HTML-String (wird mit DOMPurify sanitiert)
}
```
