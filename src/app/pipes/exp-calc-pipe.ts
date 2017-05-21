
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'calcExp'})
export class ExpCalcPipe implements PipeTransform {
	
  transform( exp: number = 125, type: string = 'curr' ): string {
		switch( type ) {
			case "curr": return exp.toString();
			case "next":
				return exp == this.getNextXP( this.getLevel( exp ) ) 
				? this.getNextXP( this.getLevel( exp ) + 1 ).toLocaleString()
				: this.getNextXP( this.getLevel( exp ) ).toLocaleString();
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
	return Math.trunc( Math.pow( lvl + 1, 3 ) );
  }
  
  getLevel( xp: number ): number {
	return Math.trunc( Math.pow( xp, 1/3 ) );
  }

}