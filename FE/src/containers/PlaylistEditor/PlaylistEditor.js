import produce from "immer";
import { truncate } from 'lodash'
import { Save, X, Trash2 } from "react-feather";
import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import Row from "../../components/Row";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Overlay from "../../components/Overlay";
import SongCard from "../../components/SongCard";
import useSuspense from "../../utils/useSuspense";
import Container from "../../components/Container";
import { updateAndRevalidate } from "../../utils/helpers";
import FloatingButton from "../../components/FloatingButton";

const PlaylistEditor = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const { data: songs } = useSuspense("/library");
  const [selectedItem, setSelectedItem] = useState();
  const [isDeleteOverlayVisible, setDeleteOverlay] = useState(false);
  const { data, revalidate } = useSuspense(() => (id ? `/playlist/${id}` : null), {
    initialData: { name: "", songs: location.state?.initialSongs || [] }
  });
  const [buffer, setBuffer] = useState(data);

  useEffect(() => {
    if (id && data) setBuffer(data);
    if (id && !data) revalidate();
    
  }, [data, id, revalidate]);

  return (
    <>
      <Row>
        <h1>{id ? "Edit Playlist" : "New Playlist"}</h1>
      </Row>
      <Row style={{ marginBottom: "2rem" }}>
        <Input
          value={buffer.name}
          onChange={({ target }) =>
            setBuffer(prevState => ({ ...prevState, name: target.value }))
          }
        />
      </Row>
      <Row style={{ flexWrap: "wrap" }}>
        {songs
          ?.filter(item => buffer.songs.includes(item.id))
          .map(item => (
            <SongCard
              key={item.id}
              title={item.title}
              album={item.album}
              artist={item.artist}
              actionItem={
                <Trash2
                  size={16}
                  color="#8888"
                  onClick={() => {
                    setSelectedItem(item);
                    setDeleteOverlay(true);
                  }}
                />
              }
            />
          ))}
      </Row>
      <FloatingButton
        onClick={async () => {
          if (buffer.name?.length > 0) {
            setLoading(true)
            await updateAndRevalidate(
              id ? `/playlist/${id}` : "/playlist",
              buffer,
              !id
            );

            setLoading(false);
            history.goBack();
          }
        }}
      >
        {isLoading ? <Loader /> : <Save size={18} color="#3BB" />}
        
      </FloatingButton>
      {isDeleteOverlayVisible && (
        <Overlay>
          <Container
            style={{
              height: "25vh",
              maxWidth: "40vw",
              borderRadius: "0.5rem",
              backgroundColor: "#FFF"
            }}
          >
            <Row>
              <X color="#B44" size={48} />
            </Row>
            <span>{`Do you want to remove "${truncate(selectedItem.title, { length: 25 })}" from the playlist?`}</span>
            <Row>
              <Button
                style={{ width: "45%", backgroundColor: "#B44" }}
                onClick={() => {
                  const tbd = buffer?.songs.findIndex(
                    item => item === selectedItem.id
                  );

                  setBuffer(
                    produce(draft => {
                      if (tbd >= 0) draft.songs.splice(tbd, 1);
                    })
                  );

                  setSelectedItem(-1);
                  setDeleteOverlay(false);
                }}
              >
                Remove
              </Button>
              <Button
                style={{ width: "45%", backgroundColor: "#8888" }}
                onClick={() => {
                  setSelectedItem(-1);
                  setDeleteOverlay(false);
                }}
              >
                KEEP
              </Button>
            </Row>
          </Container>
        </Overlay>
      )}
    </>
  );
};

export default PlaylistEditor;
