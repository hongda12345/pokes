/*
* @Author: 宏达
* @Date:   2017-10-17 16:51:37
* @Last Modified by:   宏达
* @Last Modified time: 2017-10-18 15:48:48
*/
$(function(){
	let color=['c','d','h','s'];/*c梅花 s黑桃 d方片 h红桃*/
	let poke=[];
	let flag={};
	let btnR=$('div.btnR');
	let btnL=$('div.btnL');
	// for(let i=0;i<52;i++){
	// 	let num=Math.floor(Math.random()*13+1);
	// 	let hua=color[Math.floor(Math.random()*color.length)];
	// 	while(flag[`${hua}_${num}`]){
	// 		num=Math.floor(Math.random()*13+1);
	// 	    hua=color[Math.floor(Math.random()*color.length)];       
	// 	}
	// 	poke.push({hua,num});
	// 	flag[`${hua}_${num}`]=true;
	// }
	while(poke.length<52){
		let num=Math.floor(Math.random()*13+1);
		let hua=color[Math.floor(Math.random()*color.length)];
		if(!flag[`${hua}_${num}`]){
		   poke.push({hua,num});
		   flag[`${hua}_${num}`]=true;   
		}		
	}
	let index=0;
	for(let i=0;i<7;i++){
		for(let j=0;j<=i;j++){
			let left=300-50*i+100*j+5;
			let top=50*i;
			index++;
			$('<div>').addClass('poke').attr('id',`${i}_${j}`).data('num',poke[index].num).css('background-image',`url(img/${poke[index].num}${poke[index].hua}.png)`).appendTo('.desk').delay(index*10).animate({left,top,opacity:1})
		}
	}
	for(;index<poke.length;index++){
		$('<div>').addClass('poke zuo').attr('id',`${-5}_${-5}`).data('num',poke[index].num).css('background-image',`url(img/${poke[index].num}${poke[index].hua}.png)`).appendTo('.desk').delay(index*10).animate({left:150,top:460,opacity:1})
	}
	console.log(poke)

	let first=null;

	$('.desk').on('click','.poke',function(e){
        let element=$(e.target);
        let ids=element.attr('id').split('_');
        let ele1=`#${ids[0]*1+1}_${ids[1]*1}`;
        let ele2=`#${ids[0]*1+1}_${ids[1]*1+1}`;
        if($(ele1).length||$(ele2).length){
        	return;
        }
        element.toggleClass('active');
        if(element.hasClass('active')){
        	element.animate({top:'-=20'});
        }else{
        	element.animate({top:'+=20'});
        }
        
        if(!first){
        	first=$(e.target);
        }else{
        	if(first.data('num')+element.data('num')==14){
        		$('.active').animate({top:0,left:800,opacity:0},function(){
        			$(this).remove();
        		})
        	}else{
        		$('.active').animate({top:'+=20'},function(){
        			$(this).removeClass('active')
        		})
        	}
        	first=null;
        }
    })
    let zindex=0;
    btnR.on('click',function(){
    	$('.zuo').last().css('zIndex',zindex++).animate({top:460,left:605}).removeClass('zuo').addClass('you');
    })
    btnL.on('click',function(){
    	if(!$('.you').length){
    		return;
    	}
    	$('.you').each(function(index){
            $(this).css('zIndex',zindex++).delay(index*100).animate({top:460,left:150}).removeClass('you').addClass('zuo');
    	})
    })
    


})