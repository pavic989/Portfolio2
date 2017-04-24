function sleep(){
		i++;
		if( i > 2 ){
			i = 0;
			ar = makeText(); // reset
		}
		scroll.innerHTML = '';
		start();
}

function makeText(){
	var text = "Frontend Developer";
	var text1 = "Hiring?";
	var text2 = "Contact me!";

	var stext = text.split('');
	var stext1 = text1.split('');
	var stext2 = text2.split('');
	var nasArray = [stext, stext1, stext2];
	return nasArray;
}


var ar = makeText();
var scroll = document.getElementById('scroll');
var loop;
var i = 0;


function start(){
	if(ar[i].length > 0){
		scroll.innerHTML += ar[i].shift();
		loop = setTimeout(start,200);  // speed settings
	} else {
		var ss = setTimeout(sleep , 2000);
	}
}

start();

$(window).scroll(function(){
	var scrollTop = $('.toCenter').offset().top;
	var contact = $('#contact').offset().top;
	if($(this).scrollTop() > scrollTop || contact){
		$('.toCenter').fadeIn(3000);
		$('#contact').fadeIn(4000);
	}
})
