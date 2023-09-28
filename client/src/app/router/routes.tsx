import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import App from "../layout/App";
import RecipeDashboard from "../../features/recipes/dashboard/recipeDashboard";
import RecipeDetails from "../../features/recipes/details/RecipeDetails";
import RecipeForm from "../../features/recipes/form/RecipeForm";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/loginForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "recipes", element: <RecipeDashboard /> },
      { path: "recipes/:id", element: <RecipeDetails /> },
      { path: "createRecipe", element: <RecipeForm key="create" /> },
      { path: "manage/:id", element: <RecipeForm key="manage" /> },
      { path: "login", element: <LoginForm /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
