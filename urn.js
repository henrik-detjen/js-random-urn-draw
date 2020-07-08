class Urn {

    constructor(content = [], withReplacement = true, weightFunction = null) {
        this.content = content;
        this.extractedContent = [];
        this.WITH_REPLACEMENT = withReplacement;
    }

    draw = (n = 1) => {
        let result = [];
        for (let i = 0; i < n; i++) {
            if (this.content.length === 0) break; // stop if the item pool is empty
            let rndIndex = Math.floor(Math.random() * this.content.length);
            let rndItem = this.content[rndIndex];
            result.push(rndItem);
            if (!this.WITH_REPLACEMENT) {
                // without replacement: return random item from pool and add it to the list of drawn content
                this.extractedContent.push(rndItem);
                this.content.splice(rndIndex, 1);
            }
        }
        return result;
    };

    drawOne = () => {
        let result = this.draw();
        if (result.length > 0) return result[0];
        return null;
    };

    shake = () => {
        for (let index = this.content.length - 1, rnd_index, tmp; index > 0; index--) {
            rnd_index = Math.floor(Math.random() * (index + 1));
            tmp = this.content[index];
            this.content[index] = this.content[rnd_index];
            this.content[rnd_index] = tmp;
        }
        return this.content;
    };

    restore = () => {
        if (!this.WITH_REPLACEMENT) {
            this.content = this.content.concat(this.extractedContent);
            this.extractedContent = [];
        }
    };

    get content() {
        return this._content;
    }

    set content(array) {
        if (Array.isArray(array)) {
            this._content = JSON.parse(JSON.stringify(array));
        } else {
            throw new Error("### not an array ###");
        }
    }

    get extractedContent() {
        return this._extractedContent;
    }

    set extractedContent(array) {
        if (Array.isArray(array)) {
            this._extractedContent = JSON.parse(JSON.stringify(array));
        } else {
            throw new Error("### not an array ###");
        }
    }

    get withReplacement() {
        return this.WITH_REPLACEMENT;
    }

}

module.exports = Urn;
