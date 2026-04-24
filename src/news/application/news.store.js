/**
 * @fileoverview News application store — News bounded context application layer.
 *
 * Implements the application service responsible for orchestrating use cases
 * that involve news sources and articles. The store is exposed as a Vue
 * reactive singleton so that any component in the presentation layer can
 * observe and react to state changes without direct coupling to the
 * infrastructure layer.
 *
 * @module news/application/news-store
 */

import {NewsApi} from "../infrastructure/news-api.js";
import {reactive} from "vue";
import {Source} from "../domain/model/source.entity.js";
import {SourceAssembler} from "../infrastructure/source.assembler.js";
import {ArticleAssembler} from "../infrastructure/article.assembler.js";

const newsApi = new NewsApi();

/**
 * Reactive application store for the News bounded context.
 *
 * Acts as the single point of truth for news-related state in the
 * presentation layer. It orchestrates the following use cases:
 *
 * - **Load sources**: Fetches all available news sources via {@link NewsApi}
 *   and assembles them into {@link Source} domain entities.
 * - **Select source**: Sets the active source and triggers an automatic
 *   article refresh.
 * - **Load articles**: Fetches top-headline articles for the currently
 *   selected source and assembles them into {@link Article} domain entities.
 *
 * All infrastructure interactions are delegated to the gateway and assembler
 * classes, keeping the store free from HTTP and serialisation concerns.
 *
 * @type {object}
 * @property {Source[]}  sources        - Ordered list of all available news sources.
 * @property {Article[]} articles       - Articles published by the currently selected source.
 * @property {Error[]}   errors         - Accumulated errors from failed API calls.
 * @property {Source|null} currentSource - The news source currently selected by the user.
 */
export const newsStore = reactive({
    sources: [],
    articles: [],
    errors: [],
    currentSource: null,

    /**
     * Sets the active news source and immediately loads its top-headline
     * articles.
     *
     * The operation is a no-op when the supplied value is not an instance of
     * {@link Source}, preventing invalid state from entering the store.
     *
     * @param {Source} source - The {@link Source} entity to make active.
     * @returns {void}
     */
    setCurrentSource(source) {
        if (source instanceof Source) {
            this.currentSource = source;
            this.loadArticlesForCurrentSource();
        }
    },

    /**
     * Fetches all available news sources from the NewsAPI gateway, assembles
     * them into {@link Source} domain entities, and stores the result.
     *
     * On success the first source in the list is automatically selected and
     * its articles are loaded. On failure the error is recorded in
     * {@link newsStore.errors} and `sources` is reset to an empty array.
     *
     * @returns {void}
     */
    loadSources() {
        this.errors = [];
        newsApi.getSources().then(response => {
            console.log(response);
            this.sources = SourceAssembler.toEntitiesFromResponse(response);
            if (this.sources.length > 0) {
                this.setCurrentSource(this.sources[0]);
                this.loadArticlesForCurrentSource();
            }
        }).catch(error => {
            this.errors.push(error);
            console.log(this.errors);
            this.sources = [];
        });
    },

    /**
     * Fetches the top-headline articles for {@link newsStore.currentSource}
     * from the NewsAPI gateway and assembles them into {@link Article} domain
     * entities.
     *
     * Returns early without making a network request when no source is
     * currently selected. On failure the error is recorded in
     * {@link newsStore.errors} and `articles` is reset to an empty array.
     *
     * @returns {void}
     */
    loadArticlesForCurrentSource() {
        if (this.currentSource === null) return;
        newsApi.getArticlesForSourceId(this.currentSource.id).then(response => {
            console.log(response);
            this.articles = ArticleAssembler.withSource(this.currentSource).toEntitiesFromResponse(response);
            console.log(this.articles);
        }).catch(error => {
            this.errors.push(error);
            console.log(this.errors);
            this.articles = [];
        });
    }
});