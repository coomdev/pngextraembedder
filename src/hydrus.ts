type TagList = (string | TagList)[];

export interface MyTags {
    0: string[];
}

export interface AllKnownTags {
    0: string[];
}

export interface ServiceNamesToStatusesToTags {
    'all known tags': AllKnownTags;
}

export interface MyTags2 {
    0: string[];
}

export interface AllKnownTags2 {
    0: string[];
}

export interface ServiceNamesToStatusesToDisplayTags {
    'all known tags': AllKnownTags2;
}

export interface Metadata {
    file_id: number;
    hash: string;
    size: number;
    mime: string;
    ext: string;
    width: number;
    height: number;
    duration?: any;
    num_frames?: any;
    num_words?: any;
    has_audio: boolean;
    time_modified: number;
    is_inbox: boolean;
    is_local: boolean;
    is_trashed: boolean;
    known_urls: string[];
    service_names_to_statuses_to_tags: ServiceNamesToStatusesToTags;
    service_names_to_statuses_to_display_tags: ServiceNamesToStatusesToDisplayTags;
}

export interface RootObject {
    metadata: Metadata[];
}

export class HydrusClient {
    constructor(
        private ak: string,
        private origin: string = 'http://127.0.0.1',
        private port: number = 45869,
    ) {
    }

    get baseUrl() {
        return `${this.origin}:${this.port}`;
    }

    async get(params: string) {
        return await fetch(this.baseUrl + params, {
            headers: {
                'Hydrus-Client-API-Access-Key': this.ak
            }
        });
    }

    async verify() {
        try {
            const ret = await this.get('/verify_access_key');
            return !!await ret.json();
        } catch (e) {
            return false;
        }
    }

    async idsByTags(taglist: TagList, args?: object) {
        const req = await this.get('/get_files/search_files?tags=' + encodeURIComponent(JSON.stringify(taglist)) + (args ? '&' + (Object.entries(args).map(e => `${e[0]}=${encodeURIComponent(e[1])}`).join('&')) : ''));
        return await req.json() as { file_ids: number[] };
    }

    async getMetaDataByIds(ids: number[]) {
        const req = await this.get('/get_files/file_metadata?file_ids=' + encodeURIComponent(JSON.stringify(ids)));
        return await req.json() as { metadata: Metadata[] };
    }

    async getFile(id: number) {
        const req = await this.get('/get_files/file?file_id=' + id);
        return await req.arrayBuffer();
    }

    async getThumbnail(id: number) {
        const req = await this.get('/get_files/thumbnail?file_id=' + id);
        return await req.arrayBuffer();
    }
}
