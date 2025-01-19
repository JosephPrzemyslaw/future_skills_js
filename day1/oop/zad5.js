//
// Dostosuj kod tak aby obiekt szarik miał dostęp do właściwości animal
// Zaproponuj takie ustawienie prototypów aby:
// szarik.guardDog zwracało true
// szarik.legCount zwracało 4
//

const animal = {
    legCount: 4,
    canfly: false,
    isWild: true,
};

const germanShepherd = {
    guardDog: true,
};

const szarik = {
    type: "dog",
    age: 10,
    breed: "german shepherd",
};

szarik.__proto__ = germanShepherd;
germanShepherd.__proto__ = animal;
console.log(szarik.guardDog, szarik.canfly);
