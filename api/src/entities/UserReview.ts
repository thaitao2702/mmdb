import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import Movie from "./Movie";
import User from "./User";

@Entity()
class UserReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  countryOfOrigin: string;

  @Column("varchar")
  language: string;

  @Column("varchar")
  filmingLocations: string[];

  @Column("varchar")
  productionCompanies: string[];

  @ManyToOne(() => Movie)
  movie: Movie;

  @Column()
  movieId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;
}

export default UserReview;
