let quviaLink = {
    makeLink: async (originalUrl, customLink, domain = "quvia.eu", validFrom = new Date(), validUntil = new Date(2030, 1), maxVisits = 100, length = 5) => {
        const body = {
            longUrl: originalUrl,
            customSlug: customLink,
            validSince: qlink.convertDate(validFrom),
            validUntil: qlink.convertDate(validUntil),
            domain: domain,
            shortCodeLength: length,
            maxVisits: maxVisits,
            findIfExists: true,
        };
        return new Promise(async (resolve, reject) => {
            let request = await qlink.sendHTTP("short-urls", "POST", body);
            resolve(request.shortUrl);
        });
    },
    getUrls: async () => {
        return new Promise(async (resolve, reject) => {
            let request = await qlink.sendHTTP("short-urls");
            resolve(request.shortUrls.data);
        });
    },
    uploadFile: async (file, filename = file.name, status) => {
        let form = new FormData();
        form.append("file", file);
        form.append("userdefinedname", filename);
        console.log(filename);
        return new Promise(async (resolve, reject) => {
            let upload = await qlink.sendHTTP("upload.php", "POST", form, status, "https://elebezka.cz/", []);
            if (upload.success) {
                let a = await qlink.makeLink("https://elebezka.cz/upload/" + filename, filename
                    .split(".")
                    .splice(0, filename.split(".").length - 1)
                    .join("."));
                resolve(a);
            }
        });
    },
    sendHTTP: async (endpoint, method = "GET", body, status, url = "https://link.quvia.cz/rest/v2/", headers = [
        ["Content-Type", "application/json"],
        ["X-Api-Key", "a1ddc51b-1a21-4e82-adfb-f98d43edef7b"],
    ]) => {
        const Http = new XMLHttpRequest();
        let isForm = body instanceof FormData;
        if (isForm)
            Http.upload.addEventListener("progress", function (e) {
                var file1Size = body.get("file").size;
                if (e.loaded <= file1Size) {
                    status.percent = Math.round((e.loaded / file1Size) * 100);
                    console.log(status.percent);
                }
            });
        return new Promise((resolve, reject) => {
            Http.open(method, url + endpoint);
            headers.forEach((header) => {
                Http.setRequestHeader(header[0], header[1]);
            });
            Http.send(isForm ? body : JSON.stringify(body));
            Http.onreadystatechange = (e) => {
                if (Http.readyState === XMLHttpRequest.DONE) {
                    if (Http.status === 0 || (Http.status >= 200 && Http.status < 400)) {
                        return resolve(JSON.parse(Http.responseText));
                    }
                    else {
                        return reject(Error("Bad Code received from server"));
                    }
                }
            };
        });
    },
    convertDate: (date) => {
        let string = date.toISOString().split(".");
        string.pop();
        return string.join() + "+0:00";
    },
};
let qlink = quviaLink;
console.log("%cQuvia Link %clibrary ready", "color: #097150; font-weight: bold; font-family:Roboto, Arial, sans-serif; font-size: 20px;", "color: black; font-family:Roboto, Arial, sans-serif; font-size: 17px;");
console.log("Changelog: \n   - make a link with the makeLink method \n   - send a custom http request to the server using sendHTTP(?url, endpoint, ?method, ?body)");
//# sourceMappingURL=link.js.map