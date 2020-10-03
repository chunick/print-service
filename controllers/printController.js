const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

exports.postPrint = (req, res, next) => {
    const file = req.file;
    const numCopies = req.body.numCopies;
    const collateOption = req.body.collated ? '-o collate=true' : '';
    const landscape = req.body.orientation == 'Landscape';
    const landscapeOption = landscape ? '-o landscape' : ''
    let twoSidedOption = '';
    if (req.body.twoSided) {
        twoSidedOption = landscape ? '-o sides=two-sided-short-edge' : '-o sides=two-sided-long-edge'
    }
    const fitToPageOption = req.body.fitToPage ? '-o fit-to-page' : '';
    console.log(file);
    if (file) {
        exec(`lpr -P Deskjet -#${numCopies} ${collateOption} ${twoSidedOption} ${landscapeOption} ${fitToPageOption} ./uploads/${file.filename}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                return  res.sendStatus(200);
            }
        });
    } else {
        console.log("failed");
    }
};