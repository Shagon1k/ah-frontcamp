export default function SourceChooser (sourceArr) {
    let sourcesStringTemplate = '';
    sourceArr.forEach(source => {sourcesStringTemplate += source});

    return `<ul class="sourceList">
                    ${sourcesStringTemplate}
                </ul>`
}