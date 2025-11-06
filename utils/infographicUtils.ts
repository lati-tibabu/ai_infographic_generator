export const downloadInfographicAsHtml = (htmlContent: string) => {
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Infographic</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <div class="max-w-4xl mx-auto p-4">
        ${htmlContent}
      </div>
    </body>
    </html>
  `;
  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'infographic.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
