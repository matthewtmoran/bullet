//Cables sold by thew 100 and 500 feet
// Tension pillar needed every 3.5 feet
//9x the amount of railing feet for cable
//(run of wire every 3 inches but also just assuming 9 for now)
//every 1 section is 9 kits
//bullets
//  bullets on the ends of each wire
//wickets

//Cable Bullet Kit
//  2 terminal ends
//  1 kit for every run


$(document).ready(() => {

  //inputs
  const dimensionFormInputs = $('#dimension-form :input');
  const sections = $('#sections');

  //calculations
  const railingCalc = $('#railing-calc');
  const kitsCalc = $('#kits-calc');

  //runs of cable per section
  const runs = 9;
  //max feet per section
  const minFeet = 3.5;

  //on input change
  dimensionFormInputs.on('change', (event) => {
    //id of input
    const fieldId = event.target.id;
    //value of input
    const val = event.target.value;

    //if the railing input is changing
    if (fieldId === 'railing') {
      //get total feet
      let feet = feetOfCable(val);
      //get minimum sections based on feet
      let minSections = calcMinSections(feet);
      //change railing calculations display
      railingCalc.text(feet);
      //change sections minimum display
      sections.attr('min', minSections);
      //change the value of the minimum section to minimum value
      sections.val(minSections);
      //trigger change to calculations display change
      sections.trigger('change');
    }

    //if the sections field changes
    if (fieldId === 'sections') {
      //get number of kits needed based on number of sections
      let kits = calcKitsBySections(val);
      //change the number kits needed display
      kitsCalc.text(kits);
    }
  });

  //calculation the feet of cable needed
  let feetOfCable = (val) => {
    //take the value of total number of railing feet
    let railingFeet = parseFloat(val);
    //if its less than 0
    if (railingFeet < 0) {
      railingFeet = 0;
    } else if (railingFeet < 3) {
      railingFeet = 3;
    }
    //return railing feet x runs
    return railingFeet * runs
  };
  //calculate kits based on sections
  let calcKitsBySections = (sections) => {
    //each run within a section needs one kit (two terminal ends)
   return sections * runs;

  };
  //divides the total feet by the number of runs then rounded to the minimum number of sections based on the max distance apart
  let calcMinSections = (feet) => {
    return Math.ceil((feet / runs) / minFeet);
  };


  let calculateKits = (feet) => {
    let minSections = Math.ceil((feet / runs) / 3.5);

    console.log('Minimum sections', minSections);
    console.log('runs', runs);

    let totalKits = minSections * runs;

    console.log('totalKits', totalKits);

    return totalKits;
  }

});