# uvod
- profily: user - všichni jsou stejná entita
- dva routry - users + shoppingList

# spusteni: 
- npm install 
- npm run start (je možné že bude třeba doinstalovat nějaký modul ručně - npm install <modul>, mělo by být ovšem vše v package.json)
- beží na portu 8000 - endpointy v insomni

# popis: 
- insomnia.json - workspace pro insomnii
- nejdříve je třeba vytvořit uživatele - POST /users
- poté pro komunikaci s dalšími endpointy je třeba získat token GET /users/session
- token se ukládá do headeru "session" = <token>
- GET, PUT, DELETE /user - nebere paramater user_id, ale autorizuje uživatele na základě tokenu v headru
- GET, POST, PUT, DELETE /shoppingList - crud pro shopping list
