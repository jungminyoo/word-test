import { useState } from "react";
import { CSVLink } from "react-csv";
import { useRecoilState } from "recoil";
import vocabulary from "./data/vocabulary.json";
import { chapterState } from "./settings/atom";
import IRandomVoca from "./types/IRandomVoca";
import makeRandomVocaList from "./utils/makeRandomVocaList";

function App() {
  const [chapterList, setChapterList] = useRecoilState(chapterState);
  const [randomVocaList, setRandomVocaList] = useState<IRandomVoca[]>([]);

  return (
    <div>
      <h1>Voca Bible 랜덤 CSV 생성기</h1>
      <button
        onClick={() =>
          setRandomVocaList(makeRandomVocaList(chapterList, vocabulary))
        }
      >
        랜덤 단어장 처리하기! (이 버튼 먼저 누르고 다운 받기)
      </button>
      <p>미리보기: {JSON.stringify(randomVocaList)}</p>

      <CSVLink
        data={randomVocaList}
        filename={`voca_test_${Date.now()}`}
        target="_blank"
      >
        다운로드!
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
    </div>
  );
}

export default App;
