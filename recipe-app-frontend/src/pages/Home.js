import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const res = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(res.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <Container>
      <h1 className="text-center mt-3 mb-4">Recipes</h1>
      <ul className="list-unstyled">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="mb-4">
            <div className="text-center">
              <h2>{recipe.name}</h2>
              <Button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                variant={isRecipeSaved(recipe._id) ? "success" : "primary"}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </Button>
            </div>
            <Row className="align-items-center">
              <Col xs={12} md={6} className="text-center">
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
              </Col>
              <Col xs={12} md={6} className="text-center">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Home;
