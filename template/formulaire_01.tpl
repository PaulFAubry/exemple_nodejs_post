<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Page du Serveur Node.JS</title>
</head>
<body>
    <h1>Hello {{name}} !</h1>
    <p>Écrivez <b>?name=</b> suivi de votre nom dans la barre d'url à la suite de <b>http://localhost:8080/</b></p>
    <p>Par exemple : <b>http://localhost:8080/?name=Paul</b> pour afficher <b>Hello Paul !</b></p>
    <!-- Le formulaire utilise la méthode POST -->
    <form action="message" method='POST'>
        <fieldset>
            <legend>Écrivez votre message pour le serveur</legend>
            <!-- C'est dans ce textarea qu'on va écrire le message pour le serveur -->
            <textarea name="msg" id="" cols="100" rows="20"></textarea>
            <input type="submit" value = "Envoyer">
        </fieldset>
    </form>
</body>
</html>