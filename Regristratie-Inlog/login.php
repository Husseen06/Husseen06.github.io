<?php
// Controleer of het formulier is verzonden via POST
if(isset($_POST['submit'])) {
    // Als het formulier is verzonden, druk dan de ontvangen gegevens af
    echo "<pre>".print_r($_POST, true)."</pre>";
}

// Haal de ingediende formuliergegevens op en wijs ze toe aan variabelen
$gebruikersnaam = $_POST['gebruikersnaam']; // Gebruikersnaam
$wachtwoord = $_POST['wachtwoord']; // Wachtwoord

// Maak een databaseverbinding met behulp van PDO
$dsn = "mysql:host=localhost;dbname=inlog project"; // Data Source Name
$conn = new PDO($dsn, 'root', ''); // PDO-verbinding


    // Bereid een SQL-statement voor om de gebruiker te controleren
    $stmt = $conn->prepare("SELECT * FROM inlog WHERE gebruikersnaam = ? AND wachtwoord = ?");
    $stmt->execute([$gebruikersnaam, $wachtwoord]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Controleer of er een gebruiker is gevonden
    if ($user) {
        // Start de sessie en sla de gebruikersinformatie op
        session_start();
        $_SESSION['gebruikersnaam'] = $gebruikersnaam;
        $_SESSION['wachtwoord'] = $wachtwoord;
        

        // Bevestigingsbericht
        echo "Login successful! Welcome, " . htmlspecialchars($gebruikersnaam) . ".";

    $stmt->execute([
       $gebruikersnaam, $wachtwoord
     ]);
     header('Location: dashboard.php');
     exit;
    } else {
        echo "Invalid username or password.";
    }

?>
