// Die IDs der Gebäude und Fahrzeuge, um nachher (beim Zählen) die Namen auszugeben.

var buildingsById = {
    0: 'Feuerwache',
    1: 'Feuerwehrschule',
    2: 'Rettungswache',
    3: 'Rettungsschule',
    4: 'Krankenhaus',
    5: 'Rettungshubschrauber-Station',
    6: 'Polizeiwache',
    7: 'Leitstelle',
    8: 'Polizeischule',
    9: 'THW'
}

var carsById = {
    0: 'LF 20',
    1: 'LF 10',
    2: 'DLK 23',
    3: 'ELW 1',
    4: 'RW',
    5: 'GW-A',
    6: 'LF 8/6',
    7: 'LF 20/16',
    8: 'LF 10/6',
    9: 'LF 16-TS',
    10: 'GW-Öl',
    11: 'GW-L2-Wasser',
    12: 'GW-Messtechnik',
    13: 'SW 1000',
    14: 'SW 2000',
    15: 'SW 2000-Tr',
    16: 'SW KatS',
    17: 'TLF 2000',
    18: 'TLF 3000',
    19: 'TLF 8/8',
    20: 'TLF 8/18',
    21: 'TLF 16/24-Tr',
    22: 'TLF 16/25',
    23: 'TLF 16/45',
    24: 'TLF 20/40',
    25: 'TLF 20/40-SL',
    26: 'TLF 16',
    27: 'GW-Gefahrgut',
    28: 'RTW',
    29: 'NEF',
    30: 'HLF 20',
    31: 'RTH',
    32: 'FuStW',
    33: 'GW-Höhenrettung',
    34: 'ELW 2',
    35: 'leBefKw',
    36: 'MTW',
    37: 'TSF-W',
    38: 'KTW',
    39: 'GKW'
}

// Arrays, um nachher die (verfügbaren) Fahrzeuge und Wachen zu zählen
var buildingAmount = Array(), carAmount = Array(), carAvailableAmount = Array();
// Array, um die Einstellungen des Nutzers zu speichern
var userSettings;

// Fallunterscheidung für die verschiedenen Seiten
if (window.location.pathname == '/') {
	
	$('#premium_b').css('background-color', '#000000');
	$('#premium_a').css('background-color', '#000000');
	
	fayeEvent();
	restoreHiddenBuildings();
	hideLogo();
	restoreWellDiv();
	tabsForMissions();
	
	// Faye dazu anweisen, die Funktion fayeEvent aufzurufen
	faye.subscribe('/private-user'+ user_id, function(data) {        		
		fayeEvent();
	});
	// hier unten muss noch was geändert werden, dazu muss Sebastian aber irgendwo die Verbands ID angeben
	// bis dahin wird der Listener auf dem "All"-Channel sein
	faye.subscribe('/all', function(data) {
		fayeEvent();
	});
}

// Funktion wird immer angerufen, wenn ein Event von faye komm (bspw. Statuswechsel, neuer Einsatz etc.)
function fayeEvent()
{
	prepareBuildingAndCarCounter();
	showBuildingSearch();
	showCarSearch();
	showBuildingAmount();
	showCarAmount();
	prepareBuildingsToHide();
}

// Einstellungen des Users bekommen
function getUserSettings()
{

}

// zwei Divs für die Fahrzeuge und Wachen erstellen
function prepareBuildingAndCarCounter()
{
	// bisherige Tabellen entfernen, damit diese nicht doppelt und dreifach auftauchen
	$('.row-fluid:eq(3)').remove();
	$('.row-fluid:eq(2)').after('<div class="row-fluid"><div id="scriptBuildingAmount" class="span6 well"></div><div id="scriptCarAmount" class="span6 well"></div></div>');
}

// Gebäude zählen und in Array speichern
function countBuildings()
{
	// alle Zählerstände der Gebäude auf 0 setzen
	for (var i = 0; i <= 10; i++) {
		buildingAmount[i] = 0;
	}
	
	// für jedes Gebäude, was in der Liste gefunden wird, +1 im Array buildingAmount rechnen
	$('#building_list').find('.building_list_li').each(function(index, element) {
        buildingAmount[$(element).attr('building_type_id')]++;
    });
	return buildingAmount;
}

// alle Fahrzeuge zählen und in Array speichern
function countCars()
{
	// alle Zählerstände der Fahrzeuge auf 0 setzen
	for (var i = 0; i <= 40; i++) {
		carAmount[i] = 0;
	}
	
	// für jedes Fahrzeug, was in der Liste gefunden wird, +1 im Array carAmount rechnen
	$('.building_list_vehicle_element').each(function(index, element) {
        carAmount[$(element).find('a').attr('vehicle_type_id')]++;
    });
	return carAmount;
}

// alle verfügbaren Fahrzeuge zählen und in Array speichern
function countAvailableCars()
{
	// alle Zählerstände der Fahrzeuge auf 0 setzen
	for (var i = 0; i <= 40; i++) {
		carAvailableAmount[i] = 0;
	}
	
	// für jedes Fahrzeug, was in der Liste gefunden wird und Status 1 oder 2 ist, +1 im Array carAvailableAmount rechnen
	$('.building_list_vehicle_element').each(function(index, element) {
		if ($(element).find('span').html() == "2") {
        	carAvailableAmount[$(element).find('a').attr('vehicle_type_id')]++;
		}
    });
	return carAvailableAmount;
}

// gezählte Gebäude ausgeben
function showBuildingAmount()
{
	var buildings = countBuildings();
	
	$('#scriptBuildingAmount').append('<table class="table table-bordered table-condensed table-striped table-hover"><thead><tr><th>Gebäude</th><th>Anzahl</th></tr></thead><tbody id="scriptBuildingAmountTable"></tbody></table>');
	
	for (var i = 0; i < buildings.length; i++) {
		if (buildings[i] > 0) {
			$('#scriptBuildingAmountTable').append('<tr><td>'+ buildingsById[i] +'</td><td>'+ buildings[i] +'</td></tr>');
		}
	}
}

