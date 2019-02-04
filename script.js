const weatherData = {
	tempUnit: 'C',
	windSpeedUnit: 'm/s',
	days: [
		{ day: 'Mon', temp: 22, windDirection: 'north-east', windSpeed: 10 , type:'sunny' }, 
		{ day: 'Tue', temp: 14, windDirection: 'north-west', windSpeed: 14, type: 'rainy' },
		{ day: 'Wed', temp: 17, windDirection: 'south-east', windSpeed: 20, type: 'cloudy' }, 
		{ day: 'Thr', temp: 22, windDirection: 'north-east', windSpeed: 10 , type:'sunny' }, 
		{ day: 'Fri', temp: 14, windDirection: 'north-west', windSpeed: 14, type: 'rainy' },
		{ day: 'Sat', temp: 17, windDirection: 'south-east', windSpeed: 20, type: 'cloudy' }, 
		{ day: 'Sun', temp: 17, windDirection: 'south-east', windSpeed: 20, type: 'cloudy' }
	]
}

var selectedDay = '';

showAll();

var today = new Date();

switch(today.getDay()){
	case 1:
		showDetails('Mon');
		break;
	case 2:
		showDetails('Tue');
		break;	
	case 3:
		showDetails('Wed');
		break;
	case 4:
		showDetails('Thr');
		break;
	case 5:
		showDetails('Fri');
		break;
	case 6:
		showDetails('Sat');
		break;	
	case 0:
		showDetails('Sun');
		break;
	default:
		showDetails('Tue');
		break;		
}

function showAll(){
	var main = document.getElementById('days');
	main.innerHTML='';
	weatherData.days.forEach(function (item) {
	  showDay(item)
	});	
}

function showDay(day){
	
	var main = document.getElementById('days');
	
	
	var box = document.createElement('DIV');
	box.setAttribute('class','item');
	box.setAttribute('onclick','showDetails(\'' + day.day +'\')');
	
	var boxInner = document.createElement('DIV');
	boxInner.setAttribute('class','boxInner');
	box.appendChild(boxInner);
	
	/*
	var boxImage = document.createElement('IMG');
	boxImage.setAttribute('src','img/' + day.type + '.jpg');
	boxInner.appendChild(boxImage);*/
	
	var titleBox = document.createElement('DIV');
	titleBox.setAttribute('class','titleBox');
	titleBox.innerHTML = day.day + ': ' + day.temp + " " + weatherData.tempUnit;
	boxInner.appendChild(titleBox);
	
	
	main.appendChild(box);
}

function showDetails(day){
	
	selectedDay = day;
	
	var dayData = weatherData.days.filter(item => item.day == day)[0];
	
	var widget = document.getElementById('widget');
	widget.innerHTML = "";
	
	var boxImage = document.createElement('IMG');
	boxImage.setAttribute('src','img/' + dayData.type + '.jpg');
	widget.appendChild(boxImage);
	
	var titleBox = document.createElement('DIV');
	titleBox.setAttribute('class','titleBox');
	titleBox.innerHTML = dayData.day + ': ' + dayData.temp + " " + weatherData.tempUnit;
	widget.appendChild(titleBox);
	
	var titleBoxWind = document.createElement('DIV');
	titleBoxWind.setAttribute('class','titleBox');
	titleBoxWind.innerHTML = dayData.windSpeed + " " + weatherData.windSpeedUnit + " " + getWindDirectionSymbol(dayData.windDirection);
	widget.appendChild(titleBoxWind);
	
	
	var titleBoxType = document.createElement('DIV');
	titleBoxType.setAttribute('class','titleBox');
	titleBoxType.innerHTML = dayData.type;
	widget.appendChild(titleBoxType);
	
}



function selectTempUnit(unit){
	
	if(unit=='Kelvin'){
		weatherData.days.forEach(function (item) {
			item.temp += 273.15
		});
		weatherData.tempUnit = 'K';
	}else{
		weatherData.days.forEach(function (item) {
			item.temp -= 273.15
		});
		weatherData.tempUnit = 'C';
	}
	showAll();
	showDetails(selectedDay);
}


function selectWindSpeedUnit(unit){
	if(unit=='km/h'){
		weatherData.days.forEach(function (item) {
			item.windSpeed *= 3.6
		});
		weatherData.windSpeedUnit = 'km/h';
	}else{
		weatherData.days.forEach(function (item) {
			item.windSpeed /= 3.6
		});
		weatherData.windSpeedUnit = 'm/s';
	}
	showAll();
	showDetails(selectedDay);
}

function getWindDirectionSymbol(direction){
	var dirArr = direction.split('-');
	var firstChar = direction[0];
	var secondChar = '';
	var index = direction.indexOf('-');
	if(index>-1){
		secondChar = direction[index+1];
	}

	switch(firstChar+secondChar){
		case 'n':
			return "&#8593;";
		case 's':
			return "&#8594;"	
		case 'w':
			return "&#8592;";
		case 'e':
			return "&#8595;"
		case 'nw':
			return "&#8598;";
		case 'ne':
			return "&#8599;"	
		case 'sw':
			return "&#8601;";
		case 'se':
			return "&#8600;"				
		default:
			return "&#8593;"				
	}

}