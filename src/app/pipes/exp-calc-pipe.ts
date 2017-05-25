
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'calcExp'})
export class ExpCalcPipe implements PipeTransform {
	
  transform( exp: number = 125, type: string = 'curr' ): any {
		switch( type ) {
			case "curr": return Math.round(exp).toString();
			case "next":
				return exp == this.getNextXP( this.getLevel( exp ) ) 
				? this.getNextXP( this.getLevel( exp ) + 1 )
				: this.getNextXP( this.getLevel( exp ) );
			case "getLevel":	
				return exp == this.getNextXP( this.getLevel( exp ) )
				? ( this.getLevel( exp ) + 1 ).toLocaleString()
				: this.getLevel( exp ).toLocaleString();
			case "getPerc":
				let	past = this.getNextXP( this.getLevel( exp ) - 1 );
				let	perc = Math.trunc( 100 * ( ( exp - past ) / ( this.getNextXP( this.getLevel( exp ) ) - past ) ) );
				return perc == 100 ? "0" : perc.toString();
		}
  }
  
  getNextXP( lvl: number ): number {
	return Math.trunc( Math.pow( lvl + 1, 3 ) + Math.pow( lvl/2, 3) );
  }
  
  getLevel( xp: number ): number {
	return Math.trunc( Math.pow( xp, 1/3 ) );
  }

}