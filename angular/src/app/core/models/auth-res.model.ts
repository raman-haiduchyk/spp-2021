import { Tokens } from './tokens.model';

export interface AuthResponse {
  isAuthSuccessful: boolean;
  errorMessage: string;
  tokens: Tokens;
}
