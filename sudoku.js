/**
 * Sudoku-Spiel JavaScript-Implementierung
 * Ermöglicht das Spielen von verschiedenen Sudoku-Rätseln mit Validierung
 */

// Globale Variablen für das Spiel
var numSelected = null;        // Aktuell ausgewählte Zahl (1-9)
var tileSelected = null;       // Aktuell ausgewähltes Feld
var errors = 0;                // Anzahl der Fehler
var currentSudokuIndex = 0;    // Index des aktuellen Sudoku-Rätsels

// Mehrere Sudoku-Puzzles
var puzzles = [
    {
        board: [
            "--74916-5",
            "2---6-3-9",
            "-----7-1-",
            "-586----4",
            "--3----9-",
            "--62--187",
            "9-4-7---2",
            "67-83----",
            "81--45---"
        ],
        solution: [
            "387491625",
            "241568379",
            "569327418",
            "758619234",
            "123784596",
            "496253187",
            "934176852",
            "675832941",
            "812945763"
        ]
    },
    {
        board: [
            "53--7----",
            "6--195---",
            "-98----6-",
            "8---6---3",
            "4--8-3--1",
            "7---2---6",
            "-6----28-",
            "---419--5",
            "----8--79"
        ],
        solution: [
            "534678912",
            "672195348",
            "198342567",
            "859761423",
            "426853791",
            "713924856",
            "961537284",
            "287419635",
            "345286179"
        ]
    },
    {
        board: [
            "48-9-1-5-",
            "9-7-458-1",
            "2-18-6-93",
            "5-81-29--",
            "72-5-4-38",
            "--67-8-45",
            "37-6-9-14",
            "8-4-5-7-9",
            "-9-4-7-82"
        ],
        solution: [
            "483921657",
            "967345821",
            "251876493",
            "548132976",
            "729564138",
            "136798245",
            "372689514",
            "814253769",
            "695417382"
        ]
    },
    {
        board: [
            "1-2-8-3-6",
            "-396-28--",
            "4-8-71-9-",
            "38--2-5-9",
            "5-17-3-28",
            "-4-8-5-13",
            "9-4-3-85-",
            "--35-89-4",
            "8-5-6-1-2"
        ],
        solution: [
            "152489376",
            "739652841",
            "468371295",
            "387126549",
            "591743628",
            "246895713",
            "914237856",
            "623518974",
            "875964132"
        ]
    },
    {
        board: [
            "8--1-4--6",
            "--5-271--",
            "3-16-9-5-",
            "5-3-6-27-",
            "-7-5-3-8-",
            "-18-7-4-5",
            "-8-2-5-1-",
            "--47-65--",
            "2--8-1--7"
        ],
        solution: [
            "827154396",
            "965327148",
            "341689752",
            "593468271",
            "472513689",
            "618972435",
            "786235914",
            "154796823",
            "239841567"
        ]
    },
    {
        board: [
            "21-9-5-36",
            "5-4-7-18-",
            "6-91-3-27",
            "-234-67-8",
            "4-6-9-2-3",
            "7-8-3-65-",
            "34-8-7-62",
            "-62-14-7-",
            "97-5-2-43"
        ],
        solution: [
            "217985436",
            "534672189",
            "689143527",
            "123456798",
            "456798213",
            "798231654",
            "345817962",
            "862394175",
            "971562843"
        ]
    },
    {
        board: [
            "6-23-98--",
            "1-8-4-72-",
            "-5-7-81-6",
            "71-2-4-98",
            "-9-8-7-1-",
            "82-1-3-57",
            "9-1-7-5-3",
            "-43-8-97-",
            "--79-54-1"
        ],
        solution: [
            "672319845",
            "138546729",
            "459728136",
            "715264398",
            "396857214",
            "824193657",
            "961472583",
            "543681972",
            "287935461"
        ]
    },
    {
        board: [
            "7-98-1-3-",
            "5-6-2-9-8",
            "-8-5-9-21",
            "17-9-3-8-",
            "-9-61-4-5",
            "-5-7-4-93",
            "83-2-5-6-",
            "2-5-3-8-7",
            "-6-1-8-53"
        ],
        solution: [
            "729841536",
            "516327948",
            "483569721",
            "174953682",
            "398612475",
            "652784193",
            "831275469",
            "245936817",
            "967148253"
        ]
    },
    {
        board: [
            "9-76-3-84",
            "-83-5-19-",
            "6-28-9-37",
            "19-3-46-2",
            "-34-6-71-",
            "7-6-8-3-9",
            "86-7-1-25",
            "-41-9-37-",
            "3-54-6-19"
        ],
        solution: [
            "957613284",
            "483257196",
            "612849537",
            "198374652",
            "534962718",
            "726185349",
            "869731425",
            "241598376",
            "375426819"
        ]
    },
    {
        board: [
            "8------49",
            "9-3-8-1--",
            "--5-9-28-",
            "1-4-3-8-6",
            "-69-4-72-",
            "2-7-6-5-4",
            "-21-7-36-",
            "--8-2-9-7",
            "7-6------2"
        ],
        solution: [
            "812753649",
            "943682175",
            "675491283",
            "154237896",
            "369845721",
            "287169534",
            "521974368",
            "438526917",
            "796318452"
        ]
    }
];

