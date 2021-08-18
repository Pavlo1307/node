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
    }

});

fs.mkdir(pathEight, err => {
    if (err){
        console.log(err)
    }
});

fs.writeFile(pathFileOleg, oleg, err => {
    if (err){
        console.log(err);
    }
})

fs.writeFile(pathFileDima, dima, err => {
    if (err){
        console.log(err);
    }
})

fs.writeFile(pathFileSasha, sasha, err => {
    if (err){
        console.log(err);
    }
})

fs.writeFile(pathFileVika, vika, err => {
    if (err){
        console.log(err);
    }
})

fs.writeFile(pathFileSophia, sophia, err => {
    if (err){
        console.log(err);
    }
})

fs.writeFile(pathFileDiana, diana, err => {
    if (err){
        console.log(err);
    }
})


function fileLocationReplacement(firstPath, secondPath, genderCheak) {
    fs.readdir(firstPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file=>{
            const filePath = path.join(firstPath, file);
            const filePathNew = path.join(secondPath,file);

            fs.stat(filePath, (err1, stats) => {
                if(stats.isFile()){
                    fs.readFile(filePath, (err2, data) => {
                        if(err) {
                            console.log(err);
                            return;
                        }
                        const dataFile = JSON.parse(data);

                        if(dataFile.gender === genderCheak){
                            fs.rename(filePath, filePathNew, err3 => {
                                console.log(err3);
                            });
                        }

                    });
                }
            });
        });
    });
}

fileLocationReplacement(pathSix, pathEight, "male");
fileLocationReplacement(pathEight, pathSix, "female");


