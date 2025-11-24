import React, { useState, useEffect } from "react";
import "../css/Home.css";
import CharacterCard from "./CharacterCard";
import { getAllCharacters } from "../services/api";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);

  const houseMap = {
    Starks: "362",
    Lannisters: "229",
    Baratheons: "17",
    Targaryens: "378",
    Greyjoys: "169",
    Tyrells: "398",
    Tullys: "395",
    Arryns: "7",
    Martells: "285",
    Freys: "285",
  };

  const loadAllPages = async () => {
    let page = 1;
    let allCharacters = [];
    let hasMore = true;

    while (hasMore) {
      const data = await getAllCharacters(page);

      if (!data || data.length === 0) {
        hasMore = false;
        break;
      }

      const valid = data.filter(
        (char) =>
          char.name?.trim() !== "" &&
          char.titles?.length > 0 &&
          char.culture?.trim() !== ""
      );

      allCharacters = [...allCharacters, ...valid];
      page++;

      // Limit to speed up UI
      if (allCharacters.length >= 100) break;
    }

    const unique = Array.from(new Map(allCharacters.map((c) => [c.url, c])).values());
    setCharacters(unique);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadAllPages();
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCharacters = () => {
    if (!sortOption) return filteredCharacters;
    const houseId = houseMap[sortOption];

    return filteredCharacters.filter((char) =>
      char.allegiances?.some((url) => url.endsWith(`/${houseId}`))
    );
  };

  return loading ? (
    <h2 style={{ color: "white" }}>Loading...</h2>
  ) : (
    <div onSubmit={(e) => e.preventDefault()} className="home-container">
      <div className="search-form">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search GOT Character..."
        />
      </div>

      <div className="houses">
        {Object.keys(houseMap).map((house) => (
          <div className="house" key={house}>
            <button
              className={sortOption === house ? "active" : ""}
              onClick={() =>
                setSortOption((prev) => (prev === house ? "" : house))
              }
            >
              {house}
            </button>
          </div>
        ))}
      </div>

      <div className="characters-grid">
        {sortedCharacters().length === 0 ? (
          <h1>No Character...</h1>
        ) : (
          sortedCharacters()
            .slice(0, visibleCount)
            .map((character) => {
              const id = character.url.split("/").pop();
              return <CharacterCard character={character} key={id} />;
            })
        )}
      </div>

      {visibleCount < sortedCharacters().length && (
        <div className="load-more-btn">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default Home;
