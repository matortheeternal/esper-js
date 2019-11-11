const Def = require('../Def');

class Edge0Format extends Def {
    edgeFlagIsSet(element) {
        let flags = element.container.getData('Flags'),
            edgeFlag = Math.pow(2, this.edge());
        return Boolean(flags & edgeFlag);
    }

    getEdgeLink(element, data) {
        if (!element.record || !this.edgeFlagIsSet(element)) return;
        let edgeLinks = element.record.getElement('NVNM\\Edge Links');
        if (!edgeLinks || data > edgeLinks.count) return;
        return edgeLinks.elements[data];
    }

    resolveMeshInfo(element, data) {
        let edgeLink = this.getEdgeLink(element, data);
        if (!edgeLink) return [];
        let meshRec = edgeLink.getElement('@Mesh');
        if (!meshRec) return [];
        let tri = edgeLink.getData('Triangle');
        return [meshRec, tri];
    }

    dataToValue(element, data) {
        if (data < 0) return 'None';
        let [meshRec, tri] = this.resolveMeshInfo(element, data);
        if (!meshRec) return `${data}`;
        return `${data} (#${tri} in ${meshRec.name})`;
    }

    valueToData(element, value) {
        return value === 'None' ? -1 : parseInt(value);
    }

    get edge() {
        return 0;
    }
}

module.exports = Edge0Format;
