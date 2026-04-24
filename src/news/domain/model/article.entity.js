/**
 * @fileoverview Article domain entity belonging to the News bounded context.
 * @module news/domain/model/article
 */

import {Source} from "./source.entity.js";

/**
 * Represents a news article as a domain entity.
 *
 * An `Article` is the central aggregate of the News bounded context. It
 * captures the full editorial content of a published news item together with
 * its originating {@link Source}.
 */
export class Article {
    /**
     * Creates a new `Article` entity from a plain object of attributes.
     *
     * When a `source` object is provided it is hydrated into a {@link Source}
     * domain entity automatically, ensuring the aggregate is always in a
     * consistent state.
     *
     * @param {object}       params                  - Article attributes.
     * @param {string}       [params.title='']        - Headline of the article.
     * @param {string}       [params.description='']  - Short summary or lead paragraph.
     * @param {string}       [params.url='']          - Permalink to the full article.
     * @param {string}       [params.urlToImage='']   - URL of the article's cover image.
     * @param {object|null}  [params.source=null]     - Raw source attributes; hydrated into a {@link Source} entity.
     * @param {string}       [params.publishedAt='']  - ISO 8601 datetime string of the publication date.
     */
    constructor({ title = '', description = '', url = '',
                    urlToImage = '',
                    source = null, publishedAt = '' }) {
        /** @type {string} Headline of the article. */
        this.title = title;
        /** @type {string} Short summary or lead paragraph. */
        this.description = description;
        /** @type {string} Permalink to the full article. */
        this.url = url;
        /** @type {string} URL of the article's cover image. */
        this.urlToImage = urlToImage;
        /** @type {Source|null} The news source that published this article. */
        this.source = source ? new Source(source) : null;
        /** @type {Date} Publication date and time of the article. */
        this.publishedAt = new Date(publishedAt);
    }

    /**
     * Returns a locale-formatted string representation of the article's
     * publication date and time.
     *
     * The format follows the `en-US` locale and includes year, month, day,
     * hour, and minute components.
     *
     * @returns {string} Human-readable publication date, e.g. "04/23/2026, 09:00 AM".
     */
    getFormattedPublishedAt() {
        return this.publishedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}