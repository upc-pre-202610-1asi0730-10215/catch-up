/**
 * @fileoverview NewsAPI HTTP gateway — News bounded context infrastructure.
 *
 * Wraps the NewsAPI REST endpoints with pre-configured Axios instances so
 * the rest of the application remains decoupled from HTTP transport details.
 *
 * @module news/infrastructure/news-api
 */

import axios from "axios";

const newsApi               = import.meta.env.VITE_NEWS_API_URL;
const apiKey                = import.meta.env.VITE_NEWS_API_KEY;
const sourcesEndpoint       = import.meta.env.VITE_SOURCES_ENDPOINT_PATH;
const topHeadlinesEndpoint  = import.meta.env.VITE_TOP_HEADLINES_ENDPOINT_PATH;

/**
 * Shared Axios instance pre-configured with the NewsAPI base URL and API key.
 * All requests made through this instance automatically include the required
 * `apiKey` query parameter.
 *
 * @type {import('axios').AxiosInstance}
 */
const http = axios.create({
    baseURL: newsApi,
    params: {
        apiKey: apiKey,
    }
});

/**
 * Infrastructure gateway that communicates with the NewsAPI REST API.
 *
 * Each method returns a raw Axios `Promise` whose resolved value is an
 * `AxiosResponse`. Callers in the application layer are responsible for
 * delegating the response to the appropriate assembler before operating
 * on domain entities.
 */
export class NewsApi {
    /**
     * Retrieves the list of all available news sources from NewsAPI.
     *
     * Corresponds to the `/sources` endpoint. The response contains a
     * `sources` array with raw source representations that must be
     * assembled into {@link Source} domain entities via
     * {@link SourceAssembler}.
     *
     * @returns {Promise<import('axios').AxiosResponse>} Axios response whose
     *   `data.sources` array contains raw source records.
     */
    getSources() {
        return http.get(`${sourcesEndpoint}`);
    }

    /**
     * Retrieves the top-headline articles published by the specified source.
     *
     * Corresponds to the `/top-headlines` endpoint filtered by `sources`.
     * The response contains an `articles` array that must be assembled into
     * {@link Article} domain entities via {@link ArticleAssembler}.
     *
     * @param {string} sourceId - The unique identifier of the news source
     *   (matches {@link Source#id}).
     * @returns {Promise<import('axios').AxiosResponse>} Axios response whose
     *   `data.articles` array contains raw article records.
     */
    getArticlesForSourceId(sourceId) {
        return http.get(`${topHeadlinesEndpoint}`, {params: { sources: sourceId}});
    }
}
