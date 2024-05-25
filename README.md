# Task-management-api---node

# Set up
Pentru a initializa proiectul Node, vom rula urmatoarele: 
* npm install
* npm install sequelize pg
* npm install dotenv
* npm install express-validator


In fisierul dbConfig.js, gasim set up-ul bazei de date. Acesta include numele bazei de date, user-ul si parola. Acestea din urma vor fi configurate manual, de catre fiecare user, intr-un fisier numit ".env".

Tot in .env, avem si variabila JWT_SECRET, care este necesara pentru generarea token-ului de autentificare, dar si port-ul pe care ruleaza serverul nostru local.

# Flow
In cadrul acestei aplicatii, oricine are acces la lista de useri, proiecte, task-uri si echipa proiectelor.
In momentul crearii unui proiect, el devine automat admin-ul de proiect si, astfel, el este singurul care poate edita sau sterge datele referitoare la proiect, membrii echipei si task-urile pe care le au de implementat.
Un task poate fi editat sau sters si de cel care este responsabil - anume, assignee-ul.

# Middleware
Functionarea corecta a acestui flow este asigurata de middleware-uri - exista atat middleware-uri de validare a existentei tuturor parametrilor necesari anumitor operatii, cat si de validare a autentificarii, a admin-ului de proiect si a responsabilului de task.

# Filtrare & sortare
Pentru o mai buna vizualizare a statusurilor proiectelor, call-ul de "/getProjects" intoarce automat proiectele in ordinea endDate-ului.
De asemenea, un user autentificat poate sa isi vada cele mai importante task-uri folosind call-ul "getPriority", care ii returneaza automat task-urile importante de la toate proiectele.

# Db schema
![node_db_schema](https://github.com/elenaag23/node/assets/101599503/26aea84b-a15b-4bdd-a8cf-8fabe0273d02)
