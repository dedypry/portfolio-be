import FileValidatorException from '#exceptions/file_validator_exception'
import drive from '@adonisjs/drive/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs'

export default class FilesController {
  async uploadFile({ request, response }: HttpContext) {
    const file = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'gif', 'PNG'],
    })

    if (!file?.isValid) {
      throw new FileValidatorException(file!.errors)
    }
    if (!file.tmpPath) {
      throw new Error('Temporary file path not found.')
    }

    // Baca file dari lokasi sementara
    const fileContent = fs.readFileSync(file.tmpPath)

    // Upload ke S3
    const fileName = `uploads/${new Date().getTime()}.${file.extname}`
    const url = await drive.use('s3').put(fileName, fileContent)

    console.log('Uploaded file URL:', url)

    return response.json({
      message: 'File uploaded successfully',
      data: file,
      url: await drive.use('s3').getUrl(fileName),
    })
  }
}
