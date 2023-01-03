/* eslint-disable prettier/prettier */
import * as d3 from 'd3-color';
import { IColor } from '../ColorPicker/ColorPicker';
import { ncsColors, ralColors, ralDesignColors } from '../ColorPicker/colors';

export const updateColorMapRal = async () => {
    // const targetUrl = 'https://cors-anywhere.herokuapp.com/https://rgb.to/save/json/ral/1000';
    const targetUrl = 'https://rgb.to/save/json/ral/';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const correctedColors: IColor[] = [];
    const colorDetails: ColorDetails[] = [];

    console.log('start updateColorMap');

    const colorProcessed = ['RAL 2017', "RAL 9012", "RAL 1000", "RAL 1001", "RAL 1002", "RAL 1003", "RAL 1004", "RAL 1005", "RAL 1006", "RAL 1007", "RAL 1011", "RAL 1012", "RAL 1013", "RAL 1014", "RAL 1015", "RAL 1016", "RAL 1017", "RAL 1018", "RAL 1019", "RAL 1020", "RAL 1021", "RAL 1023", "RAL 1024", "RAL 1026", "RAL 1027", "RAL 1028", "RAL 1032", "RAL 1033", "RAL 1034", "RAL 1035", "RAL 1036", "RAL 1037", "RAL 2000", "RAL 2001", "RAL 2002", "RAL 2003", "RAL 2004", "RAL 2005", "RAL 2007", "RAL 2008", "RAL 2009", "RAL 2010", "RAL 2011", "RAL 2012", "RAL 2013", "RAL 3000", "RAL 3001", "RAL 3002", "RAL 3003", "RAL 3004", "RAL 3005", "RAL 3007", "RAL 3009", "RAL 3011", "RAL 3012", "RAL 3013", "RAL 3014", "RAL 3015", "RAL 3016", "RAL 3017", "RAL 3018", "RAL 3020", "RAL 3022", "RAL 3024", "RAL 3026", "RAL 3027", "RAL 3028", "RAL 3031", "RAL 3032", "RAL 3033", "RAL 4001", "RAL 4002", "RAL 4003", "RAL 4004", "RAL 4005", "RAL 4006", "RAL 4007", "RAL 4008", "RAL 4009", "RAL 4010", "RAL 4011", "RAL 4012", "RAL 5000", "RAL 5001", "RAL 5002", "RAL 5003", "RAL 5004", "RAL 5005", "RAL 5007", "RAL 5008", "RAL 5009", "RAL 5010", "RAL 5011", "RAL 5012", "RAL 5013", "RAL 5014", "RAL 5015", "RAL 5017", "RAL 5018", "RAL 5019", "RAL 5020", "RAL 5021", "RAL 5022", "RAL 5023", "RAL 5024", "RAL 5025", "RAL 5026", "RAL 6000", "RAL 6001", "RAL 6002", "RAL 6003", "RAL 6004", "RAL 6005", "RAL 6006", "RAL 6007", "RAL 6008", "RAL 6009", "RAL 6010", "RAL 6011", "RAL 6012", "RAL 6013", "RAL 6014", "RAL 6015", "RAL 6016", "RAL 6017", "RAL 6018", "RAL 6019", "RAL 6020", "RAL 6021", "RAL 6022", "RAL 6024", "RAL 6025", "RAL 6026", "RAL 6027", "RAL 6028", "RAL 6029", "RAL 6032", "RAL 6033", "RAL 6034", "RAL 6035", "RAL 6036", "RAL 6037", "RAL 6038", "RAL 7000", "RAL 7001", "RAL 7002", "RAL 7003", "RAL 7004", "RAL 7005", "RAL 7006", "RAL 7008", "RAL 7009", "RAL 7010", "RAL 7011", "RAL 7012", "RAL 7013", "RAL 7015", "RAL 7016", "RAL 7021", "RAL 7022", "RAL 7023", "RAL 7024", "RAL 7026", "RAL 7030", "RAL 7031", "RAL 7032", "RAL 7033", "RAL 7034", "RAL 7035", "RAL 7036", "RAL 7037", "RAL 7038", "RAL 7039", "RAL 7040", "RAL 7042", "RAL 7043", "RAL 7044", "RAL 7045", "RAL 7046", "RAL 7047", "RAL 7048", "RAL 8000", "RAL 8001", "RAL 8002", "RAL 8003", "RAL 8004", "RAL 8007", "RAL 8008", "RAL 8011", "RAL 8012", "RAL 8014", "RAL 8015", "RAL 8016", "RAL 8017", "RAL 8019", "RAL 8022", "RAL 8023", "RAL 8024", "RAL 8025", "RAL 8028", "RAL 8029", "RAL 9001"
    ]
    for await (const color of ralColors) {

        const urlWithColor = targetUrl + color.name.replace('RAL ', '');
        console.log("Processing URL:" + urlWithColor);

        if (colorProcessed.length > 0 && colorProcessed.includes(color.name)) {
            console.log('skipping');
            continue
        }


        //wait 10 seconds before each request
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await fetch(proxyUrl + urlWithColor, { headers: { origin: 'http://localhost:6006' } })
        if (response.status !== 200) {
            const processedColor = correctedColors.map(c => c.name);
            console.log('processedCoror', processedColor);

            console.log('Invalid response: ' + response.status);
            const link = document.createElement('a');
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({ correctedColors, processedCoror: processedColor }, null, 2)));
            link.setAttribute('download', 'colors.json');
            link.click();
            return
        }
        const responseText = await response.text();
        //check if the response is valid json
        if (!responseText.startsWith('{')) {
            console.log('Invalid response: ' + responseText);
            continue;
        }
        const obj: ColorDetails = JSON.parse(responseText);
        color.hex = obj.hex;
        obj.name = color.name;

        correctedColors.push(color);
        colorDetails.push(obj);

    }


    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({ correctedColors }, null, 2)));
    link.setAttribute('download', 'colors.json');
    link.click();



    // fs.writeFileSync('./colors.json', JSON.stringify(colorDetails, null, 2));

};


