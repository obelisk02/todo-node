const fs = require('fs')
const path = require('path')
let dir = "C://Users//Darwing//Desktop"

let img=0, txt=0, folder=0

let files = fs.readdirSync(dir)

  for (let file of files){
   path.extname(file) === '.jpg' || '.png' || '.jpeg' ? img++: '';
   path.extname(file) === '.txt' ? txt++: '';
   path.extname(file) === '' ? folder++: '';
 }

  console.log(`Images: ${img} \nTexts: ${txt} \nFolders: ${folder} \n`);

  

//***************************************  */

  img = 0, txt = 0, folder = 0
  files.forEach(element => {
  
   let ext = element.split(".")
   let len = ext.length
   ext = ext[len-1]

      if (ext == "jpg" || "png") img++;
      if (ext == "txt" ) txt++;
      if (ext.length > 4 ) folder++;
  });             
  console.log(`Images: ${img} \nTexts: ${txt} \nFolders: ${folder}`);