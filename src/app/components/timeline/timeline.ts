import { Component } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.css'],
})
export class TimelineComponent {
  rows: number = 1;
  postText: string = '';

  //Dummy posts
  posts: Object = [
    {name: 1, body: 'This is a post 1', author: 'Monk', likes: 99, comments: [
      {body: "test comment", replies:[
        {body: "test reply"},
        {body: "test reply"},
        {body: "test reply"}
      ]},
      {body: "test comment", replies:[
        {body: "test reply"},
        {body: "test reply"},
        {body: "test reply"}
      ]}
    ]},
    {name: 2, body: 'This is a post 2', author: 'Monk', likes: 99, comments: [
      {body: "test comment", replies:[
        {body: "test reply"},
        {body: "test reply"},
        {body: "test reply"}
      ]},
      {body: "test comment", replies:[
        {body: "test reply"},
        {body: "test reply"},
        {body: "test reply"}
      ]},
      {body: "test comment"},
      {body: "test comment"},
      {body: "test comment"}
    ]},
    {name: 3, body: 'This is a post 3', author: 'Monk', likes: 99, comments: [
      {body: "test comment", replies:[
        {body: "test reply"},
        {body: "test reply"},
        {body: "test reply"}
      ]}
    ]},
    {name: 4, body: 'This is a post 4', author: 'Monk', likes: 99, comments: [
      {body: "test comment"},
      {body: "test comment"}
    ]},
    {name: 5, body: 'This is a post 5', author: 'Monk', likes: 99, comments: [
      {body: "test comment"},
      {body: "test comment"},
      {body: "test comment", replies:[
        {body: "test reply"},
        {body: "test reply"},
        {body: "test reply"}
      ]},
      {body: "test comment"},
      {body: "test comment", replies:[
        {body: "test reply"},
        {body: "test reply"},
        {body: "test reply"}
      ]},
      {body: "test comment"},
      {body: "test comment"}
    ]}
  ];

  constructor(){}

  checkBlur(){
    if(this.postText.length < 1){
      this.rows = 1;
    }
  }
}
