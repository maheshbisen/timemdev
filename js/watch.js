// JavaScript Document

function Clock_dg(prop) {
    var angle = 360/60,
        date = new Date();
        var hwatch = date.getHours();
        if(hwatch > 12) {
            hwatch = hwatch - 12;
        }

        hourwatch = hwatch;
        minutewatch = date.getMinutes(),
        secondwatch = date.getSeconds(),
        hourAngle = (360/12) * hourwatch + (360/(12*60)) * minutewatch;

        $('#minuteWatch')[0].style[prop] = 'rotate('+angle * minutewatch+'deg)';
        $('#secondWatch')[0].style[prop] = 'rotate('+angle * secondwatch+'deg)';
        $('#hourWatch')[0].style[prop] = 'rotate('+hourAngle+'deg)';
}
$(function(){        
    var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
        prop,
        el = document.createElement('div');

    for(var i = 0, l = props.length; i < l; i++) {
        if(typeof el.style[props[i]] !== "undefined") {
            prop = props[i];
            break;
        }
    }
    setInterval(function(){
        Clock_dg(prop)
    },100);
});
