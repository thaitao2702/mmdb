import { Movie, Actor, MovieDetails, User, UserReview } from "entities";
import { Gender } from "const/actor";
import { MovieCategory } from "const/movie";
import { createEntity } from "utils/entityHandler";

const seedActors = (): Promise<Actor[]> => {
  const Actors = [
    createEntity(Actor, {
      name: "Benedict Cumberbatch",
      birthDate: new Date("1976-07-19"),
      birthPlace: "Hammersmith, London, England, UK",
    }),
    createEntity(Actor, {
      name: "Elizabeth Olsen",
      birthDate: new Date("1989-02-16"),
      birthPlace: "Los Angeles, California, USA",
    }),
    createEntity(Actor, {
      name: "Ranbir Kapoor",
      birthDate: new Date("1982-10-28"),
      birthPlace: "Mumbai, India",
    }),
    createEntity(Actor, {
      name: "Sanjay Dutt",
      birthDate: new Date("1959-06-29"),
      birthPlace: "Bombay, State of Bombay, India",
    }),
    createEntity(Actor, {
      name: "Mason Thames",
      birthDate: new Date("2007-07-11"),
      birthPlace: "USA",
    }),
    createEntity(Actor, {
      name: "Ethan Hawke",
      birthDate: new Date("1970-11-06"),
      birthPlace: "Austin, Texas, USA",
    }),
  ];
  return Promise.all(Actors);
};

const seedMovies = (actors: Actor[]): Promise<Movie[]> => {
  const Movies = [
    createEntity(Movie, {
      title: "The Black Phone",
      writers: ["Joe Hill", "Scott Derrikson"],
      numberOfVotes: 1999,
      movieCategory: [MovieCategory.HORROR],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMGI3ODNmMzEtMDM1Ny00Njc3LTgwOWMtYmRjZTViNWVlOWVlXkEyXkFqcGdeQXVyNTg5NjcwNjY@._V1_QL75_UX190_CR0,10,190,281_.jpg",
    }),
    createEntity(Movie, {
      title: "Shamshera",
      writers: ["Khila Bisht", "Karan Malhotra"],
      numberOfVotes: 48000,
      movieCategory: [MovieCategory.ACTION, MovieCategory.ADVENTURE],
      poster:
        "https://m.media-amazon.com/images/M/MV5BODVlNWNmN2EtYWJlYy00ZTc5LThjMTItYTQ0ZTlmZDYwN2VjXkEyXkFqcGdeQXVyNTkzNDQ4ODc@._V1_QL75_UY281_CR11,0,190,281_.jpg",
    }),
    createEntity(Movie, {
      title: "Doctor Strange in the Multiverse of Madness",
      writers: ["Michael Waldron", "Stan Lee"],
      numberOfVotes: 335000,
      movieCategory: [
        MovieCategory.ACTION,
        MovieCategory.ADVENTURE,
        MovieCategory.FANTASY,
      ],
      poster:
        "https://m.media-amazon.com/images/M/MV5BOTg1YTE5OWItNGYxNC00NjliLWE3NDAtY2Y4YWY0YThjNmEwXkEyXkFqcGdeQXVyNTg5NjcwNjY@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    }),
  ];
  return Promise.all(Movies);
};

const seedData = async (): Promise<Movie[]> => {
  const actors = await seedActors();
  const movies = await seedMovies(actors);
  return movies;
};

export default seedData;
