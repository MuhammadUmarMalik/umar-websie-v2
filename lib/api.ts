export async function parseJsonRequest(request: Request) {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

