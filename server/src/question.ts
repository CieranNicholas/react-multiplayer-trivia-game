import axios from "axios";

enum Categories {
  Film = 11,
  General = 9,
  Music = 12,
  Television = 14,
  Games = 15,
  Sports = 21,
}

enum Difficulties {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export const fetchQuestion = async (category: number, difficulty: string) => {
  const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
  const res = await axios.get(url);
  console.log(res.data.results);
  return res.data.results;
};
