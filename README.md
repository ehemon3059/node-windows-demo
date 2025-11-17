# 🖥️ Node Windows Service Demo

A simple project that demonstrates how to create, install, run, stop, restart, and uninstall a **Windows Service** using **Node.js** and **node-windows**.

This project is perfect for beginners who want to learn:

* How Windows background services work
* How to run Node.js scripts as real Windows Services
* How to build background engines for desktop applications (like Electron apps)
* How to manage services using Node scripts and PowerShell

---

# 🚀 Features

* Runs a Node.js script (`worker.js`) as a background Windows Service
* Automatically creates logs in a `logs/` folder
* Provides start/stop/restart/status commands
* Installs/uninstalls cleanly using node-windows
* Demonstrates real-world background service development
* Beginner-friendly structure and fully commented code

---

# 📁 Project Structure

```
node-windows-demo/
│
├── worker.js               # The background server logic (runs as a service)
├── service-install.js      # Installs the Windows Service
├── service-uninstall.js    # Uninstalls the Windows Service
├── service-control.js      # Start/Stop/Restart/Status commands
├── package.json            # NPM scripts and dependencies
├── logs/                   # Auto-created folder for service logs
└── node_modules/           # Installed dependencies
```

---

# ⚙️ Prerequisites

* Windows 10/11
* Node.js (v16+) installed
* PowerShell or CMD with **Run as Administrator** permissions
* Git (optional)

---

# 📦 Installation

Install dependencies:

```bash
npm install
```

---

# 🛠️ Installing the Windows Service

⚠️ **Important:** You MUST run this in **Administrator PowerShell**.

```powershell
npm run install:service
```

You should see:

```
Service installed.
Service started.
```

Now the service is running in the background.

---

# ▶️ Controlling the Service

All commands must be run in **Administrator PowerShell**.

### Start the service

```powershell
npm run svc:start
```

### Stop the service

```powershell
npm run svc:stop
```

### Restart the service

```powershell
npm run svc:restart
```

### Check status

```powershell
npm run svc:status
```

---

# 🔍 Viewing Logs

The service creates logs automatically inside:

```
logs/worker.log
```

Open it to see:

* Startup logs
* Requests to the worker server
* Errors
* Shutdown messages

---

# 🌐 Testing the Background Server

The service runs an HTTP server on port **3000**.

Visit:

```
http://localhost:3000
```

You should see:

```
Hello from Node Windows Service!
```

---

# ❌ Uninstalling the Service

If you want to remove the service:

```powershell
npm run uninstall:service
```

This will unregister the service from Windows.

---

# 🎯 What You Can Build After Learning This

Now that you understand Windows background services, you can build:

* Electron apps with background engines
* Auto-update services
* File sync services (like Dropbox)
* System monitoring tools
* Local background servers
* Automation tools
* Task schedulers
* Developer utilities and agents
* Offline desktop apps with background processes

This is the foundation of professional desktop app development.

---

# 🧰 Technologies Used

* **Node.js** — JavaScript runtime
* **node-windows** — Windows Service manager for Node
* **PowerShell** / **CMD** — Windows administration tools

---

# 👨‍💻 Author

**Eh Emon**

---

---

If you want, I can also generate:

✅ A professional GitHub repository layout
✅ A setup guide image banner
✅ A version with screenshots
✅ A more advanced README with Electron integration

Just tell