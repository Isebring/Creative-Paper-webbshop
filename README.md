# <img src="./client/public/assets/logoCreative.svg" width="100rem"/>

# Creative Paper

Creative Paper is a web shop that has a wide selection of notebooks, writing instruments, professionally bound journals, and sophisticated desktop accessories.

## A webshop

This is a webshop where most of the front end already existed. We have rebranded and added to the front end, built the backend from scratch and connected the application to a database.

## About the code

- **Frontend stack:** React, Typescript, Mantine UI
- **Backend stack:** MongoDB, Express, Typescript
- **Validation** Yup

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

- `cd server`
- `npm install`
- `npm run dev`

  <br>

**For client**
Open a second terminal and run these commands:

- `cd client`
- `npm install`
- `npm run dev`

## G-Krav

- [x] Alla sidor skall vara responsiva. (G)
  - Sidan och alla komponenter är anpassade för mobil, tablet och desktop.
- [x] Arbetet ska implementeras med en React frontend och en Express backend. (G)
  - Klientsidan är byggd med React och serversidan med Express (se package.json för proof😁)
- [ ] Express backenden ska ha validering på samtliga endpoints. (G)
  - FYLL I HÄR
- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
  - (Er diagram)[https://app.diagrams.net/#G1H9vWxCupFweV4WFKyv16Vtd4JEPUrH4g]
  - (Koddiagram)[https://app.diagrams.net/#G1RkXkOFUfs6RfXAlkPBBPh7n9PTMvl4rF]
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)

  - Creative Paper representerar en minimalistisk och stilren sida för skrivbordstillbehör. Vi har noggrant utvecklat en webbutik som är både tillgänglighetsanpassad, användarvänlig och estetiskt tilltalande. Vår ambition är att skapa en digital upplevelse som speglar och stärker Creative Papers eleganta varumärke som är känt för sin minimalistiska estetik.

  - Webbshoppen är mer än en försäljningsplattform; den är en digital förlängning av Creative Papers varumärke. Vi har valt en design som kännetecknas av stilrenhet, raka linjer och mjuka färger, med ett tydligt fokus på intuitiv navigering, tydlig kategorisering och vackra produkter. Vi vill att varje produkt vi presenterar ska framstå lika vacker online som i verkligheten.

  - Vårt huvudsakliga mål är att skapa en unik och minnesvärd onlineupplevelse för Creative Papers kunder. Webbshoppen är optimerad för sökmotorer, responsiv i alla skärmstorlekar och har en molnbaserad databas som alltid är tillgänglig.

- [x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
  - I databasen finns kollektioner för users, products, orders, images och categories.
- [x] Man ska kunna logga in som administratör i systemet (G)
  - Admin sidan är en protected route och går endast att nå som inloggad administratör. När en admin loggar in som administratör visas en knapp till admin sidan i dropdown menyn.
- [x] Inga Lösenord får sparas i klartext i databasen (G)
  - Lösenorden är hashade med Argon2.
- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
  - Lagersaldot i databasen heter `stock` och uppdateras vid varje beställning.
- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
  - En inloggad admin kan välja Admin -> Product Management -> Edit Product för att komma till formuläret där bland annat stock kan ändras manuellt.
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
  - Administratörer hittar gjorda beställningar under Admin -> Order Management.
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
  - Produkterna är indelade i sju kategorier: Pens, Notebooks, Journals, Cards, Calendars, Planners och Accessories. En produkt måste ha en eller flera kategorier. För att se vilka kategorier en produkt tillhör: besök databasen eller filtrera produkter på sidan.
- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
  - På homepage finns en lista över alla produkter med möjlighet för filtrering av kategorier och pris från högst till lägst och vice versa. Det finns även produktsidor med specifika kategorier.
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
  - Kundkorgen sparas i local storage så om besökaren lägger något i kundkorgen så är det kvar nästa gång de besöker hemsidan, men det som ligger i kundkorgen är inte synligt för andra användare eller administratörer och sparas inte i databasen.
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
  - Om en besökare försöker göra en beställning utan att vara registrerad och inloggad kommer detta inte att gå. Användaren får i en modal alternativet att logga in eller registrera sig för att genomföra beställningen.
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
  - Det går bara att genomföra en beställning om användaren fyller i korrekta uppgifter.

## VG-Krav

- [x] Ett CI flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
  - CI flöde som kontrollerar prettier, eslint, typescript och tester sattes upp i början och en PR måste ha 0 eslint varningar och alla filer formatterade för att den ska kunna godkännas.
- [x] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
  - En användare kan se sina beställningar under My Account i dropdown menyn. Den finns även för administratörer i dropdown menyn.
- [x] Administratörer ska kunna redigera produkt inklusive vilka kategorier den tillhör (VG)
  - Administratörer kan redigera en produkt genom att gå till Admin -> Product Management -> Edit product på den specifika produkt administratören vill redigera. Då kommer ett formulär upp där admin kan göra önskade förändringar. All info i formuläret hämtas inte automatiskt, så för att ändra i kategorier måste alla önskade kategorier väljas, även den som fanns innan.
- [x] Administratörer ska kunna lägga till och ta bort produkter (VG)
  - Admin -> Product Management finns en knapp för Add Product och vill admin ta bort en produkt finns det en Delete Product knapp på varje individuell produkt.
- [x] Backendapplikationen ska ha en fungerande global felhantering (VG)
  - På serversidan finns en errorHandler-function som är en standard Express felhanterings-middleware. Den kommer att ta emot alla fel som skickas till next() inom applikationen. errorHandler innehåller klasser med errors som kan ske i applikationen, varje klass har en specifik HTTP-status med tillhörande error-meddelande.
- [x] En administratör ska kunna uppgradera en användare till administratör (VG)
  - En administratör kan uppgradera eller nedgradera andra användares status genom att gå till Admin -> User Management. Där finns en lista på alla användare och deras nuvarande status och en knapp för "Make Admin" om de är vanliga användare eller "Remove Admin" för att ta bort andra administratörers admin privilegium.
- [x] Administratörer ska kunna markera beställningar som skickade (VG)
  - Under Admin -> Order Management finns en dropdown meny där administratörer kan välja statusen "In Progress" eller "Shipped". När admin ändrat statusen på beställningen visas detta för användaren i deras beställning under My Account.
