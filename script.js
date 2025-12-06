// ========================================
// VARIABLES GLOBALES
// ========================================

/**
 * CONCEPT: Variables globales
 * Accessibles dans toutes les fonctions du fichier
 */

// Tableau pour stocker l'historique des calculs
let historiqueCalculs = [];


// ========================================
// INITIALISATION
// ========================================

/**
 * CONCEPT: DOMContentLoaded
 * S'exécute quand la page est complètement chargée
 */
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un écouteur sur le formulaire
    document.getElementById('epargneForm').addEventListener('submit', calculerEpargne);
    
    // Afficher l'historique
    afficherHistorique();
});


// ========================================
// FONCTION: CALCULER L'ÉPARGNE
// ========================================

/**
 * CONCEPT: Fonction principale qui gère le calcul
 * @param {Event} event - L'événement de soumission du formulaire
 */
function calculerEpargne(event) {
    // CONCEPT: Empêcher le rechargement de la page
    event.preventDefault();
    
    // CONCEPT: Récupérer les valeurs du formulaire
    const capital = parseFloat(document.getElementById('capitalInitial').value);
    const taux = parseFloat(document.getElementById('tauxInteret').value);
    const duree = parseFloat(document.getElementById('duree').value);
    
    // CONCEPT: Validation des données
    if (isNaN(capital) || isNaN(taux) || isNaN(duree) || capital <= 0 || taux <= 0 || duree <= 0) {
        alert('⚠️ Veuillez remplir tous les champs avec des valeurs positives !');
        return;
    }
    
    // CONCEPT: Calcul des intérêts simples
    // Formule: Intérêts = Capital × (Taux / 100) × Durée
    const tauxDecimal = taux / 100;
    const interets = capital * tauxDecimal * duree;
    const montantFinal = capital + interets;
    
    // Afficher les résultats
    afficherResultats(capital, taux, duree, interets, montantFinal);
    
    // Ajouter à l'historique
    ajouterAHistorique(capital, taux, duree, interets, montantFinal);
    
    // Scroll vers les résultats
    document.getElementById('resultatsSection').scrollIntoView({ behavior: 'smooth' });
}


// ========================================
// FONCTION: AFFICHER LES RÉSULTATS
// ========================================

/**
 * CONCEPT: Manipulation du DOM pour afficher les résultats
 * @param {number} capital - Le capital initial
 * @param {number} taux - Le taux d'intérêt
 * @param {number} duree - La durée en années
 * @param {number} interets - Les intérêts calculés
 * @param {number} montantFinal - Le montant final
 */
function afficherResultats(capital, taux, duree, interets, montantFinal) {
    // CONCEPT: Afficher la section des résultats
    const section = document.getElementById('resultatsSection');
    section.classList.add('visible');
    
    // CONCEPT: Mettre à jour les valeurs affichées
    document.getElementById('affichageCapital').textContent = `${capital.toFixed(2)} €`;
    document.getElementById('affichageInterets').textContent = `${interets.toFixed(2)} €`;
    document.getElementById('affichageTotal').textContent = `${montantFinal.toFixed(2)} €`;
    
    // CONCEPT: Afficher la formule avec les valeurs réelles
    const formuleExemple = document.getElementById('formuleExemple');
    formuleExemple.textContent = `${capital} × ${taux/100} × ${duree} = ${interets.toFixed(2)} €`;
    
    // CONCEPT: Générer une interprétation personnalisée
    const interpretation = document.getElementById('interpretationTexte');
    const pourcentageGain = ((interets / capital) * 100).toFixed(2);
    interpretation.innerHTML = `
        En investissant <strong>${capital.toFixed(2)}€</strong> pendant <strong>${duree} an${duree > 1 ? 's' : ''}</strong> 
        à un taux de <strong>${taux}%</strong>, vous gagnerez <strong>${interets.toFixed(2)}€</strong> d'intérêts.
        <br><br>
        Cela représente un gain de <strong>${pourcentageGain}%</strong> sur votre capital initial ! 🎉
        <br><br>
        À la fin de la période, vous aurez un total de <strong>${montantFinal.toFixed(2)}€</strong>.
    `;
    
    // CONCEPT: Animer les barres du graphique
    animerGraphique(capital, interets, montantFinal);
}


