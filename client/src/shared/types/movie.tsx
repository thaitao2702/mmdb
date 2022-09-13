export interface IMovie {
  createdDate: string;
  id: number;
  movieCategory: string[];
  numberOfVotes: number;
  plot: string;
  poster: string;
  rating: number;
  releasedDate: string;
  runtime: number;
  title: string;
  actors: IActorRoleMovie[];
  director: any;
  rate?: number;
}

export interface IActor {
  avatar: string;
  birthDate: string;
  birthPlace: string;
  id: number;
  name: string;
  overView: string;
}

export interface IActorRoleMovie {
  actorId: number;
  id: number;
  movieId: number;
  role: string;
  actor: IActor;
  movie: IMovie;
}
