// =====================================================
// service-control.js
// A simple controller to START, STOP, RESTART & CHECK
// the status of a Windows Service created with node-windows.
// =====================================================

// Load system modules
const path = require('path');
const { Service } = require('node-windows');  // node-windows library
const { exec } = require('child_process');    // used for "sc query" command

// The name of the Windows Service (IMPORTANT: must match exactly)
const NAME = 'NodeWindowsDemoService';

// Create a Service object pointing to the service definition
// Even if the service is not installed yet, this object lets us call start/stop/restart
const svc = new Service({
  name: NAME,
  script: path.join(__dirname, 'worker.js'), // points to your worker file
});

// Read the command (start/stop/restart/status) from the terminal
const cmd = process.argv[2];

// ---------------------------------------------
// Function: Check if the service exists + status
// Uses Windows command: sc query "ServiceName"
// ---------------------------------------------
function scQuery(callback) {
  exec(`sc query "${NAME}"`, (err, stdout) => {
    if (err) {
      // Service does not exist or other error
      return callback(null, null);
    }

    // Convert output to string
    const output = stdout.toString();

    // Extract service state: RUNNING, STOPPED, etc.
    const match = output.match(/STATE\s*:\s*\d+\s+([A-Z_]+)/i);
    const state = match ? match[1].toUpperCase() : 'UNKNOWN';

    callback(null, state);
  });
}

// ---------------------------------------------
// Validate command
// ---------------------------------------------
if (!cmd || !['start', 'stop', 'restart', 'status'].includes(cmd)) {
  console.error('Usage: node service-control.js <start|stop|restart|status>');
  process.exit(1);
}

// ---------------------------------------------
// COMMAND: STATUS
// ---------------------------------------------
if (cmd === 'status') {
  scQuery((_, state) => {
    if (!state) {
      console.log(`${NAME} status: NOT INSTALLED`);
      return;
    }
    console.log(`${NAME} status: ${state}`);
  });
}

// ---------------------------------------------
// COMMAND: START
// ---------------------------------------------
if (cmd === 'start') {
  scQuery((_, state) => {
    if (!state) {
      console.error(`${NAME} is not installed. Run install script first.`);
      return;
    }

    svc.on('start', () => console.log('Service started.'));
    svc.on('alreadyrunning', () => console.log('Service already running.'));
    svc.on('error', (e) => console.error('Error:', e));

    svc.start(); // <-- START the service
  });
}

// ---------------------------------------------
// COMMAND: STOP
// ---------------------------------------------
if (cmd === 'stop') {
  scQuery((_, state) => {
    if (!state) {
      console.error(`${NAME} is not installed.`);
      return;
    }

    svc.on('stop', () => console.log('Service stopped.'));
    svc.on('error', (e) => console.error('Error:', e));

    svc.stop(); // <-- STOP the service
  });
}

// ---------------------------------------------
// COMMAND: RESTART
// ---------------------------------------------
if (cmd === 'restart') {
  scQuery((_, state) => {
    if (!state) {
      console.error(`${NAME} is not installed.`);
      return;
    }

    svc.on('stop', () => {
      console.log('Service stopped. Restarting...');
      svc.start();
    });

    svc.on('start', () => console.log('Service restarted.'));
    svc.on('error', (e) => console.error('Error:', e));

    svc.stop(); // <-- First stop, then start again
  });
}
