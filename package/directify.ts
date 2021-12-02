class Directify {
    // basic class boilerplate
    options: { url: string }
    constructor(options) {
        this.options = options
    }

    // private methods
    private fetchUrl(url: string, callback: Function) {
        // fetch a file
        fetch(url)
            .then(response => response.text())
            .then(body => callback(body))
    }

    private getType(url: string) {
        // get the type of the url (in file format)
        let type = 'text/plain'

        if (url.endsWith('.html')) {
            type = 'text/html'
        } else if (url.endsWith('.css')) {
            type = 'text/css'
        } else if (url.endsWith('.js')) {
            type = 'application/javascript'
        } else if (url.endsWith('.jpg')) {
            type = 'image/jpeg'
        } else if (url.endsWith('.png')) {
            type = 'image/png'
        } else if (url.endsWith('.gif')) {
            type = 'image/gif'
        }

        return type
    }

    private createBlob(url: string, callback: Function) {
        // create a blob url
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = this.options.url + '/' + url
        }

        this.fetchUrl(url, (body) => {
            /*body.split(/\r\n|\n/).forEach((ln) => {
                body = this.replaceUrls(body, ln)
            })*/
            let blob = new Blob([body], { type: this.getType(url) })
            callback(blob)
        })
    }

    private replaceUrls(ln: string, callback: Function) {
        // replace urls with blob urls
        let url = ln.split('href="')[1] || ln.split('src="')[1]
        if (url) {
            url = url.split('"')[0]

            this.createBlob(url, (blob: Blob) => {
                // get url of blob
                let blobUrl = URL.createObjectURL(blob)
                callback(ln.replaceAll(url, blobUrl))
            })
        }
    }

    // public methods
    public crawl(url: string) {
        this.fetchUrl(url, (body) => {
            body.split(/\r\n|\n/).forEach((ln) => {
                this.replaceUrls(ln, (newln) => {
                    body = body.replaceAll(ln, newln)
                    console.log(body)

                })
            })

            return body
        })
    }
}