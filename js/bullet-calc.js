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
$(`
 <div class="container">
	<div class="row">
		<div class="col-md-4">
			<h2>User Input</h2>
			<form id="dimension-form" action="" class="">
				<div class="form-group row">
					<label for="railing" class="col-8 col-form-label">Railing feet</label>
					<div class="col-4">
						<input id="railing" class="form-control" min="3" placeholder="Railing Feet" type="number">
					</div>
				</div>
				<div class="form-group row">
					<label for="height" class="col-8 col-form-label">Railing height in inches</label>
					<div class="col-4">
						<input id="height" class="form-control" min="" placeholder="(inches)" type="number">
					</div>
				</div>
				<div class="form-group row">
					<label for="sections" class="col-8 col-form-label">Number of Sections</label>
					<div class="col-4">
						<input id="sections" class="form-control" placeholder="Number of Sections" type="number">
					</div>
				</div>
			</form>
		</div>
		<div id="display-totals" class="col-md-4">
			<h2>Calculations</h2>
			<div class="form-group row">
				<label class="col-8 col-form-label">Feet of Cable</label>
				<div id="railing-calc" class="col-4" ></div>
			</div>
			<div class="form-group row">
				<label class="col-8 col-form-label">Runs</label>
				<div id="runs-calc" class="col-4"></div>
			</div>
			<div class="form-group row">
				<label class="col-8 col-form-label">Bullet Kits</label>
				<div id="kits-calc" class="col-4"></div>
			</div>
		</div>

		<table class="table" id="price-table">
			<thead>
			<tr>
				<th>Item</th>
				<th>Quantity</th>
				<th>Unit Price</th>
				<th>Total Cost</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>Installation Kit</td>
				<td>1</td>
				<td>$150</td>
				<td class="row-cost">$150</td>
			</tr>
			<tr class="last-static">
				<td>Bullet Kits</td>
				<td id="kit-quantity"></td>
				<td>$21</td>
				<td id="kit-cost" class="row-cost"></td>
			</tr>
			<tr id="total-row">
				<td><b>Grand Total:</b></td>
				<td></td>
				<td></td>
				<td id="grand-total"></td>
			</tr>
			</tbody>
		</table>
	</div>
</div>
`).appendTo($('#bullet-calculator'));

$(document).ready(() => {

  const spoolIncrements = [{
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

  //inputs
  const dimensionFormInputs = $('#dimension-form :input');
  const sectionsEl = $('#sections');
  const railing = $('#railing');
  const heightEl = $('#height');

  //calculations
  const railingCalc = $('#railing-calc');
  const kitsCalc = $('#kits-calc');
  const runsCalc = $('#runs-calc');
  const spools = $('#spools');

  //max feet per section
  const maxVertInches = 3;


  const kitQuan = $('#kit-quantity');
  const priceTable = $('#price-table');
  const totalRow = $('#total-row');
  const kitCost = $('#kit-cost');
  const grandTotal = $('#grand-total');

  //runs of cable per section
  let runs = 9;
  let verticle = 30;
  let sections = 1;

  function init() {
    railing.val(50);

    railingChange(50);

    heightEl.val(30);

    heightChange(30);

    sectionsEl.val(1);

    sectionsChange(1);

    // heightEl.trigger('change');
    // railing.trigger('change');
    // sectionsEl.trigger('change');


  }
  init();

  //on input change
  dimensionFormInputs.on('change', (event) => {
    console.log('triggered');
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

  //called when height field is modified
  function heightChange(val) {
    runs = Math.ceil((val - 3) / maxVertInches);

    calcFeetByRuns(railing.val());
    calcKitsBySections(sectionsEl.val());

    return runsCalc.text(runs);
  }


  //calculate kits based on sections
  function calcKitsBySections(sections) {
    // update dom
    kitQuan.text(sections * runs);
    kitCost.text('$'+21 * (sections * runs));
    calculateGrandTotal();
    return kitsCalc.text(sections * runs);
  }

  //get total feet based on runs * feet
  function calcFeetByRuns(feet) {
    let totalFeet = feet * runs;
    calculateSpools(totalFeet);
    //update dom
    return railingCalc.text(totalFeet);
  }


  function calculateSpools(feet) {
    //find all valid combinations
    let options = findAllCombos(feet, spoolIncrements, 0, []);
    //return the cheapest spool and add some meta data calculations
    let cheapestSpoolCombo = addTotalsFindCheapest(options);
    console.log('cheapestSpoolCombo', cheapestSpoolCombo);
    //parse the data into an object ot deal with it
    // let parsedObject = convertToObject(cheapestSpoolCombo);
    //empty parent element where we will append data to

    //find all spool rows and remove them
    $('.spool-row').remove();

    //iterate through types of spool and append data according ot amount
    Object.getOwnPropertyNames(cheapestSpoolCombo.types)
      .forEach((propName) => {
        let spool = cheapestSpoolCombo.types[propName];
        if (spool.amount > 0) {
          $(`<tr class="spool-row">
                <td>${propName} Spool</td>
                <td>${spool.amount}x${spool.feet}'</td>
                <td>$${spool.cost}</td>
                <td class="row-cost">$${spool.totalCost}</td>
            </tr>`).insertBefore(totalRow);
        }
      });
    calculateGrandTotal()
  }

  function calculateGrandTotal() {
    let total = 0;
    $('.row-cost').each(function(e, v) {
      let numStr = $(this).text().substr(1);
      if (!!numStr) {
        total += parseInt(numStr);
      }
    });
    grandTotal.text(`$${total}`);
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