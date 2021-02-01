const electron = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const { app, BrowserWindow } = electron;

// simple parameters initialization
const electronConfig = {
  URL_LAUNCHER_TOUCH: process.env.URL_LAUNCHER_TOUCH === "1" ? 1 : 0,
  URL_LAUNCHER_TOUCH_SIMULATE:
    process.env.URL_LAUNCHER_TOUCH_SIMULATE === "1" ? 1 : 0,
  URL_LAUNCHER_FRAME: process.env.URL_LAUNCHER_FRAME === "1" ? 1 : 0,
  URL_LAUNCHER_KIOSK: process.env.URL_LAUNCHER_KIOSK === "1" ? 1 : 0,
  URL_LAUNCHER_NODE: process.env.URL_LAUNCHER_NODE === "1" ? 1 : 0,
  URL_LAUNCHER_WIDTH: parseInt(process.env.URL_LAUNCHER_WIDTH || 1920, 10),
  URL_LAUNCHER_HEIGHT: parseInt(process.env.URL_LAUNCHER_HEIGHT || 1080, 10),
  URL_LAUNCHER_TITLE: process.env.URL_LAUNCHER_TITLE || "BALENA.IO",
  URL_LAUNCHER_CONSOLE: process.env.URL_LAUNCHER_CONSOLE === "1" ? 1 : 0,
  URL_LAUNCHER_URL:
    process.env.URL_LAUNCHER_URL ||
    `file:///${path.join(__dirname, "build", "index.html")}`,
  URL_LAUNCHER_ZOOM: parseFloat(process.env.URL_LAUNCHER_ZOOM || 1.0),
  URL_LAUNCHER_OVERLAY_SCROLLBARS:
    process.env.URL_LAUNCHER_OVERLAY_SCROLLBARS === "1" ? 1 : 0,
  ELECTRON_ENABLE_HW_ACCELERATION:
    process.env.ELECTRON_ENABLE_HW_ACCELERATION === "1",
  ELECTRON_BALENA_UPDATE_LOCK: process.env.ELECTRON_BALENA_UPDATE_LOCK === "1",
  ELECTRON_APP_DATA_DIR: process.env.ELECTRON_APP_DATA_DIR,
  ELECTRON_USER_DATA_DIR: process.env.ELECTRON_USER_DATA_DIR,
};

// Global env from balena
global.balenaEnv = process.env;

// Enable / disable hardware acceleration
if (
  !electronConfig.ELECTRON_ENABLE_HW_ACCELERATION &&
  app.disableHardwareAcceleration
) {
  app.disableHardwareAcceleration();
}

// enable touch events if your device supports them
if (electronConfig.URL_LAUNCHER_TOUCH) {
  app.commandLine.appendSwitch("--touch-devices");
}
// simulate touch events - might be useful for touchscreen with partial driver support
if (electronConfig.URL_LAUNCHER_TOUCH_SIMULATE) {
  app.commandLine.appendSwitch("--simulate-touch-screen-with-mouse");
}

// Override the appData directory
// See https://electronjs.org/docs/api/app#appgetpathname
if (electronConfig.ELECTRON_APP_DATA_DIR) {
  electron.app.setPath("appData", electronConfig.ELECTRON_APP_DATA_DIR);
}

// Override the userData directory
// NOTE: `userData` defaults to the `appData` directory appended with the app's name
if (electronConfig.ELECTRON_USER_DATA_DIR) {
  electron.app.setPath("userData", electronConfig.ELECTRON_USER_DATA_DIR);
}

if (process.env.NODE_ENV === "development") {
  console.log("Running in development mode");
  Object.assign(electronConfig, {
    URL_LAUNCHER_HEIGHT: 600,
    URL_LAUNCHER_WIDTH: 800,
    URL_LAUNCHER_KIOSK: 0,
    URL_LAUNCHER_CONSOLE: 1,
    URL_LAUNCHER_FRAME: 1,
  });
}

// Listen for a 'update-lock' to either enable, disable or check
// the update lock from the renderer process (i.e. the app)
if (electronConfig.ELECTRON_BALENA_UPDATE_LOCK) {
  const lockFile = require("lockfile");
  electron.ipcMain.on("update-lock", (event, command) => {
    switch (command) {
      case "lock":
        lockFile.lock("/tmp/balena/updates.lock", (error) => {
          event.sender.send("update-lock", error);
        });
        break;
      case "unlock":
        lockFile.unlock("/tmp/balena/updates.lock", (error) => {
          event.sender.send("update-lock", error);
        });
        break;
      case "check":
        lockFile.check("/tmp/balena/updates.lock", (error, isLocked) => {
          event.sender.send("update-lock", error, isLocked);
        });
        break;
      default:
        event.sender.send(
          "update-lock",
          new Error(`Unknown command "${command}"`)
        );
        break;
    }
  });
}

/*
 we initialize our application display as a callback of the electronJS "ready" event
 */
app.on("ready", () => {
  // here we actually configure the behavour of electronJS
  mainWindow = new BrowserWindow({
    width: electronConfig.URL_LAUNCHER_WIDTH,
    height: electronConfig.URL_LAUNCHER_HEIGHT,
    frame: !!electronConfig.URL_LAUNCHER_FRAME,
    title: electronConfig.URL_LAUNCHER_TITLE,
    kiosk: !!electronConfig.URL_LAUNCHER_KIOSK,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      zoomFactor: electronConfig.URL_LAUNCHER_ZOOM,
      overlayScrollbars: !!electronConfig.URL_LAUNCHER_OVERLAY_SCROLLBARS,
    },
  });

  mainWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      mainWindow.show();
    }, 300);
    //mainWindow.openDevTools();
    mainWindow.webContents.send("store-data", "test");
  });

  // if the env-var is set to true,
  // a portion of the screen will be dedicated to the chrome-dev-tools
  if (electronConfig.URL_LAUNCHER_CONSOLE) {
    mainWindow.webContents.openDevTools();
  }

  process.on("uncaughtException", (err) => {
    console.log(err);
  });

  // the big red button, here we go
  mainWindow.loadURL(electronConfig.URL_LAUNCHER_URL);
});
