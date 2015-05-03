// ==UserScript==
// @name        Allgemeines Script für Leitstellenspiel NEU
// @namespace   Leitstellenspiel
// @include     http://www.leitstellenspiel.de/*
// @version     dev
// @author		Eagle
// ==/UserScript==

var scriptElement = document.createElement( "script" );
scriptElement.type = "text/javascript";
scriptElement.src = "http://lstspiel.kilu.de/js/jqueryCookie.js";
document.body.appendChild(scriptElement);

var scriptElement = document.createElement( "script" );
scriptElement.type = "text/javascript";
scriptElement.src = "http://test/script.dev.js";
document.body.appendChild(scriptElement);