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
	var dt = new Date(document.querySelector('#date').value);
	var ts = document.querySelector('#time').value.split(':');
	dt.setHours(ts[0]);
	dt.setMinutes(ts[1]);
	dt.setSeconds(ts[2]);
	document.querySelector('#custom').innerText = convertDateTime(dt);
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