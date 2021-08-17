const fs = (require('fs'));
const path = require('path');

const oleg = '{"name": "Oleg", "gender":"male"}'
const dima = '{"name": "Dima", "gender":"male"}'
const sasha = '{"name": "Sasha", "gender":"male"}'
const vika = '{"name": "Vika", "gender":"female"}'
const sophia = '{"name": "Sophia", "gender":"female"}'
const diana = '{"name": "Diana", "gender":"female"}'

const pathSix = path.join(__dirname, 'six')
const pathEight = path.join(__dirname, 'eight')
const pathFileOleg = path.join(pathSix, 'oleg.txt')
const pathFileDima = path.join(pathSix, 'dima.txt')
const pathFileSasha = path.join(pathSix, 'sasha.txt')
const pathFileVika = path.join(pathEight, 'vika.txt')
const pathFileSophia = path.join(pathEight, 'sophia.txt')
const pathFileDiana = path.join(pathEight, 'diana.txt')




fs.mkdir(pathSix, err => {
    if (err){
    console.log(err)
        return;
    }

});

fs.mkdir(pathEight, err => {
    if (err){
        console.log(err)
        return
    }
});

fs.writeFile(pathFileOleg, oleg, err => {
    if (err){
        console.log(err)
        return;
    }
})

fs.writeFile(pathFileDima, dima, err => {
    if (err){
        console.log(err)
        return;
    }
})

fs.writeFile(pathFileSasha, sasha, err => {
    if (err){
        console.log(err)
        return;
    }
})

fs.writeFile(pathFileVika, vika, err => {
    if (err){
        console.log(err)
        return;
    }
})

fs.writeFile(pathFileSophia, sophia, err => {
    if (err){
        console.log(err)
        return;
    }
})

fs.writeFile(pathFileDiana, diana, err => {
    if (err){
        console.log(err)
        return;
    }
})


fs.readdir(pathSix, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(file=>{
        const filePath = path.join(pathSix, file)
        const filePathNew = path.join(pathEight,file)
        fs.stat(filePath, (err1, stats) => {
            if(stats.isFile()){
               fs.readFile(filePath, (err2, data) => {
                   if(err) {
                       console.log(err);
                       return;
                   }
                  let dataFile = JSON.parse(data)
                   if(dataFile.gender === "male"){
                       fs.rename(filePath, filePathNew, err3 => {
                           console.log(err3)
                       })
                   }

               })
            }
        })
    })
})


fs.readdir(pathEight, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(file=>{
        const filePath = path.join(pathEight, file)
        const filePathNew = path.join(pathSix,file)
        fs.stat(filePath, (err1, stats) => {
            if(stats.isFile()){
                fs.readFile(filePath, (err2, data) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    let dataFile = JSON.parse(data)
                    if(dataFile.gender === "female"){
                        fs.rename(filePath, filePathNew, err3 => {
                            console.log(err3)
                        })
                    }

                })
            }
        })
    })
})



