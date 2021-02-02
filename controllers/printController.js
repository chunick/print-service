const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Error, Debug } = require('../gateways/logger')

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
    if (file) {
        exec(`lp -d HP_Deskjet_F300_series -n ${numCopies || 1} ${collateOption} ${twoSidedOption} ${landscapeOption} ${fitToPageOption} ./uploads/${file.filename}`, (err, stdout, stderr) => {
            if (err) {
                Error("An error occurred while executing print command.", JSON.stringify(err));
                res.sendStatus(500);
            }
            else {
                Debug("Printed file.", "Printed file " + file.filename);
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                return  res.sendStatus(200);
            }
        });
    } else {
        Error("Could not extract file from request.", "");
    }
};
