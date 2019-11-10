import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, first } from 'rxjs/operators';
import { LoginService } from 'app/services/login.services';

@Component({
  selector: 'app-venue-add',
  templateUrl: './venue-add.component.html',
  styleUrls: ['./venue-add.component.scss']
})
export class VenueAddComponent implements OnInit {

  myForm1 : FormGroup;

  loading = false;
  success = false;

  // name = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private loginService: LoginService) { }

  ngOnInit() {

    this.myForm1 = this.fb.group({
      
      Name: ['',Validators.required],
      venue_address: ['',Validators.required],
      tel_no: ['',Validators.required],
      ac: ['',Validators.required],
      car_parking: ['',Validators.required],
      fee: ['',Validators.required],
      seating_capacity: ['',Validators.required],      

    })

    this.preloadData();     //storing data in the database is working even WITHOUT this function

  }

  async submitHandler1() {
    this.loading = true;

    const formValue = this.myForm1.value;

    try {
      await this.afs.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').set(formValue);
      this.success = true;
    } catch(err) {
      console.error(err)
    }

    this.loading = false;
  }

  preloadData() {           //storing data in the database is working even WITHOUT this function
    this.afs.doc('Venues/Kjn0JWBKdOnUlBwuE93S').valueChanges().pipe(
      tap(data => {
        this.myForm1.patchValue(data)
      })
    )
    .subscribe()
  }

}
