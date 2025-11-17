// service-uninstall.js
const path = require('path');
const { Service } = require('node-windows');

const svc = new Service({
  name: 'NodeWindowsDemoService',
  script: path.join(__dirname, 'worker.js'),
});

svc.on('uninstall', () => {
  console.log('Service uninstalled.');
});

svc.on('alreadyuninstalled', () => console.log('Service already uninstalled.'));
svc.uninstall();
