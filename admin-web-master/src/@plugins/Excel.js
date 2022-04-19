import * as xlsx from 'xlsx';

function saveExcel(title, data, column) {
    const worksheet = xlsx.utils.json_to_sheet(data)
    const workbook = xlsx.utils.book_new()
    
    xlsx.utils.book_append_sheet(workbook, worksheet, title)
    column.forEach((value, idx) => {
        const cellAdd = xlsx.utils.encode_cell({c:idx, r:0})
        worksheet[cellAdd].v = value
    })
    xlsx.writeFile(workbook, `${title}.xlsx`);
}

export default {
    saveExcel
}