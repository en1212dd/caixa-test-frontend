import { RICK_AND_MORTY_API_URL } from "@shared/constants";
import axios from "axios";

export const RickAndMortyClient = axios.create({
    baseURL: RICK_AND_MORTY_API_URL
});