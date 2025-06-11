import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation(); // Access location state

  useEffect(() => {
    // Check if search results were passed through navigation
    if (location.state && location.state.query) {
      const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/products/search?query=${location.state.query}`);
            console.log(response.data); 
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      };

      fetchSearchResults();
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h2>Search Results for: {location.state?.query || "No query"}</h2>
        <Row>
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <Col md={4} key={product.id}>
                <Card>
                  <Card.Img variant="top" src={product.imagePath} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button variant="primary">View Product</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No products found</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SearchResults;
