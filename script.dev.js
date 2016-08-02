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
    9: 'THW',
    10: 'THW Schule',
    11: 'Bereitschaftspolizei',
    12: 'Schnelleinsatzgruppe (SEG)'
};

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
    39: 'GKW',
    40: 'MTW-TZ',
    41: 'MzKW',
    42: 'LKW K9',
    43: 'BRmG R',
    44: 'Anh. DLE',
    45: 'MLW 5',
    46: 'WLF',
    47: 'AB-Rüst',
    48: 'AB-Atemschutz',
    49: 'AB-Öl',
    50: 'GruKw',
    51: 'FüKw',
    52: 'GefKw',
    53: 'GW Dekon-P',
    54: 'AB-Dekon-P',
    55: 'KdoW-LNA',
    56: 'KdoW-OrgL',
    57: 'Kran',
    58: 'KTW Typ B',
    59: 'ELW 1 (SEG)',
    60: 'GW-SAN'
};

var educationNames = {
    'wechsellader': 'Wechsellader',
    'gw_messtechnik': 'GW-Messtechnik',
    'gw_hoehenrettung': 'GW-Höhenrettung',
    'gw_gefahrgut': 'GW-Gefahrgut',
    'elw2': 'ELW 2',
    'notarzt': 'Notarzt',
    'police_einsatzleiter': 'Einsatzleiter',
    'police_fukw': 'FuKW',
    'thw_zugtrupp': 'Zugtrupp',
    'thw_raumen': 'Räumen',
    'dekon_p': 'Dekon-P',
    'lna': 'LNA',
    'orgl':'OrgL',
    'fwk':'Kran',
    'seg_elw':'ELW(SEG)',
    'seg_gw_san':'GW-SAN'
};

var settingNames = {
    'nightDesign': 'Dunkles Design',
    'searchFields': 'Suchfelder bei den Wachen und im Verbandschat',
    'missionTabs': 'Tabs in der Einsatzliste',
    'carStationCounter': 'Fahrzeug- und Wachenübersicht',
    'simpleHotkeys': 'AAO-Hotkeys ohne Tastenkombination nutzen',
    'schoolStatistic': 'Statistiken in der Schule',
    'showPatients': 'Patientenübersicht in der Einsatzliste zeigen',
    'changeTabTitle': 'Tab-Titel bei neuem Sprechwunsch ändern',
    'showBorderInAao': 'AAO-Button nach Betätigen mit Rahmen versehen'
};

// Einstellungen auslesen
var settings;
if (!window.localStorage.getItem('scriptEagleSettings')) {
    settings = {
        'nightDesign': true,
        'searchFields': true,
        'missionTabs': true,
        'carStationCounter': true,
        'simpleHotkeys': true,
        'schoolStatistic': true,
        'showPatients': true,
        'changeTabTitle': true,
        'showBorderInAao': true
    };
} else {
    settings = JSON.parse(window.localStorage.getItem('scriptEagleSettings'));
}

// Einstellungen speichern
function saveSettings() {
    var key;
    for (key in settingNames) {
        if ($('#script'+ key).is(':checked')) {
            settings[key] = true;
        } else {
            settings[key] = false;
        }
    }

    window.localStorage.removeItem('scriptEagleSettings');
    window.localStorage.setItem('scriptEagleSettings', JSON.stringify(settings));

    parent.location.reload();
}

// Einstellungen anzeigen
function showSettings() {
    var key;
    $('.tab-content').append('<div id="scriptSettings" class="tab-pane active" role="tabpanel"></div>');
    $('#scriptSettings').append('<div class="form-horizontal" id="scriptSettingsCol"></div>');

    for (key in settingNames) {
        $('#scriptSettingsCol').append('<div class="form-group"><div class="col-sm-3"></div><div class="col-sm-9"><label for="script'+ key +'" class="checkbox"><input type="checkbox" id="script'+ key +'">'+ settingNames[key] +'</label></div></div>');
        if (settings[key]) {
            $('#script'+ key).attr('checked', 'checked');
        }
    }

    $('#scriptSettingsCol').append('<div class="form-group"><div class="col-sm-3"></div><div class="col-sm-9"><button type="button" id="scriptSaveSettingsButton" class="btn btn-success">Einstellungen speichern und Seite neu laden</button></div></div>');
    $('#scriptSaveSettingsButton').bind('click', function() {
        saveSettings();
    });

    $('#tabs').append('<li role="presentation"><a data-toggle="tab" role="tab" aria-controls="scriptSettings" href="#scriptSettings" aria-expanded="false">Script-Einstellungen</a></li>');
}

