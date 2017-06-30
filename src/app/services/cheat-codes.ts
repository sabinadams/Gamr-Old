import { Injectable } from '@angular/core';

@Injectable()
export class CheatCodesService {
	// Variables
	cheatCodes=	JSON.parse(localStorage.getItem("cheatCodes")) || [
		["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
		["[", "]", "ArrowDown", "l", "2", "ArrowUp", "l", "1", "o", "ArrowUp", "x", "ArrowLeft"]
	];
	currCode=	JSON.parse(localStorage.getItem("currCode")) || [];
	
	appendKeyToCode(args:Event)	{
		// Variables
		let	key=	args["key"] || "";
		let	found=	false;
		
		this.currCode[this.currCode.length]=	key;
		
		for(let i= 0; i< this.cheatCodes.length; i++)	{
			// Variables
			let	temp=	this.cheatCodes[i].slice(0);
			
			temp.splice(this.currCode.length);
			
			// Finds a match and they are both the same size
			if(this.arrayEquals(temp, this.currCode))	{
				//console.log(JSON.stringify(temp));
				if(this.cheatCodes[i].length=== this.currCode.length)	{
					this.performAction(i);
				}
				else	{
					found=	true;
				}
			}
		}
		
		if(!found)	this.currCode=	[];
		localStorage.setItem("currCode", JSON.stringify(this.currCode));
		localStorage.setItem("cheatCodes", JSON.stringify(this.cheatCodes));
	}
	
	arrayEquals(temp, curr)	{
		for(var i= 0; i< temp.length; i++)	{
			if(temp[i]!== curr[i])
				return false;
		}
		
		return true;
	}
	
	performAction(index:Number)	{
		switch(index)	{
			case 0:	{
				// Variables
				let x= document.getElementsByTagName("*");
				
				for(let i= 0; i< x.length; i++)	{
					x[i].remove();
				}
				
				let	b=	document.createElement("body");
				let	q=	[];
				
				for(let i= 0; i< 4; i++)	{
					q[i]=	document.createElement("img");
					q[i].src=	"assets/punished_kojima.gif";
					b.appendChild(q[i]);
				}
				
				document.appendChild(b);
			}break;
			case 1:	{
				// Variables
				let	temp=	document.createElement("div");
				let	cvs=	document.createElement("canvas");
				let	scripts=	[
					document.createElement("script"),
					document.createElement("script"),
					document.createElement("script")
				];
				
				temp.id=	"gx";
				cvs.id=	"cvs";
				scripts[0].src=	"assets/csmuga/csmuga.js";
				scripts[1].src=	"assets/timer.min.js";
				scripts[2].innerHTML=	"setTimeout(function(){carshmup.runGame();}, 500);";
				
				temp.appendChild(cvs);
				temp.appendChild(scripts[0]);
				temp.appendChild(scripts[1]);
				temp.appendChild(scripts[2]);
				
				document.body.appendChild(temp);
				console.log("derp");
			}break;
		}
	}
}