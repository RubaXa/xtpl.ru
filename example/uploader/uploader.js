xtpl.ctrl('example.uploader', function (ctx){
	// file names
	ctx.names = {};

	// files list
	ctx.files = [];

	ctx.onChoose = function (files){
		ctx.files = [].concat(files, ctx.files);

		FileAPI.upload({
			  url: 'http://www.rubaxa.org/index.php'
			, files: { 'files': files }

			, fileprogress: ctx.$fn(function (evt, file){
				file.loaded = evt.loaded;
				file.total  = evt.total;
			})

			, filecomplete: ctx.$fn(function (err, xhr, file){
				file.loaded   = file.total;
				file.complete = true;
			})
		});
	};
});
