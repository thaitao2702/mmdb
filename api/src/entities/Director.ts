import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Movie from "./Movie";

@Entity()
class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedDate: Date;

  @Column("varchar")
  name: string;

  @Column("text")
  overView: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "varchar", nullable: true })
  birthPlace: string;

  @Column({ type: "text", nullable: true })
  avatar: string;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}

export default Actor;