// Arrays, um nachher die (verfügbaren) Fahrzeuge und Wachen zu zählen
var buildingAmount = [], carAmount = [], carAvailableAmount = [];

// zwei Divs für die Fahrzeuge und Wachen erstellen
function prepareBuildingAndCarCounter() {
    var scriptAmountDiv = $('#scriptAmount');
    if (scriptAmountDiv.length == 0) {
        $('.container-fluid:eq(0) > .row:eq(1)').after('<div class="row" id="scriptAmount"></div>');
        scriptAmountDiv = $('#scriptAmount');
    }
    scriptAmountDiv
        .empty()
        .append('<div id="scriptBuildings" class="col-sm-4 overview_outer"><div class="sidebar-nav"><div class="panel panel-default"><div class="panel-heading">Wachen und Gebäude</div><div class="panel-body" id="scriptBuildingAmount"></div></div></div></div>')
        .append('<div id="scriptCars" class="col-sm-4 overview_outer"><div class="sidebar-nav"><div class="panel panel-default"><div class="panel-heading">Fahrzeuge</div><div class="panel-body" id="scriptCarAmount"></div></div></div></div>');
}

// Gebäude zählen und in Array speichern
function countBuildings() {
    var i;
    // alle Zählerstände der Gebäude auf 0 setzen
    for (i = 0; i <= 13; i++) {
        buildingAmount[i] = 0;
    }

    // für jedes Gebäude, was in der Liste gefunden wird, +1 im Array buildingAmount rechnen
    $('#building_list').find('.building_list_li').each(function() {
        buildingAmount[$(this).attr('building_type_id')]++;
    });
    return buildingAmount;
}

// alle Fahrzeuge zählen und in Array speichern
function countCars() {
    var i;
    // alle Zählerstände der Fahrzeuge auf 0 setzen
    for (i = 0; i <= 61; i++) {
        carAmount[i] = 0;
    }

    // für jedes Fahrzeug, was in der Liste gefunden wird, +1 im Array carAmount rechnen
    $('.building_list_vehicle_element').each(function() {
        carAmount[$(this).find('a').attr('vehicle_type_id')]++;
    });
    return carAmount;
}

// alle verfügbaren Fahrzeuge zählen und in Array speichern
function countAvailableCars() {
    var i;
    // alle Zählerstände der Fahrzeuge auf 0 setzen
    for (i = 0; i <= 61; i++) {
        carAvailableAmount[i] = 0;
    }

    // für jedes Fahrzeug, was in der Liste gefunden wird und Status 1 oder 2 ist, +1 im Array carAvailableAmount rechnen
    $('.building_list_vehicle_element').each(function() {
        if ($(this).find('span').html() == "2") {
            carAvailableAmount[$(this).find('a').attr('vehicle_type_id')]++;
        }
    });
    return carAvailableAmount;
}

// gezählte Gebäude ausgeben
function showBuildingAmount() {
    var buildings = countBuildings(),
        i;

    $('#scriptBuildingAmount').append('<table class="table table-bordered table-condensed table-striped table-hover"><thead><tr><th>Gebäude</th><th>Anzahl</th></tr></thead><tbody id="scriptBuildingAmountTable"></tbody></table>');

    for (i = 0; i < buildings.length; i++) {
        if (buildings[i] > 0) {
            $('#scriptBuildingAmountTable').append('<tr><td>' + buildingsById[i] + '</td><td>' + buildings[i] + '</td></tr>');
        }
    }
}

