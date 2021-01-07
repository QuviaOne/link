declare namespace quviaLink {
    function makeLink(
        originalUrl: string,
        custom?: string,
        domain: "link.quvia.cz" | "k.quvia.cz" | "quvia.eu",
        validFrom: Date,
        validUntil: Date,
        maxVisits: number,
        length: number): Promise<string>;
    function getUrls(): Promise<Array<Link>>;
    function sendHTTP(endpoint: string, method?: "GET" | "POST", body: object, url?: string, headers?: Array<HttpHeader>): Promise<HttpResponse>;
    function convertDate(date: Date): string;

    interface Link {
        dateCreated: string;
        domain: "link.quvia.cz" | "k.quvia.cz" | "quvia.eu";
        longUrl: string;
        meta: LinkMeta;
        shortCode: string;
        shortUrl: string;
        tags: Array<string>;
        visitsCount: number;
    }
    interface LinkMeta {
        validSince: string;
        validUntil: string;
    }
    interface StatusObject {
        percent: number;
    }
    interface HttpResponse extends Map<string, any> {

    }
    interface HttpHeader extends Array<string> {
        0: string;
        1: string;
        length: 2;
    }
}
export = quviaLink;
