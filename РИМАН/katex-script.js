$(".formulae-katex").each(function(){
	katex_dump = this.innerHTML;
	this.innerHTML = "";
	katex.render(katex_dump, this);
});
