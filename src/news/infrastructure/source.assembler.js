/**
 * @fileoverview SourceAssembler — News bounded context infrastructure layer.
 *
 * Responsible for translating raw API response records into {@link Source}
 * domain entities and for enriching them with derived data (e.g. logo URLs)
 * that is not part of the NewsAPI payload.
 *
 * @module news/infrastructure/source-assembler
 */

import {LogoDevApi} from "../../shared/infrastructure/logo-dev-api.js";
import {Source} from "../domain/model/source.entity.js";

const logoApi = new LogoDevApi();

/**
 * Assembler that converts raw NewsAPI source records into {@link Source}
 * domain entities.
 *
 * The assembler pattern keeps the transformation logic out of both the domain
 * model and the application service, preserving a clean separation of
 * concerns between layers.
 *
 * All methods are static so the assembler can be used without instantiation,
 * acting as a stateless translation service.
 */
export class SourceAssembler {
    /**
     * Assembles a single {@link Source} entity from a raw API source record.
     *
     * After constructing the entity, the method enriches it with a logo URL
     * resolved through the {@link LogoDevApi} if the source's `url` field is
     * non-empty.
     *
     * @param {object} resource - Raw source record as returned by the NewsAPI
     *   `/sources` endpoint (a single element of the `sources` array).
     * @param {string} resource.id          - Source identifier.
     * @param {string} resource.name        - Source display name.
     * @param {string} resource.description - Source description.
     * @param {string} resource.url         - Source homepage URL.
     * @param {string} resource.category    - Editorial category.
     * @param {string} resource.language    - ISO 639-1 language code.
     * @param {string} resource.country     - ISO 3166-1 alpha-2 country code.
     * @returns {Source} A fully hydrated and enriched {@link Source} entity.
     */
    static toEntityFromResource(resource) {
        let source = new Source({...resource});
        source.urlToLogo = source.url !== '' ? logoApi.getUrlToLogo(source.url) : '';
        return source;
    }

    /**
     * Assembles a collection of {@link Source} entities from a full NewsAPI
     * HTTP response.
     *
     * Returns an empty array — without throwing — when the API reports a
     * non-`ok` status, and logs the error details to the console for
     * diagnostic purposes.
     *
     * @param {import('axios').AxiosResponse} response - The resolved Axios
     *   response from {@link NewsApi#getSources}.
     * @param {object}   response.data           - Parsed JSON body of the response.
     * @param {string}   response.data.status    - NewsAPI status flag (`"ok"` or `"error"`).
     * @param {object[]} response.data.sources   - Array of raw source records.
     * @returns {Source[]} Array of assembled {@link Source} entities, or an
     *   empty array if the response indicates an error.
     */
    static toEntitiesFromResponse(response) {
        if (response.data.status !== 'ok') {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }
        const sourcesResponse = response.data;
        console.log(response.data);
        return sourcesResponse.sources.map(source => this.toEntityFromResource(source));
    }
}