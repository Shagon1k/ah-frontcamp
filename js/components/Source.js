export default class Source {
    constructor(sourceObj) {
        this.name = sourceObj.name;
        this.id = sourceObj.id;
        this.isActive = false;			//TODO: this field could be used to store information about whether Source is already selected or not
    }

    render() {
        return `<li class="sourceItem ${this.isActive ? 'activeSource' : ''} " data-source-id="${this.id}" data-source-active=${this.isActive}>
                    ${this.name}
                </li>`
    }
}