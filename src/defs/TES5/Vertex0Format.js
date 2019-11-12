const FormatDef = require('../FormatDef');

let getVertexCoordinates = function(vertex) {
    return {
        x: vertex.getValue('X'),
        y: vertex.getValue('Y'),
        z: vertex.getValue('Z')
    };
};

class Vertex0Format extends FormatDef {
    getVertex(element) {
        let verticies = element.record.getElement('NVNM\\Verticies');
        if (!verticies) return;
        return verticies._elements[this.vertexIndex];
    }

    dataToValue(element, data) {
        let vertex = this.getVertex(element);
        if (!vertex) return `${data}`;
        let {x, y, z} = getVertexCoordinates(vertex);
        return `${data} (${x}, ${y}, ${z})`;
    }

    valueToData(element, value) {
        return parseInt(value);
    }

    get vertexIndex() {
        return 0;
    }
}

module.exports = Vertex0Format;
