import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from 'app/services/reset_password.service';
import CryptoJS from 'crypto-js';
import { SendMailService } from 'app/services/sendEmail.service.js';
import { AngularFirestore } from '@angular/fire/firestore';
import {redirect_to_login} from '../../../scripts/signup_validation';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form:any;
  user_email:any;
  success_message:any;
  isSuccess:boolean=false;
  validUser:boolean=false;
  uid:any;
  constructor(private _resetPassword:ResetPasswordService,private sendMail:SendMailService,private db:AngularFirestore) { }

  ngOnInit() {

  //   this.route.params.subscribe(params => {
  //     this.uid=params['uid'];
  //     this.user_email=['email'];
  //  });
    this.form=new FormGroup({
      username:new FormControl('',[Validators.required,Validators.email]),
    }); 
  }

  // reset_password(){
  //   this._resetPassword.reset_password(this.user_email).subscribe(data=>{
  //     console.log(data);
  //     this.success_message=data;
  //     if(this.success_message.success) this.isSuccess=true;
  //     else this.isSuccess=false;
  //   })
  // }


  //reset password
  reset_password(){
    var _this=this;
    let login=document.getElementById('loginBtn')
    let email=this.form.get('username').value;
    console.log(email);
    this.db.firestore.collection('register_user').doc(email).get().then(docs=>{
      _this.isSuccess=true;
      console.log(docs.data().password);
      if(!docs.exists) _this.validUser=false;
      else{
        _this.validUser=true;

        var uid_email_link=CryptoJS.SHA256(docs.data().uId).toString()+"/"+email;
        var hashed_link=CryptoJS.SHA256(docs.data().uId+new Date()).toString();
        let _link="http://localhost:4200/reset-password/"+hashed_link+"/"+uid_email_link;
        const email_message={
          to:   email,
          from:'eventCorp@gmail.com',
          subject: "Reset Your Password",
          text: _this.getMessage(_link),
          html: '<strong>'+_this.getMessage(_link)+'</strong>',
        }
        _this.sendMail.sendEmail(email_message).subscribe((data)=>{
          var _returnedData:any=data;
          console.log(_returnedData);
          if(_returnedData.success===true){
            _this.db.collection('passwordLinks').doc(CryptoJS.SHA256(_link).toString()).set({verify:false}).then(()=>{
              console.log("Sent the email");
              login.click();
            }).catch(err=>{
              console.log(err);
            })
          }
          else{
            _this.isSuccess=false;
            console.log("Error sending mail");
          }
      })
      }
    }).catch(err=>{
      _this.isSuccess=false;
      console.log(err);
    })
  }

   //generate verification link
  getMessage(link:any){
    let _href="<a href="+link+" style='Margin:0;border:0 solid #4f9c45;border-radius:9999px;color:red;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:1.3;margin:0;padding:8px 16px 8px 16px;text-align:left;text-decoration:none' target='_blank'  data-saferedirecturl="+link+">";
    let message="<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html><head><meta charset='UTF-8'>"+
        "<meta content='width=device-width, initial-scale=1' name='viewport'>"+
        "<meta name='x-apple-disable-message-reformatting'>"+
        "<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
        "<meta content='telephone=no' name='format-detection'>"+
        "<title></title>"+
        "</head>"+
        "<body>"+
        "<div id=':mx' class='ii gt'><div id=':mw' class='a3s aXjCH msg1283199651525359358'><u></u>"+
        "<div marginwidth='0' marginheight='0' bgcolor='#F6F6F6' style='Margin:0;box-sizing:border-box;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important'>"+
        "<table class='m_1283199651525359358body' border='0' cellspacing='0' cellpadding='0' width='100%' height='100%' style='Margin:0;background:#e4e8ee;border-collapse:collapse;border-spacing:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;height:100%;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;width:100%'>"+
          "<tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
            "<td align='center' valign='top' bgcolor='#F6F6F6' style='Margin:0;background:#e4e8ee!important;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;padding-bottom:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
              "<center style='min-width:580px;width:100%'>"+
                "<table align='center' style='Margin:0 auto;background:#1e2530;border-bottom:none;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                  "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;background:transparent;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                  "<table class='m_1283199651525359358row m_1283199651525359358collapse' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
                    "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:588px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
                    "<h1 style='Margin:0;Margin-bottom:px;color:#ffffff;font-family:Georgia,serif;font-size:30px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:px;padding:0;text-align:left;word-wrap:normal'>"+
                      "EventCorp"+
                    "</h1>"+
                    "</th>"+
                    "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
                  "</tr></tbody></table>"+
                  "</td></tr></tbody></table>"+
                "</td></tr></tbody></table>"+
                "<table style='Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;Margin-top:10px;background:#ffffff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;margin-top:10px;padding:0;text-align:center;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                  "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                  "<table class='m_1283199651525359358row' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
                    "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:564px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
                    "<h3 class='m_1283199651525359358avoid-auto-linking' style='Margin:0;color:#5d6879;font-family:Georgia,serif;font-size:24px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;word-wrap:normal'>"+
                       "Reset Password"+
                    "</h3>"+
                  "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                    "<p style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
                     "Hello,"+
                    "</p>"+
                    "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
                    "</p><p>Please Click the following button to reset your password</p>"+
                    "<p></p>"+
                    "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                      "<center style='min-width:532px;width:100%'>"+
                    "<table class='m_1283199651525359358button' style='Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;float:none;margin:0 0 16px 0;padding:0;text-align:center;vertical-align:top;width:auto'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;border-radius:9999px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;background:#4f9c45;border:none;border-collapse:collapse!important;border-radius:9999px;color:#fefefe;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                      _href+
                        "Reset Password"+
                      "</a>"+
                    "</td></tr></tbody></table></td></tr></tbody></table>"+
                    "</center>"+
          "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
          "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
            "</p><p>If you donot want to change your password please ignore this message.</p>"+
          "<p>If you didn't request a password resetting, let us know.</p>"+
          "<p></p>"+
          "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
          "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
          "If the button above does not appear, please copy and paste this link into your browser's address bar:<br>"+
          "</p><p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'><a href='' target='_blank' data-saferedirecturl=''>"+link+"</a></p>"+
          "<p></p>"+
          "</th>"+
          "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
          "</tr></tbody></table>"+
          "<table align='center' style='background:#e4e8ee;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
          "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='10px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:normal;line-height:10px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
          "</td></tr></tbody></table>"+
          "</td></tr></tbody></table>"+
          "</center>"+
          "</td>"+
          "</tr>"+
          "</tbody></table>"+
          "<div style='display:none;white-space:nowrap;font:15px courier;line-height:0'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>"+
          "<img src='https://ci3.googleusercontent.com/proxy/HdehxmK1b5Akulro3QsNjlwrJMiBNkzLUs0IYl8Z7p_ejpSw3dIWm7lXD6m7zHJlvgGaN-mqZMPnBh4J4B5rRaHEkCLMp6AieRvDJpV5yOL591GlcKzQUrvZuowvjaJrHCn3bhojFOnOHMjJGdnTjjoCjQ3jCZ6uTix1MpEvdqcf7i6DrxF6r9yS3CbNBCbTKzMLVvjbO2m7GR1Fk0_S8ScA_2d34ykilEQJ0rKKt5wgxFrtkNd7KPOfkiVdBmFe3ukWrco6Z9mHZonVzFB_fGesWWYFWEPuhE3ZvM8zsr-Z31mFLhJo7AHDrA17SXoW0HB6vCqwFh_lzU7w2_fA21qDy9BmdeMa1vWcSrBC1kJWcEBcE1IBiGYOryKRgj7pYiF6SlFCVbeJ53aF7mCH97bhwE6RJQ_-xyJjUJjsdlfQ37EPzxYlC27c7dUcNfkpcMC-b2AfylwgCfc=s0-d-e1-ft#http://email-link.overleaf.com/wf/open?upn=hHCzDyOaMqV-2BKGOubZbS-2FsKms-2B0H-2B625sn5WlmTP-2BdsG1hT-2FhQhCa3xVME-2FGESiKhhgcDaS1J1-2BOmBIa4G9G9c-2FGq8dbpuqq73ttdsHIiW7NDaBwShUOC6U-2BR-2FppzUOyd3eg80BZm-2FHUeF1YCI-2FtEaxGoE7POnsXXROKVWjSSmAaLd0Lh9m0Ht97EIp4tq0uirvv0VAVWQPtd9QQSh0WYw7-2BNV3f39zYKbNOiiD2SIGe1AAKrUJGiWTHzlsUxEkg' alt='' width='1' height='1' border='0' style='height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important' class='CToWUd'></div><div class='yj6qo'></div><div class='adL'>"+
          "</div></div></div>"+
          "</body>"+
          "</html>";
          return message;
  }
  

}
