const mongoose = require('mongoose');

const universidadSchema = new mongoose.Schema({
    nommbre: { type: String, required: true },
    provincia: { type: String, required: true },
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    web: { type: String, required: true },
    coordenadas: {type : [Number], required: true, index: '2dsphere'},
    carreras_grado: [{
        nombre_carrera: { type: String, required: true },
        duracion: { type: Number, required: true }
    }],
    comentarios: [{
        usuario : {type: String, required : true},
        foto : {type: String},
        comentario : {type: String, required : true}
    }]
});

mongoose.model('Universidad', universidadSchema, 'universidades');
