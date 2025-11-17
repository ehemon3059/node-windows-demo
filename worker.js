// ===========================================================
// worker.js
// This is the actual background program that runs as a
// Windows Service using node-windows.
//
// It creates a simple HTTP server and writes logs for
// every request and every event. This helps you learn how
// background services work in real Windows systems.
// ===========================================================

// Load required Node modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// -----------------------------------------------------------
// Create a folder for logs (./logs)
// __dirname = current project folder
// LOG_DIR = <project folder>/logs
// -----------------------------------------------------------
const LOG_DIR = path.join(__dirname, 'logs');

// If logs folder does not exist, create it
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// -----------------------------------------------------------
// Simple logging function
// Writes timestamped messages to logs/worker.log
// Also prints to console when running manually
// -----------------------------------------------------------
function log(...args) {
  const message = `[${new Date().toISOString()}] ${args.join(' ')}\n`;

  // Save message to worker.log file
  fs.appendFileSync(path.join(LOG_DIR, 'worker.log'), message);

  // Also show it in console (useful during dev)
  console.log(message.trim());
}

// -----------------------------------------------------------
// Create an HTTP server
// When service runs, you can open: http://localhost:3000
// -----------------------------------------------------------
const server = http.createServer((req, res) => {
  // Log every incoming request
  log('Incoming request →', req.method, req.url);

  // Simple response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node Windows Service!\n');
});

// -----------------------------------------------------------
// Choose port (default: 3000)
// You can override with environment variable PORT
// -----------------------------------------------------------
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
  log(`Worker service running on port ${PORT}`);
});

// -----------------------------------------------------------
// Graceful shutdown handlers
// These are triggered when:
// - Service stops
// - Windows sends termination signal
// - CTRL+C (when running manually)
// -----------------------------------------------------------

// Function to stop server cleanly
function shutdown(code = 0) {
  log('Shutdown initiated. Exit code:', code);

  // Close HTTP server
  server.close(() => {
    log('HTTP server closed. Exiting process...');
    process.exit(code);  // finish
  });

  // Safety timeout (force exit)
  setTimeout(() => process.exit(code), 8000).unref();
}

// Handle signals
process.on('SIGINT', () => shutdown(0));    // Ctrl+C
process.on('SIGTERM', () => shutdown(0));   // Service stop

// -----------------------------------------------------------
// Catch unexpected errors
// This prevents your service from silently crashing
// -----------------------------------------------------------
process.on('uncaughtException', (err) => {
  log('Uncaught exception:', err.stack || err);

  // Exit with error so Windows Service Manager can restart it
  shutdown(1);
});
