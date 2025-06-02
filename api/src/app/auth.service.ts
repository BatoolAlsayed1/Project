import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';  
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<any>
             ,private jwtService: JwtService      ) {}

    async signup(data: { name: string; email: string; password: string }) {
        const { name, email, password } = data;

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save the user with the hashed password
        const newUser = new this.userModel({
            name,
            email,
            password: hashedPassword,
        });

        return await newUser.save();
    }
    async signin(data: { email: string; password: string }) {
  const user = await this.userModel.findOne({ email: data.email });
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { id: user._id, email: user.email };
  const token = this.jwtService.sign(payload);

  return { access_token: token }; // <-- IS THIS EXACTLY LIKE THIS?
}

}
