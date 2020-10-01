import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/enums/color.enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() messageContent: string;
  @Input() messageDate: Date;
  @Input() messageAuthor: string;
  @Input() sentByThisUser: boolean;

  public messageText: string;

  constructor() { }

  ngOnInit(): void {

  }

  public getMessageColorStyle() {
    if (this.sentByThisUser) {
      return {backgroundColor: Color.primaryColor};
    } else {
      return {backgroundColor: Color.secondaryColor};
    }
  }

}
