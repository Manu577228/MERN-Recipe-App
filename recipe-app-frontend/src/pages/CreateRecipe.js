import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function CreateRecipe() {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="create-recipe mt-5">
      <h2 className="text-3xl font-bold mb-8">Create Your Recipe Here!</h2>
      <Form onSubmit={handleSubmit} className="space-y-4">
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3} htmlFor="name" className="text-sm font-medium text-gray-600">Name</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3} htmlFor="description" className="text-sm font-medium text-gray-600">Description</Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3} htmlFor="ingredients" className="text-sm font-medium text-gray-600">Ingredients</Form.Label>
          <Col sm={9}>
            {recipe.ingredients.map((ingredient, index) => (
              <Form.Control
                key={index}
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            ))}
            <Button
              type="button"
              onClick={handleAddIngredient}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add Ingredient
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3} htmlFor="instructions" className="text-sm font-medium text-gray-600">Instructions</Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3} htmlFor="imageUrl" className="text-sm font-medium text-gray-600">Image URL</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3} htmlFor="cookingTime" className="text-sm font-medium text-gray-600">Cooking Time (minutes)</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </Col>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-pink-700 hover:to-red-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Recipe
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default CreateRecipe;
