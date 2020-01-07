import { Component, OnInit } from '@angular/core';
import {loadCalendar} from '../../../../scripts/artist/artist-home'
import {activate_searchBar} from '../../../../scripts/search_bar_activate'
import { RateUserService } from 'app/services/rate-user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.scss']
})
export class ArtistHomeComponent implements OnInit {
  currentRate:any=0;
  rating_data:any;
  top_organizers=[];
  top_suppliers=[];
  top_venue_owners=[];
  data:any;
  default_rate:any=0;
  isDone:boolean=false;
  my_playlist:any=[];
  playlist_title:string;
  user_comments:any=[];
  constructor(private _ratings:RateUserService,private database:AngularFirestore,private _snackBar:MatSnackBar) { }

  ngOnInit() {
    // loadCalendar();
    activate_searchBar();
    this.get_top_users();
    this.load_comments();
    this.load_playlist();
  }

  get_top_users(){
    var _this=this;
    var docRef=this.database.firestore.collection('ratings');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().role=="organizer" && doc.data().rating>=3){
        _this.top_organizers.push(doc.data());
         _this.top_organizers.sort().reverse();
      }
     
      else if(doc.data().role=="supplier" && doc.data().rating>=3){
        _this.top_suppliers.push(doc.data());
         _this.top_suppliers.sort().reverse();
      }
      
      else if(doc.data().role=="venue_owner" && doc.data().rating>=3){
        _this.top_venue_owners.push(doc.data());
        // _this.top_venue_owners.sort().reverse();
      }
      _this.isDone=true;
    });

    if(_this.isDone){
     _this.top_organizers.sort().reverse();
     _this.top_suppliers.sort().reverse();
     _this.top_venue_owners.sort().reverse();
    }
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });

    // this._ratings.get_top_users().subscribe((data)=>{
    //   //console.log(data);
    //   this.data=data;
    //   this.top_organizers=this.data.filter(t=>t.role=="organizer"&&t.rating>=3);
    //   this.top_organizers=this.top_organizers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   this.top_suppliers=this.data.filter(t=>t.role=="supplier"&&t.rating>=3);
    //   this.top_suppliers=this.top_suppliers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   this.top_venue_owners=this.data.filter(t=>t.role=="venue_owner"&&t.rating>=3);
    //   this.top_venue_owners=this.top_venue_owners.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   console.log(this.top_organizers+"=>ORGANIZERS")
    //   // for(let data of this.data){
        
    //   // }
    // })
  }

  addUserEmail(email:string){
    alert(email)
    localStorage.setItem('searched_user_email',email);
  }

  load_comments(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('comments').get().then(docs=>{
      if(!docs.empty){
        docs.forEach(doc=>{
          console.log(doc.id);
            var length=doc.data().comments.length;
            for(var i=0;i<length;i++){
              var comment=doc.data().comments[i].comment;
              var date=doc.data().comments[i].date;
              var user_name=doc.data().comments[i].user_name;
              var id=doc.id;
              var sender_mail=doc.data().sender_mail;
              var obj={comment:comment,date:date,user_name:user_name,id:id,sender_mail:sender_mail};
              _this.user_comments.push(obj);
            }
        })
      }
      else console.log("Empty Comments");
    }).catch(err=>{
      console.log(err);
    });
    console.log(this.user_comments)
  }

  load_playlist(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('my_playlist').doc('playlist').get().then(snapshot=>{
      if(!snapshot.exists) console.log("Empty Data");
      else{
       _this.my_playlist.push(snapshot.data());
       _this.playlist_title=snapshot.data().playList_name;
      }
    })
  }

  reportComment(id:any,comment:string,user_name:string,date:string,sender_mail:string){
    var _this=this;
    this.database.collection('reports').doc(id).set({id:id,comment:comment,user_name:user_name,date:date,reported_by:localStorage.getItem('user_name'),user_email:sender_mail}).then(()=>{
      console.log("Success");
      _this._snackBar.open("Successfully Reported. Actions will be taken within few minutes","OK", {
       duration: 3000,
     });
    }).catch(err=>{
      console.log(err);
    })

  }

}