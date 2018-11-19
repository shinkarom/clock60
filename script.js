var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx';

function bodyLoad(){
	showDateTime();
	var timer = setInterval(showDateTime,500);
	customDateTime();
	document.querySelector("#date").addEventListener('input',customDateTime);
	document.querySelector("#time").addEventListener('input',customDateTime);
}

function toBase60(num){
	res='';
	do{
		res=alphabet[num%60]+res;
		num=Math.floor(num/60);
	}while(num!=0);
	return res;
}

function showDateTime(){
	document.querySelector('#current').innerText = convertDateTime(new Date());
}

function customDateTime(){
	var ds = document.querySelector('#date').value;	
	var ts = document.querySelector('#time').value;
	var dt = new Date(ds);
	var ta = ts.split(':');
	dt.setHours(ta[0]);
	dt.setMinutes(ta[1]);
	dt.setSeconds(ta[2]);
	document.querySelector('#custom').innerText =(dt instanceof Date && !isNaN(dt))?convertDateTime(dt):'' ;
}

function convertDateTime(dtm){
	var res='';	
	res+=toBase60(dtm.getFullYear());
	res+=toBase60(dtm.getMonth()+1);
	res+=toBase60(dtm.getDate());
	res+=toBase60(dtm.getHours());
	res+=toBase60(dtm.getMinutes());
	res+=toBase60(dtm.getSeconds());
	return res;
}