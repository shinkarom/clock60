var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx';

function bodyLoad(){
	showDateTime();
	var timer = setInterval(showDateTime,500);
	customDateTime();
	showCustom();
	document.querySelector("#date").addEventListener('input',customDateTime);
	document.querySelector("#time").addEventListener('input',customDateTime);
	document.querySelector("#custext").addEventListener('input',showCustom);
}

function toBase60(num){
	res='';
	do{
		res=alphabet[num%60]+res;
		num=Math.floor(num/60);
	}while(num!=0);
	return res;
}

function fromBase60(str){
	var res=0;
	for(var i=0;i<str.length;i++){
		var n = alphabet.indexOf(str[i]);
		if(n==-1) return undefined;
		res=res*60+n;
	};
	return res;
}

function showCustom(){
	document.querySelector('#cusdt').innerText = customToDateTime(document.querySelector('#custext').value.trim());
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function customToDateTime(str){
	if(str.length<6)return '';
	var d = new Date();
	//
	var u = fromBase60(str.substr(-1));
	if(u==undefined) return '';
	d.setSeconds(u);
	//
	u = fromBase60(str.substr(-2,1));
	if(u==undefined) return '';
	d.setMinutes(u);
	//
	u = fromBase60(str.substr(-3,1));
	if(u==undefined||u>23) return '';
	d.setHours(u);
	//
	u = fromBase60(str.slice(0,-5));
	if(u==undefined) return '';
	d.setFullYear(u);
	//
	u = fromBase60(str.substr(-5,1));
	if(u==undefined||u>12) return '';
	d.setMonth(u-1);
	//
	u = fromBase60(str.substr(-4,1));
	if(u==undefined||u>daysInMonth(d.getMonth()+1,d.getFullYear())) return '';
	d.setDate(u);	
	//
	return isValidDate(d)?d.toLocaleString():'';
}

function showDateTime(){
	document.querySelector('#current').innerText = convertDateTime(new Date());
}

function isValidDate(d){
	return d instanceof Date && !isNaN(d);
}

function customDateTime(){
	var ds = document.querySelector('#date').value;	
	var ts = document.querySelector('#time').value;
	var dt = new Date(ds);
	var ta = ts.split(':');
	dt.setHours(ta[0]);
	dt.setMinutes(ta[1]);
	dt.setSeconds(ta[2]);
	document.querySelector('#custom').innerText =isValidDate(dt)?convertDateTime(dt):'' ;
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