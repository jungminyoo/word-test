import IRandomVoca from "../types/IRandomVoca";
import IRandomVocaOneSide from "../types/IRandomVocaOneSide";
import IVoca from "../types/IVoca";

function shuffleArray(array: IVoca[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function makeRandomVocaList(
  chapterList: boolean[],
  vocabulary: IVoca[]
): [IRandomVoca[], IRandomVocaOneSide[]] {
  const chapterNumList: number[] = [];
  chapterList.forEach((isIn, i) => isIn && chapterNumList.push(i + 1));
  const vocaPoolList = vocabulary.filter(({ chapter }) =>
    chapterNumList.includes(chapter)
  );
  const shuffledList = shuffleArray(vocaPoolList);

  return [
    shuffledList.map(({ word, definition }) => ({
      word,
      definition,
    })),
    shuffledList.map(({ word }) => ({ word })),
  ];
}

export default makeRandomVocaList;
