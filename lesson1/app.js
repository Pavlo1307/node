const fs = (require('fs'));
const path = require('path');

const users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
]

const pathManOlder20 = path.join(__dirname, 'manOlder20');
const pathManYounger20 = path.join(__dirname, 'manYounger20');
const pathWomanOlder20 = path.join(__dirname, 'womanOlder20');
const pathWomanYounger20 = path.join(__dirname, 'womanYounger20');

fs.mkdir(pathManOlder20, err => {
    if (err) {
        console.log(err)
        return;
    }
    fs.mkdir(pathManYounger20, err1 => {
        if (err1) {
            console.log(err1)
            return;
        }
        fs.mkdir(pathWomanOlder20, err2 => {
            if (err2) {
                console.log(err2)
                return;
            }
            fs.mkdir(pathWomanYounger20, err3 => {
                if (err3) {
                    console.log(err3)
                    return;
                }
                for (const user of users) {
                    if(user.gender === "female") {
                        if (user.age<=20){
                            const pathCreateWomanYounger20 = path.join(pathWomanYounger20, user.name)
                            fs.writeFile(pathCreateWomanYounger20, JSON.stringify(user), err => {
                                if (err){
                                    console.log(err);
                                }
                            })
                        }
                        else{
                            const pathCreateWomanOlder20 = path.join(pathWomanOlder20, user.name)
                            fs.writeFile(pathCreateWomanOlder20, JSON.stringify(user), err => {
                                if (err){
                                    console.log(err);
                                }
                            })
                        }

                    }
                    else{
                        if( user.age <= 20) {
                            const pathCreateManYounger20 = path.join(pathManYounger20, user.name)
                            fs.writeFile(pathCreateManYounger20, JSON.stringify(user), err => {
                                if (err){
                                    console.log(err);
                                }
                            })

                        }
                        else{
                            const pathCreateManOlder20 = path.join(pathManOlder20, user.name)
                            fs.writeFile(pathCreateManOlder20, JSON.stringify(user), err => {
                                if (err){
                                    console.log(err);
                                }
                            })
                        }
                    }
                }
            })
        })
    })
})



