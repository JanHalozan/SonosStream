var gui = require('nw.gui');
if (process.platform === "darwin") {
   var mb = new gui.Menu({type: 'menubar'});
   mb.createMacBuiltin('RoboPaint', {
      hideEdit: false,
   });
   gui.Window.get().menu = mb;
}
