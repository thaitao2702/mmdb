import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import Movie from "./Movie";

@Entity()
class MovieDetails extends BaseEntity {
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

  @OneToOne(() => Movie, (movie) => movie.movieDetails)
  movie: Movie;

  @Column()
  movieId: string;
}

export default MovieDetails;
