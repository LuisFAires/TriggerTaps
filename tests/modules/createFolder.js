import fs from 'fs'
export default async function createFolder(path = './', foldername = 'folder'){
    let fullPath = `${path}${foldername}/`
    if (fs.existsSync(fullPath)) {
        console.log(`${fullPath} already exists✅`)
        return {result: true, function: 'createFolder'}
    } else {
        await fs.mkdir(fullPath, (err) => {
          if (err) {
              throw err
          }
        });
    console.log(`${fullPath} created✅`);
    }
    if (fs.existsSync(fullPath)) {
        return {result: true, function: 'createFolder'}
    }else{
        return {result: false, function: 'createFolder'}
    }

}