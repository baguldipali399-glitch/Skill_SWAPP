# Skill Swap Campus — Local VS Code Project

## Run locally

### Option 1: VS Code Live Server
1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

### Option 2: Python
Open the VS Code terminal in this folder and run:

```bash
python -m http.server 5500
```

Then open:

`http://localhost:5500`

## Project structure

```text
skill-swap-campus-local/
├── index.html
├── style.css
├── js/
│   ├── app.js
│   ├── config.js
│   └── supabase.js
├── database/
│   └── schema.sql
└── README.md
```

## Current behavior

The supplied UI is a local prototype and stores the demo account name in browser localStorage. It does not require Supabase to run locally.

## Supabase

The SQL schema is included for the database layer. Add your Supabase credentials to `js/config.js` only when you are ready to connect the app to Supabase. Never put a Supabase service-role/secret key in browser JavaScript.

website http://localhost:3000.url
