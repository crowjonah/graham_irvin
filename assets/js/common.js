$(document).ready(function(){const t=$(".shooter"),o=["pistol","ar","shotgun"];if(t.length){let r=0;$("body").css("cursor","crosshair");let h,f={x:t.width()/2,y:t.height()/4},p=[],m=0,u=0;function e(t){for(let o=0;o<3;o++){const o=2;u+=o;const e=$('<i class="fa-solid target grahamer mini" data-point-value="'+o+'"></i>');e.css("left",t.x-32),e.css("top",t.y-32),$("body").append(e),p.push(e),s(e)}}function a(t){for(let o=0;o<5;o++){const o=1;u+=o;const e=$('<i class="fa-solid target grahamer micro" data-point-value="'+o+'"></i>');e.css("left",t.x-16),e.css("top",t.y-16),$("body").append(e),p.push(e),i(e)}}function n(t){if(m<10){const o=10;console.log("creating level 1",m,u,o),u+=o;for(let e=0;e<o;e++){const o=$('<i class="fa-solid fa-bullseye target" data-point-value="'+1+'"></i>');o.css("left",t?t.left:Math.random()*(window.innerWidth-32)),o.css("top",t?t.top:Math.random()*($(document).height()-32)),t=null,$("body").append(o),p.push(o)}}else if(m<20){const t=3,o=15,e=t*o;console.log("creating level 2",m,u,e),u+=e;for(let e=0;e<o;e++){const o=$('<i class="fa-solid fa-bullseye target" data-point-value="'+t+'"></i>');o.css("left",Math.random()*(window.innerWidth-32)),o.css("top",Math.random()*($(document).height()-32)),$("body").append(o),p.push(o),s(o)}}else if(m<30){const t=5,o=t*15;console.log("creating level 3",m,u,o),u+=o;for(let o=0;o<15;o++){const o=$('<i class="fa-solid grahamer target" data-point-value="'+t+'"></i>');o.css("left",Math.random()*(window.innerWidth-64)),o.css("top",Math.random()*($(document).height()-32)),$("body").append(o),p.push(o),i(o)}}else if(m<45){const t=10;console.log("creating level 4",m,u,t),u+=t;const o=$('<i class="fa-solid grahamer target mega" data-point-value="'+t+'" data-sensitivity="64"></i>');o.css("left",Math.random()*(window.innerWidth-64)),o.css("top",Math.random()*($(document).height()-32)),$("body").append(o),p.push(o);let e=10*Math.random()+5,a=Math.random()*Math.PI*2,n={x:Math.cos(a),y:Math.sin(a)};const s=o.position(),i=setInterval(()=>{Math.random()<.1&&(e=10*Math.random()+5,a=Math.random()*Math.PI*2,n={x:Math.cos(a),y:Math.sin(a)}),s.left+=n.x*e,s.top+=n.y*e,(s.left<0||s.left>window.innerWidth-64)&&(n.x*=-1),(s.top<0||s.top>$(document).height()-32)&&(n.y*=-1),o.css("left",s.left),o.css("top",s.top)},100);o.data("interval",i)}}function s(t){const o=10*Math.random()+5,e=Math.random()*Math.PI*2,a={x:Math.cos(e),y:Math.sin(e)},n=t.position(),s=setInterval(()=>{n.left+=a.x*o,n.top+=a.y*o,(n.left<0||n.left>window.innerWidth-32)&&(a.x*=-1),(n.top<0||n.top>$(document).height()-32)&&(a.y*=-1),t.css("left",n.left),t.css("top",n.top)},100);t.data("interval",s)}function i(t){let o=10*Math.random()+5,e=Math.random()*Math.PI*2,a={x:Math.cos(e),y:Math.sin(e)};const n=t.position(),s=setInterval(()=>{Math.random()<.1&&(o=10*Math.random()+5,e=Math.random()*Math.PI*2,a={x:Math.cos(e),y:Math.sin(e)}),n.left+=a.x*o,n.top+=a.y*o,(n.left<0||n.left>window.innerWidth-64)&&(a.x*=-1),(n.top<0||n.top>$(document).height()-32)&&(a.y*=-1),t.css("left",n.left),t.css("top",n.top)},100);t.data("interval",s)}function l(){h=$('<div class="scoreboard"></div>'),$("body").append(h),c()}function c(){h.text("Score: "+m+"/"+u)}function d(o){const s=$('<div class="bullet"></div>');s.css("left",t.offset().left+f.x),s.css("top",t.offset().top+f.y),$("body").append(s);const i=Math.sqrt(Math.pow(o.x-(t.offset().left+f.x),2)+Math.pow(o.y-(t.offset().top+f.y),2));s.animate({left:o.x,top:o.y},i,"linear",function(){s.remove();for(let t=0;t<p.length;t++){const n=p[t],s=parseInt(n.attr("data-sensitivity"))||20,i=n.offset(),l={x:n.width()/2,y:n.height()/2};if(Math.sqrt(Math.pow(i.left+l.x-o.x,2)+Math.pow(i.top+l.y-o.y,2))<s){const s=parseInt(n.attr("data-point-value"))||1;console.log("hit target with point value",s);const i=n.hasClass("mega"),l=n.hasClass("mini");n.remove(),p.splice(t,1),m+=s,c(),i?e(o):l&&a(o);break}}0===p.length&&n()})}t.on("mousedown pointerdown",function(e){e.preventDefault(),e.stopPropagation(),r=(r+1)%o.length,o.forEach((t,o)=>{o===r?$("body").addClass(t):$("body").removeClass(t)}),f=["ar","shotgun"].includes(o[r])?{x:t.width()/2,y:t.height()/2.1}:{x:t.width()/2,y:t.height()/4}}),$(document).on("pointerdown mousemove",function(o){const e={x:o.pageX,y:o.pageY},a=Math.atan2(e.y-t.offset().top-f.y,e.x-t.offset().left-f.x);e.x>t.offset().left+f.x?t.css("transform","rotate("+a+"rad)"):t.css("transform","rotate("+(a+Math.PI)+"rad) scaleX(-1)")}),$(document).on("mousedown pointerdown",function(t){const e={x:t.pageX,y:t.pageY};if(0===u&&n({left:e.x,top:e.y}),h||l(),"ar"===o[r]){let t=e;function a(o){t={x:o.pageX,y:o.pageY}}$(document).on("mousemove pointermove",a);const o=setInterval(()=>{d(t)},100);$(document).one("mouseup pointerup",function(){clearInterval(o),$(document).off("mousemove pointermove",a)})}else if("shotgun"===o[r])for(let t=0;t<5;t++)d({x:e.x+100*Math.random()-50,y:e.y+100*Math.random()-50});else d(e)})}});