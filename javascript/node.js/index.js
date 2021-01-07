var fetch = require("node-fetch");
const quviaLink = {
    sendHTTP: async (endpoint, method = "GET", body, url = "https://link.quvia.cz/rest/v2/", headers = [
        ["Content-Type", "application/json"],
        ["X-Api-Key", "a1ddc51b-1a21-4e82-adfb-f98d43edef7b"],
    ]) => {
        var f = await fetch(url + endpoint, {
            method,
            body: JSON.stringify(body),
            headers
        });
        try {
            return f.json();
        } catch (e) {
            throw new Error("Bad Code received from server.");
        }
    },
    convertDate: (date) => {
        let string = date.toISOString().split(".");
        string.pop();
        return string.join() + "+0:00";
    },
    getUrls: async () => {
        return (await quviaLink.sendHTTP("short-urls")).shortUrls.data;
    },
    makeLink: async (originalUrl, customLink, domain = "quvia.eu", validFrom = new Date(), validUntil = new Date(2030, 1), maxVisits = 100, length = 5) => {
        const body = {
            longUrl: originalUrl,
            customSlug: customLink,
            validSince: quviaLink.convertDate(validFrom),
            validUntil: quviaLink.convertDate(validUntil),
            domain: domain,
            shortCodeLength: length,
            maxVisits: maxVisits,
            findIfExists: true,
        };
        return (await quviaLink.sendHTTP("short-urls", "POST", body)).shortUrl;
    }
}
module.exports = quviaLink;