// gezählte Fahrzeuge ausgeben
function showCarAmount() {
    var cars = countCars(),
        carsAva = countAvailableCars(),
        i;

    $('#scriptCarAmount').append('<table class="table table-bordered table-condensed table-striped table-hover"><thead><tr><th>Fahrzeug</th><th>Anzahl</th><th>Verfügbar</th></tr></thead><tbody id="scriptCarAmountTable"></tbody></table>');

    for (i = 0; i < cars.length; i++) {
        if (cars[i] > 0) {
            $('#scriptCarAmountTable').append('<tr><td>' + carsById[i] + '</td><td>' + cars[i] + '</td><td>' + carsAva[i] + '</td></tr>');
        }
    }
}

// Suchleiste für die Gebäudeübersicht erstellen
function showBuildingSearch() {
    $('#scriptBuildingAmount').append('<input id="scriptBuildingSearch" class="form-control" placeholder="Suchen" type="text"><br /><br />');

    $('#scriptBuildingSearch').bind('keyup', function() {
        var searchWord = new RegExp($('#scriptBuildingSearch').val().toLowerCase());

        $('#scriptBuildingAmountTable').find('tr').each(function() {
            // zunächst die Zeile wieder sichtbar machen
            $(this).show();

            // nun die Zelle prüfen, ob der Suchbegriff vorhanden ist
            if (!$(this).find('td:eq(0)').html().toLowerCase().match(searchWord)) {
                $(this).hide();
            }
        });
    });
}

// Suchleiste für die Fahrzeugübersicht erstellen
function showCarSearch() {
    $('#scriptCarAmount').append('<input id="scriptCarSearch" class="form-control" placeholder="Suchen" type="text"><br /><br />');

    $('#scriptCarSearch').bind('keyup', function() {
        var searchWord = new RegExp($('#scriptCarSearch').val().toLowerCase());

        $('#scriptCarAmountTable').find('tr').each(function() {
            // zunächst die Zeile wieder sichtbar machen
            $(this).show();

            // nun die Zelle prüfen, ob der Suchbegriff vorhanden ist
            if (!$(this).find('td:eq(0)').html().toLowerCase().match(searchWord)) {
                $(this).hide();
            }
        });
    });
}

// Tabs bei Einsatzliste
function tabsForMissions() {
    // Bisherige Button ausblenden
    var missionDiv,
        missionListDiv,
        scriptMissionTab,
        missionList,
        scriptTabContent,
        missionListKrankentransporteDiv,
        missionListKrankentransporte,
        missionListAllianceDiv,
        missionListAlliance,
        missionListEventsDiv,
        missionListEvents,
        missionListSicherheitswacheDiv,
        missionListSicherheitswache;

    missionDiv = $('#missions');
    missionDiv.find('.btn-group:eq(0)').hide();

    // Größe anpassen
    $('#missions-panel-body').css('height', '450px');

    // Tabs erstellen
    missionListDiv = $('#mission_list');
    missionListDiv.before('<div id="scriptMissionTab"></div>');
    scriptMissionTab = $('#scriptMissionTab');

    missionDiv.find('.panel-heading:eq(0)').append('<div id="scriptMissionMenu"><ul class="nav nav-pills small" style="padding-left:0"><li class="active"><a href="#scriptEmergencies" data-toggle="tab">NF (<span id="scriptEmergencyCounter"></span>)</a></li><li><a href="#scriptTransports" data-toggle="tab">KTP (<span id="scriptTransportCounter"></span>)</a></li><li><a href="#scriptAlliances" data-toggle="tab">VE (<span id="scriptAllianceCounter"></span>)</a></li><li><a href="#scriptEvents" data-toggle="tab">EVT (<span id="scriptEventsCounter"></span>)</a></li><li><a href="#scriptSw" data-toggle="tab">SW (<span id="scriptSWCounter"></span>)</a></li></ul></div>');
    scriptMissionTab.append('<div class="tab-content" id="scriptTabContent"></div>');

    missionList = missionListDiv.html();
    missionListDiv.remove();

    scriptTabContent = $('#scriptTabContent');
    scriptTabContent.append('<div class="tab-pane active" id="scriptEmergencies"><div id="mission_list" style="padding-left:0">' + missionList + '</div></div>');

    missionListKrankentransporteDiv = $('#mission_list_krankentransporte');
    missionListKrankentransporte = missionListKrankentransporteDiv.html();
    missionListKrankentransporteDiv.remove();
    scriptTabContent.append('<div class="tab-pane" id="scriptTransports"><div id="mission_list_krankentransporte" style="padding-left:0">' + missionListKrankentransporte + '</div></div>');

    missionListAllianceDiv = $('#mission_list_alliance');
    missionListAlliance = missionListAllianceDiv.html();
    missionListAllianceDiv.remove();
    scriptTabContent.append('<div class="tab-pane" id="scriptAlliances"><div id="mission_list_alliance" style="padding-left:0">' + missionListAlliance + '</div></div>');

    missionListEventsDiv = $('#mission_list_alliance_event');
    missionListEvents = missionListEventsDiv.html();
    missionListEventsDiv.remove();
    scriptTabContent.append('<div class="tab-pane" id="scriptEvents"><div id="mission_list_alliance_event" style="padding-left:0">' + missionListEvents + '</div></div>');

    missionListSicherheitswacheDiv = $('#mission_list_sicherheitswache');
    missionListSicherheitswache = missionListSicherheitswacheDiv.html();
    missionListSicherheitswacheDiv.remove();
    scriptTabContent.append('<div class="tab-pane" id="scriptSw"><div id="mission_list_sicherheitswache" style="padding-left:0">' + missionListSicherheitswache + '</div></div>');
    
}

