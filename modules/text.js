let c = document.getElementById('canvas').getContext('2d');

export function text(str, x, y, styles = {}){
    let cl = styles.color ||  "#ddd"; //fallback styles if none are provided
    let sz = styles.size || 40;
    let f = styles.font || "Roboto Slab";
    let w = styles.weight || "300";
    let a = styles.align || "center";
    let st = styles.style || "normal";
    let v = styles.variant || "normal";
    let mw = styles.maxwidth || "500";
    let bl = styles.baseline || "middle";
    c.font = st + ' ' + v + ' ' + w + ' ' + sz + 'px ' + f;
    c.textAlign = a;
    c.fillStyle = cl;
    c.textBaseline = bl;
    let lines = getLines(str, mw);
    lines.forEach( function (line, lineNum){
        c.fillText(line, x, y + (lineNum * sz));
    });
}
export function getLines(text, maxWidth) { //splits given string into an array of strings representing lines of text that fit into a given width
  let words = text.split(" "); 
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
      let word = words[i];
      let width = c.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}