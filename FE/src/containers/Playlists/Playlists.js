import produce from "immer";
import fetch from "unfetch";
import { mutate } from "swr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, X, ArrowRight } from "react-feather";

import Row from "../../components/Row";
import Column from "../../components/Column";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";
import useSuspense from "../../utils/useSuspense";
import Container from "../../components/Container";
import FloatingButton from "../../components/FloatingButton";

const Playlists = () => {
  const { data } = useSuspense("/playlist");
  const [selectedItem, setSelectedItem] = useState();
  const [deleteOverlay, setDeleteOverlay] = useState(false);

  return (
    <Container style={{ height: "90vh" }}>
      <Row>
        <h1 style={{ fontWeight: "bold", fontSize: "36px" }}>Playlists</h1>
      </Row>
      <Column style={{ alignSelf: "stretch" }}>
        {data?.map(
          item =>
            item && (
              <Row
                key={item.id}
                style={{
                  margin: "0.5rem auto",
                  justifyContent: "space-between"
                }}
              >
                <p>{`${item.name} (${item.songs?.length})`}</p>
                <div>
                  <Link
                    to={() => {
                      const base = `/playlist/${item.id}`;
                      mutate(base, item);
                      return `${base}/edit`;
                    }}
                  >
                    <Edit
                      size={16}
                      color="#888"
                      style={{ margin: "0 0.5rem" }}
                    />
                  </Link>
                  <Trash2
                    size={16}
                    color="#888"
                    style={{ margin: "0 0.5rem" }}
                    onClick={() => {
                      setSelectedItem(item);
                      setDeleteOverlay(true);
                    }}
                  />
                  <ArrowRight
                    size={16}
                    color="#888"
                    style={{ margin: "0 0.5rem" }}
                  />
                </div>
              </Row>
            )
        )}
      </Column>
      <Link to="/playlist/new">
        <FloatingButton>
          <Plus size={24} color="#4B4" />
        </FloatingButton>
      </Link>
      {deleteOverlay && (
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
            <span>{`Do you want to delete playlist: "${selectedItem.name}"?`}</span>
            <Row>
              <Button
                style={{ width: "45%", backgroundColor: "#B44" }}
                onClick={async () => {
                  await fetch(`/playlist/${selectedItem.id}`, {
                    method: "DELETE"
                  });
                  mutate(
                    "/playlist",
                    produce(data, draft => {
                      const tbd = data.findIndex(
                        item => item.id === selectedItem.id
                      );

                      if (tbd >= 0) draft.slice(tbd, 1);
                    })
                  );

                  setDeleteOverlay(false);
                }}
              >
                Delete
              </Button>
              <Button
                style={{ width: "45%", backgroundColor: "#8888" }}
                onClick={() => {
                  setDeleteOverlay(false);
                  setSelectedItem(null);
                }}
              >
                KEEP
              </Button>
            </Row>
          </Container>
        </Overlay>
      )}
    </Container>
  );
};

export default Playlists;
