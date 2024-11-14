<?php
// Controleer of het formulier is verzonden via POST
if(isset($_POST['submit'])) {
    // Als het formulier is verzonden, druk dan de ontvangen gegevens af
    echo "<pre>".print_r($_POST, true)."</pre>";
}

// Haal de ingediende formuliergegevens op en wijs ze toe aan variabelen
$naam = $_POST['naam']; // Naam
$achternaam = $_POST['achternaam']; // Achternaam
$email = $_POST['email']; // E-mailadres
$gebruikersnaam = $_POST['gebruikersnaam']; // Gebruikersnaam
$wachtwoord = $_POST['wachtwoord']; // Wachtwoord

// Maak een databaseverbinding met behulp van PDO
$dsn = "mysql:host=localhost;dbname=inlog project"; // Data Source Name
$conn = new PDO($dsn, 'root', ''); // PDO-verbinding

// Bereid een SQL-statement voor om gegevens in de database in te voegen
$stmt = $conn->prepare("INSERT INTO inlog (naam, achternaam, email, gebruikersnaam, wachtwoord)
                        VALUES(?, ?, ?, ?, ?)");

// Voer het SQL-statement uit door de waarden in te voegen
$stmt->execute([
   $naam, $achternaam, $email, $gebruikersnaam, $wachtwoord
]);
header('Location: login.html');
exit;