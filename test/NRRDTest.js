const test = require('ava')
const path = require('path')

const FloatTypes = require(path.resolve(__dirname, '..', 'dist', 'FloatTypes.js'))
const PixelTypes = require(path.resolve(__dirname, '..', 'dist', 'PixelTypes.js'))
const readImageLocalFile = require(path.resolve(__dirname, '..', 'dist', 'readImageLocalFile.js'))
const writeImageLocalFile = require(path.resolve(__dirname, '..', 'dist', 'writeImageLocalFile.js'))

const testInputFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'vol-raw-little.nrrd')
const testOutputFilePath = path.resolve(__dirname, '..', 'build', 'Testing', 'Temporary', 'NRRDTest-vol-raw-little.nrrd')

const verifyImage = (t, image) => {
  t.is(image.imageType.dimension, 3, 'dimension')
  t.is(image.imageType.componentType, FloatTypes.Float64, 'componentType')
  t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
  t.is(image.imageType.components, 1, 'components')
  t.is(image.origin[0], 0.0, 'origin[0]')
  t.is(image.origin[1], 0.0, 'origin[1]')
  t.is(image.origin[2], 0.0, 'origin[2]')
  t.is(image.spacing[0], 1.0, 'spacing[0]')
  t.is(image.spacing[1], 1.0, 'spacing[1]')
  t.is(image.spacing[2], 1.0, 'spacing[2]')
  t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
  t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
  t.is(image.direction.getElement(0, 2), 0.0, 'direction (0, 2)')
  t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
  t.is(image.direction.getElement(1, 1), 1.0, 'direction (1, 1)')
  t.is(image.direction.getElement(1, 2), 0.0, 'direction (1, 2)')
  t.is(image.direction.getElement(2, 0), 0.0, 'direction (2, 0)')
  t.is(image.direction.getElement(2, 1), 0.0, 'direction (2, 1)')
  t.is(image.direction.getElement(2, 2), 1.0, 'direction (2, 2)')
  t.is(image.size[0], 5, 'size[0]')
  t.is(image.size[1], 6, 'size[1]')
  t.is(image.size[2], 7, 'size[2]')
  t.is(image.data.length, 210, 'data.length')
  t.is(image.data[2], 5.0, 'data[2]')
}

test('Test reading a NRRD file', t => {
  return readImageLocalFile(testInputFilePath).then(function (image) {
    verifyImage(t, image)
  })
})

test('Test writing a NRRD file', t => {
  return readImageLocalFile(testInputFilePath).then(function (image) {
    const useCompression = false
    return writeImageLocalFile(useCompression, image, testOutputFilePath)
  })
    .then(function () {
      return readImageLocalFile(testOutputFilePath).then(function (image) {
        verifyImage(t, image)
      })
    })
})
