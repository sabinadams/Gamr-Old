
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'calcExp'})
export class ExpCalcPipe implements PipeTransform {
	
  transform( exp: number = 125, type: string = 'curr' ): string {
		switch( type ) {
			case "curr": return exp.toLocaleString();
			case "next":
				return exp == this.getNextXP( this.getLevel( exp ) ) 
				? this.getNextXP( this.getLevel( exp ) + 1 ).toLocaleString()
				: this.getNextXP( this.getLevel( exp ) ).toLocaleString();
			case "getLevel":	
				return exp == this.getNextXP( this.getLevel( exp ) )
				? ( this.getLevel( exp ) + 1 ).toLocaleString()
				: this.getLevel( exp ).toLocaleString();
			case "getPerc":
				return this.getPerc(exp).toString();
		}
  }
	
	getPerc(xp:number): number	{
				let	past = this.getNextXP( this.getLevel( xp ) - 1 );
				let	perc = Math.trunc( 100 * ( ( xp - past ) / ( this.getNextXP( this.getLevel( xp ) ) - past ) ) );
				return perc == 100 ? 0 : perc;
	}
  
  getNextXP( lvl: number ): number {
	return Math.trunc( Math.pow( lvl + 1, 3 ) );
  }
  
  getLevel( xp: number ): number {
	return Math.trunc( Math.cbrt( xp ) );
  }

}