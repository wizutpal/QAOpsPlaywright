import ExcelJs from "exceljs";
import {test,expect} from '@playwright/test'

let rowNumber: number;
let colNumber: number;
const writePath = "C:/Users/Admin/Downloads/download1.xlsx";
const downloadPath="C:/Users/Admin/Downloads/download.xlsx";

async function writeExcelTest(searchText: String, replaceText: String, change: any, filePath){
    
const workbook= new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath)
const worksheet= workbook.getWorksheet('Sheet1');
await readExel(worksheet, searchText);
const cell=  worksheet.getCell(rowNumber,colNumber+change.colNumber);
cell.value= replaceText;
console.log("Saving file...");

await workbook.xlsx.writeFile(writePath);

console.log("File saved successfully!");

};

async function readExel(worksheet, searchText) {
    worksheet.eachRow((row,rowNum)=>
    {
        row.eachCell((cell,colNum)=>
        {
            if(cell.value===searchText)
            {
                console.log(rowNum);
                console.log(colNum);  
                colNumber= colNum;
                  rowNumber=rowNum;   
            }
            
        })
})

}

//writeExcelTest("Kivi","1000",{rowNumber:0, colNumber:2},"D:/exceldownloadTest.xlsx");

test("Upload download excel validation",async ({page})=>{
    const testSearch= "Mango";
    const updateValue= "1000";
 await page.goto("https://rahulshettyacademy.com/upload-download-test/");
 const downloadPromise= page.waitForEvent('download')

 await page.getByRole('button',{name: 'Download'}).click();
    await downloadPromise;
 await writeExcelTest(testSearch,updateValue,{rowNumber:0, colNumber:2},downloadPath);
 await page.locator("#fileinput").click();
 await page.locator("#fileinput").setInputFiles(writePath)

 const textLocator= page.getByText((testSearch));
 const desiredRow= await page.getByRole('row').filter({has: textLocator})
 await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

} )