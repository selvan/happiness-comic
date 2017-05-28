let fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

let PdfPrinter = require('pdfmake');
let printer = new PdfPrinter(fonts);
let fs = require('fs');

let comic_img_name = 'comic.jpg';
let sizeOf = require('image-size');
let dimensions = sizeOf(comic_img_name);
let pict_width = dimensions.width;
let pict_height = dimensions.height;
let page_width = 147;

let scale_ratio_width = pict_width / 147;
let page_height = pict_height / scale_ratio_width;

let margin = 0.2;
let margin_left = margin;
let margin_right = margin;
let margin_top = margin;
let margin_bottom = margin;

let width_with_margin = page_width + margin_left + margin_right;
let height_with_margin = page_height + margin_top + margin_bottom;

let docDefinition = {
  // a string 'A8' or { width: number, height: number }
//   pageSize: { width: width_with_margin, height: height_with_margin + 200 },
	pageSize: { width: width_with_margin, height: height_with_margin},

  // by default we use portrait, you can change it to landscape if you wish
  // pageOrientation: 'landscape',

  // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
  pageMargins: [ margin_left, margin_right, margin_top, margin_bottom ],    
content: [
		{
			image: comic_img_name,
            width: page_width,
            height: page_height
		},
		// '\n\nCredits: \n\n',
		// 'Comic from\n',
		// { text:"http://mentirinhas.com.br/\n\n", link:"http://mentirinhas.com.br/", decoration:"underline" },
		// 'Mobile optimized PDF by selvan\n',
		// { text:"p.thamarai+happiness@ gmail.com\n", link:"mailto:p.thamarai+12lessons@gmail.com", decoration:"underline" },
]
};

let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('pdfs/happiness.pdf'));
pdfDoc.end();

console.log("Finished creating PDF");