// Suchleiste für Wachenliste
function showStationSearch() {
    $('#buildings').find('.panel-heading').append('<input id="scriptStationSearch" class="form-control" placeholder="Suchen" type="text">');

    $('#scriptStationSearch').bind('keyup', function() {
        var searchWord = new RegExp($('#scriptStationSearch').val().toLowerCase());

        $('#building_list').find('.map_position_mover').each(function() {
            // zunächst die Wache wieder sichtbar machen
            $(this).parent().parent().show();

            // nun den Namen prüfen, ob der Suchbegriff vorhanden ist
            if (!$(this).html().toLowerCase().match(searchWord)) {
                $(this).parent().parent().hide();
            }
        });
    });
}

// Suchleiste für Verbandschat
function showChatSearch() {
    $('#chat_outer').find('.panel-heading').append('<input id="scriptChatSearch" class="form-control" placeholder="Suchen" type="text">');

    $('#scriptChatSearch').bind('keyup', function() {
        var searchWord = new RegExp($('#scriptChatSearch').val().toLowerCase());

        $('#mission_chat_messages').find('li').each(function() {
            // zunächst die Wache wieder sichtbar machen
            $(this).show();

            // nun den Namen prüfen, ob der Suchbegriff vorhanden ist
            if (!$(this).html().toLowerCase().match(searchWord)) {
                $(this).hide();
            }
        });
    });
}

// Falls es Sprechwünsche gibt, soll der Titel des Tabs geändert werden
function changeTabTitleByCall() {
    if ($('#radio_messages_important').children().length > 0) {
        document.title = "Sprechwunsch!";
    } else {
        document.title = "LEITSTELLENSPIEL.DE - baue deine eigene Leitstelle, in deiner Stadt!";
    }
}

// Einsatzzahlen in den Einsatztabs anzeigen
function showMissionCounterInTab() {
    var missions = $('#missions');
    $('#scriptEmergencyCounter').html(missions.find('.btn-group').find('a:eq(0)').html().replace(')', '').split('(')[1]);
    $('#scriptTransportCounter').html(missions.find('.btn-group').find('a:eq(1)').html().replace(')', '').split('(')[1]);
    $('#scriptAllianceCounter').html(missions.find('.btn-group').find('a:eq(2)').html().replace(')', '').split('(')[1]);
    $('#scriptEventsCounter').html(missions.find('.btn-group').find('a:eq(3)').html().replace(')', '').split('(')[1]);
    $('#scriptSWCounter').html(missions.find('.btn-group').find('a:eq(4)').html().replace(')', '').split('(')[1]);
}

// Patienten zählen und anzeigen
function countPatients() {

    var missionList = $('#mission_list'),
        patientsAmount = missionList.find('.patient_progress:visible').length, // Patientenanzahl
        patientsTreatment = missionList.find('.patient_progress.active:visible').length, // Patienten in Behandlung
        patientsReady = missionList.find('.patient_progress').find('.bar-success').length; // Patienten transportbereit
    $('#scriptPatientsCounter').remove();
    $('#scriptMissionMenu').append('<small id="scriptPatientsCounter">Pat.: ' + patientsAmount + ' insg., ' + patientsTreatment + ' in Behandlung, ' + patientsReady + ' transpf.</small>');
}

