let allCombos = [];
let pipeAmounts = [50, 25, 10];

function findPiping (feet, index, combo) {
  if (index > pipeAmounts-1) {
    return;
  }
  let makeCombos = (amountOfFeet, index, combo) => {
    let currentPipe = pipeAmounts[index];
    let newFeet = amountOfFeet - currentPipe;

    combo.push(currentPipe);

    if (newFeet >= currentPipe) {
      makeCombos(newFeet, index, combo);
    }

    if (newFeet < currentPipe && newFeet > 0) {
      makeCombos(newFeet, index, combo);

    }
    if (newFeet < 0) {
      allCombos.push(combo);
      combo = [];
      makeCombos(feet, index+1, combo);
    }
  };
  makeCombos(feet, index, combo);
}
findPiping(60, 0, []);
console.log('allCombos', allCombos)