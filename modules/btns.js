let c = document.getElementById('canvas').getContext('2d');

export let btns = {
    x: [],
    y: [],
    width: [],
    height: [],
    label: [],
    action: [],
    style: [],
    add: (label, x, y, action, obj = {}) => {
        let style = {
            fill: obj.fill || "#333",
            stroke: obj.stroke || "#666",
            lineWidth: obj.linewidth || 5,
            borderRadius: obj.borderRadius || 10,
            fontSize: obj.fontSize || 50,
            fontColor: obj.fontColor || "#eee",
            font: obj.font || "'Darker Grotesque'",
            weight: obj.weight || 500,
            fitText: obj.fitText || false,
            square: obj.square || false,
            baseline: obj.baseline || 'middle',
            opacity: obj.opacity || 1,
            minWidth: obj.minWidth || false
        }
        btns.x.push(x);
        btns.y.push(y);
        btns.label.push(label);
        btns.action.push(action);
        btns.style.push(style);
        
        c.font = style.fontSize + 'px ' + style.font;
       
        if(!style.fitText && !style.square){
            if(style.minWidth){
                if (style.minWidth > c.measureText(label).width * 1.3) {
                    btns.width.push(style.minWidth);
                } else {
                    btns.width.push(c.measureText(label).width * 1.3);
                }
            } else {
                if(c.measureText(label).width * 1.3 < 6 * style.fontSize){
                    btns.width.push(6 * style.fontSize);
                } else {
                    btns.width.push(c.measureText(label).width * 1.3);
                }
            }
            btns.height.push((c.measureText("|").actualBoundingBoxAscent + c.measureText("|").actualBoundingBoxDescent) * 1.8);
        } else {
            if(style.square){
                let w = c.measureText(label).width * 1.6;
                let h = (c.measureText("|").actualBoundingBoxAscent + c.measureText("|").actualBoundingBoxDescent) * 1.5;
                if(w > h){
                    h = w;
                    btns.width.push(w);
                    btns.height.push(h);
                } else {
                    w = h;
                    btns.width.push(w);
                    btns.height.push(h);
                }
            } else {
                btns.width.push(c.measureText(label).width * 1.3);
                btns.height.push((c.measureText("|").actualBoundingBoxAscent + c.measureText("|").actualBoundingBoxDescent) * 1.8);
            }  
        }
        },
    clear: () => {
        btns.x = [],
        btns.y = [],
        btns.width = [],
        btns.height = [],
        btns.label = [],
        btns.action = [],
        btns.style = []
    }
}