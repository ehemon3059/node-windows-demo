// ============================================================
// service-install.js
// This script INSTALLS your Node.js program as a Windows Service.
// You run this file only once (as Administrator) to create the service.
// ============================================================

// Load required modules
const path = require('path');
const { Service } = require('node-windows');   // node-windows library for creating services

// ------------------------------------------------------------
// Create a new Service object
// This object tells Windows what your service will be called,
// what it does, and which script it should run in background.
// ------------------------------------------------------------
const svc = new Service({
  // The unique name of your Windows Service (no spaces recommended)
  name: 'NodeWindowsDemoService',

  // Description that appears inside Windows Services panel (services.msc)
  description: 'Demo Node service using node-windows',

  // The actual Node.js script that will run in the background
  // __dirname = current folder path
  script: path.join(__dirname, 'worker.js'),

  // OPTIONAL settings (examples):
  // nodeOptions: ['--max-old-space-size=256'],     // pass extra Node.js flags
  // env: [                                         // environment variables
  //   { name: 'NODE_ENV', value: 'production' },
  //   { name: 'PORT', value: '3000' }
  // ]
});

// ------------------------------------------------------------
// EVENT: When the service is successfully installed
// After installation, we automatically start the service.
// ------------------------------------------------------------
svc.on('install', () => {
  console.log('Service installed.');
  svc.start();   // Start the service immediately after install
});

// ------------------------------------------------------------
// EVENT: When service has started successfully
// ------------------------------------------------------------
svc.on('start', () => console.log('Service started.'));

// ------------------------------------------------------------
// EVENT: When the service is already installed on the system
// This prevents duplicate installation attempts.
// ------------------------------------------------------------
svc.on('alreadyinstalled', () => console.log('Service already installed.'));

// ------------------------------------------------------------
// EVENT: When Windows reports the service installation is invalid
// Usually means missing permissions or wrong configuration.
// ------------------------------------------------------------
svc.on('invalidinstallation', () => console.log('Invalid installation.'));

// ------------------------------------------------------------
// EVENT: If any error happens during installation
// ------------------------------------------------------------
svc.on('error', (err) => console.error('Service error:', err));

// ------------------------------------------------------------
// INSTALL the service
// This is the command that tells Windows:
// "Create this service and register it in the system"
// ------------------------------------------------------------
svc.install();
