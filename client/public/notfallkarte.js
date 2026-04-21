(function () {
  function scaleToFit() {
    const pageWrapper = document.getElementById("pw");
    if (!pageWrapper) return;

    const pageWidth = 210 * 3.7795; // mm to px at 96dpi
    const availableWidth = window.innerWidth - 40;
    const scale = availableWidth < pageWidth ? availableWidth / pageWidth : 1;

    pageWrapper.style.transform = `scale(${scale})`;
    pageWrapper.style.marginBottom =
      scale < 1 ? `${297 * 3.7795 * scale - 297 * 3.7795}px` : "0";
  }

  const printButton = document.getElementById("print-notfallkarte");
  if (printButton) {
    printButton.addEventListener("click", () => {
      window.print();
    });
  }

  scaleToFit();
  window.addEventListener("resize", scaleToFit);
})();
