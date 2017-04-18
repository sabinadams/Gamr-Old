//Component Imports
import { AppComponent } from '../app.component';
import { TimelineComponent } from '../components/timeline/timeline';
import { ProfileSidePanelComponent } from '../components/profile-side-panel/profile-side-panel';
import { TimelinePostComponent } from '../components/timeline/timeline-post/timeline-post';
import { NavbarComponent } from '../components/navbar/navbar';
import { TimelineCommentComponent } from '../components/timeline/timeline-comment/timeline-comment';
import { TimelineReplyComponent } from '../components/timeline/timeline-reply/timeline-reply';

export class Components {
	constructor(){}
	
	getComponents(){
		return [
			AppComponent,
			NavbarComponent,
			TimelineComponent,
			TimelinePostComponent,
			TimelineCommentComponent,
			TimelineReplyComponent,
			ProfileSidePanelComponent
		];	
	}
}