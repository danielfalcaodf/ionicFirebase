import { OverlayService } from '../../../core/services/overlay.service';
import { AuthProvider } from '../../../core/services/auth.types';
import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  authProviders = AuthProvider;
  
  configs = {
    isSignin: true,
    action: 'Login',
    actionChange: 'Criar conta'
  };

   private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  constructor(private authService: AuthService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private overlayService: OverlayService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.createForm();

  }
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }
  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }
  changeAuthAction(): void { 
    this.configs.isSignin = !this.configs.isSignin;
    const { isSignin } = this.configs;
    this.configs.action = isSignin ? 'Login' : 'Criar conta';
    this.configs.actionChange = isSignin ? 'Criar conta' : 'Eu ja tenho uma conta';
    !isSignin
    ?this.authForm.addControl('name', this.nameControl)
    : this.authForm.removeControl('name');
  }
  async onSubmit(provider: AuthProvider): Promise<void>{
    const loading = await this.overlayService.loading();
    try{
      const credentials  = await this.authService.authenticate({
        isSignIn: this.configs.isSignin,
        user: this.authForm.value,
        provider
      })
      console.log("pronto: ", credentials);
     this.navCtrl.navigateForward(  this.route.snapshot.queryParamMap.get('redirect') ||'/tasks')
      
      
    }
    catch(e)
    {
      console.log("Auth error: ", e);
    await  this.overlayService.toast({
        message: e.message
      })
    }
    finally{
      loading.dismiss();
    }
  }

}
