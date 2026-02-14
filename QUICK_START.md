# 🚀 Quick Start Guide - HYROXPRO

## ✅ Was bereits fertig ist:

- ✅ **Authentication System** - Login/Logout mit Supabase
- ✅ **Protected Routes** - Automatische Weiterleitung zu /login
- ✅ **Race Goal Management** - Formulare für Wettkampfziele
- ✅ **Onboarding Flow** - Erster Besuch → Race Goal erstellen
- ✅ **Database Hooks** - React Query für alle Datenoperationen
- ✅ **TypeScript Types** - Vollständig typisiert

## 📝 Setup-Schritte (5 Minuten)

### 1️⃣ Supabase Projekt erstellen

```bash
1. Gehe zu: https://supabase.com/dashboard
2. Klicke: "New Project"
3. Name: "hyroxpro" (oder beliebig)
4. Database Password: Wähle ein starkes Passwort
5. Region: Wähle die nächstgelegene Region
6. Klicke: "Create new project"
7. Warte ~2 Minuten bis das Projekt bereit ist
```

### 2️⃣ Database Schema ausführen

```bash
1. In Supabase Dashboard → SQL Editor (linke Sidebar)
2. Klicke: "New Query"
3. Öffne die Datei: supabase-schema.sql aus diesem Projekt
4. Kopiere ALLES (Cmd+A, Cmd+C)
5. Füge es in den SQL Editor ein (Cmd+V)
6. Klicke: "Run" (oder Cmd+Enter)
7. Warte bis "Success" erscheint
```

**Wichtig:** Die gesamte SQL-Datei muss auf einmal ausgeführt werden!

### 3️⃣ API Credentials holen

```bash
1. In Supabase Dashboard → Settings (Zahnrad-Icon)
2. Klicke: API (linke Sidebar)
3. Unter "Project URL": Kopiere die URL (sieht aus wie https://xyz.supabase.co)
4. Unter "Project API keys": Kopiere den "anon public" Key
```

### 4️⃣ Environment Variables setzen

Öffne die Datei `.env.local` im Projektordner und ersetze die Werte:

```env
VITE_SUPABASE_URL=https://dein-projekt-id.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key-hier
```

**WICHTIG:**
- Keine Anführungszeichen um die Werte!
- Speichere die Datei nach dem Ändern!

### 5️⃣ App starten

```bash
npm run dev
```

Die App sollte auf `http://localhost:5173` laufen!

---

## 🧪 Testen des Setups

### Test 1: Registrierung
1. Öffne `http://localhost:5173`
2. Du solltest automatisch zu `/login` weitergeleitet werden
3. Klicke unten auf "Don't have an account? Sign up"
4. Registriere dich mit einer Email + Passwort (min. 6 Zeichen)
5. Bei Erfolg: "Account created!" Toast-Nachricht

### Test 2: Login
1. Gib deine Email + Passwort ein
2. Klicke "Sign In"
3. Bei Erfolg: Du wirst zu `/onboarding` weitergeleitet

### Test 3: Race Goal erstellen
1. Auf der Onboarding-Seite:
   - Race Name: z.B. "HYROX COLOGNE 2025"
   - Race Category: z.B. "Pro Singles"
   - Start Training: Ein Datum in der Vergangenheit/naher Zukunft
   - Race Day: Ein Datum in der Zukunft (nach Start Training!)
   - Sessions Per Week: Wähle 4, 5 oder 6
2. Klicke "Create Training Plan"
3. Bei Erfolg: Weiterleitung zu `/` (Dashboard)

### Test 4: Supabase Datenbank prüfen
1. Gehe zu Supabase → Table Editor
2. Öffne die Tabelle `race_goals`
3. Du solltest dein erstelltes Race Goal sehen
4. Öffne die Tabelle `user_roles`
5. Du solltest deinen User mit `role = 'user'` sehen

---

## 🔧 Troubleshooting

