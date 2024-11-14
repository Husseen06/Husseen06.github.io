// De Clicker class beheert de cookie count (het aantal cookies) en de klikfunctionaliteit
class Clicker {
    constructor(start) {
        this.count = start; // Beginwaarde voor het aantal cookies
        this.cookiesPerClick = 1; // Aantal cookies dat wordt verdiend bij elke klik
        this.autoClickRate = 0; // Aantal cookies dat automatisch per seconde wordt toegevoegd
        this.displayCount(); // Toont de huidige cookie count op het scherm
        this.startAutoClickers(); // Start de automatische klikfunctie die cookies toevoegt
    }

    // Verhoogt het aantal cookies met cookiesPerClick wanneer er op de cookie wordt geklikt
    click() {
        this.count += this.cookiesPerClick; // Verhoog het aantal cookies met de waarde van cookiesPerClick
        this.displayCount(); // Vernieuw het weergegeven aantal cookies op het scherm
        this.animateGainedCookies(); // Start een animatie die de verdiende cookies toont
    }

    // Formatteert het aantal cookies zodat grote getallen leesbaarder zijn (bijv. 1000 wordt 1K)
    formatCookies(number) {
        // Controleer in welke grootteklasse het getal valt en voeg een afkorting toe
        if (number >= 1e15) return (number / 1e15).toFixed(1) + "Q"; // Quadriljoen
        if (number >= 1e12) return (number / 1e12).toFixed(1) + "T";  // Biljoen
        if (number >= 1e9) return (number / 1e9).toFixed(1) + "B";    // Miljard
        if (number >= 1e6) return (number / 1e6).toFixed(1) + "M";    // Miljoen
        return number.toString(); // Kleine getallen zonder afkorting
    }

    // Toont de huidige cookie count op het scherm in het element met id 'cookie-count'
    displayCount() {
        const cookieCountElement = document.getElementById('cookie-count');
        if (cookieCountElement) {
            cookieCountElement.textContent = " " + this.formatCookies(this.count); // Toon het geformatteerde aantal cookies
        }
    }

    // Animeren van het aantal cookies dat is verdiend bij elke klik
    animateGainedCookies() {
        const floatingText = document.getElementById('floating-text');
        if (floatingText) {
            floatingText.textContent = `+${this.formatCookies(this.cookiesPerClick)}`; // Toon de gewonnen cookies
            floatingText.classList.remove('show'); // Verwijder de 'show' klasse om de animatie opnieuw te starten
            void floatingText.offsetWidth; // Forceer een reflow om de animatie weer op te starten
            floatingText.classList.add('show'); // Voeg de 'show' klasse toe om de animatie weer te starten
        }
    }

    // Aankoop van een upgrade die de cookies per klik verhoogt
    purchaseUpgrade(cost, multiplier, buttonElement, upgradeName, nextUpgradeId = null) {
        if (this.count >= cost) { // Controleer of er voldoende cookies zijn voor de upgrade
            this.count -= cost; // Verminder het aantal cookies met de kosten van de upgrade
            this.cookiesPerClick *= multiplier; // Verhoog het aantal cookies per klik met de opgegeven multiplier
            buttonElement.style.display = 'none'; // Verberg de upgrade-knop nadat de upgrade is gekocht
            this.displayCount(); // Vernieuw de weergave van het aantal cookies op het scherm
            upgradeManager.handleUpgrade(upgradeName); // Voeg de upgrade toe aan de lijst van actieve upgrades

            // Als er een volgende upgrade is, toon deze dan
            if (nextUpgradeId) {
                const nextUpgrade = document.getElementById(nextUpgradeId);
                if (nextUpgrade) {
                    nextUpgrade.classList.remove('hidden'); // Maak de volgende upgrade zichtbaar
                }
            }
        } else {
            alert("Niet genoeg cookies!"); // Toon een waarschuwing als er niet genoeg cookies zijn
        }
    }

    // Aankoop van een auto-clicker die automatisch cookies toevoegt
    purchaseAutoClicker(cost, rate, buttonElement, autoClickerName, nextAutoClickerId = null) {
        if (this.count >= cost) { // Controleer of er voldoende cookies zijn voor de auto-clicker
            this.count -= cost; // Verminder het aantal cookies met de kosten van de auto-clicker
            this.autoClickRate += rate; // Verhoog de auto-click rate met de opgegeven waarde
            buttonElement.style.display = 'none'; // Verberg de knop voor de auto-clicker na aankoop
            this.displayCount(); // Vernieuw de weergave van het aantal cookies op het scherm
            upgradeManager.handleUpgrade(autoClickerName); // Voeg de auto-clicker toe aan de lijst van actieve upgrades

            // Als er een volgende auto-clicker is, toon deze dan
            if (nextAutoClickerId) {
                const nextAutoClicker = document.getElementById(nextAutoClickerId);
                if (nextAutoClicker) {
                    nextAutoClicker.classList.remove('hidden'); // Maak de volgende auto-clicker zichtbaar
                }
            }
        } else {
            alert("Not enough cookies!"); // Toon een waarschuwing als er niet genoeg cookies zijn
        }
    }

