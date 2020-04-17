import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profile} from "../models/profile";
import {HttpService} from "../services/http.service";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() profile: Profile;
  @Output() update = new EventEmitter();

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  delete(){
    this.httpService.makeDeleteRequest("profile/" + this.profile.profile_id.toString()).subscribe(
      data => this.update.emit(),
      error => console.log(error)
    )
  }

}
