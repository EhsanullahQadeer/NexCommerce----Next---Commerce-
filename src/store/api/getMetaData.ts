export async function getMetadata() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const response = await fetch(`${baseUrl}site-setting`);
    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }
    const data = await response.json();

    let metaData: any = {};
    data.data.map((item: any) => {
      if (item) {
        metaData[item.key] = item.value;
      }
    });

    return metaData;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}
