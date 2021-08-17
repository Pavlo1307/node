// function test() {
//     console.log('call')
// }
//
// console.log(__dirname);
// console.log(__filename);
//
// module.exports = {
//     greeting: function (name) {
//         console.log('hello', name);
//     }
// }

const fs = require('fs')
const path =require('path')

const textPath = path.join(__dirname, 'text.txt');



// fs.writeFile(textPath,'Hello',err => {
//     console.log(err)
// })

// fs.appendFile(textPath,'bla bla \n', err => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('well done')
//
//
// })

// fs.readFile(textPath, (err, data) => {
//     if (err){
//         console.log(err);
//         return
//     }
//     console.log(data.toString());
// })

// fs.readdir(__dirname, (err, files) => {
//     if (err){
//         console.log(err);
//         return
//     }
//     console.log(files);
//     files.forEach(file=>{
//         const filePath = path.join(__dirname,file);
//         fs.stat(filePath, (err1, stats) => {
//             console.log(stats.isDirectory());
//         })
//         console.log(file)
//     })
// })