// ========================================
// FONCTION: ANIMER LE GRAPHIQUE
// ========================================

/**
 * CONCEPT: Animation CSS avec JavaScript
 * @param {number} capital - Le capital initial
 * @param {number} interets - Les intérêts
 * @param {number} montantFinal - Le montant final
 */
function animerGraphique(capital, interets, montantFinal) {
    // CONCEPT: Calculer les pourcentages pour les barres
    const pourcentageCapital = (capital / montantFinal) * 100;
    const pourcentageInterets = (interets / montantFinal) * 100;
    
    // CONCEPT: Réinitialiser les barres
    const barreCapital = document.getElementById('barreCapital');
    const barreInterets = document.getElementById('barreInterets');
    
    barreCapital.style.width = '0%';
    barreInterets.style.width = '0%';
    
    // CONCEPT: setTimeout pour créer une animation
    setTimeout(() => {
        barreCapital.style.width = `${pourcentageCapital}%`;
        barreCapital.innerHTML = `<span class="barre-label">Capital: ${capital.toFixed(2)}€</span>`;
    }, 100);
    
    setTimeout(() => {
        barreInterets.style.width = `${pourcentageInterets}%`;
        barreInterets.innerHTML = `<span class="barre-label">Intérêts: ${interets.toFixed(2)}€</span>`;
    }, 300);
}


// ========================================
// FONCTION: AJOUTER À L'HISTORIQUE
// ========================================

/**
 * CONCEPT: Ajouter un calcul à l'historique
 * @param {number} capital - Le capital initial
 * @param {number} taux - Le taux d'intérêt
 * @param {number} duree - La durée
 * @param {number} interets - Les intérêts
 * @param {number} montantFinal - Le montant final
 */
function ajouterAHistorique(capital, taux, duree, interets, montantFinal) {
    // CONCEPT: Créer un objet pour stocker les données
    const calcul = {
        id: Date.now(),
        date: new Date().toLocaleString('fr-FR'),
        capital: capital,
        taux: taux,
        duree: duree,
        interets: interets,
        montantFinal: montantFinal
    };
    
    // CONCEPT: Ajouter au début du tableau (plus récent en premier)
    historiqueCalculs.unshift(calcul);
    
    // CONCEPT: Limiter à 10 calculs maximum
    if (historiqueCalculs.length > 10) {
        historiqueCalculs.pop(); // Retirer le plus ancien
    }
    
    // Afficher l'historique mis à jour
    afficherHistorique();
}


// ========================================
// FONCTION: AFFICHER L'HISTORIQUE
// ========================================

/**
 * CONCEPT: Générer le HTML de l'historique
 */
function afficherHistorique() {
    const liste = document.getElementById('listeHistorique');
    
    // CONCEPT: Vérifier si l'historique est vide
    if (historiqueCalculs.length === 0) {
        liste.innerHTML = '<p class="message-vide">Aucun calcul effectué pour le moment. Commencez ci-dessus ! 👆</p>';
        return;
    }
    
    // CONCEPT: Générer le HTML pour chaque calcul
    liste.innerHTML = historiqueCalculs.map(calcul => `
        <div class="historique-item">
            <div class="historique-date">📅 ${calcul.date}</div>
            <div class="historique-params">
                <span class="historique-param">💵 Capital: <strong>${calcul.capital.toFixed(2)}€</strong></span>
                <span class="historique-param">📈 Taux: <strong>${calcul.taux}%</strong></span>
                <span class="historique-param">⏰ Durée: <strong>${calcul.duree} an${calcul.duree > 1 ? 's' : ''}</strong></span>
            </div>
            <div class="historique-resultat">
                💰 Gain: ${calcul.interets.toFixed(2)}€ | 🎯 Total: ${calcul.montantFinal.toFixed(2)}€
            </div>
        </div>
    `).join('');
}


