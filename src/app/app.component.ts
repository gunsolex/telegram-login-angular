import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import sha256, * as CryptoJS from 'crypto-js/sha256';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'TelegramLogin';
  user:any;

  @ViewChild('telegramScript') telegramLogin:any;
  @ViewChild('testView') testView:any;
  convertToScript() {
    const element = this.telegramLogin.nativeElement;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?5';
    script.setAttribute('data-telegram-login', "TestCompanyLogin_bot");
    script.setAttribute('data-size', 'large');
    // Callback function in global scope
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    element.parentElement.replaceChild(script, element);
  }

  ngAfterViewInit(): void {
    (window as any).onTelegramAuth = this.onTelegramAuth.bind(this);
    console.log("telegram login", this.telegramLogin);
    console.log("test login", this.testView);
    this.convertToScript();
  }

  onTelegramAuth(user:any){
    console.log("User added", user);
    const secretKey = sha256("7970414494:AAEs9eCOgofM77Q7-OiK5BfkMqMFrIqytYU");
    let dataCheckString:any = []
    Object.keys(user).forEach(key => {
      if(key !== 'hash') {
        dataCheckString.push(`${key}=${user[key]}`);
      }
    })
    dataCheckString.sort();
    dataCheckString = dataCheckString.join("\n");
    console.log("data check string", dataCheckString);
    console.log("hmac", HmacSHA256(dataCheckString, secretKey));
    console.log("hexed string", HmacSHA256(dataCheckString, secretKey));
    if(HmacSHA256(dataCheckString, secretKey) == user.hash) {
      console.log("valid user")
    } else {
      console.log("invalid user")
    }
    this.user = user;
    console.log("user this", this.user);
  }
}
