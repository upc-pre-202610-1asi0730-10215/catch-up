import {LogoDevApi} from "../../shared/infrastructure/logo-dev-api.js";
import {Source} from "../domain/model/source.entity.js";

const logoApi = new LogoDevApi();

export class SourceAssembler {
    static toEntityFromResource(resource) {
        let source = new Source({...resource});
        source.urlToLogo = source.url !== '' ? logoApi.getUrlToLogo(source.url) : '';
        return source;
    }

    static toEntitiesFromResponse(response) {
        if (response.data.status !== 'ok') {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }
        const sourcesResponse = response.data;
        return sourcesResponse.sources.map(source => this.toEntityFromResource(source));
    }
}