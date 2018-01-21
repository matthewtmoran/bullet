<div class="tab-pane" id="estimates" role="tabpanel">
	<div class="container">
		<div class="row">
			<div class="card-group">

				<div class="card" id="estimates-kits">
					<img class="card-img-top" src="http://via.placeholder.com/350x250"
					     alt="Slideshow goes here">
					<div class="card-img-overlay">
						<h3 class="card-title text-white text-center"><span id="kits-calc"></span> Kits</h3>
					</div>
					<div class="card-body">
						<h5 class="card-title">Cable Bullet kits</h5>
						<p class="card-text">This explains different kit options available to the customer,
							letting them choose how many of each kind (totalling the number above) they'll
							need..</p>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Wood Posts
									</div>
									<div class="col-4">
										<input id="wood-post-kits" min="0" class="form-control user-input"
										       type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Metal Posts
									</div>
									<div class="col-4">
										<input id="metal-post-kits" min="0" class="form-control user-input"
										       type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Vinyl or Composite Sleeve Posts
									</div>
									<div class="col-4">
										<input id="vinyl-post-kits" min="0" class="form-control user-input"
										       type="number">
									</div>
								</div>
							</li>
						</ul>
					</div>
					<ul class="list-group list-group-flush" >
						<li class="list-group-item">
							<div class="row">
								<div class="col-8">
									Total Amount Of Kits selected
								</div>
								<div class="col-4">
									<input readonly type="number" class="form-control-plaintext" id="kits-input-total"/>
								</div>
							</div>
							<div class="invalid-feedback warn">
								You have not selected an ammout of kits that equal the total!
							</div>
							<div class="invalid-feedback danger">
								You have selected an amount that is greater than the total!
							</div>
							<small class="form-text text-muted">Your total must be greater or equal to the amount listed
								above
							</small>

						</li>
					</ul>
				</div>

				<div class="card" id="estimates-cable">
					<img class="card-img-top" src="http://via.placeholder.com/350x250"
					     alt="Slideshow goes here">
					<div class="card-img-overlay">
						<h3 class="card-title text-white text-center"><span id="feet-calc"></span>' Cable</h3>
					</div>
					<div class="card-body">
						<h5 class="card-title">5/32" 316 Stainless Steel Cable 7x7</h5>
						<p class="card-text">This Explains how much cable, and what kind of cable we want to sell the
							customer... (what kind they want?)</p>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Small Spool
									</div>
									<div class="col-4">
										<input class="form-control user-input" id="small" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">

									<div class="col-8">
										Medium Spool
									</div>
									<div class="col-4">
										<input class="form-control user-input" id="medium" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">

									<div class="col-8">
										Large Spool
									</div>
									<div class="col-4">
										<input class="form-control user-input" id="large" type="number">
									</div>
								</div>
							</li>

							<!--                        <li class="list-group-item">-->
							<!--                            <div class="col-8">-->
							<!--                                Form entry to the right...-->
							<!--                            </div>-->
							<!--                            <div class="col-4">-->
							<!--                            </div>-->
							<!--                        </li>-->
							<!--                        <li class="list-group-item">-->
							<!--                            <div class="col-8">-->
							<!--                                Form entry to the right...-->
							<!--                            </div>-->
							<!--                            <div class="col-4">-->
							<!--                            </div>-->
							<!--                        </li>-->
						</ul>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">
							<div class="row">
								<div class="col-8">
									Total Amount of Feet Selected
								</div>
								<div class="col-4">
									<input readonly type="number" class="form-control-plaintext" id="feet-input-total"/>
								</div>
							</div>
							<div class="invalid-feedback warn">
								You have not selected enough spools to cover the linear feet! You need to select XXXX more feet!
							</div>
							<div class="invalid-feedback danger">
								You have an amount of spool that is significantly higher than the recommended amount!
							</div>
							<small class="form-text text-muted">You should select an amount that at least equals the total of feet needed. (You might want to make sure you have a little extra...
							</small>
						</li>
					</ul>
				</div>

				<div class="card">
					<img class="card-img-top" src="http://via.placeholder.com/350x250"
					     alt="Slideshow goes here">
					<div class="card-img-overlay">
						<h3 class="card-title text-white text-center">Tool Kits</h3>
					</div>
					<div class="card-body">
						<h5 class="card-title">Extras & Tool Kits</h5>
						<p class="card-text">This is where customers specify the kinds of tools and accessories they
							think they might need...</p>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Cable Bullet Installation Kit
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										HIT® 22-WRC75-3 1/4-Inch Wire Rope Cable Cutter
									</div>
									<div class="col-4">

									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										6" Hex Socket Head Power Bit (3/32")
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Allen Wrench (3/32")
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Crimp Sleeve
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Lobed Washer
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Set Screw
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Cable Bullet for Wood Posts
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Cable Bullet for Metal Posts
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="row">
									<div class="col-8">
										Die Set for Crimping Tool
									</div>
									<div class="col-4">
										<input class="form-control user-input" type="number">
									</div>
								</div>
							</li>

						</ul>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">
							<div class="row">
								<div class="col-8">
									Total Amount of Extras
								</div>
								<div class="col-4">
									<input readonly type="number" class="form-control-plaintext">
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>