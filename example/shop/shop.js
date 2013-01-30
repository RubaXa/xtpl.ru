xtpl.ctrl('example.shop', function (ctx){
	var gid = 1;

	// Available sizes
	ctx.sizes = ['XL', 'L', 'M', 'S'];

	// Surcharge depending on size
	ctx.surcharge = { 'S': 0, 'M': 1, 'L': 3, 'XL': 6 };

	// Shop cart
	ctx.cart = [];

	// Shop items
	ctx.items = [
		{
			  id:		gid++
			, name:		'OrangeRed'
			, color:	'#ff4500'
			, size:		'XL'
			, price:	rand(10, 20)
		}
		, {
			  id:		gid++
			, name:		'Orange'
			, color:	'#f26d00'
			, size:		'M'
			, price:	rand(10, 20)
		}
		, {
			  id:		gid++
			, name:		'Green'
			, color:	'green'
			, size:		'XL'
			, price:	rand(10, 20)
		}
		, {
			  id:		gid++
			, name:		'GreenYellow'
			, color:	'#adff2f'
			, size:		'M'
			, price:	rand(10, 20)
		}
		, {
			  id:		gid++
			, name:		'Blue'
			, color:	'navy'
			, size:		'XL'
			, price:	rand(10, 20)
		}
		, {
			  id:		gid++
			, name:		'LightBlue'
			, color:	'#add8e6'
			, size:		'M'
			, price:	rand(10, 20)
		}
	];

	// Get item price
	ctx.getPrice = function (item, amount){
		return	(amount || 1) * (item.price + ctx.surcharge[item.size]) | 0;
	};

	// Add to cart
	ctx.addToCart = function (item){
		var i = ctx.cart.length;

		while( i-- ){
			if( ctx.cart[i].id === item.id && ctx.cart[i].size == item.size ){
				ctx.cart[i].amount++;
				return;
			}
		}

		// add to list
		ctx.cart.push( xtpl.utils.extend({ amount: 1, selected: false }, item) );
	};

	// Remove selected from cart
	ctx.removeSelected = function (){
		var i = ctx.cart.length;

		while( i-- ){
			if( ctx.cart[i].selected ){
				ctx.cart.splice(i, 1);
			}
		}
	};

	// Get count selected
	ctx.getCountSelected = function (){
		var i = ctx.cart.length, count = 0;
		while( i-- ) count += !!ctx.cart[i].selected;
		return	count
	};

	// Get total price
	ctx.getTotalPrice = function(){
		var i = ctx.cart.length, total = 0;

		while( i-- ){
			total += ctx.getPrice(ctx.cart[i]) * ctx.cart[i].amount|0;
		}

		return	total;
	};


	function rand(min, max){
		return	min + Math.round(Math.random() * (max - min));
	}
});
