
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'calcExp'})
export class ExpCalcPipe implements PipeTransform {
	dummy_xp=	2000;
	
  transform(exp: number, type: string): string	{
	  exp=	this.dummy_xp;
	  console.log(Math.trunc(100*(exp/this.getNextXP(this.getLevel(exp)))).toString());
	  switch(type)	{
		  case "curr":	return exp.toString();
		  case "next":	return this.getNextXP(this.getLevel(exp)).toString();
		  case "getLevel":	return this.getLevel(exp).toString();
		  case "getPerc":	return Math.trunc(100*(exp/this.getNextXP(this.getLevel(exp)))).toString();
	  }
	  return this.dummy_xp.toString();
  }
  
  getNextXP(lvl:number):number	{
	  return Math.trunc(Math.pow(lvl+1, 3));
  }
  
  getLevel(xp:number):number	{
	  return Math.trunc(Math.pow(xp, 1/3));
  }
}