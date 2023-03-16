//const fs = require('fs');
//const path = require('path');
//const rgbHex = require('rgb-hex');
//import rgbHex from 'rgb-hex';
import fs from 'fs';
import path from 'path';


const dirPath = './Colors'; // directory path
const outputFilePath = 'output.json'; // output file path

function rgbHex(r, g, b, a) {
 
 if (r < 16) {
    r = "0" + r.toString(16);
  } else {
    r = r.toString(16);
  }
  if (g < 16) {
    g = "0" + g.toString(16);
  } else {
    g = g.toString(16);
  }
  if (b < 16) {
    b = "0" + b.toString(16);
  } else {
    b = b.toString(16);
  }
 const hex = ((1 << 24) + (parseInt(r, 16) << 16) + (parseInt(g, 16) << 8) + parseInt(b, 16) + (a * 255 << 24)).toString(16);
 
 return "#"+hex.padStart(6, "0")
 

}

const readFilesInDirectory = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  const fileContents = [];
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fileContents.push(...readFilesInDirectory(filePath));
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      const json = JSON.parse(content);
	
	 var hex1 = "";
	 if(json.colors){
		   const color1 = json.colors[0].color;
		  const components1 = color1.components;
          const red = parseInt(components1.red);
		  const green = parseInt(components1.green);
		  const blue = parseInt(components1.blue);
		  const alpha = parseFloat(components1.alpha);
		   hex1 = rgbHex(red, green, blue, alpha);
		     console.log(`light, ${dirPath} ${red} ${green} ${blue} ${alpha} ${hex1}`);
		  
	 }
	var hex2 = "";
		  
		  if(json.colors && json.colors[1] && json.colors[1].color){
			    const color2 = json.colors[1].color;
		  const components2 = color2.components;
          const red2 = parseInt(components2.red);
		  const green2 = parseInt(components2.green);
		  const blue2 = parseInt(components2.blue);
		  const alpha2 = parseFloat(components2.alpha);
		   hex2 = rgbHex(red2, green2, blue2, alpha2);
		     console.log(`dark, ${dirPath} ${red2} ${green2} ${blue2} ${alpha2} ${hex2}`);
		  }
		
		
		
		   fileContents.push({ fileName: dirPath, light:hex1, dark:hex2 });
	  
     
    }
  });
  return fileContents;
};




const fileContents = readFilesInDirectory(dirPath);
fs.writeFileSync(outputFilePath, JSON.stringify(fileContents));

