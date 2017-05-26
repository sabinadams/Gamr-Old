import { Component } from '@angular/core';

@Component({
  selector: 'chatbar',
  templateUrl: './chatbar.html',
  styleUrls: ['./chatbar.scss'],
})
export class ChatbarComponent {
  public itemStringsLeft: any[] = [
    { id: 4, chat: 'test chat', online: true,  image: 'https://pickaface.net/assets/images/slides/slide2.png' },
    { id: 5, chat: 'test chat', online: false,  image: 'http://www.sauditenders.com/images/testimonial/2.png' },
    { id: 6, chat: 'test chat', online: true,  image: 'https://s-media-cache-ak0.pinimg.com/736x/9e/57/8b/9e578b47678afbfd98ea369302875f55.jpg' },
    { id: 6, chat: 'test chat', online: false,  image: 'https://www.meine-erste-homepage.com/avatars24.png' },
    { id: 6, chat: 'test chat', online: true,  image: 'https://pickaface.net/assets/images/slides/slide1.png' },
    { id: 6, chat: 'test chat', online: true,  image: 'https://s-media-cache-ak0.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4.jpg' },
    { id: 6, chat: 'test chat', online: true,  image: 'https://s-media-cache-ak0.pinimg.com/736x/75/4d/03/754d0364c133ac10e222c161f292775f.jpg' },
    { id: 6, chat: 'test chat', online: false,  image: 'https://s-media-cache-ak0.pinimg.com/originals/3f/46/19/3f4619c448f05e89fa91576e33033f5c.png' },
    { id: 6, chat: 'test chat', online: false,  image: 'https://s-media-cache-ak0.pinimg.com/736x/12/95/85/1295853ea2e3724a42ef18d4b54d9e44.jpg' }
  ];
  public itemStringsRight: any[] = [
    { id: 4, chat: 'test chat', online: true,  image: 'https://cartasciganas.com/images/users/avatars/xsvgA6762958003294491.png.pagespeed.ic.3Dh0zM-Ua4.jpg' },
    { id: 5, chat: 'test chat', online: false,  image: 'https://lh3.googleusercontent.com/MQuIMHtTAddUJy0Z-xASHSQiH84-Qrd4hLQIDZt_dh2nsYBYlnKSck19DX8wH-5PnGqC=w300' },
    { id: 6, chat: 'test chat', online: true,  image: 'http://www.planetcreation.co.uk/createpic/my-avatar.JPG' },
    { id: 6, chat: 'test chat', online: false,  image: 'http://i.imgur.com/EPnS7VS.png' },
    { id: 6, chat: 'test chat', online: true,  image: 'http://i1383.photobucket.com/albums/ah285/thesaotaku/Netnaz_zpswckzxvaw.png' },
    { id: 6, chat: 'test chat', online: false,  image: 'https://appsftw.com/im/is3.mzstatic.com/image/thumb/Purple3/v4/26/13/4c/26134cb6-9000-622a-5e9f-d635aa51cce8/source/512x512bb.jpg' },
    { id: 6, chat: 'test chat', online: true,  image: 'https://s-media-cache-ak0.pinimg.com/736x/02/74/d2/0274d2b2461f4e211a5a7f697dbffc9b.jpg' },
    { id: 6, chat: 'test chat', online: false,  image: 'https://pickaface.net/gallery/avatar/unr_youtubeprofilepic_161103_2108_9m6af1.png' },
    { id: 6, chat: 'test chat', online: true,  image: 'https://lh3.googleusercontent.com/-AwBMxa3MgPQ/VTus9ibpi4I/AAAAAAAAAjw/AKYPgxeYK5k/w1000-h1000/1008191_478365628915577_2005084420_o.png' }
  ];

  toggleNav() {
    if (document.getElementById('mySidenav').style.width === '89px'){
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '89px';
    document.getElementById('wcontainer').style.right = '89px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('wcontainer').style.right = '0';
  }

  showChat( item ) {
    console.log( item );
  }

}
