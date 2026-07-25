export function json(status, body) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export function parseBody(event) {
  try {
    return event.body ? JSON.parse(event.body) : {};
  } catch {
    return {};
  }
}

export function getToken(event) {
  const auth = event.headers?.authorization || event.headers?.Authorization || "";
  const match = /^Bearer (.+)$/.exec(auth);
  return match ? match[1] : null;
}
