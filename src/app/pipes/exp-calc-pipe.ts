
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'calcExp'})
export class ExpCalcPipe implements PipeTransform {
	dummy_xp=	125;
	
  transform(exp: number, type: string): string	{
		if(!exp)
			exp=	this.dummy_xp;
		switch(type)	{
			case "curr":	return exp.toString();
			case "next":
				if(exp=== this.getNextXP(this.getLevel(exp)))
					return this.getNextXP(this.getLevel(exp)+1).toLocaleString();
				return this.getNextXP(this.getLevel(exp)).toLocaleString();
			case "getLevel":	
				if(exp=== this.getNextXP(this.getLevel(exp)))
					return (this.getLevel(exp)+1).toLocaleString();
				return this.getLevel(exp).toLocaleString();
			case "getPerc":
				var	past=	this.getNextXP(this.getLevel(exp)-1);
				var	perc=	Math.trunc(100*((exp-past)/(this.getNextXP(this.getLevel(exp))-past)));
				
				if(perc=== 100)
					return "0";
				return perc.toString();
		}
  }
  
  getNextXP(lvl:number):number	{
	  return Math.trunc(Math.pow(lvl+1, 3));
  }
  
  getLevel(xp:number):number	{
	  return Math.trunc(Math.pow(xp, 1/3));
  }
}