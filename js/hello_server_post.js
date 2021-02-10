// ****************************************************************
// ********************* hello_server_post.js *********************
// ****************************************************************
// Se placer dans le répertoire \exemple_nodejs_post\js
// Exécuter la commande : node hello_server_post
// Ouvrir http://localhost:8080/ dans un navigateur  

//---------------------------------- VARIABLES -------------------------------------- //
// On déclare la variable PORT 
var PORT = 8080;

// On déclare la variable server en appelant le module 'server_module_post'  
var server = require('./server_module_post.js');

server.startServer(PORT);