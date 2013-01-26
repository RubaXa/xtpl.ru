xtpl.ctrl('example.datalist', function (ctx){
	window.ctx = ctx;

	var _zeroPad = function(val){
		return	val < 10 ? '0'+val : val;
	};

	ctx.folderId = 0;

	xtpl.mod('datetime.short', function (ts){
		var date = new Date(ts*1000);
		return	_zeroPad(date.getHours()) +':'+ _zeroPad(date.getMinutes());
	});


	$.extend(ctx, (function (){
		var json = $.ajax('./example/datalist/datalist.json', { async: false }).responseText;
		return	$.parseJSON(json).body;
	})());



	ctx.toolbar = {
		moveTo: { disabled: true },
		markAs: { disabled: true },

		selectFn: {
			'all': function (item){ item.selected = true },
			'read': function (item){ item.selected = !item.unread; },
			'unread': function (item){ item.selected = item.unread; },
			'attach': function (item){ item.selected = item.attach; },
			'none': function (item){ item.selected = false }
		},

		onSelectAll: function (name){
			xtpl.utils.each(ctx.messages, this.selectFn[name]);
			ctx.datalist.onSelectItem();
		}
	};


	ctx.datalist = {
		items: ctx.messages,

		onSelectItem: function (){
			var cnt = xtpl.utils.filter(this.items, function (item){ return item.selected }).length;

			ctx.toolbar.total		= this.items.length;
			ctx.toolbar.selected	= cnt;
			ctx.toolbar.selectAll	= (cnt == this.items.length);

			ctx.toolbar.moveTo.disabled = !cnt;
			ctx.toolbar.markAs.disabled = !cnt;
		}
	};
});
