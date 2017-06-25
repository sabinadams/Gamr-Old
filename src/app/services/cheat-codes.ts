import { Injectable } from '@angular/core';

@Injectable()
export class CheatCodesService {
	// Variables
	cheatCodes=	JSON.parse(localStorage.getItem("cheatCodes")) || [
		["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
		["ArrowLeft", "ArrowRight", "ArrowDown", "a", "a", "b"],
		["f", "e", "g", "1", "1", "3"]
	];
	currCode=	JSON.parse(localStorage.getItem("currCode")) || [];
	
	transform(args:Event)	{
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
				console.log(JSON.stringify(temp));
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
				// Hackerman
				console.log("flerp");
			}break;
			case 1:	{
				console.log("ASDASDA");
			}break;
			case 2:	{
				console.log("ASDASDFADSFWQEGWRG@#@$EVER E T$%#T@");
			}break;
		}
	}
}