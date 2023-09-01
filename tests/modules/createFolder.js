import fs from 'fs'
export default async function createFolder(path = './', foldername = 'folder'){
    let fullPath = `${path}${foldername}/`
    if (fs.existsSync(fullPath)) {
        console.log(`${fullPath} already exists✅`)
        return true
    } else {
        await fs.mkdir(fullPath, (err) => {
          if (err) {
              throw err
          }
        });
    console.log(`${fullPath} created✅`);
    }
    if (fs.existsSync(fullPath)) {
        return true
    }else{
        return false
    }
}