// ========================================
// FONCTION: EFFACER L'HISTORIQUE
// ========================================

/**
 * CONCEPT: Vider le tableau de l'historique
 */
function effacerHistorique() {
    // CONCEPT: Demander confirmation
    if (historiqueCalculs.length === 0) {
        alert('ℹ️ L\'historique est déjà vide !');
        return;
    }
    
    if (confirm('❓ Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
        // CONCEPT: Réinitialiser le tableau
        historiqueCalculs = [];
        afficherHistorique();
        alert('✅ Historique effacé !');
    }
}


// ========================================
// FONCTION: GÉNÉRER DES SCÉNARIOS
// ========================================

/**
 * CONCEPT: Créer plusieurs scénarios de comparaison
 */
function genererScenarios() {
    // CONCEPT: Récupérer les valeurs actuelles du formulaire
    const capital = parseFloat(document.getElementById('capitalInitial').value) || 1000;
    const taux = parseFloat(document.getElementById('tauxInteret').value) || 5;
    const duree = parseFloat(document.getElementById('duree').value) || 2;
    
    // CONCEPT: Créer différents scénarios
    const scenarios = [
        {
            titre: "🟢 Scénario actuel",
            capital: capital,
            taux: taux,
            duree: duree
        },
        {
            titre: "📈 Taux +2%",
            capital: capital,
            taux: taux + 2,
            duree: duree
        },
        {
            titre: "⏰ +1 an",
            capital: capital,
            taux: taux,
            duree: duree + 1
        },
        {
            titre: "💵 Capital doublé",
            capital: capital * 2,
            taux: taux,
            duree: duree
        }
    ];
    
    // CONCEPT: Générer le HTML des scénarios
    const grid = document.getElementById('scenariosGrid');
    grid.innerHTML = scenarios.map(scenario => {
        const interets = scenario.capital * (scenario.taux / 100) * scenario.duree;
        const total = scenario.capital + interets;
        
        return `
            <div class="scenario-card">
                <div class="scenario-titre">${scenario.titre}</div>
                <div class="scenario-info">
                    <span class="scenario-label">💵 Capital:</span>
                    <span class="scenario-valeur">${scenario.capital.toFixed(2)}€</span>
                </div>
                <div class="scenario-info">
                    <span class="scenario-label">📈 Taux:</span>
                    <span class="scenario-valeur">${scenario.taux}%</span>
                </div>
                <div class="scenario-info">
                    <span class="scenario-label">⏰ Durée:</span>
                    <span class="scenario-valeur">${scenario.duree} an${scenario.duree > 1 ? 's' : ''}</span>
                </div>
                <div class="scenario-resultat">
                    <div class="scenario-gain">+${interets.toFixed(2)}€</div>
                    <div>Total: ${total.toFixed(2)}€</div>
                </div>
            </div>
        `;
    }).join('');
}


// ========================================
// CONCEPTS UTILISÉS DANS CE PROJET
// ========================================

/**
 * 1. VARIABLES (let, const)
 * 2. FONCTIONS (déclaration, paramètres)
 * 3. ÉVÉNEMENTS (addEventListener, submit)
 * 4. MANIPULATION DU DOM (getElementById, innerHTML, classList)
 * 5. CALCULS MATHÉMATIQUES (formule des intérêts simples)
 * 6. OBJETS (stockage des données de calcul)
 * 7. TABLEAUX (historique, map(), unshift(), pop())
 * 8. CONDITIONS (if/else, validation)
 * 9. TEMPLATE LITERALS (backticks, ${})
 * 10. MÉTHODES DE NOMBRES (toFixed(), parseFloat())
 * 11. MÉTHODES DE DATES (Date.now(), toLocaleString())
 * 12. ANIMATIONS CSS avec JavaScript
 * 13. MÉTHODE confirm() et alert()
 */
