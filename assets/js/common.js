$(document).ready(function(){const o=$(".shooter");if(o.length){let a=!1;$("body").css("cursor","crosshair"),o.on("mousedown pointerdown",function(o){o.preventDefault(),o.stopPropagation(),console.log("clicked shooter"),a=!a,$("body").toggleClass("ar")});const c={x:o.width()/2,y:o.height()/4};$(document).on("pointerdown",function(t){const e={x:t.pageX,y:t.pageY},n=Math.atan2(e.y-o.offset().top-c.y,e.x-o.offset().left-c.x);o.css("transform","rotate("+n+"rad)")});let f,i=[],l=0,p=0;function t(o){for(let t=0;t<10;t++){const t=$('<i class="fa-solid fa-bullseye target"></i>');t.css("left",o?o.left:Math.random()*(window.innerWidth-32)),t.css("top",o?o.top:Math.random()*($(document).height()-32)),o=null,$("body").append(t),i.push(t)}p+=10}function e(){f=$('<div class="scoreboard"></div>'),$("body").append(f),n()}function n(){f.text("Score: "+l+"/"+p)}function s(e){const s=$('<div class="bullet"></div>');s.css("left",o.offset().left+c.x),s.css("top",o.offset().top+c.y),$("body").append(s);const a=Math.sqrt(Math.pow(e.x-(o.offset().left+c.x),2)+Math.pow(e.y-(o.offset().top+c.y),2));s.animate({left:e.x,top:e.y},a,function(){s.remove();for(let o=0;o<i.length;o++){const t=i[o],s=t.offset(),a={x:t.width()/2,y:t.height()/2};if(Math.sqrt(Math.pow(s.left+a.x-e.x,2)+Math.pow(s.top+a.y-e.y,2))<20){t.remove(),i.splice(o,1),l++,n();break}}0===i.length&&t()})}$(document).on("mousedown pointerdown",function(o){const n={x:o.pageX,y:o.pageY};if(0===p&&t({left:n.x,top:n.y}),f||e(),a){let o=n;function c(t){o={x:t.pageX,y:t.pageY}}$(document).on("mousemove pointermove",c);const t=setInterval(()=>{s(o)},100);$(document).one("mouseup pointerup",function(){clearInterval(t),$(document).off("mousemove pointermove",c)})}else s(n)})}});