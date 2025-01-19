
//
// Pobierz listę elementów DOM, które odpowiadają znacznikom <IMG>. Użyj dowolnej strony internetowej. Wybierz taki getter aby wynikowa kolekcja była reprezentowana przez obiekt NodeList lub HTMLCollection (obie są iterowalne)
// Dalej korzystając z pętli for … of rozmyj każdy obrazek
// Odpowiadająca deklaracja CSS mas postać filter: blur(3px);
// ​Kod wykonaj w konsoli przeglądarki
//

const imgs = document.querySelectorAll("img");
for(let img of imgs) {
    img.style.filter = "blur(3px) grayscale(100%)";
}