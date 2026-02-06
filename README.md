Ark Client Portal
Projectomschrijving

De Ark Client Portal is een webapplicatie waarmee klanten en medewerkers van Ark Design projecten kunnen beheren.
Gebruikers kunnen inloggen en krijgen, afhankelijk van hun rol (klant, projectmanager of admin), toegang tot specifieke functionaliteiten zoals het bekijken van projecten, uploaden van bestanden, plaatsen van feedback en beheren van klanten.

Dit project is ontwikkeld als onderdeel van het MBO4 Software Developer examen.

Functionaliteiten

Inloggen met rolbepaling (klant / admin)

Dashboard per gebruikersrol

Projecten bekijken en openen

Bestanden uploaden binnen een project

Feedback plaatsen per project

Projecten aanmaken (admin)

Klanten beheren (admin)

Beveiligde routes op basis van gebruikersrol

De applicatie maakt gebruik van mock data in plaats van een database.

Gebruikte technieken

React

React Router

JavaScript (ES6)

CSS

Vite

Git & GitHub/GitLab

Projectstructuur (globaal)

pages/ – Pagina’s (dashboards, login, projectdetails)

components/ – Herbruikbare UI-componenten

auth/ – Authenticatie en autorisatie

data/ – Mock data

styles/ – Globale styling

Installatie & starten

Clone de repository

Installeer dependencies:

npm install


Start de applicatie:

npm run dev


Open de applicatie in de browser via:

http://localhost:5173

Opmerking

Dit project gebruikt mock data. De structuur is zo opgezet dat deze eenvoudig kan worden uitgebreid met een echte database in de toekomst.
