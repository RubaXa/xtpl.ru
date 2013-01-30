xtpl.ctrl('example.list', function (ctx){
	// New item model
	ctx.newItem = '';

	// Default items
	ctx.items = ['Alpha', 'Beta', 'Gamma'];

	// Active item index in items
	ctx.activeIdx = 0;

	// Add to items
	ctx.addItem = function (){
		if( ctx.newItem.length > 0 ){
			ctx.items.push(ctx.newItem);
			ctx.newItem = '';
		}
	};

	// @const
	ctx.SORT_ASC = function (a, b){
		return	a == b ? 0 : (a > b ? 1 : -1);
	};

	// @const
	ctx.SORT_DESC = function (a, b){
		return	a == b ? 0 : (a > b ? -1 : 1);
	};

	// Sort items by type
	ctx.sortItems = function (fn){
		ctx.items.sort(fn);
	};
});