// Fahrzeugtypen statt Name bei Klick auf Button
function showCarTypesInsteadOfStation() {
    // Button neben dem ersten "Alarmieren"-Button erstellen
    $('#missionH1').after('<button type="button" id="scriptShowCarTypes" class="btn btn-info btn-mini">Fzg.-Typen anzeigen</button>');
    $('#scriptShowCarTypes').bind('click', function() {
            $('td[vehicle_type_id]').each(function() {
                    $(this).parent().find('td:eq(2)').html(carsById[$(this).attr('vehicle_type_id')]);
                }
            );
            $('a[vehicle_type_id]').each(function() {
                    $(this).html(carsById[$(this).attr('vehicle_type_id')]);
                }
            );
        }
    );
}

// Hotkeys ohne Tastenkombination
function useEasyHotkeys() {
    $(document).on('keydown', function(e) {
        var keynum,
            hotkey;
        if (window.event) {
            keynum = e.keyCode;
        } else {
            keynum = e.which;
        }

        hotkey = String.fromCharCode(keynum).trim();

        if ($('#mission_reply_content').is(':focus')) {
            return;
        }
        if (hotkey != " " && hotkey != "") {
            $('[accesskey=' + hotkey + ']').click();
        }
    });
}

// Alte Statistiken entfernen und alles vorbereiten
function prepareStatistics() {
    $('.form-actions').hide();
    $('#scriptStatistics').remove();
    $('#scriptStatisticsLi').remove();
    $('#tabs').append('<li role="presentation" id="scriptStatisticsLi""><a data-toggle="tab" role="tab" aria-controls="scriptStatistics" href="#scriptStatistics" id="scriptStatisticsTab">Statistiken</a></li>');
    $('.tab-content').append('<div id="scriptStatistics" class="tab-pane" role="tabpanel"><table class="table table-striped table-bordered table-condensed table-hover" id="scriptStatisticTable"><thead><tr><th>Bezeichnung</th><th>Anzahl</th><th>Anteil an Personal gesamt</th><th>Anteil an Ausbildungen</th></tr></thead><tbody id="scriptStatisticTableBody"></tbody></table></div>');
}

// Statistik-Tab öffnen
function goToStatistics() {
    $('#scriptStatisticsTab').tab('show');
}

// Statistik-Tabelle erstellen
function createStatisticTableBody(personalCount, educatedPersonalCount, personal) {
    $('#scriptStatisticTableBody').append('<tr><td>Personal gesamt</td><td>' + personalCount + '</td><td class="scriptPercent">100</td><td class="scriptPercent">100</td></tr>');
    $('#scriptStatisticTableBody').append('<tr><td>Ausbildungen</td><td>' + educatedPersonalCount + '</td><td class="scriptPercent">' + Math.round(educatedPersonalCount / personalCount * 100) + '</td><td class="scriptPercent">100</td></tr>');
}

// Chart erstellen
function drawChart(personal, educatedPersonalCount, personalCount) {
    var key,
        percentPersonal,
        percentEducatedPersonal,
        personalPercentageArray = [],
        chart;
    for (key in personal) {
        percentPersonal = personal[key] === 0 ? 0 : Math.round(personal[key] / personalCount * 100);
        percentEducatedPersonal = personal[key] === 0 ? 0 : Math.round(personal[key] / educatedPersonalCount * 100);
        $('#scriptStatisticTableBody').append('<tr><td>' + educationNames[key] + '</td><td>' + personal[key] + '</td><td class="scriptPercent">' + percentPersonal + '</td><td class="scriptPercent">' + percentEducatedPersonal + '</td></tr>');
        personalPercentageArray.push({
            y: percentEducatedPersonal,
            indexLabel: percentEducatedPersonal + '% ' + educationNames[key],
            legendText: educationNames[key] + ': ' + personal[key]
        });
    }

    $('#scriptStatistics').append('<p><b>Personal gesamt:</b> Alle Personen, deren Wache(n) zum Zeitpunkt der Erstellung der Statistik geladen war(en).</p><p><b>Ausbildungen:</b> Alle Ausbildungen. Hat eine Person zwei Ausbildungen, so werden beide einzeln gezählt.</p>');
    $('#scriptStatistics').append('<div id="chartContainer" style="height: 400px;"></div>');

    chart = new CanvasJS.Chart('chartContainer', {
        title: {
            'text': 'Lehrgangsverteilung'
        },
        legend: {
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
        },
        data: [
            {
                type: 'doughnut',
                showInLegend: true,
                dataPoints: personalPercentageArray
            }
        ]
    });
    chart.render();
    $('#scriptStatistics').append('<div><p>Bezieht sich auf die gesamte Lehrgangszahl von ' + educatedPersonalCount + ' Lehrgängen.</p></div>');
    goToStatistics();
}

