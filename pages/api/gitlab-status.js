export default async function handler(req, res) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch('https://gitlab.madhoshyagnik.space', {
      signal: controller.signal,
    });

    clearTimeout(id);

    if (response.ok) {
      res.status(200).json({ status: 'up' });
    } else {
      res.status(200).json({ status: 'down' });
    }
  } catch (error) {
    res.status(200).json({ status: 'down' });
  }
}
