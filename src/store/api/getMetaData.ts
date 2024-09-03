export async function getMetadata() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${baseUrl}site-setting`);
        if (!response.ok) {
            throw new Error('Failed to fetch metadata');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
}
