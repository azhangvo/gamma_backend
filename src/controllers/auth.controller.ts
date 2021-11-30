import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      const { email, first_name, last_name, organizations } = signUpUserData;
      const cleanData = { email, first_name, last_name, organizations };

      res.status(201).json({ data: cleanData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);
      const { email, first_name, last_name, organizations } = findUser;
      const cleanData = { email, first_name, last_name, organizations };

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: cleanData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      const { email, first_name, last_name, organizations } = logOutUserData;
      const cleanData = { email, first_name, last_name, organizations };

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: cleanData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
