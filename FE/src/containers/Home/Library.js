import React, { useState } from "react";
import { Search, Sliders } from "react-feather";

import Row from "../../components/Row";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Column from "../../components/Column";
import Overlay from "../../components/Overlay";
import useSuspense from "../../utils/useSuspense";
import Container from "../../components/Container";
import RadioButton from "../../components/RadioButton";

const Library = ({ renderItem }) => {
  const [query, setQuery] = useState("");
  const { data } = useSuspense("/library");
  const [showOverlay, setOverlayVisibility] = useState(false);
  const [sort, setSort] = useState({ key: "title", order: "ASC" });

  return (
    <>
      <Row style={{ justifyContent: "center" }}>
        <Input
          leftIcon={<Search size={18} color="#8888" />}
          type="search"
          placeholder="Search by title, artist, album..."
          onChange={({ target }) => {
            setQuery(target.value);
          }}
        />
        <Sliders
          size={16}
          color="#888"
          style={{ cursor: 'pointer' }}
          onClick={() => setOverlayVisibility(true)}
        />
      </Row>
      <Row style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        {data
          ?.filter(({ title, artist, album }) => {
            if (query === "") return true;

            const buffer = query.toLocaleLowerCase();
            return [title, artist, album].some(item =>
              item.toLowerCase().includes(buffer)
            );
          })
          .sort(
            (a, b) =>
              (a?.[sort.key] > b?.[sort.key]) * (sort.order === "ASC" ? 1 : -1)
          )
          .map(renderItem)}
      </Row>
      {showOverlay && (
        <Overlay>
          <Container
            style={{
              height: "35vh",
              maxWidth: "40vw",
              borderRadius: "0.5rem",
              backgroundColor: "#FFF"
            }}
          >
            <Row>
              <h3>Sorting</h3>
            </Row>
            <Row style={{ justifyContent: "space-evenly" }}>
              <Column>
                <RadioButton
                  label="Title"
                  checked={sort.key === "title"}
                  onClick={() =>
                    setSort(prevState => ({ ...prevState, key: "title" }))
                  }
                />
                <RadioButton
                  label="Artist"
                  checked={sort.key === "artist"}
                  onClick={() =>
                    setSort(prevState => ({ ...prevState, key: "artist" }))
                  }
                />
                <RadioButton
                  label="Album"
                  checked={sort.key === "album"}
                  onClick={() =>
                    setSort(prevState => ({ ...prevState, key: "album" }))
                  }
                />
              </Column>
              <Column>
                <RadioButton 
                  label="Ascendent"
                  checked={sort.order === "ASC"}
                  onClick={() =>
                    setSort(prevState => ({ ...prevState, order: "ASC" }))
                  }
                />
                <RadioButton 
                  label="Descendent"
                  checked={sort.order === "DESC"}
                  onClick={() =>
                    setSort(prevState => ({ ...prevState, order: "DESC" }))
                  }
                />
              </Column>
            </Row>
            <Row>
              <Button onClick={() => setOverlayVisibility(false)}>Close</Button>
            </Row>
          </Container>
        </Overlay>
      )}
    </>
  );
};

export default Library;
