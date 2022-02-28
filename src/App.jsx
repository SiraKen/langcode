import "./App.css";
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import Code from "./data/code.json";
import { useState } from "react";
import Helmet from "react-helmet";

export default function App() {
  const [input, setInput] = useState("英語");
  const [name, setName] = useState("英語");
  const [cd, setCd] = useState("en");
  function searchCode(val) {
    if (val === "") return;
    const reg = new RegExp(val);
    const found = Code.find((c) => c.jp.match(reg));
    if (found !== undefined) {
      console.log(found);
      setName(found.jp);
      setCd(found.code);
    }
  }
  return (
    <>
      <Helmet>
        <title>言語コード検索</title>
      </Helmet>
      <Container className="my-5">
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <Button
                variant="primary"
                onClick={() => navigator.clipboard.writeText(cd)}
              >
                {cd}
              </Button>
              <InputGroup.Text>{name}</InputGroup.Text>
              <FormControl
                placeholder={"言語名を入力..."}
                defaultValue={input}
                onChange={(e) => searchCode(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table id="myTable">
              <thead>
                <tr>
                  <th>code</th>
                  <th>jp</th>
                  <th>en</th>
                </tr>
              </thead>
              <tbody>
                {Code.map((c, index) => (
                  <tr key={index}>
                    <td>{c.code}</td>
                    <td>{c.jp}</td>
                    <td>{c.en}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
