import puppeteer from 'puppeteer'

export class PdfGeneratorService {
  static res: any

  /**
   * Set the response object.
   */
  static make(res: any) {
    this.res = res
    return this
  }

  static async generateFromHtml(html: string): Promise<Buffer> {
    try {
      // Meluncurkan browser Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Untuk server
      })

      const page = await browser.newPage()

      // Set konten HTML di halaman
      await page.setContent(html, { waitUntil: 'domcontentloaded' })

      // Generate PDF buffer
      const pdfBuffer = await page.pdf({
        format: 'A4', // Ukuran kertas
        printBackground: true, // Termasuk background CSS
      })

      // Tutup browser
      await browser.close()

      // Return PDF buffer
      return Buffer.from(pdfBuffer)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Failed to generate PDF')
    }
  }

  static async download(content: any, name = 'document.pdf') {
    const pdfBuffer = await this.generateFromHtml(content)
    this.res.header('Content-Type', 'application/pdf')
    this.res.header('Content-Disposition', `attachment; filename="${name}.pdf"`)
    return this.res.send(pdfBuffer)
  }
}
