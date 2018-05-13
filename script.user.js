// ==UserScript==
// @name        Allgemeines Script für Leitstellenspiel NEU
// @namespace   Leitstellenspiel
// @include     http*://www.leitstellenspiel.de/*
// @version     dev
// @author      Eagle/Sanni
// @grant       none
// ==/UserScript==

var scriptElement = document.createElement("script");
scriptElement.type = "text/javascript";
scriptElement.src = "https://raw.githubusercontent.com/Suchty112/ASL/master/script.dev.js";
document.body.appendChild(scriptElement);
