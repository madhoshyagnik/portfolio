export default async function handler(req, res) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch('https://gitlab.madhoshyagnik.space', {
      signal: controller.signal,
      redirect: 'follow'
    });

    clearTimeout(id);

    // Consider any response that isn't a 4xx or 5xx as "up"
    if (response.status < 400) {
      res.status(200).json({ status: 'up' });
    } else {
      res.status(200).json({ status: 'down' });
    }
  } catch (error) {
    res.status(200).json({ status: 'down' });
  }
}
