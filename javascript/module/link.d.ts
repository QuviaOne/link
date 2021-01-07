declare namespace quviaLink {
    declare async function makeLink(
        originalUrl: string,
        custom?: string,
        domain: "link.quvia.cz" | "k.quvia.cz" | "quvia.eu" = "quvia.eu",
        validFrom: Date = new Date(),
        validUntil: Date = new Date(2030, 1),
        maxVisits: number = 100,
        length: number = 5): Promise<string>;
    declare async function getUrls(): Promise<Array<Link>>;
    declare async function uploadFile(file: File, filename: string = file.name, status?: StatusObject): Promise<string>;
    declare async function sendHTTP(endpoint: string, method?: "GET" | "POST" = "GET", body: object, url?: string = "https://link.quvia.cz/rest/v2/", headers?: Array<HttpHeader> = [
        ["Content-Type", "application/json"],
        ["X-Api-Key", "a1ddc51b-1a21-4e82-adfb-f98d43edef7b"],
    ]): Promise<HttpResponse>;
    declare function convertDate(date: Date): Promise<string>;

    declare interface Link {
        dateCreated: string;
        domain: "link.quvia.cz" | "k.quvia.cz" | "quvia.eu";
        longUrl: string;
        meta: LinkMeta;
        shortCode: string;
        shortUrl: string;
        tags: Array<string>;
        visitsCount: number;
    }
    declare interface LinkMeta {
        validSince: string;
        validUntil: string;
    }
    declare interface StatusObject {
        percent: number;
    }
    declare interface HttpResponse extends Map<string, any> {

    }
    declare interface HttpHeader extends Array<string> {
        0: string;
        1: string;
        length: 2;
    }
}
export = quviaLink;