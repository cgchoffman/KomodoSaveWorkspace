if (typeof(ko.extensions) == "undefined") {
    ko.extensions = {}
}
ko.extensions.workspace = {};

workLog = ko.logging.getLogger("Workspace");

/**
 * Collect path to all open files
 * @returns (Array) all open file paths
 */
ko.extensions.workspace.collectOpenViewPaths = function(){
    var curPaths = [];
    var curViews = ko.views.manager.getAllViews;
    for (var i = 0; i < curPaths.length; i++){
        try{
            var viewPath = curViews[i].koDoc.file.path;
        } catch (TypeError) {
            workLog.warn(e, "'No koDoc': Could not load file path.")
            // Might as well skip this loop with no file path
            continue;
        }
        // Don't need the start page to reload
        if (viewPath.contains("startpage")){
            continue;
        }
        curPaths.push(viewPath);
    }
    return curPaths;
}

/**
 * Open dialog to allow user to pick location to save workspace file
 * @returns {String} path to save location
 */
ko.extensions.workspace.pickSpaceSavePath = function(saveFile){
    // XXX use lastSavedWorkspace var to get default path
    var defaultDir; // XX This has to be a path not to a file
    if (typeof(saveFile) == "undefine") {
        defaultDir = this.getDefaultDir();  
    } else {
        defaultDir = 
    }
    
    var spaceFile = ko.filepicker.saveFile(defaultDir,
                                           "MySpace.komodospace",
                                           "Open Workspace File"
                                           //["Workspace"] // I doubt it's this easy to show only *.workspace files.
                                           )
    return saveFilePath;
}

/**
 * Create file at user specified location with all currentView paths
 */
ko.extensions.workspace.saveWorkspace = function (){
    var saveFile = ko.extensions.workspace.lastSavedWorkspace;
    saveFile = this.pickSpaceSavePath(saveFile);
    var workspace = this.collectOpenViewPaths();
    var fileEx = Components.classes["@activestate.com/koFileEx;1"]
                .createInstance(Components.interfaces.koIFileEx);
    fileEx.URI = saveFile;
    fileEx.open('wb+');
    fileEx.puts(JSON.stringify(workspace));
    fileEx.close();
    // Set saveFile as prop to use during later Saves.
    ko.extensions.workspace.lastSavedWorkspace = saveFile;
    
}

/**
 * Open a ko.filepicker to grab the workspace file the user wants to open
 * @returns {String} file path to workspace file
 */
ko.extensions.workspace.pickSpaceFile = function (viewtype) {
    var defaultDir;
    defaultDir = this.ko.extensions.workspace.getDefaultDir();
    var spaceFile = ko.filepicker.openFile(defaultDir,
                                           "MySpace.komodospace",
                                           "Open Workspace File"
                                           //"Workspace",  I doubt it's this easy to show only *.workspace files.
                                           )
    return spaceFile;
}

/**
 * Try to guess a default path to open to, return null otherwise
 * @returns {String} string of path to use as default save/open location
 */
ko.extensions.workspace.getDefaultDir= function() {
    var defaultDir = null;
    var project = ko.projects.manager.currentProject;
    var koDoc =  ko.views.manager.currentView.koDoc;
    if (project) {
        defaultDir = project.liveDirectory;
    }
    else if(koDoc){
        defaultDir = koDoc.file.dirName;
    }
    return defaultDir;
}


ko.extensions.workspace.openViewsFromPathList = function(pathlist){
    ko.views.manager.newViewFromURIAsync;
}