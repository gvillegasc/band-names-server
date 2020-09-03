const { io } = require('../index');
const BandsModel = require('../models/bands.model');
const BandModel = require('../models/band.model');

const bands = new BandsModel();

bands.addBand(new BandModel('Queen'));
bands.addBand(new BandModel('The Score'));
bands.addBand(new BandModel('Artick Monkeys'));
bands.addBand(new BandModel('Daft Punk'));

// console.log(bands);
io.on('connection', (client) => {
	client.emit('active-bands', bands.getBands());
	// console.log('Cliente conectado');
	client.on('disconnect', () => {
		console.log('Cliente desconectado');
	});

	client.on('mensaje', (payload) => {
		console.log('Mensaje', payload);
		io.emit('mensaje', { admin: 'Nuevo mensaje' });
	});

	client.on('emitir-mensaje', (payload) => {
		// io.emit('nuevo-mensaje', payload); //emite a todos;
		client.broadcast.emit('nuevo-mensaje', payload);
	});
});
