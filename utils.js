
const fs= require("fs");
const os= require("os");

/**
 * a console print function
 * maybe for writing in a temp file
 * @param {string} string string to print
 */
function print(string) {
    console.log(string);
}

/**
 *  Log Function to store logs into a file
 * 
 * @param {string} string the string which have to be logged
 * @param {string} file [Optional] path of the file where to log
 * 
 */

function log(string, file) {
    let save_file= "/home/"+os.userInfo().username+"/__Doctor/logs.txt";
    if(file) {
        save_file= file;
    }

    let d= new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                         "Aug", "Sep", "Oct", "Nov", "Dec"];

    fs.appendFile(save_file,`\n=> ${months[d.getMonth()]} ${d.getDate()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} -\n\t` 
                            +`${string}\n`, err => {
        if(err) {
            console.log(`\n\n\tan error occured 
                while storing a log...\n\n ${err} \n\n`);
        } else {
            console.log(`[Logged] \n\t${string}\n`);
        }
    });
}

module.exports= {
    print,
    log,
}
