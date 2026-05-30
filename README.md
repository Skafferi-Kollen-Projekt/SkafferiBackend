# Skafferi Kollen – Backend

Detta repository innehåller **backend** för projektet **Skafferi Kollen**.  
Backend är byggd med **Express**, **TypeScript** och **Prisma** och körs **endast lokalt**.

Projektet använder:
- PostgreSQL via **Docker**
- Prisma ORM
- JWT‑baserad autentisering (cookies)

Ingen deployment används i detta projekt.

---

## 🧱 Teknikstack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Docker)
- JWT (cookies)

---

---

## 🚀 Köra backend lokalt

### 1️⃣ Installera dependencies

```bash
npm install


_________________________________________
2️⃣ Starta databasen (Docker)
Projektet använder PostgreSQL via Docker.

docker compose up -d


Kontrollera att containern körs:

docker ps

_________________________________________
3️⃣ Miljövariabler
Skapa en .env‑fil i projektets root:

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/skafferi_db
JWT_SECRET=din_hemliga_jwt_nyckel


_________________________________________
4️⃣ Prisma – migrera databasen:
npx prisma migrate dev

_________________________________________
5️⃣ Starta backend:

npm run dev

nu körs det på "http://localhost:4000"

_________________________________________

🔗 Frontend
Frontend finns i ett separat repository:
➡️ skafferi-frontend
Frontend körs lokalt på:
http://localhost:5173
_________________________________________

✅ Status

✔ Backend fungerar lokalt
✔ Prisma + Docker fungerar
✔ Auth, användare och skafferi‑logik implementerad
✔ Klar för integration med frontend