// Diagramme und Zahlen in der Schule anzeigen
function showSchoolStatistic() {
    prepareStatistics();
    var schoolKey = $('#education_0').attr('education_key'),
        personalCount = $('input[type="checkbox"]').length,
        educatedPersonalCount = 0,
        personal = {};

    educatedPersonalCount = $('input[type="checkbox"][wechsellader="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][thw_zugtrupp="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][thw_raumen="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][police_fukw="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][police_einsatzleiter="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][notarzt="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][lna="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][orgl="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][gw_messtechnik="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][gw_hoehenrettung="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][gw_gefahrgut="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][elw2="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][fwk="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][seg_gw_san="true"]').length;
    educatedPersonalCount += $('input[type="checkbox"][seg_elw="true"]').length;

    switch (schoolKey) {
    case 'gw_messtechnik':
        // Feuerwehr
        personal = {
            'wechsellader': 0,
            'gw_messtechnik': 0,
            'gw_hoehenrettung': 0,
            'gw_gefahrgut': 0,
            'elw2': 0,
            'dekon_p': 0,
            'fwk': 0
        };
        break;
    case 'notarzt':
        // Rettungsdienst
        personal = {
            'notarzt': 0,
            'lna': 0,
            'orgl': 0,
            'seg_gw_san': 0,
            'seg_elw': 0
        };
        break;
    case 'police_einsatzleiter':
        // Polizei
        personal = {
            'police_einsatzleiter': 0,
            'police_fukw': 0
        };
        break;
    case 'thw_zugtrupp':
        //THW
        personal = {
            'thw_zugtrupp': 0,
            'thw_raumen': 0
        };
        break;
    }

    $('input[type="checkbox"]').each(function(index, element) {
        var value;
        for (value in personal) {
            if ($(this).attr(value) == 'true') {
                personal[value]++;
            }
        }
    });

    createStatisticTableBody(personalCount, educatedPersonalCount, personal);
    drawChart(personal, educatedPersonalCount, personalCount);
}

// Diagramme und Zahlen für eine einzelne Wache in der Schule anzeigen
function showStationSchoolStatistic(stationId) {
    prepareStatistics();
    var schoolKey = $('#education_0').attr('education_key'),
        personalCount = $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"]').length,
        educatedPersonalCount = 0,
        personal = {};

    educatedPersonalCount = $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][wechsellader="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][thw_zugtrupp="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][thw_raumen="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][police_fukw="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][police_einsatzleiter="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][notarzt="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][lna="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][orgl="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][gw_messtechnik="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][gw_hoehenrettung="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][gw_gefahrgut="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][elw2="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][fwk="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][seg_elw="true"]').length;
    educatedPersonalCount += $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"][seg_gw_san="true"]').length;


    switch (schoolKey) {
    case 'gw_messtechnik':
        // Feuerwehr
        personal = {
            'wechsellader': 0,
            'gw_messtechnik': 0,
            'gw_hoehenrettung': 0,
            'gw_gefahrgut': 0,
            'elw2': 0,
            'dekon_p': 0,
            'fwk': 0
        };
        break;
    case 'notarzt':
        // Rettungsdienst
        personal = {
            'notarzt': 0,
            'lna': 0,
            'orgl': 0,
            'seg_gw_san': 0,
            'seg_elw': 0
        };
        break;
    case 'police_einsatzleiter':
        // Polizei
        personal = {
            'police_einsatzleiter': 0,
            'police_fukw': 0
        };
        break;
    case 'thw_zugtrupp':
        //THW
        personal = {
            'thw_zugtrupp': 0,
            'thw_raumen': 0
        };
        break;
    }

    $('.panel-body[building_id="' + stationId + '"] input[type="checkbox"]').each(function(index, element) {
        var value;
        for (value in personal) {
            if ($(this).attr(value) == 'true') {
                personal[value]++;
            }
        }
    });

    createStatisticTableBody(personalCount, educatedPersonalCount, personal);
    drawChart(personal, educatedPersonalCount, personalCount);
}

