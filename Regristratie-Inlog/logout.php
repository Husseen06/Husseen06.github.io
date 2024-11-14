<?php
// Start de session
session_start();

// Stop de sessie om uitteloggen
session_destroy();

// Redirect naar de loginpagina
header('Location: login.html');
exit;
?>