export const updateColorMapRalDesign = async () => {

    const correctedColors: IColor[] = ralDesignColors.map((color: any) => {
        const value = d3.color(d3.rgb(color.R, color.G, color.B));
        const hex = value.formatHex();
        const colorWithHex: any = {
            name: color.name,
            hex: hex,
            description: color.english
        }
        return colorWithHex;
    });





    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({ correctedColors }, null, 2)));
    link.setAttribute('download', 'colors.json');
    link.click();


};



export const updateAllColors = async () => {

    const hexToLab = (color: IColor) => {
        const lab = d3.lab(color.hex);
        const colorWithLab: IColorWithLab = {
            name: color.name,
            hex: color.hex,
            description: color.description,
            lab: {
                a: lab.a,
                b: lab.b,
                l: lab.l,
                opacity: lab.opacity
            }
        }
        return colorWithLab;
    }

    const ralColorsWithLab: IColorWithLab[] = ralColors.map((color: IColor) => {
        return hexToLab(color);
    })
    const ralDesignColorsWithLab: IColorWithLab[] = ralDesignColors.map((color: IColor) => {
        return hexToLab(color);
    })
    const ncsColorsWithLab: IColorWithLab[] = ncsColors.map((color: IColor) => {
        return hexToLab(color);
    })


    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({ ralColors: ralColorsWithLab, ralDesignColors: ralDesignColorsWithLab, ncsColors: ncsColorsWithLab }, null, 2)));
    link.setAttribute('download', 'colors.json');
    link.click();


};



export interface Lab {
    a: number;
    b: number;
    l: number;
    opacity: number;
}

export interface IColorWithLab {
    name: string;
    hex: string;
    description?: string;
    lab?: Lab;
}







export interface Rgb {
    r: number;
    g: number;
    b: number;
}

export interface Hsl {
    h: number;
    s: number;
    l: number;
}

export interface Hsb {
    h: number;
    s: number;
    b: number;
}

export interface Cmyk {
    c: string;
    m: string;
    y: string;
    k: string;
}

export interface ColorDetails {
    name: string;
    originalHex: string;
    hex: string;
    diff: boolean;
    websafe: string;
    rgb: Rgb;
    hsl: Hsl;
    hsb: Hsb;
    cmyk: Cmyk;
}
