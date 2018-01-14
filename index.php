<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
	      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<link rel="stylesheet" href="styles/bootstrap.css">
	<link rel="stylesheet" href="styles/style.css">
</head>
<body>

<!--<nav class="navbar navbar-inverse navbar-expand-md fixed-top bg-inverse">-->
<!--<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">-->
<!--<span class="navbar-toggler-icon"></span>-->
<!--</button>-->

<!--<a class="navbar-brand" href="#">CableBullet Estimator</a>-->


<!--<div class="collapse navbar-collapse" id="navbarsExampleDefault">-->
<!--<ul class="navbar-nav mr-auto">-->
<!--<li class="nav-item active">-->
<!--<a class="nav-link" href="#">Shop <span class="sr-only">(current)</span></a>-->
<!--</li>-->
<!--<li class="nav-item">-->
<!--<a class="nav-link" href="#">Help</a>-->
<!--</li>-->
<!--</ul>-->
<!--</div>-->
<!--</nav>-->

<!--<nav class="navbar navbar-inverse fixed-top bg-inverse">-->
<!--<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">-->
<!--<span class="navbar-toggler-icon"></span>-->
<!--</button>-->
<!--<a class="navbar-brand" href="#">CableBullet Estimator</a>-->
<!--<div class="collapse navbar-collapse" id="navbarsExampleDefault">-->
<!--<ul class="navbar-nav mr-auto">-->
<!--<li class="nav-item active">-->
<!--<a class="nav-link" href="#">Shop <span class="sr-only">(current)</span></a>-->
<!--</li>-->
<!--<li class="nav-item">-->
<!--<a class="nav-link" href="#">Help</a>-->
<!--</li>-->
<!--</ul>-->
<!--</div>-->
<!--</nav>-->
<!--main navbar-->
<?php include 'partials/nav.php';?>
<!--jumbotron-->
<?php include 'partials/jumbotron.php';?>

<div class="container-fluid">
	<!--tab navigation-->
	<?php include 'partials/tabNav.php';?>

	<!-- Tab panes -->
	<div class="tab-content">

		<!--  first tab content   -->
        <?php include 'partials/parametersContent.php';?>
		<!--  second tab content   -->
        <?php include 'partials/estimatesContent.php';?>
		<!--  third tab content   -->
        <?php include 'partials/shoppingContent.php';?>

	</div>

</div>

<?php include 'partials/bottomButtons.php';?>


<!--
<div class="container">
	<div class="row">
		<div class="col-md-6 col-xs-12">
			<div class="card">
				<div class="card-block">
					<h4 class="card-title">User Input</h4>
					<form id="dimension-form" action="" class="">
						<div class="form-group row">
							<label for="railing" class="col-8 col-form-label">Linear Railing Feet</label>
							<div class="col-4">
								<input id="railing" class="form-control" min="3" placeholder="Railing Feet" type="number">
							</div>
						</div>
						<div class="form-group row">
							<label for="height" class="col-8 col-form-label">Fill Area (railing height in inches)</label>
							<div class="col-4">
								<input id="height" class="form-control" min="" placeholder="(inches)" type="number">
							</div>
						</div>
						<div class="form-group row">
							<label for="sections" class="col-8 col-form-label">Number of 'sections'</label>
							<div class="col-4">
								<input id="sections" class="form-control" placeholder="Number of Sections" type="number">
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div id="display-totals" class="col-md-6 col-xs-12">
			<div class="card">
				<div class="card-block">
					<h4 class="card-title">Calculations</h4>
					<div class="form-group row">
						<label class="col-8 col-form-label">Total Feet of Cable</label>
						<div id="railing-calc" class="col-4" ></div>
					</div>
					<div class="form-group row">
						<label class="col-8 col-form-label">Number Of Runs</label>
						<div id="runs-calc" class="col-4"></div>
					</div>
					<div class="form-group row">
						<label class="col-8 col-form-label">Bullet Kits</label>
						<div id="kits-calc" class="col-4"></div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<div class="row">
		<table class="table table-striped" id="price-table">
			<thead>
			<tr>
				<th>Item</th>
				<th>Quantity</th>
				<th>Unit Price</th>
				<th>Price Per Foot</th>
				<th>Extra Spool</th>
				<th>Total Cost</th>
			</tr>
			</thead>
			<tbody >
			<tr>
				<td>Installation Kit</td>
				<td>1</td>
				<td>$150</td>
				<td>-</td>
				<td>-</td>
				<td class="row-cost">$150</td>
			</tr>
			<tr class="last-static">
				<td>Bullet Kits</td>
				<td id="kit-quantity"></td>
				<td>$21</td>
				<td>-</td>
				<td>-</td>
				<td id="kit-cost" class="row-cost"></td>
			</tr>
			<tr id="total-row">
				<td><b>Grand Total:</b></td>
				<td></td>
				<td></td>
				<td id="ppf"></td>
				<td id="overage"></td>
				<td id="grand-total"></td>
			</tr>
			</tbody>
		</table>
	</div>
</div>
-->

<script src="js/jquery.js"></script>
<script src="js/tether.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/bullet-calc.js"></script>
</body>
</html>