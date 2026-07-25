// Opens a print-ready certificate in a new tab. Using a standalone HTML
// document (rather than fighting the app's own stylesheet with @media print
// rules) keeps this simple and reliable across browsers/devices.
export function openCertificate({ studentName, subtitle, date }) {
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Certificate of Achievement</title>
<style>
  @page { size: landscape; margin: 0; }
  body {
    margin: 0;
    font-family: 'Georgia', serif;
    background: #fdf6e3;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .cert {
    width: 900px;
    max-width: 95vw;
    border: 14px solid #ffb703;
    outline: 4px solid #1fb0ff;
    outline-offset: -22px;
    border-radius: 24px;
    padding: 48px 56px;
    text-align: center;
    background: white;
  }
  .sun { font-size: 56px; }
  h1 { font-size: 36px; color: #0b6fb3; margin: 8px 0; letter-spacing: 1px; }
  h2 { font-size: 20px; color: #7038c2; font-weight: normal; margin: 0 0 24px; }
  .name { font-size: 44px; color: #e34527; margin: 20px 0; font-family: 'Brush Script MT', cursive, Georgia; border-bottom: 3px solid #ffcf40; display: inline-block; padding: 0 20px 8px; }
  .subtitle { font-size: 18px; color: #3a3552; margin: 16px 0 32px; }
  .footer { display: flex; justify-content: space-between; margin-top: 40px; font-size: 14px; color: #3a3552; }
  .school { font-size: 14px; color: #8c52e0; margin-top: 4px; }
  @media print {
    body { background: white; }
  }
</style>
</head>
<body>
  <div class="cert">
    <div class="sun">☀️🏆☀️</div>
    <h1>Certificate of Achievement</h1>
    <h2>Sunny Summer Explorers — Grade 2 Summer Homework Portal</h2>
    <p style="font-size:18px;color:#3a3552;">This certificate is proudly presented to</p>
    <div class="name">${studentName}</div>
    <p class="subtitle">${subtitle}</p>
    <div class="footer">
      <div>Date: ${date}</div>
      <div>Keep exploring, keep learning! 🌟</div>
    </div>
    <div class="school">Bright Riders School, Dubai — Grade 2 (French Section)</div>
  </div>
  <script>window.onload = () => setTimeout(() => window.print(), 300);</script>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}
