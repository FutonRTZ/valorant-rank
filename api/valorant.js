export default async function handler(req, res) {
  const riotId = "Noble Six";
  const tag = "3959";
  const region = "eu";
  const platform = "pc";

  try {
    const r = await fetch(
      `https://api.henrikdev.xyz/valorant/v2/mmr-history/${region}/${platform}/${riotId}/${tag}`,
      {
        headers: {
          Authorization: process.env.HENRIK_API_KEY
        }
      }
    );

    const data = await r.json();

    const lastGame = data?.data?.history?.[0] || data?.data?.[0];

    if (!lastGame) {
      return res.status(200).send("Aucune game ranked trouvée");
    }

    const rank =
      lastGame.tier?.name ||
      lastGame.currenttier_patched ||
      lastGame.currenttierpatched ||
      "Rank inconnu";

    const rr =
      lastGame.rr ??
      lastGame.ranking_in_tier ??
      "?";

    const change =
      lastGame.last_change ??
      lastGame.mmr_change_to_last_game ??
      0;

    const signe = change > 0 ? "+" : "";

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(
      `Noble Six#3959 - ${rank} - ${rr} RR | Dernière ranked : ${signe}${change} RR`
    );

  } catch (e) {
    res.status(200).send("Erreur récupération ranked Valorant");
  }
}
