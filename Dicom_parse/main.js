
const os= require("os");
const fs= require("fs");
const dicomParser= require("dicom-parser");

const path= `/home/${os.userInfo().username}/MRI_Files/`;


/**
 * 
 * a log Function 
 * 
 * @param {string} string data to be logged
 */

function log(string) {
    let save_file= "/home/"+os.userInfo().username+"/__Doctor/DataPrepLogs.txt";

    let data= string;
    if(typeof(string) == "object") {
        data= JSON.stringify(data);
    }

    let d= new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                         "Aug", "Sep", "Oct", "Nov", "Dec"];

    fs.appendFile(save_file,`\n=> ${months[d.getMonth()]} ${d.getDate()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} -\n\t` 
                            +`${data}\n`, err => {
        if(err) {
            console.log(`\n\n\tan error occured 
                while storing a log...\n\n ${err} \n\n`);
        } else {
            console.log(`[Logged] \n\t${data}\n`);
        }
    });
}


/**
 * Read a directory and returns a promise as array of file/folder names
 * 
 * @param {string} path path of folder to read
 */

function readDir(path) {
    return new Promise((resolve, reject)=> {
        fs.readdir(path, (err, files) => {
            if(err) {
                reject(err);
            }
            resolve(files);
        });
    });
}


/**
 * Cheak if a path is file or directory
 * 
 * @param {string} file full path of file
 */

function isDir(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if(err) {
                reject(err);
            }
            resolve(stats.isDirectory());
        });
    });
}

/**
 * Cheak if a path is file or directory
 * 
 * @param {string} file full path of file
 */

function isFile(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if(err) {
                reject(err);
            }
            resolve(stats.isFile());
        });
    });
}

/**
 * 
 * visits a folder Recursivly & callback with file name
 * 
 * @param {string} path path of folder to be read recursivly
 */
function visitRecursively(path, fileCallback) {
    /*
    readDir(path)
    .then(files => {
        for(let i=0; i<files.length; i++) {
            let curFile= `${path}/${files[i]}`;
            isDir(curFile)
            .then(res => {
                if(res) {
                    visitRecursively(curFile, fileCallback);
                } else {
                    fileCallback(curFile);
                }
            })
        };
    })
    .catch(err => {
        log(err);
    })
    */

    isDir(path)
    .then(res => {
        if(res) { //is a folder, go deeper
            readDir(path)
            .then(files=> {
                for(let i=0; i<files.length; i++) {
                    let curFile= `${path}/${files[i]}`;
                    visitRecursively(curFile, fileCallback);
                }
            })
            .catch(err => {
                log("Error while Traversing..\n"+ JSON.stringify(err));
            })
        } else { //is a file, use callback
            fileCallback(path);
        }
    })
    .catch(err=> {
        log("Error while reading file..\n"+ JSON.stringify(err));
    })
}


function readDCM(file) {
    let f= fs.readFile(file, (err, data) => {
        if(err) {
            return console.log(err);
        }
        data= new Uint8Array(data);
        try
        {
            // Parse the byte array to get a DataSet object that has the parsed contents
            var dataSet = dicomParser.parseDicom(data);

            // get the pixel data element (contains the offset and length of the data)
            var pixelDataElement = dataSet.elements.x7fe00010;

            // create a typed array on the pixel data (this example assumes 16 bit unsigned data)
            var pixelData = new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset);

            console.log(pixelData.toString());
        }
        catch(ex)
        {
        console.log('Error parsing byte stream', ex);
        }
    })
}

readDCM("/home/john/Desktop/000143.dcm");
Syncing Required... file store