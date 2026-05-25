export default async function handler(req, res) {
  const riotId = "Tsumugi";
  const tag = "3959";
  const region = "eu";

  try {
    const r = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${riotId}/${tag}`, {
      headers: { Authorization: process.env.HENRIK_API_KEY }
    });

    const data = await r.json();
    const rank = data?.data?.current_data?.currenttierpatched || data?.data?.current?.tier?.name || "Rank inconnu";
    const rr = data?.data?.current_data?.ranking_in_tier ?? data?.data?.current?.rr ?? "?";

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(`${riotId}#${tag} - ${rank} - ${rr} RR`);
  } catch {
    res.status(200).send("Rank Valorant indisponible");
  }
}
