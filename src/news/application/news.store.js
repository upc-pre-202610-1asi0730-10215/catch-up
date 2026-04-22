import {NewsApi} from "../infrastructure/news-api.js";
import {reactive} from "vue";
import {Source} from "../domain/model/source.entity.js";
import {SourceAssembler} from "../infrastructure/source.assembler.js";
import {ArticleAssembler} from "../infrastructure/article.assembler.js";

const newsApi = new NewsApi();

export const newsStore = reactive({
    sources: [],
    articles: [],
    errors: [],
    currentSource: null,
    setCurrentSource(source) {
        if (source instanceof Source) {
            this.currentSource = source;
            this.loadArticlesForCurrentSource();
        }
    },
    loadSources() {
        this.errors = [];
        newsApi.getSources().then(response => {
            this.sources = SourceAssembler.toEntitiesFromResponse(response);
            if (this.sources.length > 0) {
                this.setCurrentSource(this.sources[0]);
                this.loadArticlesForCurrentSource();
            }
        }).catch(error => {
            this.errors.push(error);
            this.sources = [];
        });
    },
    loadArticlesForCurrentSource() {
        if (this.currentSource === null) return;
        newsApi.getArticlesForSourceId(this.currentSource.id).then(response => {
            this.articles = ArticleAssembler.withSource(this.currentSource).toEntitiesFromResponse(response);
        }).catch(error => {
            this.errors.push(error);
            this.articles = [];
        });
    }
});