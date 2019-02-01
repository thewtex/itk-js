import test from 'ava'
import path from 'path'

const IntTypes = require(path.resolve(__dirname, '..', 'dist', 'IntTypes.js'))
const PixelTypes = require(path.resolve(__dirname, '..', 'dist', 'PixelTypes.js'))
const readLocalFile = require(path.resolve(__dirname, '..', 'dist', 'readLocalFile.js'))

const testImageFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'cthead1.png')
const testVTKImageFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'ironProt.vtk')

//test('readLocalFile reads an image file path given on the local filesystem', t => {
  //return readLocalFile(testImageFilePath).then(function (image) {
    //t.is(image.imageType.dimension, 2)
    //t.is(image.imageType.componentType, IntTypes.UInt8)
    //t.is(image.imageType.pixelType, PixelTypes.RGB)
    //t.is(image.imageType.components, 3)
    //t.is(image.origin[0], 0.0)
    //t.is(image.origin[1], 0.0)
    //t.is(image.spacing[0], 1.0)
    //t.is(image.spacing[1], 1.0)
    //t.is(image.direction.getElement(0, 0), 1.0)
    //t.is(image.direction.getElement(0, 1), 0.0)
    //t.is(image.direction.getElement(1, 0), 0.0)
    //t.is(image.direction.getElement(1, 1), 1.0)
    //t.is(image.size[0], 256)
    //t.is(image.size[1], 256)
    //t.is(image.data.length, 196608)
  //})
//})

test('Test reading a VTK legacy image file', t => {
  return readLocalFile(testVTKImageFilePath).then(function (image) {
    t.is(image.imageType.dimension, 3, 'dimension')
    t.is(image.imageType.componentType, IntTypes.UInt8, 'componentType')
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
    t.is(image.size[0], 68, 'size[0]')
    t.is(image.size[1], 68, 'size[1]')
    t.is(image.size[2], 68, 'size[2]')
    t.is(image.data.length, 314432, 'data.length')
    t.is(image.data[1000], 0, 'data[1000]')
  })
})
