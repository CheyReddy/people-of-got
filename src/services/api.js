import axios from "axios";
import { useState, useEffect } from "react";
// Characters
// https://anapioficeandfire.com/api/characters/

const BASE_URL = "https://anapioficeandfire.com/api/";

export const getAllCharacters = async (page = 1, pageSize = 50) => {
    const response = await fetch(`${BASE_URL}characters?page=${page}&pageSize=${pageSize}`);
    const data = await response.json();
    return data;
}

// export const getHouseByCharacter = async (characterHouse) => {
//     const response = await fetch(`${characterHouse}`);
//     const data = await response.json();
//     return data.name;
// }

// houses
// https://anapioficeandfire.com/api/houses

