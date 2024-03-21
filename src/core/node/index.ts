export * from './utils';
export * from './NodeTemplate';
export * from './SingleNode';

// function loadr(source: string) {
//     const template = document.createElement('template');
//     template.innerHTML = source;
//     template.content.normalize();
//     eachNode(template.content, node => {
//         if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) return true;
//         if (node.nodeType !== Node.ELEMENT_NODE) node.parentNode?.removeChild(node);
//         return true;
//     });

//     if (template.content.firstElementChild && template.content.firstElementChild.localName == Scene3D.tagName) {
//         const scene = template.content.firstElementChild as Scene3D;
//         [...scene!.attributes].forEach((attributes, index, that) => {
//             if (attributes.name == 'src') return;
//             this.setAttribute(attributes.name, attributes.value)
//         });
//         const fragment = new DocumentFragment;
//         while (scene.firstChild) fragment.appendChild(scene.firstChild);
//         this.appendChild(fragment);
//     } else this.appendChild(template.content);
// }