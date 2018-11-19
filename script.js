var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx';

function bodyLoad(){
	showDateTime();
	var timer = setInterval(showDateTime,500);
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
	document.querySelector('#datetime').innerText = convertDateTime();
}

function convertDateTime(){
	var dt = new Date();
	var res='';
	res+=toBase60(dt.getFullYear());
	res+=toBase60(dt.getMonth()+1);
	res+=toBase60(dt.getDate());
	res+=toBase60(dt.getHours());
	res+=toBase60(dt.getMinutes());
	res+=toBase60(dt.getSeconds());
	return res;
}