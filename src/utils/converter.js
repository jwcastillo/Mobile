const Converter = {
  reverseHex: hex => {
    if (hex.length % 2 !== 0) {
        throw new Error(`Incorrect Length: ${hex}`);
    }
    let out = '';
    for (let i = hex.length - 2; i >= 0; i -= 2) {
        out += hex.substr(i, 2);
    }
    return out;
  },

  numToHex: num => {
    let hex = num.toString(16);
    if (hex.length % 2 !== 0) {
      hex = `0${hex}`;
    }
    return hex;
  },

  numTo4byteHex: num => 
    `00000000${Converter.numToHex(num)}`.slice(-8),

  hexToAscii: str1 => {
    const hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  },

  asciiToHex: str => {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }
};
export { Converter };
