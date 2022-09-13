import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";

import Movie from "./Movie";
import MovieRating from "./MovieRating";

import { constraint } from "utils/validation";

@Entity()
class User extends BaseEntity {
  static validations = {
    name: [constraint.required(), constraint.maxLength(100)],
    email: [
      constraint.required(),
      constraint.email(),
      constraint.maxLength(200),
    ],
    password: [constraint.required(), constraint.minLength(8)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { length: 2000, nullable: true })
  avatarUrl: string | null;

  @ManyToMany(() => Movie, { nullable: true })
  @JoinTable()
  watchList: Movie[];

  @OneToMany(() => MovieRating, (movieRating) => movieRating.user, {
    nullable: true,
  })
  movieRatings: MovieRating[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

export default User;
