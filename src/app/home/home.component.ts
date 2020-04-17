import { Component, OnInit } from '@angular/core';
import {Profile} from "../models/profile";
import {HttpService} from "../services/http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profiles: Profile[];
  form: FormGroup;
  errormessage = null;

  constructor(private httpService: HttpService) {

  }

  ngOnInit() {
    this.getProfiles()
    this.makeForm()
  }

  makeForm(){
    this.form = new FormGroup({
      profile_id: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      enabled: new FormControl(null, Validators.required)
    })
  }

  getProfiles() {
    this.httpService.makeGetRequest("profile").subscribe(
      (data: Profile[]) => this.profiles = data,
      error => this.errormessage = error.error
    )
  }

  onSubmit() {
    this.errormessage = null
    const profile: Profile = {profile_id : +this.form.get('profile_id').value, first_name: this.form.get("first_name").value, enabled: JSON.parse(this.form.get('enabled').value)}
    this.httpService.makePostRequest("profile", profile).subscribe(
      data => this.getProfiles(),
      error => this.errormessage = error.error
    )
  }

  update() {
    this.errormessage = null
    const profile: Profile = {profile_id : +this.form.get('profile_id').value, first_name: this.form.get("first_name").value, enabled: JSON.parse(this.form.get('enabled').value)}
    this.httpService.makePutRequest("profile/" + profile.profile_id, profile).subscribe(
      data => this.getProfiles(),
      error => this.errormessage = error.error
    )
  }
}
