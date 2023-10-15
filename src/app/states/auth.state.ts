import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

export class SetJwtToken {
  static readonly type = '[Auth] Set JWT Token';
  constructor(public token: string) {}
}

export class ClearAuthState {
  static readonly type = '[Auth] Clear State';
}

@State<string>({
  name: 'auth',
  defaults: '',
})
@Injectable()
export class AuthState {
  @Action(SetJwtToken)
  setJwtToken(ctx: StateContext<string>, action: SetJwtToken) {
    ctx.setState(action.token);
  }

  @Action(ClearAuthState)
  clearAuthState(ctx: StateContext<string>) {
    ctx.setState('');
  }
}
