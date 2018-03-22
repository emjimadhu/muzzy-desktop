import fs from 'fs'
import path from 'path'

export let readDir = (dirPath) => {
  return new Promise((resolve, reject) => {
    return fs.readdir(dirPath, (err, files) => {
      if (err) return reject(err)
      return resolve(files.filter((file) => path.extname(file).toLowerCase() === '.mp3'))
    })
  })
}

export let readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    return fs.readFile(filePath, (err, file) => (err) ? reject(err) : resolve(file))
  })
}