// Aktuelles Board und Lösung basierend auf dem gewählten Sudoku
var board = puzzles[currentSudokuIndex].board;
var solution = puzzles[currentSudokuIndex].solution;

// Event Listener für das Laden der Seite
window.onload = function() {
    setGame();
}

/**
 * Initialisiert das Spiel - erstellt die Zahlen-Auswahl und das Board
 */
function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        // Erstelle Zahlen-Button für die Auswahl
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board erstellen
    createBoard();
    
    // Event Listener für Button hinzufügen
    document.querySelector(".other").addEventListener("click", changeSudoku);
}

/**
 * Erstellt das 9x9 Sudoku-Board mit den vorgegebenen Zahlen
 */
function createBoard() {
    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            // Erstelle neues Feld
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            
            // Setze vorgegebene Zahlen und markiere sie als Start-Felder
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            
            // Füge horizontale Trennlinien nach Reihe 2 und 5 hinzu
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            
            // Füge vertikale Trennlinien nach Spalte 2 und 5 hinzu
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            
            // Event Listener für Feld-Auswahl
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

/**
 * Behandelt die Auswahl einer Zahl (1-9)
 * Hebt die ausgewählte Zahl visuell hervor
 */
function selectNumber(){
    // Entferne Hervorhebung von vorheriger Auswahl
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    
    // Setze neue Auswahl und hebe sie hervor
    numSelected = this;
    numSelected.classList.add("number-selected");
}

/**
 * Behandelt die Auswahl eines Feldes und das Platzieren von Zahlen
 * Validiert die Eingabe gegen die Lösung
 */
function selectTile() {
    // Prüfe ob eine Zahl ausgewählt ist
    if (numSelected) {
        // Verhindere Überschreiben von vorgegebenen Zahlen
        if (this.innerText != "") {
            return;
        }

        // Extrahiere Koordinaten aus der Feld-ID: "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);     // Reihe
        let c = parseInt(coords[1]);     // Spalte

        // Validiere die Eingabe gegen die korrekte Lösung
        if (solution[r][c] == numSelected.id) {
            // Korrekte Zahl - setze sie ins Feld
            this.innerText = numSelected.id;
        }
        else {
            // Falsche Zahl - erhöhe Fehlerzähler
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

/**
 * Wechselt zum nächsten Sudoku-Rätsel in der Liste
 * Setzt das Spiel komplett zurück
 */
function changeSudoku() {
    // Zum nächsten Sudoku wechseln (zyklisch)
    currentSudokuIndex = (currentSudokuIndex + 1) % puzzles.length;
    
    // Board und Solution aktualisieren
    board = puzzles[currentSudokuIndex].board;
    solution = puzzles[currentSudokuIndex].solution;
    
    // Spiel zurücksetzen
    errors = 0;
    document.getElementById("errors").innerText = errors;
    numSelected = null;
    
    // Board leeren und neu aufbauen
    document.getElementById("board").innerHTML = "";
    
    // Nummer-Auswahl zurücksetzen
    let numbers = document.querySelectorAll(".number");
    numbers.forEach(num => num.classList.remove("number-selected"));
    
    // Neues Board erstellen
    createBoard();
}