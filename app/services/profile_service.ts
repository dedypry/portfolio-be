export class ProfileService {
  static generateContent({ content }: { content: any }) {
    return this.layoutPDF({
      header: 'Profile',
      content,
    })
  }

  static layoutPDF({ pageSize = 'A4', header = '', content = [] }) {
    return {
      pageMargins: [40, 70, 40, 30],
      pageSize: pageSize,
      header: [
        {
          margin: [30, 10, 30, 0],
          alignment: 'justify',
          columns: [
            [
              {
                text: 'PT. VIGO TECHNOLOGY INDONESIA',
                fontSize: 8,
                margin: [12, 0, 0, 5],
              },
            ],
            {
              width: '*',
              text: header,
              style: 'h1',
              alignment: 'right',
              fontSize: 14,
              bold: true,
            },
          ],
        },
      ],
      content: content,
      defaultStyle: {
        font: 'Poppins',
        lineHeight: 1,
      },
    }
  }
}
