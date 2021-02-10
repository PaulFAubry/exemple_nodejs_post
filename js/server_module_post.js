// ****************************************************************
// ********************* server_module_post.js ********************
// ****************************************************************

//---------------------------------- VARIABLES --------------------------------------- //
// On déclare la variable PORT. 
var PORT = 8080;

// On déclare la variable http en appelant le module 'http'.  
var http = require('http');

// On déclare la variable swig en appelant le module 'swig'.  
var swig = require('swig');

// On déclare la variable url en appelant le module 'url'.  
var url = require('url');

// On déclare la variable querystring en appelant le module 'querystring'.  
var querystring = require('querystring');

//------------------------------ FONCTION error404 ----------------------------------- //
function error404(res) {
    // Code 404 pour l'erreur.
    // { 'Content-Type': 'text/html' } ====> La donnée que nous allons transmettre est de type html.
    res.writeHead(404, { 'Content-Type': 'text/html' });
    // On affiche un message d'erreur dans une balise <h1></h1>.
    res.write('<h1>Error 404 : page not found !</h1>');
	// Fin de la réponse. 
    res.end();
}

//------------------------------ CREATION DU MODULE ---------------------------------- //
// On crée un module avec 'exports'.
// Pour créer un module, il faut "présenter" les fonctions qu'il met à disposition à l'aide d'exports.
// On crée et on définit la fonction startServer() qui prend en paramètre un port.
exports.startServer = function (PORT) {
    var server = http.createServer(function (req, res) {

        // On récupère le pathname, c'est la partie de l'url comprise entre le nom du serveur et avant le query.
        // var page = url.parse(http://localhost:8080/).pathname;
        // var page = /
        // Ici le pathname est un slash.
        var page = url.parse(req.url).pathname;

        // S'il y a un / dans la barre d'url, on affiche notre page template 'formulaire_01.tpl'.
        if (page === '/') {
            var params = querystring.parse(url.parse(req.url).query);
            var data = { name: 'unknown user' };
            if ('name' in params) {
                data['name'] = params['name'];
            }
            // Exemples :
            // http://localhost:8080/ ===> Affiche 'Hello unknown user !'
            // http://localhost:8080/?name=Paul ===> Affiche 'Hello Paul !'

            // Ecriture des en-têtes HTTP
            // Code retour 200 ====> Tout s'est bien passé. 
            // { 'Content-Type': 'text/html' } ====> La donnée que nous allons transmettre est de type html.
            res.writeHead(200, { 'Content-Type': 'text/html' });

            // Ecriture de la réponse avec un fichier template
            // Dans le fichier template, {{name}} prend la valeur 'unknown user' par défaut.
            res.write(swig.renderFile('../template/formulaire_01.tpl', data)
            );
        } /// Fin IF
        // Sinon si la variable page contient '/message', on exécute le code suivant :   
        else if (page === '/message') {
            if (req.method === 'POST') {
                var post_data = '';
                // Si des données 'data' sont envoyées alors on exécute la fonction anonyme.
                req.on('data', function (p_data) {
                    post_data += p_data; 
                    // post_data = 'msg=Bonjour' si le message est 'Bonjour' par exemple.
                });
                req.on('end', function () {
                    var final_data = querystring.parse(post_data); 
                    // La méthode querystring.parse transforme 'msg=Bonjour' en '{ msg: 'Bonjour' }'

                    if ('msg' in final_data) {
                        // Affichage du message dans la console.  
                        console.log('REÇU : ' + final_data['msg']);
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write('<h1>POST</h1><p>Donn&eacute;es bien re&ccedil;ues </p>');
                        res.end();
                    } else {
                        console.log('ABSENCE DE DONNÉES !!!');
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write('<h1>POST</h1><p>Aucune donnée reçue !!!</p>');
                        res.end();;
                    }
                });
            } else {
                error404(res);
            }
        }; /// Fin ELSE IF
    } /// Fin function
    ); /// Fin http.createServer   
    // Un nouveau fichier .js pourra utiliser ce module.

    // Démarrage du serveur 'server' sur le PORT = 8080.
    server.listen(PORT);
    console.log('Server running on : ' + PORT);
}; /// Fin exports.startServer