    // Start de automatische klikfunctie die elke seconde cookies toevoegt
    startAutoClickers() {
        setInterval(() => {
            this.count += this.autoClickRate; // Voeg cookies toe op basis van de auto-click rate
            this.displayCount(); // Vernieuw de weergave van het aantal cookies op het scherm
        }, 1000); // Voer de functie elke seconde uit
    }
}

// De UpgradeManager class beheert de lijst van actieve upgrades
class UpgradeManager {
    constructor() {
        this.activeUpgrades = []; // Lijst om bij te houden welke upgrades momenteel actief zijn
    }

    // Verwerk een upgrade en voeg deze toe aan de lijst van actieve upgrades
    handleUpgrade(upgradeName) {
        this.activeUpgrades.push(upgradeName); // Voeg de naam van de upgrade toe aan de actieve upgrades
        this.displayActiveUpgrades(); // Toon de lijst van actieve upgrades op het scherm
    }

    // Toon de lijst van actieve upgrades in het element met id 'active-upgrades-list'
    displayActiveUpgrades() {
        const activeUpgradesList = document.getElementById('active-upgrades-list');
        if (activeUpgradesList) {
            activeUpgradesList.textContent = 'Actieve upgrades: ' + (this.activeUpgrades.length > 0 ? this.activeUpgrades.join(', ') : 'Geen');
        }
    }
}

// Maak een nieuwe Clicker en UpgradeManager aan
const clicker = new Clicker(0); // Start de game met 0 cookies
const upgradeManager = new UpgradeManager(); // Maak een nieuwe UpgradeManager voor actieve upgrades

// Voeg een event listener toe aan de 'cookie' knop, zodat de cookie count verhoogd wordt bij elke klik
document.getElementById('cookie').addEventListener('click', () => {
    clicker.click(); // Verhoog het aantal cookies bij elke klik
});

// Voeg event listeners toe voor de upgrade knoppen
document.querySelectorAll('.upgrade-item').forEach((button, index) => {
    const upgradeDetails = [
        { cost: 50, multiplier: 2, name: 'Double Clicker', nextUpgradeId: 'quintuple-clicker' },
        { cost: 250, multiplier: 3, name: 'Triple Clicker', nextUpgradeId: 'sextuple-clicker' },
        { cost: 750, multiplier: 4, name: 'Quadruple Clicker', nextUpgradeId: 'septuple-clicker' },
        { cost: 1500, multiplier: 5, name: 'Quintuple Clicker', nextUpgradeId: 'sextuple-clicker' },
        { cost: 5000, multiplier: 6, name: 'Sextuple Clicker', nextUpgradeId: 'septuple-clicker' },
        { cost: 12000, multiplier: 7, name: 'Septuple Clicker', nextUpgradeId: null }
    ];

    // Voeg een click event listener toe voor elke upgrade knop
    const upgrade = upgradeDetails[index];
    button.addEventListener('click', () => {
        clicker.purchaseUpgrade(upgrade.cost, upgrade.multiplier, button, upgrade.name, upgrade.nextUpgradeId); // Voer de upgrade aankoop uit
    });
});

// Voeg event listeners toe voor de auto-clicker knoppen
document.querySelectorAll('.auto-clicker-item').forEach((button, index) => {
    const autoClickerDetails = [
        { cost: 750, rate: 1, name: 'Auto Clicker', nextAutoClickerId: 'rare-clicker' },
        { cost: 5000, rate: 5, name: 'Super Clicker', nextAutoClickerId: 'legendary-clicker' },
        { cost: 10000, rate: 50, name: 'Mega Clicker', nextAutoClickerId: 'mythical-clicker' },
        { cost: 500000, rate: 200, name: 'Rare Clicker', nextAutoClickerId: 'ultra-clicker' },
        { cost: 2500000, rate: 1000, name: 'Legendary Clicker', nextAutoClickerId: 'supreme-clicker' },
        { cost: 6000000, rate: 5000, name: 'Mythical Clicker', nextAutoClickerId: 'godly-clicker' },
        { cost: 10000000, rate: 10000, name: 'Ultra Clicker', nextAutoClickerId: null },
        { cost: 25000000, rate: 50000, name: 'Supreme Clicker', nextAutoClickerId: null },
        { cost: 50000000, rate: 100000, name: 'Godly Clicker', nextAutoClickerId: null }
    ];

    // Voeg een click event listener toe voor elke auto-clicker knop
    const autoClicker = autoClickerDetails[index];
    button.addEventListener('click', () => {
        clicker.purchaseAutoClicker(autoClicker.cost, autoClicker.rate, button, autoClicker.name, autoClicker.nextAutoClickerId); // Voer de auto-clicker aankoop uit
    });
});
