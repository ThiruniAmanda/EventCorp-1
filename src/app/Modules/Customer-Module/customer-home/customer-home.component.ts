import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit,AfterViewInit {

  constructor(private cdr:ChangeDetectorRef, private db:AngularFirestore) { }

  // event_array:any=[];
  // organizer_array:any=[];
  // email:any;

  ngOnInit() {
    document.getElementById('about_span').style.display="none";
    document.getElementById('home_span').removeAttribute('style');
    document.getElementById('contact_span').style.display="none";
    document.getElementById('event_span').style.display="none";

    document.getElementById('about_list').setAttribute('class','nav-item');
    document.getElementById('home_list').setAttribute('class','nav-item active');
    document.getElementById('contact_list').setAttribute('class','nav-item')
    document.getElementById('event_list').setAttribute('class','nav-item')

    // console.log(localStorage.getItem('loggedIn'))
    // if(localStorage.getItem('loggedIn') && localStorage.getItem('loggedOut')){
    //   this._db.collection('register_user').doc(localStorage.getItem('user_name')).update({active_status:'logout'});
    //   localStorage.removeItem('loggedIn');
    //   localStorage.removeItem('user_name');
    //   localStorage.removeItem('role');
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('nameId');
    //   localStorage.removeItem('loggedIn');
    //   localStorage.removeItem('loggedOut');
    //   if(localStorage.getItem('searched_user_email')) localStorage.removeItem('searched_user_email');
    //   console.log(this.auth.auth.isSignInWithEmailLink);
    // }
   // this.loadAll();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  //get all events 
//   loadAll(){
//     var _this=this;
    
// //get all event organizers
//     this.db.firestore.collection('register_user').get().then(docs=>{
//       if(docs.empty) console.log("Empty Data");
//       else{
//         docs.forEach(doc=>{
//           if(doc.data().role==="organizer"){                      
//             _this.organizer_array.push(doc.data());
//             _this.email=doc.data().email;

// //get all events using organizer's email           
//             this.db.firestore.collection(('register_user')).doc(_this.email).collection("MyEvents").get().then(docs=>{
//               if (docs.empty) console.log("Empty Data"); 
//               else{
//                 docs.forEach(doc=>{
//                   _this.event_array.push(doc.data());
//                 }) 
//               }
              
//             })
            
//           }
//         })
//       }  
//     })
    
//   }

}