// gezählte Fahrzeuge ausgeben
function showCarAmount()
{
	var cars = countCars();
	var carsAva = countAvailableCars();
	
	$('#scriptCarAmount').append('<table class="table table-bordered table-condensed table-striped table-hover"><thead><tr><th>Fahrzeug</th><th>Anzahl</th><th>Verfügbar</th></tr></thead><tbody id="scriptCarAmountTable"></tbody></table>');
	
	for (var i = 0; i < cars.length; i++) {
		if (cars[i] > 0) {
			$('#scriptCarAmountTable').append('<tr><td>'+ carsById[i] +'</td><td>'+ cars[i] +'</td><td>'+ carsAva[i] +'</td></tr>');
		}
	}
}

// Suchleiste für die Gebäudeübersicht erstellen
function showBuildingSearch()
{
	$('#scriptBuildingAmount').append('<input id="scriptBuildingSearch" class="input-medium search-query" placeholder="Suchen" type="text"><br /><br />');
	
	$('#scriptBuildingSearch').bind('keyup', function(e) {		
		var searchWord = $('#scriptBuildingSearch').val().toLowerCase();
		
		$('#scriptBuildingAmountTable').find('tr').each(function(index, element) {
			// zunächst die Zeile wieder sichtbar machen
			$(element).show();
			
			// nun die Zelle prüfen, ob der Suchbegriff vorhanden ist
            if (!$(element).find('td:eq(0)').html().toLowerCase().match(searchWord)) {
				$(element).hide();
			}
        });
	});
}

// Suchleiste für die Fahrzeugübersicht erstellen
function showCarSearch()
{
	$('#scriptCarAmount').append('<input id="scriptCarSearch" class="input-medium search-query" placeholder="Suchen" type="text"><br /><br />');
	
	$('#scriptCarSearch').bind('keyup', function(e) {		
		var searchWord = $('#scriptCarSearch').val().toLowerCase();
		
		$('#scriptCarAmountTable').find('tr').each(function(index, element) {
			// zunächst die Zeile wieder sichtbar machen
			$(element).show();
			
			// nun die Zelle prüfen, ob der Suchbegriff vorhanden ist
            if (!$(element).find('td:eq(0)').html().toLowerCase().match(searchWord)) {
				$(element).hide();
			}
        });
	});
}

// Fahrzeuglisten einklappbar machen
function prepareBuildingsToHide()
{
	$('.building_marker_image').each(function(index, element) {
        // zunächst onclick-Listener entfernen, damit es nicht nachher doppelt ausgeführt wird
		$(element).unbind('click');
		$(element).css('cursor', 'pointer');
		
		$(element).bind('click', function(e) {
			$(element).parent().parent().find('.building_list_vehicles').slideToggle(400, function() {saveHiddenBuildings()});
		});
    });
}

// versteckte Fahrzeuglisten in Cookie speichern (mit jQuery.cookie)
function saveHiddenBuildings()
{
	var hiddenBuildings = "";
	$('.building_list_vehicles:hidden').each(function(index, element) {
        hiddenBuildings += $(element).attr('id').split('_')[2] +";";
    });
	
	$.cookie('hiddenBuildings', hiddenBuildings, {expires: 700});
}

// versteckte, gespeicherte Gebäude beim refresh wieder verstecken
function restoreHiddenBuildings()
{
	if ($.cookie('hiddenBuildings') != undefined) {
		var buildingsToHide = $.cookie('hiddenBuildings').split(';');
		for (var i = 0; i < buildingsToHide.length; i++) {
			$('#vehicle_building_'+ buildingsToHide[i]).hide();
		}
	}
}

// großes Logo ganz oben auf der Seite verstecken
function hideLogo()
{
	$('.logo').parent().hide();
}

// Div "well" um die Einsatzliste setzen, damit es einheitlich aussieht
function restoreWellDiv()
{
	$('#missions').addClass('well');
}

// Tabs bei Einsatzliste
function tabsForMissions()
{
	// Bisherige Button ausblenden
	$('#missions').find('.btn-group').hide();
	$('#missions').find('h3').hide();
	
	// Tabs erstellen
	$('#mission_list').before('<div id="scriptMissionTab"></div>');
	
	$('#scriptMissionTab').append('<ul class="nav nav-tabs"><li class="active"><a href="#scriptEmergencies" data-toggle="tab">Notfälle</a></li><li><a href="#scriptTransports" data-toggle="tab">KTP</a></li><li><a href="#scriptAlliances" data-toggle="tab">Verbandseinsätze</a></li></ul>');
	
	$('#scriptMissionTab').append('<div class="tab-content" id="scriptTabContent"></div>');
	
	var missionList = $('#mission_list').html();
	$('#mission_list').remove();
	$('#scriptTabContent').append('<div class="tab-pane active" id="scriptEmergencies"><ul id="mission_list">'+ missionList +'</ul></div>');
	
	var missionListKrankentransporte = $('#mission_list_krankentransporte').html();
	$('#mission_list_krankentransporte').remove();
	$('#scriptTabContent').append('<div class="tab-pane" id="scriptTransports"><ul id="mission_list_krankentransporte">'+ missionListKrankentransporte +'</ul></div>');
	
	var missionListAlliance = $('#mission_list_alliance').html();
	$('#mission_list_alliance').remove();
	$('#scriptTabContent').append('<div class="tab-pane" id="scriptAlliances"><ul id="mission_list_alliance">'+ missionListAlliance +'</ul></div>');
}