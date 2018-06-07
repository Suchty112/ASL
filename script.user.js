// ==UserScript==
// @name        Allgemeines Script für Leitstellenspiel
// @namespace   Leitstellenspiel
// @include     https://www.leitstellenspiel.de/*
// @version     dev
// @author      Eagle/Sanni
// @grant       none
// ==/UserScript==

var scriptElement = document.createElement("script");
scriptElement.type = "text/javascript";
scriptElement.src = "https://asl.lss-m.de/script.dev.js";
document.body.appendChild(scriptElement);
