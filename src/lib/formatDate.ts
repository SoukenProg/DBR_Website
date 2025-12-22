/**
 * ISO 8601形式の日付文字列をYYYY-MM-DD形式にフォーマット
 * @param dateString - ISO 8601形式の日付文字列（例: "2024-01-15T00:00:00.000Z"）
 * @returns YYYY-MM-DD形式の文字列（例: "2024-01-15"）
 */
export function formatDate(dateString: string | undefined): string {
    if (!dateString) return "";

    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (error) {
        // フォーマットエラーの場合は元の文字列を返す
        return dateString;
    }
}