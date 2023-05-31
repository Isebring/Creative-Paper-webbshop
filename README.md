# <img src="./client/public/assets/logoCreative.svg" width="100rem"/>

# Creative Paper
Creative Paper has a wide selection of notebooks, writing instruments, professionally bound journals, and sophisticated desktop accessories.
## A webshop

This is a webshop where we have created both the frontend and backend application and connected the application to a database.

## About the code

- **Frontend stack:** React, Typescript, Mantine UI
- **Backend stack:** MongoDB, Express

<br>

### Contributors:

- [Lisa Marie Andersson](https://github.com/lisamarieandersson)
- [Moa Hedendahl](https://github.com/moamoa07)
- [Hampus Isebring](https://github.com/Isebring)
- [Jesper Lindström](https://github.com/Jesper-Lindstrom)
- [Caisa Köhlin](https://github.com/caisak)


<br>

### How to build the project:
To start this project you need two terminals, one server and one client. Start the server terminal first, otherwise you may get a proxy error.


**For server**
Open a terminal and run these commands:

* `cd server`
* `npm install`
* `npm run dev`

  <br>

**For client**
Open a second terminal and run these commands:
* `cd client`
* `npm install`
* `npm run dev`




## G-Krav

- [ ] Alla sidor skall vara responsiva. (G)
  - Här något om att det är responsivt
- [x] Arbetet ska implementeras med en React frontend och en Express backend. (G)
  - Vi har använt oss utav React och Express (se package.json för proof😁)
- [ ] Express backenden ska ha validering på samtliga endpoints. (G)
- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
  - Detta har gjorts
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
  - Fick ok av David
- [ ] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
- [x] ## Man ska kunna logga in som administratör i systemet (G)
- [x] Inga Lösenord får sparas i klartext i databasen (G)
- [ ] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [ ] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)

## VG-Krav

- [x] Ett CI flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
- [x] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
- [x] Administratörer ska kunna redigera produkt inklusive vilka kategorier den tillhör (VG)
- [x] Administratörer ska kunna lägga till och ta bort produkter (VG)
- [ ] Backendapplikationen ska ha en fungerande global felhantering (VG)
- [x] En administratör ska kunna uppgradera en användare till administratör (VG)
- [x] Administratörer ska kunna markera beställningar som skickade (VG)
