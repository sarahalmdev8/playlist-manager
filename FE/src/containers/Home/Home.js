import produce from "immer";
import { mutate } from "swr";
import { truncate } from "lodash";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Plus, XCircle } from "react-feather";

import Library from "./Library";
import Row from "../../components/Row";
import Column from "../../components/Column";
import Overlay from "../../components/Overlay";
import SongCard from "../../components/SongCard";
import useSuspense from "../../utils/useSuspense";
import Container from "../../components/Container";
import { updateAndRevalidate } from "../../utils/helpers";
import FloatingButton from "../../components/FloatingButton";

const Home = () => {
  const [selectedItem, setSelected] = useState();
  const [isSelectorVisible, setSelector] = useState(false);
  const { data: playlists, revalidate } = useSuspense("/playlist");

  return (
    <>
      <Row style={{ marginTop: "1.5rem" }}>
        <h1>Browse Library</h1>
      </Row>
      <Library
        renderItem={item => (
          <SongCard
            key={item.id}
            title={item.title}
            album={item.album}
            artist={item.artist}
            actionItem={
              <Plus
                size={16}
                color="#8888"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelected(item);
                  setSelector(true);
                }}
              />
            }
          />
        )}
      />
      <Link to="/playlists">
        <FloatingButton>
          <Menu color="#888" size={24} />
        </FloatingButton>
      </Link>
      {isSelectorVisible && (
        <Overlay>
          <Container
            style={{
              height: "60vh",
              maxWidth: "40vw",
              borderRadius: "0.5rem",
              backgroundColor: "#FFF"
            }}
          >
            <Row style={{ justifyContent: "flex-start" }}>
              <XCircle
                size={24}
                color="#888"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelector(false);
                  setSelected(null);
                }}
              />
            </Row>
            <Row>
              <h3>{`Add "${truncate(selectedItem.title, {
                length: 25
              })}" to your playlists:`}</h3>
            </Row>
            <Link
              style={{
                color: "#444",
                cursor: 'pointer',
                textDecoration: "none",
                alignSelf: "stretch"
              }}
              to={{
                pathname: "/playlist/new",
                state: { initialSongs: [selectedItem.id] }
              }}
            >
              <Row>
                <Plus size={36} color="#4B4" />
                <span>Create a new playlist with this song</span>
              </Row>
            </Link>
            {playlists
              ?.filter(item => !item.songs.includes(selectedItem.id))
              .map(item => (
                <Row key={item.id} style={{ justifyContent: "space-between" }}>
                  <Column>
                    <p>{item.name}</p>
                  </Column>
                  <Column>
                    <Plus
                      size={16}
                      color="#44B"
                      style={{ cursor: 'pointer' }}
                      onClick={async () => {
                        mutate(
                          "/playlist",
                          produce(playlists, draft => {
                            const index = playlists.findIndex(
                              ({ id: currentId }) => currentId === item.id
                            );

                            if (index >= 0)
                              draft[index].songs.push(selectedItem.id);
                          })
                        );

                        await updateAndRevalidate(
                          `/playlist/${item.id}`,
                          produce(item, draft => {
                            draft.songs.push(selectedItem.id);
                          })
                        );

                        await revalidate()
                        setSelector(false);
                        setSelected(null);
                      }}
                    />
                  </Column>
                </Row>
              ))}
          </Container>
        </Overlay>
      )}
    </>
  );
};

export default Home;
