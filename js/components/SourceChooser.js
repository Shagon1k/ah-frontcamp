export default class SourceChooser {
    constructor(sourceArr) {
        this.sourceArr = sourceArr;
    }

    render() {
        let sourcesStringTemplate = '';

        this.sourceArr.forEach(source => {sourcesStringTemplate += source.render()});

        return `<ul class="sourceList">
                    ${sourcesStringTemplate}
                </ul>`
    }
}