### Fehler: "Missing Supabase environment variables"
- ✅ Prüfe, ob `.env.local` existiert
- ✅ Prüfe, ob die Werte korrekt kopiert wurden (keine Leerzeichen am Anfang/Ende)
- ✅ Starte den Dev-Server neu: Stoppe mit Ctrl+C, dann `npm run dev`

### Fehler beim Login: "Invalid login credentials"
- ✅ Prüfe Email + Passwort korrekt
- ✅ Gehe zu Supabase → Authentication → Users
- ✅ Prüfe, ob dein User dort existiert
- ✅ Falls "Email not confirmed": Prüfe dein Email-Postfach

### Fehler: "Failed to create race goal"
- ✅ Öffne Browser Console (F12) für Details
- ✅ Gehe zu Supabase → Table Editor → `race_goals`
- ✅ Prüfe, ob die Tabelle existiert
- ✅ Falls "permission denied": SQL-Schema nochmal ausführen

### Die Seite lädt endlos
- ✅ Öffne Browser Console (F12)
- ✅ Suche nach roten Fehlermeldungen
- ✅ Häufig: Supabase URL oder Key falsch → `.env.local` prüfen

---

## 🔐 Admin-Zugriff einrichten

Um die Admin-Seite (`/admin`) nutzen zu können:

```bash
1. Gehe zu Supabase → Table Editor → user_roles
2. Finde deinen User (user_id ist deine User-ID)
3. Klicke auf die Zeile zum Bearbeiten
4. Ändere "role" von "user" zu "admin"
5. Speichern
6. In der App: Logout + Login (Ctrl+Shift+R zum Neuladen)
```

Jetzt solltest du Zugriff auf `/admin` haben und Workouts verwalten können!

---

## 📊 Was du nach dem Setup testen kannst:

### ✅ Funktioniert bereits:
- Login/Logout Flow
- Race Goal erstellen
- Onboarding-Redirect (kein Goal → `/onboarding`)
- Protected Routes (nicht eingeloggt → `/login`)
- User Roles (admin check funktioniert)

### 🚧 Noch nicht implementiert (kommt in Phase 3-4):
- ❌ Automatisches Workout-Scheduling
- ❌ Training Calendar mit echten Daten
- ❌ Drag-and-Drop im Kalender
- ❌ Admin: Workout-Bibliothek aus Supabase laden
- ❌ RaceCountdown mit dynamischen Daten

Das sind die nächsten Schritte!

---

## 🎯 Nächste Phase (wird implementiert):

**Phase 3: Workout Scheduling**
- Scheduling-Algorithmus (verteilt Workouts über Trainingsperiode)
- Scheduled Workouts Hooks (speichert Plan in DB)
- Auto-Generierung beim Race Goal erstellen

**Phase 4: Dynamic Calendar + Drag-and-Drop**
- Training Calendar zeigt echte Daten aus DB
- Drag-and-Drop zum Verschieben von Workouts
- Move (auf leeren Tag) + Swap (auf belegten Tag)

**Phase 5: Admin Integration**
- Admin-Seite lädt Workouts aus Supabase
- Nur Admins können Workouts erstellen/bearbeiten
- Seed-Funktion für Sample-Workouts

---

## 📝 Wichtige Hinweise:

1. **Entwicklungsumgebung:**
   - Die `.env.local` Datei wird NICHT ins Git committed (ist in .gitignore)
   - Jeder Entwickler braucht seine eigene `.env.local`

2. **Supabase Free Tier:**
   - 500MB Database
   - 50k MAU (Monthly Active Users)
   - 2GB File Storage
   - Mehr als genug für Entwicklung!

3. **Security:**
   - Row Level Security (RLS) ist aktiviert
   - User können nur ihre eigenen Daten sehen
   - Admins können alle Workouts sehen, aber nur ihre eigenen Goals

Viel Erfolg beim Testen! 🚀
