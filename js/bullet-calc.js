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
// $(`
//  <div class="container">
//     <div class="row">
//       <div class="col-md-4">
//         <h2>User Input</h2>
//         <form id="dimension-form" action="" class="">
//           <div class="form-group row">
//             <label for="railing" class="col-8 col-form-label">Railing feet</label>
//             <div class="col-4">
//               <input id="railing" class="form-control" min="3" placeholder="Railing Feet" type="number">
//             </div>
//           </div>
//           <div class="form-group row">
//             <label for="sections" class="col-8 col-form-label">Number of Sections</label>
//             <div class="col-4">
//               <input id="sections" class="form-control" placeholder="Number of Sections" type="number">
//             </div>
//           </div>
//         </form>
//       </div>
//       <div id="display-totals" class="col-md-4">
//         <h2>Calculations</h2>
//         <label>Feet of Cable</label>
//         <div id="railing-calc">3</div>
//         <label>Minimum Amount of Kits Needed</label>
//         <div id="kits-calc">1</div>
//       </div>
//     </div>
//   </div>
// `).appendTo($('#bullet-calculator'));

$(document).ready(() => {

  //inputs
  const dimensionFormInputs = $('#dimension-form :input');
  const sections = $('#sections');
  const railing = $('#railing');

  //calculations
  const railingCalc = $('#railing-calc');
  const kitsCalc = $('#kits-calc');
  const runsCalc = $('#runs-calc');

  //max feet per section
  const maxVertInches = 3;

  //runs of cable per section
  let runs = 9;

  //on input change
  dimensionFormInputs.on('change', (event) => {
    //id of input
    const fieldId = event.target.id;
    //value of input
    const val = event.target.value;
    //if the railing input is changing
    if (fieldId === 'railing') {
      return railingChange(val)
    }
    //calculate runs needed based on railing height
    if (fieldId === 'height') {
      return heightChange(val);
    }
    //if the sections field changes
    if (fieldId === 'sections') {
      return sectionsChange(val)
    }
  });

  function railingChange(val) {
    calcFeetByRuns(val)
  }

  //get number of kits needed based on number of sections
  function sectionsChange(sections) {
    calcKitsBySections(sections);
  }

  function heightChange(val) {
    runs = Math.ceil((val - 3) / maxVertInches);

    calcFeetByRuns(railing.val());
    calcKitsBySections(sections.val());

    return runsCalc.text(runs);
  }


  //calculate kits based on sections
  function calcKitsBySections(sections) {
    // update dom
    return kitsCalc.text(sections * runs);
  }

  //get total feet based on runs * feet
  function calcFeetByRuns(feet) {
    //update dom
    return railingCalc.text(feet * runs);
  }


  // let spool = {
  //   large: [250, 50],
  //   medium: [137, 25],
  //   small: [60, 10]
  // };
  //
  // const data = [
  //   {
  //     name: 'lar',
  //     weight: 250,
  //     benefit: 50,
  //     pieces: 100,
  //   },
  //   {
  //
  //     name: 'med',
  //     price: 137,
  //     feet: 25,
  //     pieces: 100,
  //   },
  //   {
  //     name: 'SM',
  //     price: 60,
  //     feet: 10,
  //     pieces: 100,
  //   },
  // ];
  //
  //
  // const spoolOptions = {
  //   large:
  //     {
  //     price: 250,
  //     feet: 50,
  //   },
  //   medium:
  //     {
  //       price: 137,
  //       feet: 25,
  //   },
  //   small: {
  //     price: 60,
  //     feet: 10,
  //   }
  // };


  let spoolArray = [50, 25, 10];

  // let numberOfLargeSpools = 0;
  // let numberOfMediumSpools = 0;
  // let numberOfSmallSpools = 0;
  //
  // function findSpools(totalFeet) {
  //
  //
  //   console.log('totalFeet to start', totalFeet)
  //
  //   if (totalFeet >= spoolOptions.large.feet) {
  //     console.log('is larger than large spool footage');
  //     console.log('totalFeet / spoolOptions.large.feet', totalFeet / spoolOptions.large.feet);
  //     numberOfLargeSpools = Math.abs(totalFeet / spoolOptions.large.feet);
  //     console.log('numberOfLargeSpools', numberOfLargeSpools)
  //     totalFeet =- (numberOfLargeSpools * spoolOptions.large.feet)
  //     console.log('totalFeet', totalFeet)
  //   }
  //
  //   if (totalFeet >= spoolOptions.medium.feet) {
  //     numberOfMediumSpools = Math.abs(totalFeet / spoolOptions.medium.feet);
  //     totalFeet =- (numberOfMediumSpools * spoolOptions.medium.feet)
  //     console.log('totalFeet', totalFeet)
  //   }
  //
  //   if(totalFeet >= spoolOptions.small.feet) {
  //     numberOfSmallSpools = Math.abs(totalFeet / spoolOptions.small.feet);
  //     totalFeet =- (numberOfSmallSpools * spoolOptions.small.feet)
  //     console.log('totalFeet', totalFeet)
  //   }
  //
  //   if (totalFeet > 0) {
  //     numberOfSmallSpools = numberOfSmallSpools+ 1;
  //     totalFeet =- (numberOfSmallSpools * spoolOptions.small.feet);
  //     console.log('totalFeet', totalFeet)
  //   }
  //
  //
  // }
  //
  // findSpools(60);
  //
  // console.log('numberOfLargeSpools', numberOfLargeSpools)
  // console.log('numberOfMediumSpools', numberOfMediumSpools)
  // console.log('numberOfSmallSpools', numberOfSmallSpools)

  let spoolIncrements = [{
    feet: 500,
    name: 'Large',
    price: 250
  }, {
    feet: 250,
    name: 'Medium',
    price: 137.5
  }, {
    feet: 100,
    name: 'Small',
    price: 60
  }];



  function calculateSpools(feet) {
    let options = findAllCombos(feet, spoolIncrements, 0, []);

    let cheapestSpoolCombo = addTotalsFindCheapest(options);

    console.log('cheapestSpoolCombo', cheapestSpoolCombo);

  }


  //adds some meta data and returns the cheapest options
  function addTotalsFindCheapest(array) {
    let cheapestIndex = 0;
    for (let i = 0; i < array.length; i++) {
      let cost = 0;
      let totalFeet = 0;
      array[i].forEach((spool) => {
        cost += spool.price;
        totalFeet += spool.feet;
      });
      array[i].total = cost;
      array[i].totalFeet = totalFeet;
      array[i].ppf = Math.round(100*(array[i].total / array[i].totalFeet))/100;
      if (array[i].total < array[cheapestIndex].total) {
        cheapestIndex = i;
      }
    }
    return array[cheapestIndex];
  }

  //finds all combinations of spools that cover footage
  function findAllCombos(feet, amounts, i, combo) {
    if (feet <= 0 || i === amounts.length)
      return [combo];

    if (i === amounts.length - 1) {
      while (feet > 0) {
        combo.push(amounts[i]);
        feet -= amounts[i].feet;
      }
      return [combo];
    }

    let combos = findAllCombos(feet, amounts, i + 1, combo.slice());

    while (feet > 0) {
      combo.push(amounts[i]);

      feet -= amounts[i].feet;

      combos = combos.concat(
        findAllCombos(feet, amounts, i + 1, combo.slice())
      );
    }

    return combos;
  }



});