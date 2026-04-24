/**
 * @fileoverview Source domain entity belonging to the News bounded context.
 * @module news/domain/model/source
 */

/**
 * Represents a news source as a domain entity.
 *
 * A `Source` encapsulates all identity and descriptive attributes of a
 * publisher registered in the NewsAPI catalogue. It is the aggregate root
 * for source-related data within the News bounded context.
 */
export class Source {
    /**
     * Creates a new `Source` entity from a plain object of attributes.
     *
     * @param {object}  params              - Source attributes.
     * @param {string}  [params.id='']          - Unique identifier assigned by the news provider.
     * @param {string}  [params.name='']         - Human-readable display name of the source.
     * @param {string}  [params.description='']  - Brief description of the source's editorial focus.
     * @param {string}  [params.url='']          - Canonical homepage URL of the source.
     * @param {string}  [params.category='']     - Editorial category (e.g. "technology", "sports").
     * @param {string}  [params.language='']     - ISO 639-1 language code of the source's content.
     * @param {string}  [params.country='']      - ISO 3166-1 alpha-2 country code of the source.
     */
    constructor({id = '', name = '', description = '', url = '', category = '', language = '', country = ''}) {
        /** @type {string} Unique identifier assigned by the news provider. */
        this.id = id;
        /** @type {string} Human-readable display name of the source. */
        this.name = name;
        /** @type {string} Brief description of the source's editorial focus. */
        this.description = description;
        /** @type {string} Canonical homepage URL of the source. */
        this.url = url;
        /** @type {string} Editorial category (e.g. "technology", "sports"). */
        this.category = category;
        /** @type {string} ISO 639-1 language code of the source's content. */
        this.language = language;
        /** @type {string} ISO 3166-1 alpha-2 country code of the source. */
        this.country = country;
        /**
         * Resolved logo image URL provided by the Logo.dev API.
         * Populated by the infrastructure layer after entity construction.
         * @type {string}
         */
        this.urlToLogo = '';
    }
}