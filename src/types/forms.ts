/* ---------==== custom forms ====--------- */



/* ---------===== auth forms =====--------- */

export interface NewPostFormData {
  variety: string;
  brand: string;
  design: string;
  horsepower: number;
  reaction: string;
  rating: number;
}

export interface AddCommentFormData {
  content: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
