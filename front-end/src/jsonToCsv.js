export function jsonToCsv(jsonArray) {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
        console.error("Invalid JSON input: Must be an array with at least one object.");
        return "";
    }

    const headers = Object.keys(jsonArray[0]);
    const csvRows = jsonArray.map(obj =>
        headers.map(header => (obj[header] ? `"${obj[header]}"` : "")).join(",")
    );

    return [headers.join(","), ...csvRows].join("\n"); // ✅ Joins rows properly
}
