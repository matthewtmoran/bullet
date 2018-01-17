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
const state = {
  feetInput: 50,
  sectionInput: 1,
  heightInput: 20,

  feetCalc: 0, //based on feet time runs
  runsCalc: 0, //based on rounded height / 3
  kitsCalc: 0, //based on height times sections

  
  woodKitInput: 0,
  metalKitInput: 0,
  vinylKitInput: 0,
  estimateKitsTotal: 0,
  
  smallSpoolInput: 0,
  mediumSpoolInput: 0,
  largeSpoolInput: 0,
  
  totalKitsCalc: 0,  //based on the sum of kits selection input
  totalSpoolCalc: 0, //the sum of feet based on the total spools input
  totalExtraCalc: 0,
};


$(document).ready(() => {

  const spoolIncrements = [
    {
      feet: 500,
      price: 250,
      name: 'Large',
      type: 'large'
    },
    {
      feet: 250,
      price: 137.5,
      name: 'Medium',
      type: 'medium'
    },
    {
      feet: 100,
      price: 60,
      name: 'Small',
      type:'small'
    }
  ];

  //tab navigation
  const tabs = $('a[data-toggle="tab"]');

  //inputs
  const parametersInput = $('#parameters :input'); //all the inputs in parameters tab 
  const feetInputEl = $('#feet'); //linear railing feet input
  const sectionInputEl = $('#sections');  //section input
  const heightInputEl = $('#height'); //height of railing input

  //calculations
  const feetCalcDisplay = $('#feet-calc');  //element to display feet data
  const kitsCalcDisplay = $('#kits-calc'); //element display kits data
  // const runsCalcDisplay = $('#runs-calc'); // element to display runs data

  const spoolsDisplay = $('#spools');

  //max feet per section
  const maxVertInches = 3;

  const priceTable = $('#price-table');
  const totalRow = $('#total-row');
  const kitCost = $('#kit-cost');
  const grandTotal = $('#grand-total');

  //action buttons
  const previousButton = $('#previous-button');
  const nextButton = $('#next-button');

  const kitsInputTotal = $('#kits-input-total');
  const feetInputTotal = $('#feet-input-total');

  //estimate kits input columns
  const kitsInput = $('#estimates-kits :input.user-input');
  //estimate cable/feet/spool input columns
  const cableInput = $('#estimates-cable :input.user-input');

  //estimate kits column inputs validation elements
  const estimateKitsWarn = $('#estimates-kits .warn');
  const estimateKitsDanger = $('#estimates-kits .danger');
  const estimateKitsFeedback = $('#estimates-kits .invalid-feedback');

  //estimate cable/feet/spool column inputs validation elements
  const estimateCableWarn = $('#estimates-cable .warn');
  const estimateCableDanger = $('#estimates-cable .danger');
  const estimateCableFeedback = $('#estimates-cable .invalid-feedback');




  //when input changes for kits input fields
  kitsInput.on('change', calculateKitsTotal);
  cableInput.on('change', calculateCableTotal);


  //when a tab is shown, this determines what buttons to display
  tabs.on('shown.bs.tab', toggleActionButtons);



  function init() {
    //TODO: move to css at start
    previousButton.toggle(false);

    state.runsCalc = calculateRuns();
    state.feetCalc = calcFeetByRuns();
    state.kitsCalc = calcKitsBySections();


    console.log('initialState:' ,state);


    updateDom(feetInputEl, state.feetInput, 'val');
    updateDom(heightInputEl, state.heightInput, 'val');
    updateDom(sectionInputEl, state.sectionInput, 'val');

    // updateDom(runsCalcDisplay, state.runsCalc, 'text');
    updateDom(kitsCalcDisplay, state.kitsCalc, 'text');
    updateDom(feetCalcDisplay, state.feetCalc, 'text');

  }
  init();

  //on input change
  parametersInput.on('change', (event) => {
    console.log('Input change triggered');
    //id of input
    const fieldId = event.target.id;
    //value of input
    const val = event.target.value;
    //if the railing input is changing
    if (fieldId === 'feet') {
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

  //when input of railing feet is changed
  function railingChange(val) {
    //update state object
    state.feetInput = val;
    state.feetCalc = calcFeetByRuns();
    //update dom
    updateDom(feetCalcDisplay, state.feetCalc, 'text');
    // calcFeetByRuns(val)
  }
  //get number of kits needed based on number of sections
  function sectionsChange(val) {
    //updating state
    state.sectionInput = val;
    state.kitsCalc = calcKitsBySections();
    updateDom(kitsCalcDisplay, state.kitsCalc, 'text');
    // calcKitsBySections(sections);
  }
  //called when height field is modified
  function heightChange(val) {
    state.heightInput = val;
    //updates
    state.runsCalc = calculateRuns();
    state.feetCalc = calcFeetByRuns();
    state.kitsCalc = calcKitsBySections();

    state.spoolData = calculateSpools(state.feetCalc);

    //update dom elements
    // updateDom(runsCalcDisplay, state.runsCalc, 'text');
    updateDom(feetCalcDisplay, state.feetCalc, 'text');
    updateDom(kitsCalcDisplay, state.kitsCalc, 'text');

  }


  //generic function to update dom
  //accpets jquery element, value and the type of higher order function to pass (val/text)
  function updateDom(element, value, type) {
    console.log('');
    console.log('updateDom');
    console.log(`element is ${element.attr('id')} value = ${value}`);
    element[type](value);
  }

  //basic runs calculation
  function calculateRuns() {
    return Math.ceil((state.heightInput - 3) / maxVertInches);
  }
  //calculate kits based on sections
  function calcKitsBySections() {
    // update dom
    return state.sectionInput * state.runsCalc;
  }
  //get total feet based on runs * feet
  function calcFeetByRuns() {
    return state.feetInput * state.runsCalc;
  }

  //lots of spool calculations
  function calculateSpools(feet) {
    console.log('calculating spools');
    //find all valid combinations
    let options = findAllCombos(feet, spoolIncrements, 0, []);
    //return the cheapest spool and add some meta data calculations
    let cheapestSpoolCombo = addTotalsFindCheapest(options);
    state.spoolData = cheapestSpoolCombo;
    //parse the data into an object ot deal with it

    //find all spool rows and remove them
    // $('.spool-row').remove();

    //iterate through types of spool and append data according ot amount
    // Object.getOwnPropertyNames(cheapestSpoolCombo.types)
    //   .forEach((propName) => {
    //     let spool = cheapestSpoolCombo.types[propName];
    //     if (spool.amount > 0) {
    //       $(`<tr class="spool-row">
    //             <td class="spool-name">${propName} Spool</td>
    //             <td>${spool.amount}x${spool.feet}'</td>
    //             <td>$${spool.cost}</td>
    //             <td>-</td>
    //             <td>-</td>
    //             <td class="row-cost">$${spool.totalCost}</td>
    //         </tr>`).insertBefore(totalRow);
    //     }
    //   });
    // $('#overage').text(cheapestSpoolCombo.overage + "'");
    // $('#ppf').text('$' + cheapestSpoolCombo.ppf);
    calculateGrandTotal()
  }


  //TODO: can this be refractored?
  previousButton.on('click', () => {
    $('.nav-tabs a.active').parent().prev('li').find('a').trigger('click');
  });

  nextButton.on('click', () => {
    $('.nav-tabs a.active').parent().next('li').find('a').trigger('click');
  });



  //toggles when next and previous buttons are displayed
  function toggleActionButtons(e) {
    let tagId = e.target.hash;
    switch(tagId) {
      case '#parameters':
        previousButton.toggle(false);
        nextButton.toggle(true);
        break;
      case '#estimates':
        previousButton.toggle(true);
        nextButton.toggle(true);
        break;
      case '#shopping':
        previousButton.toggle(true);
        nextButton.toggle(false);
        break;
      default:
    }

  }


  //sets stat of kit totals from user input
  //updates dom with data
  //toggles soft validation displays
  function calculateKitsTotal(event) {
    state.estimateKitsTotal = getTotalFromInputs(kitsInput);
    updateDom(kitsInputTotal, state.estimateKitsTotal, 'val');

    if (state.estimateKitsTotal < state.kitsCalc) {
      estimateKitsFeedback.toggle(false);
      estimateKitsWarn.toggle(true);
    }
    if (state.estimateKitsTotal > state.kitsCalc) {
      estimateKitsFeedback.toggle(false);
      estimateKitsDanger.toggle(true);
    }
    if (state.estimateKitsTotal === state.kitsCalc) {
      estimateKitsFeedback.toggle(false);
    }
  }

  //sets stat of feet/cable/spool totals from user input
  //updates dom with data
  //toggles soft validation displays
  function calculateCableTotal(event) {
    state.estimateFeetTotal = getFeetFromInput(cableInput);
    updateDom(feetInputTotal, state.estimateFeetTotal, 'val');

    if (state.estimateFeetTotal < state.feetCalc) {
      estimateCableFeedback.toggle(false);
      estimateCableWarn.toggle(true);
    }
    if (state.estimateFeetTotal > state.feetCalc + 150) {
      estimateCableFeedback.toggle(false);
      estimateCableDanger.toggle(true);
    }
    if (
      (
        state.estimateFeetTotal <= state.feetCalc + 150 &&
        state.estimateFeetTotal >= state.feetCalc
      ) ||
      state.estimateFeetTotal === state.feetCalc) {
      estimateCableFeedback.toggle(false);
    }
  }

  //gets totals based on inputs and spool data
  function getFeetFromInput(inputs) {
    let feetTotal = 0;
    inputs.each(function() {
      let currentField = $(this);
      let amount = currentField.val();
      let type = currentField.attr('id');
      spoolIncrements.forEach((spool) => {
        if (spool.type === type) {
          feetTotal += amount * spool.feet;
        }
      });
    });
    return feetTotal;
  }

  //gets the total from the array of inputs you give it
  function getTotalFromInputs(inputs) {
    let total = 0;
    inputs.each(function (index, data) {
      if (!!parseInt($(this).val())) {
        total += parseInt($(this).val());
      }
    });
    return total;
  }

  //Valuable function that may not be needed.

  //TODO: consider deletion
  function calculateGrandTotal() {
    let total = 0;
    $('.row-cost').each(function(e, v) {
      let numStr = $(this).text().substr(1);
      if (!!numStr) {
        total += parseInt(numStr);
      }
    });
    grandTotal.text(`≈ $${total}`);
  }

  //creats an easy to work with object for each combination and returns the cheapest option
  //allCombinations is an array of arrays
  function addTotalsFindCheapest(allCombinations) {
    //[{feet: 100, name: "Small", price: 60}]
    //combo is an array of objects
    let cheapestCombo = allCombinations.map((combo) => {
      // console.log('combo', combo);
      let comboObject = {
        totalCost: 0,
        totalFeet: 0,
        ppf: 0,
        overage: 0,
        types: {
          large: {
            amount: 0,
            cost: 0,
            feet: 0,
            totalCost: 0
          },
          medium: {
            amount: 0,
            cost: 0,
            feet: 0,
            totalCost: 0
          },
          small: {
            amount: 0,
            cost: 0,
            feet: 0,
            totalCost: 0
          },
        },
        spools: []
      };
      //return raw spool data just in case we want to use it later
      //runs meta data calculations based on data
      comboObject.spools = combo.map((spool) => {
        let name = spool.name.toLowerCase();
        comboObject.totalCost += spool.price;
        comboObject.totalFeet += spool.feet;
        comboObject.types[name].amount++;
        comboObject.types[name].cost = spool.price;
        comboObject.types[name].feet = spool.feet;
        comboObject.types[name].totalCost += spool.price;
        return spool;
      });

      comboObject.ppf = Math.round(100*(comboObject.totalCost / comboObject.totalFeet));

      comboObject.overage = (comboObject.totalFeet - state.totalFeet);
      return comboObject;
    }).reduce((acc, curr) => acc.totalCost < curr.totalCost ? acc : curr);

    return cheapestCombo;
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