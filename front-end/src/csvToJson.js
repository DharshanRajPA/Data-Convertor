export function csvToJson(csvString) {
    if (!csvString || typeof csvString !== "string") {
        console.error("Invalid CSV input: Data is undefined or empty.");
        return []; // ✅ Returns an empty array instead of crashing
    }

    const rows = csvString.split("\n").map(row => row.trim()).filter(row => row); // ✅ Removes empty rows
    if (rows.length < 2) {
        console.error("CSV must have at least a header and one data row.");
        return [];
    }

    const headers = rows[0].split(",").map(header => header.trim());
    return rows.slice(1).map(row => {
        const values = row.split(",").map(value => value.trim());
        return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || ""; // ✅ Prevents undefined values
            return acc;
        }, {});
    });
}
