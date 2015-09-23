// JavaScript Document
$(document).ready(function () {
	$('<div/>', {
	'class' : 'extraPerson', html: GetHtml()
	}).appendTo('#container');
	
	$('#addRow').click(function () {
	$('<div/>', {
	'class' : 'extraPerson', html: GetHtml()
	}).hide().appendTo('#container').slideDown('slow');
	
	});
	})
	$("input::-webkit-input-placeholder").css({"color" : "#b2cde0"});
	
	

//toggle

function toggleDialog(transition) {
var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
dialog.toggle();
}
