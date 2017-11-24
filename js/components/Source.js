export default class Source {
    constructor(sourceObj) {
        this.name = sourceObj.name;
        this.id = sourceObj.id;
    }

    render() {
        return `<li class="sourceItem" data-source-id="${this.id}">
                    ${this.name}
                </li>`
    }
}