import { Directive, ElementRef, Input } from "@angular/core";
import { ExpCalcPipe } from "../pipes/exp-calc-pipe";

@Directive({
	selector: "[exp]"
})
export class ExpDirective	{
	user= JSON.parse(localStorage.getItem("user"));
	
	constructor(elem: ElementRef)	{
		// Variables
		var	calcExp=	new ExpCalcPipe();
		var	piechart=	document.createElement("div");
		var	ppcprogress=	document.createElement("div");
		var	ppcprogressfill=	document.createElement("div");
		var	ppcpercents=	document.createElement("div");
		var	ppcpercentswraper=	document.createElement("div");
		var imgresponsive=	document.createElement("img");
		
		// Pie chart
		piechart.classList.add("progress-pie-chart");
		piechart.setAttribute("data-percent", calcExp.getPerc(this.user.exp_count).toString());
		
		// ppc-progress
		ppcprogress.classList.add("ppc-progress");
		
		// ppc-progress-fill
		ppcprogressfill.classList.add("ppc-progress-fill");
		
		// ppc-percents
		ppcpercents.classList.add("ppc-percents");
		
		// ppc-percents-wrapper
		ppcpercentswraper.classList.add("ppc-percents-wrapper");
		
		// img-responsive
		imgresponsive.classList.add("img-responsive");
		imgresponsive.src=	this.user.profile_pic;
		imgresponsive.style.width= "104px";
		imgresponsive.style.height= "104px";
		
		ppcpercentswraper.appendChild(imgresponsive);
		ppcprogress.appendChild(ppcprogressfill);
		ppcpercents.appendChild(ppcpercentswraper);
		piechart.appendChild(ppcprogress);
		piechart.appendChild(ppcpercents);
		elem.nativeElement.appendChild(piechart);
	}
}