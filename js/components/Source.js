export default function Source (sourceObj) {
    let isActive = false;
    return `<li class="sourceItem ${isActive ? 'activeSource' : ''} " data-source-id="${sourceObj.id}" data-source-active=${isActive}>
                ${sourceObj.name}
            </li>`
}