import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
    console.log("telegram login", this.telegramLogin);
    console.log("test login", this.testView);
    this.convertToScript();
  }

  onTelegramAuth(user:any){
    console.log("User added", user);
    this.user = user;
  }
}