// Funktion wird immer angerufen, wenn ein Event von faye komm (bspw. Statuswechsel, neuer Einsatz etc.)
function fayeEvent() {
    if (settings.carStationCounter) {
        prepareBuildingAndCarCounter();
        showBuildingSearch();
        showCarSearch();
        showBuildingAmount();
        showCarAmount();
    }
    if (settings.changeTabTitle) {
        changeTabTitleByCall();
    }
    if (settings.missionTabs) {
        showMissionCounterInTab();
    }
    if (settings.showPatients) {
        countPatients();
    }
}

// Fallunterscheidung für die verschiedenen Seiten
if (window.location.pathname == '/') {
    // Startseite
    if (settings.missionTabs) {
        tabsForMissions();
    }
    fayeEvent();
    if (settings.searchFields) {
        showStationSearch();
        showChatSearch();
    }

    // Faye dazu anweisen, die Funktion fayeEvent aufzurufen
    faye.subscribe('/private-user' + user_id + 'de', function() {
        fayeEvent();
    });
    if (alliance_id != undefined) {
        faye.subscribe('/private-alliance-' + alliance_id + 'de', function() {
            fayeEvent();
        });
    }
    $('#btn-alliance-new-mission').css('margin-bottom', '0');
} else if (window.location.pathname.match(/missions\//)) {
    // Einsätze
    if (settings.simpleHotkeys) {
        showCarTypesInsteadOfStation();
        useEasyHotkeys();
    }

    // AAO bei Klick umranden
    if (settings.showBorderInAao) {
        $('.aao').bind('click', function() {
                if (!settings.nightDesign) {
                    $(this).css('border', '2px solid black');
                } else {
                    $(this).css('border', '2px solid white');
                }
            }
        );
        $('.vehicle_group').bind('click', function() {
                if (!settings.nightDesign) {
                    $(this).css('border', '2px solid black');
                } else {
                    $(this).css('border', '2px solid white');
                }
            }
        );
    }
} else if (window.location.pathname.match(/buildings\//)) {
    //Schule
    if (settings.schoolStatistic) {
        if ($('#education_0').length > 0) {
            $('[name="commit"]:last').after(' <button type="button" class="btn btn-primary" id="scriptLoadStationsButton">Alle Wachen laden (evtl. langsam)</button>');
            $('#scriptLoadStationsButton').bind('click', function() {
                $('.personal-select-heading').click();
                $('.personal-select-heading').each(function() {
                    $(this).append(' <button type="button" class="btn btn-primary showStationStatistic" data-building_id="' + $(this).attr('building_id') + '">Wachenstatistik anzeigen</button>');
                });
                $('.showStationStatistic').bind('click', function() {
                    showStationSchoolStatistic($(this).attr('data-building_id'));
                });
                $(this).after(' <button type="button" class="btn btn-primary" id="scriptShowStatistics">Statistiken anzeigen</button>');
                $('#scriptShowStatistics').bind('click', function() {
                    showSchoolStatistic();
                });
                $(this).remove();
            });
        }
    }

    // Leitstelle
    if ($('[data-toggle="tab"]:eq(0)').html() == 'Gebäude') {
        showSettings();
    }
}

// Nacht-Design
if (settings.nightDesign) {
    var styleElement = document.createElement("link");
    styleElement.rel = "stylesheet";
    styleElement.href = "http://lss.eagledev.de/ASL/theme.min.css";
    document.getElementsByTagName('head')[0].appendChild(styleElement);
}
