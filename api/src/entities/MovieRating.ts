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
class MovieRating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedDate: Date;

  @Column()
  movieId: number;

  @Column()
  userId: number;

  @Column()
  rate: number;

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => User)
  user: User;
}

export default MovieRating;
