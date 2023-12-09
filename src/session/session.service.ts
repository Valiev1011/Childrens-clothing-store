import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './model/session.model';
import * as uuid from 'uuid';
import { Response } from 'express';
import { SessionCartService } from '../session_cart/session_cart.service';
import { SessionCart } from '../session_cart/model/session_cart.model';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    @InjectModel(SessionCart) private sessionCartService: SessionCart,
  ) {}

  async create(res: Response): Promise<Session> {
    // console.log('adf');
    const uniqueSessionId = uuid.v4();
    const uniqueCartId = uuid.v4();
    const time = new Date();
    const newDate = new Date(time);
    newDate.setDate(time.getDate() + 3);
    const session = await this.sessionRepository.create({
      session_unique_id: uniqueSessionId,
      session_start: time,
      session_end: newDate,
      cart_unique_id: uniqueCartId,
    });
    // console.log(session);
    res.cookie('step_cookie', uniqueSessionId, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return session.dataValues;
  }

  async findAll(): Promise<Session[]> {
    const sessions = await this.sessionRepository.findAll({
      include: { all: true },
    });
    return sessions;
  }

  async findOne(id: number): Promise<Session | null> {
    const session = await this.sessionRepository.findOne({
      where: { id },
    });
    return session;
  }

  async findCart(id: string): Promise<Session | null> {
    const session = await this.sessionRepository.findOne({
      where: { id },
    });
    return session;
  }

  async findSession(id: string): Promise<Session | null> {
    console.log(id);
    const session = await this.sessionRepository.findOne({
      where: { session_unique_id: id },
    });
    console.log(session);
    return session;
  }
  // async findSession(id: string): Promise<Session | null> {
  //   const session = await this.sessionRepository.findOne({
  //     where: { session_unique_id: id },
  //   });
  //   return session;
  // }

  async update(
    id: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<[number, Session[]]> {
    const updatedSessions = await this.sessionRepository.update(
      updateSessionDto,
      { where: { id }, returning: true },
    );
    return updatedSessions;
  }

  async updateId(
    sessionId: number,
    userId: number,
  ): Promise<[number, Session[]]> {
    const updatedSessions = await this.sessionRepository.update(
      {
        user_id: userId,
      },
      { where: { id: sessionId }, returning: true },
    );
    return updatedSessions;
  }

  async remove(id: number): Promise<number> {
    const deletedSessions = await this.sessionRepository.destroy({
      where: { id },
    });
    return deletedSessions;
  }
}
