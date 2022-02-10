import React from "react";

import Card from "../Card";
import { getInitials } from '../../utils/helpers'

const SongCard = ({ artist, title, album, actionItem }) => (
  <Card>
    <div style={{ alignSelf: "flex-end" }}>
      {actionItem}
    </div>
    <p style={{ fontSize: "36px" }}>{getInitials(artist)}</p>
    <span>{title}</span>
    <p style={{ fontWeight: "bold", fontSize: "12px" }}>{artist}</p>
    <span style={{ fontSize: "12px" }}>{album}</span>
  </Card>
);

export default SongCard
