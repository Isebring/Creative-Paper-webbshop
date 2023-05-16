[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/h5FXkH4A)

# Webbshop med React & Typescript

## Starta Projektet

Här är en lista på de olika skripten som kan köras i terminalen:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar Vite dev servern.
- `npm test` - Startar dev servern & Cypress så du kan jobba med kravlistan.

> Om du får felet `Cypress verification timed out` kan du förlänga tiden för verifieringen - [läs mer här](https://stackoverflow.com/questions/63667880/cypress-verification-timed-out-after-30000-milliseconds).

## Rättning

Den här uppgiften rättas automatiskt utifrån de skriva testerna som finns i projektet. Det innebär att du kommer kunna se vilka krav du har uppfyllt när du utvecklar lokalt på din dator med Cypress. Du kommer också kunna se rättningen som en GitHub Action som körs varje gång du pushar kod till ditt repo.

Det kan vara bra att du kollar att rättning på GitHub stämmer överrens med testerna lokalt i Cypress. Om de inte visa samma resultat kan du behöva köra `npm run update` för att få hem de senaste testerna så du kan åtgärda eventuella fel i din kod.

## Beskrivning

**Läs noga igenom hela uppgiftsbeskrivningen innan ni börjar.**

I den här laborationen ska ni i grupp om tre skapa en webbshop med hjälp av React och Typescript. Det ni ska skapa är fyra stycken sidor: en startsida, en produktsida, en kassasida och en bekräftelsesida.

### Startsidan & Produktsidan

Er sida ska presentera ett antal olika produkter på startsidan. Vilka typer av produkter som säljs är valfritt men det ska vara seriöst och välgjort. Det ska vara möjligt att klicka på en produkt för gå till produktsidan där användaren kan läsa mer om den valda produkten. Från både startsidan och produktsidan ska det vara möjligt att lägga till produkter i en kundvagn och det ska tydlig framgå för användaren när produkten läggs till i kundvagnen.

### Kassasidan

#### Kundvagn

Ska lista tillagda produkter (bild & titel) dess antal, pris och kundvagnens totalpris. Det ska vara möjligt att uppdatera kundvagnen - dvs ändra antalet av en produkt eller ta bort en produkt helt från kundvagnen. Totalpriset ska alltid uppdateras och vara korrekt.

#### Leveransuppgifter

Ska vara ett formulär där användaren fyller i namn, mail, telefonnummer och adress. Fälten i formuläret ska gå att automatisk fyllas i. Samtliga fält ska valideras så att endast rätt information kan matas in.

#### Bekräftelsesidan

När alla delar har fyllts i på kassasidan så ska användaren kunna slutföra köpet och då få en bekräftelse på köpet tillsammans med ett unikt ordernummer.

Tänk på att det inte ska gå att placera ordern två gånger, även om man navigerar tillbaka på sidan! All orderinformation som användaren har matat in skall presenteras i beskräftelsen som ett bevis på att ni har hanterat datan i alla formulären korrekt.

### Adminsidan (VG)

Designen på denna sida är valfri men skall utgå ifrån designsystemet ni använder er av. Det skall finnas en knapp på startsidan som tar användaren till adminsidan. På adminsidan skall ni lista alla produkter samt ge användaren möjlighet att ta bort, lägga till eller ändra samtliga produkter (CRUD). Om ni väljer att ha en separat sida, modal eller accordion för ändring/tilläggning av en produkt är valfritt men flödet ska vara routat. Samtliga produkter skall vara sparade i localstorage, detta betyder att om localstorage är tomt vid inladdning av sidan behöver samtliga fördefinierade produkter sparas till localstorage. URL används för bilder så det enkelt kan sparas i localstorage.

## Inlämning

För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub. Inlämningen sker som vanligt på läroplattformen där ni ska zippa ihop projektmappen (kom ihåg att ta bort node_modules). I projektmappen ska det finnas (utöver all kod) en README.md fil. Den ska innehålla en titel, beskrivning av projektet, info om hur projektet byggs och körs samt länk till dokumentationen för designsystemet som används, mm.

## Presentation

Ni ska vid presentationstillfället hålla i en muntlig presentation för klassen. Ni ska gå igenom följande punker under presentationen:

- Presentation och genomgång av er webbshop.
- Utvalda delar av er kod, struktur och dess flöde.
- Reflektioner om projektets genomförande.
- Designsystemet ni valde, hur det används, samt egna reflektioner (VG).

## Kravlista

### Lista på data-cy som ska finnas i koden för Godkänt

- `data-cy="product"` produkt-korten/raden på startsidan & adminsidan.
- `data-cy="product-title"` titeln på en produkt.
- `data-cy="product-price"` priset på en produkt.
- `data-cy="product-description"` beskrivningen av en produkt.
- `data-cy="product-buy-button"` lägg till i kundvagnen knappen.
- `data-cy="added-to-cart-toast"` toast som visas när en produkt läggs till i kundvagnen.

- `data-cy="cart-link"` knappen för att gå till kundvagnen/kassasidan.
- `data-cy="cart-items-count-badge"` siffran intill kundvagnsikonen som visar antalet tillagda produkter.
- `data-cy="cart-item"` en produktrad på kassasidan.
- `data-cy="increase-quantity-button"` knappen för att öka antalet av en produkt på kassasida.
- `data-cy="decrease-quantity-button"` knappen för att minska antalet av en produkt på kassasida.
- `data-cy="product-quantity"` antalet valda produkter av samma typ på kassasida.
- `data-cy="total-price"` totala priset för alla produkter i kundvagnen.

- `data-cy="customer-form"` formulär för att fylla i kunduppgifter på checkout-sidan.
- `data-cy="customer-name"` kundens namn (som fylls i på checkout-sidan).
- `data-cy="customer-address"` kundens gatuadress (som fylls i på checkout-sidan).
- `data-cy="customer-zipcode"` kundens postnummer (som fylls i på checkout-sidan).
- `data-cy="customer-city"` kundens stad (som fylls i på checkout-sidan).
- `data-cy="customer-email"` kundens emailadress (som fylls i på checkout-sidan).
- `data-cy="customer-phone"` kundens telefonnummer (som fylls i på checkout-sidan).
- `data-cy="customer-name-error"` felmeddelande vid felaktigt angivet namn.
- `data-cy="customer-address-error"` felmeddelande vid felaktigt angiven adress.
- `data-cy="customer-email-error"` felmeddelande vid felaktigt angiven emailadress.
- `data-cy="customer-phone-error"` felmeddelande vid felaktigt angivet telefonnummer.

### Lista på data-cy som ska finnas i koden för Väl Godkänt

- `data-cy="admin-link"` den länk/knapp som går till admin.
- `data-cy="admin-add-product"` edit-knappen för admin som ska editera en produkt.
- `data-cy="admin-edit-product"` edit-knappen för admin som ska editera en produkt.
- `data-cy="admin-remove-product"` den knapp som ska kunna radera en produkt.
- `data-cy="confirm-delete-button"` konfirmera att man vill radera en produkt.

- `data-cy="product-form"` formuläret för att lägga till eller editera en produkt.
- `data-cy="product-title-error"` felmeddelande vid felaktigt angiven titel.
- `data-cy="product-description-error"` felmeddelande vid felaktigt angiven beskrivning.
- `data-cy="product-price-error"` felmeddelande vid felaktigt angivet pris.
- `data-cy="product-image-error"` felmeddelande vid felaktigt angiven bild.

### Krav för Godkänt

- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
- [x] Uppgiften lämnas in i tid!

**Home**

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Startsidan ska lista samtliga produkter.
- [x] Det ska gå att lägga till produkter i kundvagnen (header + toast + ls).
- [x] Det ska gå att klicka på en produkt och komma till en detaljsida.
- [x] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Produkt**

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Detaljsidan ska visa all info om en produkt.
- [x] Det ska gå att lägga till produkten i kundvagnen (header + toast + ls).
- [x] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Kundvagn & Checkout**

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Det ska gå att gå till checkoutsidan och se innehållet i kundvagnen (knapp & url).
- [x] Det ska gå att se det totala priset i kundvagnen.
- [x] Det ska gå att ändra produkterna i kundvagnen (header + vyn + pris + ls).
- [x] Det ska gå att ange leveransuppgifter i ett formulär.
- [x] Samtliga fält för checkoutsidans formulär ska ha valideringsregler.
- [x] Formulären vid utcheckningen ska gå att automatiskt fyllas i. (ej klar)
- [x] Bekräftelsesidan ska visa orderdetaljer och leveransuppgifter. (delvis klar)

_Gjorda krav ska kryssas för._

### Krav för Väl Godkänt

- [x] Ett designsystem/komponentbibliotek används nästintill helt uteslutande för att bygga sidan (ex: MUI, ChakraUI, Mantine, etc).

**Admin**

- [x] Det finns en admin-sida för produkthantering
- [x] Det ska gå att se alla produkter på admin sidan
- [x] Det går att lägga till produkter via admin sidan + ls
- [x] Det går att ta bort produkter via admin sidan + ls
- [x] Det går att redigera produkter via admin sidan + ls
- [x] Samtliga fält för adminsidans formulär ska ha valideringsregler

_Gjorda krav ska kryssas för._

<!-- --------------------------------------------------------------------------------------------- -->

# Tech 101 Webshop

Välkommen till Tech 101 – ett skolprojekt där vi har skapat en modern och funktionell webshop för teknikentusiaster. Vår webbapplikation är utvecklad med hjälp av populära teknologier och bibliotek som React, TypeScript och Mantine.

## Funktioner och Tekniker

Vi har implementerat flera avancerade tekniker och funktioner för att uppnå en sömlös användarupplevelse, inklusive:

- State management
- Routing med React-router
- Användning av Context

En av våra huvudfunktioner är möjligheten för administratörer att "logga in" och redigera, lägga till eller ta bort befintliga produkter i webshoppen. Vi har även strävat efter att återskapa känslan som finns hos andra stora tech shop-giganter.

## Live Demo

[Utforska vår live demo här!](https://www.youtube.com/watch?v=oHg5SJYRHA0) (OBS: Länken kommer att uppdateras och fungera bättre inom en snar framtid.)

## Teamet bakom Tech 101

- [Sebastian Johansson](https://github.com/Sebastianjohansson123)
- [Emil Helgesson](https://github.com/Emil-Helge)
- [Gabriel Lugo Méndez](https://github.com/gabriel-lugo)
- [Hampus Isebring](https://github.com/Isebring)

## Ytterligare Resurser

För mer information om Mantine, besök [deras dokumentation](https://mantine.dev/pages/getting-started/).

## Instruktioner för utvecklare

För att komma igång med utveckling, följ dessa steg:

1. Klona ner projektet till din lokala maskin.
2. Öppna en terminal och navigera till projektets rotmapp.
3. Kör följande kommandon:

`npm install` <Br/>
`npm run dev`

Därefter bör projektet vara igång och köra på din lokala utvecklingsserver.
