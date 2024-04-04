export class RedFetch {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  fetch = async (url: string, options: RequestInit) => {
    const response = await fetch(this.baseUrl + url, options);
    return await response.json();
  };
}
