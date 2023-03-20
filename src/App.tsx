import { useState } from "react";
import { CSVLink } from "react-csv";
import { useRecoilState } from "recoil";
import vocabulary from "./data/vocabulary.json";
import { chapterState } from "./settings/atom";
import IRandomVoca from "./types/IRandomVoca";
import IRandomVocaOneSide from "./types/IRandomVocaOneSide";
import makeRandomVocaList from "./utils/makeRandomVocaList";

enum LoadState {
  Init,
  Loading,
  Processed,
}

function App() {
  const [chapterList, setChapterList] = useRecoilState(chapterState);
  const [randomVocaList, setRandomVocaList] = useState<
    [IRandomVoca[], IRandomVocaOneSide[]]
  >([[], []]);
  const [loadState, setLoadState] = useState<LoadState>(LoadState.Init);

  return (
    <div>
      <h1>Voca Bible 랜덤 CSV 생성기</h1>
      <button
        onClick={() => {
          setLoadState(LoadState.Loading);
          setRandomVocaList(makeRandomVocaList(chapterList, vocabulary));
          setTimeout(() => setLoadState(LoadState.Processed), 2000);
        }}
      >
        랜덤 단어장 처리하기! (이 버튼 먼저 누르고 다운 받기)
      </button>
      {loadState === LoadState.Loading
        ? "  단어장 생성 중..."
        : loadState === LoadState.Processed
        ? "  ✅ 단어장 생성 완료!"
        : ""}

      <br />
      <CSVLink
        data={randomVocaList[1]}
        filename={`voca_test_${Date.now()}.csv`}
        target="_blank"
      >
        테스트 다운로드
      </CSVLink>
      <br />
      <CSVLink
        data={randomVocaList[0]}
        filename={`voca_test_${Date.now()}_answer.csv`}
        target="_blank"
      >
        답지 다운로드
      </CSVLink>
      <ul>
        {chapterList.map((isIn, i) => (
          <li key={i}>
            <label htmlFor={`chapter${i + 1}`}>Chapter {i + 1}</label>
            <input
              id={`chapter${i + 1}`}
              type="checkbox"
              checked={isIn}
              onChange={() => {
                const newState = [...chapterList];
                newState[i] = !newState[i];
                setChapterList(newState);
              }}
            />
          </li>
        ))}
      </ul>
      <p>미리보기: {JSON.stringify(randomVocaList)}</p>
    </div>
  );
}

export default App;
