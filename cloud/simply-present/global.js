function get_file_extension(file){
	return file.split('.').pop()
}

function get_file_name(file){
	return file.substring(0,file.length+(-1 * (1+get_file_extension(file).length)));
}

function parse_md_headers(md){
	var lines = md.split("\n");
	var properties = {};
	$.each(lines,function(n,line){
		if ($.trim(line) == "" || $.trim(line) == " ") return false;
		if (line.substring(0,1)=="\t"){
			properties[name] += ", " + $.trim(line);
			return;
		}

		var ends = line.split(":");
		var name = $.trim(ends[0].toLowerCase());
		var value = $.trim(ends[1]);
		properties[name] = value;

	});

	return properties;
}

function has(needle,haystack){
	found = false;
	$.each(haystack,function(n,v){
		if (v==needle){
			found = true;
			return true;
		}
	});
	return found;
}

function try_urls(url){
	var r = {href: url};

	$.ajax({
	  type: "GET",
	  url: r.href,
	  async: false,
	  success: function(results,status){
	  	r.results = results;

	  },
	  error: function(){
	  	r.href = sp.config.srcDir + r.href;
		$.ajax({
		  type: "GET",
		  url: r.href,
		  async: false,
		  success: function(results){
			r.results = results;
		  },
		  error: function(){
		  	r.results = "";
		  }
		});
	  }
	});

	return r;
}