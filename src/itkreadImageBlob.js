const PromiseWorker = require('promise-worker-transferable')
const PromiseFileReader = require('promise-file-reader')

const config = require('./itkConfig.js')

const worker = new window.Worker(config.webWorkersPath + '/ImageIOWorker.js')
const promiseWorker = new PromiseWorker(worker)

/**
 * @param: blob Blob that contains the file contents
 * @param: fileName string that contains the file name
 * @param: mimeType optional mime-type string
 */
const readImageBlob = (blob, fileName, mimeType) => {
  return PromiseFileReader.readAsArrayBuffer(blob)
    .then(arrayBuffer => {
      return promiseWorker.postMessage({ name: fileName, type: mimeType, buffer: arrayBuffer, config: config },
        [arrayBuffer])
    })
}

module.exports = readImageBlob